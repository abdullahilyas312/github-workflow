"use client"

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { IoIosCloseCircle } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";
import { ROUTES_CONSTANTS } from "@/constants";



export default function CartPopoverOverlay({ open, onClose }) {
  const { cart, removeFromCart } = useCart();
  const ref = useRef();
  const pathname = usePathname();


  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  useEffect(() => {
    // Close the overlay on route change
    onClose();
  }, [pathname, onClose]);

  // const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => {

    console.log("item", item.price, "acc", acc);

    // Handle both string and number price formats
    const price = typeof item.price === 'string' 
      ? Number(item.price.replace(/[^\d.]/g, ''))
      : Number(item.price);
    const quantity = Number(item.qty);
    if (isNaN(price) || isNaN(quantity)) return acc;
    return acc + price * quantity;
  }, 0);


  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute flex flex-col items-stretch justify-between right-6 top-16 min-h-[50vh] w-80 bg-white rounded-lg shadow-xl border border-blue-200 z-50 p-4 font-poppins"
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <div className=" flex flex-col">
          <h2 className="text-xl font-bold mb-2">Shopping Cart</h2>
          <hr className="mb-4 text-[#D9D9D9]" />
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <div className="overflow-y-auto h-70 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-md relative">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.qty} × {typeof item.price === 'string' ? Number(item.price.replace(/[^\d.]/g, '')).toLocaleString() : item.price.toLocaleString()}
                    </p>
                  </div>
                  {/* <button onClick={() => removeFromCart(item.slug)}> */}
                  <button onClick={() => removeFromCart(item.id)}>
                    <IoIosCloseCircle className="text-gray-400 w-5 h-5 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="w-full flex flex-col">
          <div className="flex justify-between mt-6 text-md font-semibold">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <Link
              href={ROUTES_CONSTANTS.CART}
              className={clsx(
                "w-1/2 text-center py-2 rounded-full border text-[var(--color-buttons)] font-semibold"
              )}
            >
              Cart
            </Link>
            <Link
              href={ROUTES_CONSTANTS.CHECKOUT}
              className={clsx(
                "w-1/2 text-center py-2 rounded-full bg-[var(--bg-color-buttons)] text-white font-semibold"
              )}
            >
              Checkout
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}



