"use client"

import { useState } from "react";
import InvoiceModal from "./InvoiceModal";
import dayjs from "dayjs";

export function OrderCard({ order }) {
// export function OrderCard({ orderDate, orderNumber, total, deliveringTo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewInvoice = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };
    // console.log("order", order);
    return (
      <>
        <article className="rounded-2xl border border-border">
          <header className="grid grid-cols-1 gap-4 bg-muted/60 p-6 md:grid-cols-18 md:items-end md:gap-6">
            <div className="md:col-span-5">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="mt-1 text-base font-medium">
                {order?.createdOn ? dayjs(order.createdOn).format('DD MMM YYYY') : ''}
              </p>
            </div>

            <div className="md:col-span-6">
              <p className="text-sm text-muted-foreground">Order # {order.orderNumber}</p>
              <div className="mt-2 flex gap-5 text-sm">
                {/* <a href="#" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  View Details
                </a> */}
                <button 
                  onClick={handleViewInvoice}
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground cursor-pointer"
                >
                  View Invoice
                </button>
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="mt-1 text-lg font-semibold">Rs {order.total}</p>
            </div>

            <div className="md:col-span-3">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="mt-1 text-base font-medium">{order.paymentMethod ?? "Cash on Delivery"}</p>
            </div>
          </header>
    
          <div className="h-15 rounded-b-2xl bg-card p-4" aria-hidden="true" >
            <p className="text-sm text-muted-foreground">Tracking ID: {order.trackingId ?? "33464636464634"}</p>
          </div>
        </article>

        <InvoiceModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          order={order} 
        />
      </>
    )
  }
  