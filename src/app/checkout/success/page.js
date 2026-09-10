"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";
import Link from "next/link";
import Breadcrums from "@/components/ui/Breadcrums";

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear the cart when the success page loads
        clearCart();
    }, [clearCart]); // Now safe to use clearCart as dependency since it's memoized

    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'Checkout', href: ROUTES_CONSTANTS.CHECKOUT },
        { label: 'Success', href: ROUTES_CONSTANTS.CHECKOUT_SUCCESS },
    ];

    return (
        <section className="w-full mx-auto pt-40 pb-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <Breadcrums BreadcrumbsItem={BreadcrumbsItem} />
                
                {/* Success Icon */}
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg 
                            className="w-12 h-12 text-green-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Order Placed Successfully!
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                {/* Order Details Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">What happens next?</h2>
                    
                    <div className="space-y-4 text-left">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-blue-600 font-semibold text-sm">1</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Order Confirmation</h3>
                                <p className="text-gray-600">You will receive an email confirmation with your order details shortly.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-blue-600 font-semibold text-sm">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Processing</h3>
                                <p className="text-gray-600">Our team will prepare your order for shipment within 1-2 business days.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-blue-600 font-semibold text-sm">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Shipping</h3>
                                <p className="text-gray-600">You will receive tracking information once your order ships.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href={ROUTES_CONSTANTS.HOME}
                        className="px-8 py-3 bg-[var(--bg-color-buttons)] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                    
                    {/* <Link 
                        href={ROUTES_CONSTANTS.ORDERS}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                        View Order History
                    </Link> */}
                </div>

                {/* Support Information */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                        If you have any questions about your order, please don&apos;t hesitate to contact us.
                    </p>
                    <Link 
                        href="/contact" 
                        className="text-[var(--color-primary)] hover:underline font-medium"
                    >
                        Contact Support →
                    </Link>
                </div>
            </div>
        </section>
    );
}
