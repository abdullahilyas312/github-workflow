"use client";
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { BiSolidTrashAlt } from "react-icons/bi";
import Breadcrumbs from '@/components/ui/Breadcrums';

export default function CartPage() {
  const { cart = [], removeFromCart } = useCart();

  const calculateTotal = () => {
    // return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'string' 
        ? Number(item.price.replace(/[^\d.]/g, ''))
        : Number(item.price);
      return sum + price * item.qty;
    }, 0);
  };
  // console.log("cart", cart);
  const checkoutcarddata = [
    { label: 'Subtotal', value: `Rs. ${calculateTotal().toLocaleString()}` },
    { label: 'Total', value: `Rs. ${calculateTotal().toLocaleString()}` },
  ]


  const BreadcrumbsItem = [
    { label: 'Home', href: ROUTES_CONSTANTS.HOME },
    { label: 'Cart', href: ROUTES_CONSTANTS.CART },
  ]

  return (
    <div className="max-w-7xl mx-auto pt-40 pb-16 px-4">
      <h1 className="text-5xl text-center font-medium mb-2">Cart</h1>
      <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
      {!cart?.length ? (
        <div className="flex flex-col items-center justify-center h-64 p-4">
          <p>Your cart is empty.</p>
          <Link href={ROUTES_CONSTANTS.STRAPS}>
            <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mt-4">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div className='w-full grid grid-cols-1 md:grid-cols-3 items-start gap-8'>
          <div className="md:col-span-2">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="bg-[#f9f1e7] text-black">
                  <th className="p-4">Image</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="p-4">
                      <div className="w-24 h-24 rounded bg-[#f3ebd9] overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{item.title}</td>
                    {/* <td className="p-4 text-gray-600">Rs. {item.price.toLocaleString()}</td> */}
                    <td className="p-4 text-gray-600">Rs. {(typeof item.price === 'string' ? Number(item.price.replace(/[^\d.]/g, '')) : item.price).toLocaleString()}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        readOnly
                        className="w-12 border border-gray-300 rounded px-2 py-1 text-center"
                      />
                    </td>
                    {/* <td className="p-4 text-gray-600">Rs. {(item.price * item.qty).toLocaleString()}</td> */}
                    <td className="p-4 text-gray-600">Rs. {((typeof item.price === 'string' ? Number(item.price.replace(/[^\d.]/g, '')) : item.price) * item.qty).toLocaleString()}</td>
                    <td className="p-4">
                      {/* <button className='cursor-pointer' onClick={() => removeFromCart(item.slug)}> */}
                      <button className='cursor-pointer' onClick={() => removeFromCart(item.id)}>
                        <BiSolidTrashAlt className="text-red-500 w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#f9f1e7] h-fit mt-4 flex flex-col justify-between p-6">
            <h2 className="text-xl text-center font-bold mb-6">Cart Totals</h2>
            <div className="bg-[#f9f1e7] p-6">
              <div className="flex flex-col justify-between mb-2">
                {checkoutcarddata.map((item, index) => (
                  <div key={index} className="flex justify-between w-full mb-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
              <Link href={ROUTES_CONSTANTS.CHECKOUT} className="w-full text-center">
                <button className="border-[var(--color-buttons)] text-sm font-medium cursor-pointer text-white hover:bg-[var(--bg-color-buttons)] hover:text-[var(--color-White)] transition-all w-full bg-teal-500  py-3 rounded transitionm">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



