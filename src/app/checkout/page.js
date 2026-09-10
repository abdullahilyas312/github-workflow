"use client"

import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";
import Link from "next/link";
import Breadcrums from "@/components/ui/Breadcrums";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPaymentMethodTypes } from "@/DAL/paymentMethods";
import { createGuestOrder, createUserOrder } from "@/DAL/orders";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { BUSINESS_ID } from "@/config/config";
import { useUser } from "@/context/UserContext";
import { useMemo, useEffect } from "react";

export default function CheckoutPage() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { user, isAuthenticated, isLoading: isUserLoading } = useUser();

    const {
        data: paymentMethodTypes,
        isLoading,
        isError,
        error,
      } = useQuery({
        // queryKey: [QUERY_CONSTANTS.ACCOUNT_HEAD],
        queryKey: ["paymentMethodTypes"],
        queryFn: () => getPaymentMethodTypes(),
      });

    const paymentMethodTypesData = paymentMethodTypes?.data;


    const { cart = [] } = useCart();
    // console.log("cart", cart);

    const productDtoList = cart.map((item) => {
        // Handle both string and number price formats
        const price = typeof item.price === 'string' 
          ? Number(item.price.replace(/[^\d.]/g, ''))
          : Number(item.price);
        const qty = Number(item.qty);
        
        return {
          "productId": item.id,
          "quantity": qty,
          "subtotal": parseFloat((price * qty).toFixed(2)),
          "price": parseFloat(price.toFixed(2)),
          "productName": item.title
        };
    });

    console.log("user", user);
    
    // const getDefaultValues = () => {
    //     if (isAuthenticated()) {
    //         return {
    //             userName: user?.username || "",
    //             country: user?.country || "",
    //             address: user?.addresses?.find(address => address.is_default) ? 
    //                 [user.addresses.find(address => address.is_default).street, 
    //                  user.addresses.find(address => address.is_default).city, 
    //                  user.addresses.find(address => address.is_default).province].join(", ") : "",
    //             city: user?.city || "",
    //             province: user?.province || "",
    //             zip: user?.zip || "",
    //             phone: user?.phone || "",
    //             email: user?.email || "",
    //             note: "",
    //             paymentMethod: "",
    //         };
    //     }
    
        
    //     return {
    //         userName: "",
    //         country: "",
    //         address: "",
    //         city: "",
    //         province: "",
    //         zip: "",
    //         phone: "",
    //         email: "",
    //         note: "",
    //         paymentMethod: "",
    //     };
    // };




    const getDefaultValues = useMemo(() => {
      if (!isAuthenticated() || isUserLoading || !user) {
        return {
          userName: "",
          address: "",
          city: "",
          country: "",
          province: "",
          zip: "",
          phone: "",
          email: "",
          note: "",
          paymentMethod: "",
        };
      }

      const defaultAddress = user?.addresses?.find(address => address.defaultAddress);

      // console.log("defaultAddress", defaultAddress);

      return {
          userName: user?.username || "",
          address: defaultAddress
          ? [defaultAddress.street, defaultAddress.city, defaultAddress.province].join(", ")
          : "",
          city: defaultAddress?.city || "",
          country: defaultAddress?.country || "",
          province: defaultAddress?.province || "",
          zip: defaultAddress?.zip || "",
          phone: user?.phone || "",
          email: user?.email || "",
          note: "",
          paymentMethod: "",
      };
    }, [isAuthenticated, isUserLoading, user]);
  

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "onChange",
        defaultValues: getDefaultValues,
    });

    // Reset form when user data changes
    useEffect(() => {
        if (!isUserLoading && user && isAuthenticated()) {
            reset(getDefaultValues);
        }
    }, [user, isUserLoading, isAuthenticated, reset, getDefaultValues]);

          const getValidationRules = () => {
            return {              
                userName: {
                  required: "Full name is required",
                },
                country: {
                  required: "Country is required",
                },
                address: {
                  required: "Address is required",
                },                
                // address2: {
                //   required: "Address 2 is required",
                // },
                city: {
                  required: "City is required",
                },
                province: {
                  required: "Province is required",
                },
                zip: {
                  required: "ZIP code is required",
                },
                phone: {
                  required: "Phone is required",
                },
                email: {
                  required: "Email is required",
                },
                // note: {
                //   required: "Note is required",
                // },
                paymentMethod: {
                  required: "Payment method is required",
                },
            }

          };

    const total = cart.reduce((sum, item) => {
        // Handle both string and number price formats
        const price = typeof item.price === 'string' 
          ? Number(item.price.replace(/[^\d.]/g, ''))
          : Number(item.price);
        const qty = Number(item.qty);
        return sum + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
      }, 0);



      const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
          return await isAuthenticated() ? await createUserOrder(data) : await createGuestOrder(data);
        },
        onSuccess: (result) => {
          // Check for success - API might return different response structures
          if (result.statusCode === 200 || result.status === 200 || result.success === true || !result.code) {
            enqueueSnackbar(result.message || "Order placed successfully!", { variant: "success" });
            queryClient.invalidateQueries({
              queryKey: ["paymentMethodTypes"],
            });
            router.push(ROUTES_CONSTANTS.CHECKOUT_SUCCESS);
          } else {
            enqueueSnackbar(result.message || "Something went wrong", {
              variant: "error",
            });
          }
        },
        onError: (error) => {
          enqueueSnackbar(error.message || "Submission failed", {
            variant: "error",
          });
        },
      });

      

    const onSubmit = (data) => {
        const orderData = {
            productDtoList: productDtoList,
            totalPrice: parseFloat(total.toFixed(2)),
            orderAddressDto: {
                // userId: null,
                // firstName: data.firstName,
                // lastName: data.lastName,
                // userName: data.userName,
                fullName: data.userName,
                country: data.country,
                province: data.province,
                city: data.city,
                streetAddress: data.address,
                zip: data.zip,
                phone: data.phone,
                email: data.email,
                additionalDescription: data.note || ""
            },
            paymentMethodTypeId: parseInt(data.paymentMethod),
            businessId: BUSINESS_ID
        };
        mutate(orderData);
    };

    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'Checkout', href: ROUTES_CONSTANTS.CHECKOUT },
    ]

    return (
        <section className="w-full mx-auto pt-40 pb-16 px-4">
            <h1 className="text-5xl text-center font-medium mb-2">Checkout</h1>
            <Breadcrums BreadcrumbsItem={BreadcrumbsItem} />
            {isUserLoading ? (
                <div className="max-w-7xl mx-auto py-20 flex justify-center">
                    <div className="w-4/5 p-6">
                        <div className="animate-pulse">
                            <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-gray-200 rounded"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto py-20 flex justify-center gap-12 font-poppins">
                <div className="w-4/5 p-6">
                    <h2 className="text-4xl font-semibold mb-6">Billing details</h2>
                    <div className="flex flex-col items-strach gap-6 mb-6">
                            <div className="flex flex-col items-start gap-4">
                                <label htmlFor="userName" className="block text-sm font-medium">Full Name</label>
                                <input id="userName" {...register("userName", getValidationRules().userName)} className="border border-[var(--border-color)] p-4 rounded-[10px] w-full" />
                                {errors.userName && <span className="text-red-500 text-sm">{errors.userName.message}</span>}
                            </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="address" className="block text-sm font-medium">Country / Region</label>
                            {/* <select {...register("country", getValidationRules().country)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]">
                                <option value="">Country / Region</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="India">India</option>
                                <option value="Pakistan">Pakistan</option>
                            </select> */}
                            <input {...register("country",getValidationRules().country)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="address" className="block text-sm font-medium">Street address</label>
                            <input {...register("address",getValidationRules().address)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="address2" className="block text-sm font-medium">Town / City</label>
                            <input {...register("city", getValidationRules().address2)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="address2" className="block text-sm font-medium">Province</label>
                            {/* <select {...register("province", getValidationRules().province)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]">
                                <option value="">Province</option>
                                <option value="Western Province">Western Province</option>
                                <option value="Southern Province">Southern Province</option>
                            </select> */}
                            <input {...register("province",getValidationRules().province)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.province && <span className="text-red-500 text-sm">{errors.province.message}</span>}
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="zip" className="block text-sm font-medium">ZIP code</label>
                            <input {...register("zip", getValidationRules().zip)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.zip && <span className="text-red-500 text-sm">{errors.zip.message}</span>}
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="address2" className="block text-sm font-medium">Phone</label>
                            <input {...register("phone", getValidationRules().phone)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="address2" className="block text-sm font-medium">Email address</label>
                            <input {...register("email", getValidationRules().email)} className="w-full border border-[var(--border-color)] p-4 rounded-[10px]" />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <textarea {...register("note")} placeholder="Additional information" className="mt-4 w-full border border-[var(--border-color)] p-4 rounded" />
                        {/* {errors.note && <span className="text-red-500 text-sm">{errors.note.message}</span>} */}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-4/5 p-6 rounded">
                    <h2 className="text-2xl font-medium mb-6">Product</h2>
                    <ul className="space-y-2">
                        {cart.map((item) => (
                            // <li key={item.slug} className="flex justify-between">
                            <li key={item.id} className="flex justify-between">
                                <span>{item.title} × {item.qty}</span>
                                {/* <span>Rs. {(item.price * item.qty).toLocaleString()}</span> */}
                                <span>Rs. {((typeof item.price === 'string' ? Number(item.price.replace(/[^\d.]/g, '')) : Number(item.price)) * item.qty).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-4" />
                    <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span>Rs. {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-[var(--color-primary)] mt-2">
                        <span>Total</span>
                        <span>Rs. {total.toLocaleString()}</span>
                    </div>

                    {/* Payment Options */}
                    {isLoading ? <div className="mt-6 space-y-4">
                        <div className="animate-pulse">
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>
                        </div>
                    </div> : paymentMethodTypesData && paymentMethodTypesData?.length > 0 && paymentMethodTypesData?.map((item, index) => (
                        <div key={item.id || index} className="mt-6 space-y-4">
                            <label className="flex items-start gap-2">
                                <input type="radio" {...register("paymentMethod", { required: true })} value={item.id} defaultChecked />
                                <span className="text-sm">
                                    <strong>{item.methodName}</strong><br />
                                    {/* Make your payment directly into our bank account. Order will be shipped after payment clears. */}
                                </span>
                            </label>

                            {/* <label className="flex items-center gap-2">
                                <input type="radio" {...register("paymentMethod", { required: true })} value="card" />
                                Credit Card/Debit Card
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" {...register("paymentMethod", { required: true })} value="cod" />
                                Cash On Delivery
                            </label> */}
                        </div>
                    ))}

                    <p className="text-sm text-gray-600 mt-4">
                        Your personal data will be used to support your experience throughout this website, manage access to your account, and for other purposes described in our <Link href="#" className="underline">privacy policy</Link>.
                    </p>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="mt-6 w-full py-3 bg-[var(--bg-color-buttons)] text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Placing Order..." : "Place order"}
                    </button>
                </div>
            </form>
            )}
        </section>
    );
}
