"use client"
import Link from "next/link"
import { ProfileTabs } from "@/components/ui/profile-tabs"
import { OrderCard } from "@/components/ui/order-card"
import { AuthGuard } from "@/components/ui/AuthGuard"
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";
import Breadcrums from "@/components/ui/Breadcrums";
import { useQuery } from "@tanstack/react-query";
import { getPastOrders } from "@/DAL/orders";
import { useUser } from "@/context/UserContext";
import { BUSINESS_ID } from "@/config/config";

export default function OrdersPage() {

    const BreadcrumbsItem = [
        { label: "Home", href: ROUTES_CONSTANTS.HOME },
        { label: "Profile", href: ROUTES_CONSTANTS.PROFILE },
        // { label: "Orders", href: ROUTES_CONSTANTS.ORDERS },
    ];
    
    const { user } = useUser();
    
    
    const {
      data: pastOrders,
      isLoading,
      isError,
      error,
    } = useQuery({
      // queryKey: [QUERY_CONSTANTS.ACCOUNT_HEAD],
      queryKey: ["pastOrders", user?.id],
      // queryKey: ["pastOrders"],
      queryFn: () => getPastOrders(BUSINESS_ID, user?.id),
      enabled: !!user?.id, 
    });

  const pastOrdersData = pastOrders?.data;
  // console.log("pastOrdersData", pastOrdersData);

  if (isLoading) {
    return (
      <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  return (
    <AuthGuard>
      <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-10 font-poppins">
        <div className="w-full py-5 px-10 flex flex-col items-center">
            <h1 className="text-5xl text-center font-medium text-black">Profile</h1>
            <Breadcrums BreadcrumbsItem={BreadcrumbsItem} />
        </div>

        <section className="flex items-center justify-center">
          <ProfileTabs active="orders" />
        </section>
        {pastOrdersData && pastOrdersData.length > 0 && pastOrdersData.map((order, index) => (
          <section className="mt-2" key={index}>
            <OrderCard order={order} />
          </section>
        ))}
      </section>
    </AuthGuard>
  )
}
