"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getOrderItems } from "@/DAL/orders";
import { useUser } from "@/context/UserContext";

export default function InvoiceModal({ open, onClose, order }) {
  const ref = useRef();

  const { user } = useUser();

  // console.log("order", order);
  
  const {
    data: orderItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orderItems", order?.orderId],
    queryFn: () => getOrderItems(order?.orderId),
    enabled: !!order?.orderId && !!open, 
  });

  const orderItemsData = orderItems?.data;
  // console.log("orderItemsData", orderItemsData);

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
    // Prevent body scroll when modal is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open || !order) return null;

  // Debug: Log order structure to understand the data format
  // console.log("Order data structure:", order);

  // Calculate subtotal from order items - use fetched data or fallback to order.items
  const itemsToUse = orderItemsData || order.items || [];
  const subtotal = itemsToUse.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? Number(item.price.replace(/[^\d.]/g, ''))
      : Number(item.price);
    const quantity = Number(item.quantity || item.qty || 1);
    return acc + (price * quantity);
  }, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Order Invoice</h2>
              <p className="text-sm text-gray-600 mt-1">Order #{order.orderNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <IoClose size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{new Date(order.createdOn).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{order.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{order.paymentMethodTypeName || "Cash on Delivery"}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Address</h3>
                <div className="text-sm text-gray-600">
                  {order.orderAddress ? (
                    <div>
                      <p>{order.orderAddress.streetAddress},</p>
                      <p>{order.orderAddress.city},</p>
                      <p>{order.orderAddress.zip}, {order.orderAddress.state}</p>
                      <p>{order.orderAddress.country},</p>
                      <p>Phone: {order.orderAddress.phone}</p>
                    </div>
                  ) : (
                    <p>Address not available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Product
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-900">
                        Price
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-900">
                        Quantity
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-900">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                          Loading order items...
                        </td>
                      </tr>
                    ) : isError ? (
                      <tr>
                        <td colSpan="4" className="border border-gray-200 px-4 py-8 text-center text-red-500">
                          Error loading order items: {error?.message || 'Unknown error'}
                        </td>
                      </tr>
                    ) : itemsToUse && itemsToUse.length > 0 ? (
                      itemsToUse.map((item, index) => {
                        const price = typeof item.price === 'string' 
                          ? Number(item.price.replace(/[^\d.]/g, ''))
                          : Number(item.price);
                        const quantity = Number(item.quantity || item.qty || 1);
                        const itemSubtotal = price * quantity;
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex items-center space-x-3">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.productName || item.title}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{item.productName || item.title}</p>
                                  {item.variant && (
                                    <p className="text-xs text-gray-500">{item.variant}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-gray-900">
                              Rs {price.toFixed(2)}
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-gray-900">
                              {quantity}
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-900">
                              Rs {itemSubtotal.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                          No items found for this order
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <div className="max-w-sm ml-auto">
                <div className="space-y-2">
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">Rs {subtotal.toFixed(2)}</span>
                  </div>
                  {order.shipping && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">Rs {order.shipping.toFixed(2)}</span>
                    </div>
                  )}
                  {order.tax && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">Rs {order.tax.toFixed(2)}</span>
                    </div>
                  )} */}
                  {/* <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2"> */}
                  <div className="flex justify-between text-lg font-semibold pt-2">
                    <span>Total:</span>
                    <span>Rs {order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Close
            </button>
            {/* <button
              onClick={() => window.print()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Print Invoice
            </button> */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
