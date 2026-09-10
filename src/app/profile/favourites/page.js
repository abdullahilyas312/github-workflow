import Link from "next/link"
import { ProfileTabs } from "@/components/ui/profile-tabs"
import { OrderCard } from "@/components/ui/order-card"
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";
import Breadcrums from "@/components/ui/Breadcrums";

export default function OrdersPage() {

    const BreadcrumbsItem = [
        { label: "Home", href: ROUTES_CONSTANTS.HOME },
        { label: "Profile", href: ROUTES_CONSTANTS.PROFILE },
        // { label: "Orders", href: ROUTES_CONSTANTS.ORDERS },
    ];
  return (
    //   <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-10 font-poppins">
      {/* <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">Profile</h1>
        <nav className="mt-3 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link href="#" className="hover:underline">
                Profile
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-60">
              /
            </li>
            <li className="text-foreground">Orders</li>
          </ol>
        </nav>
      </header> */}
            <div className="w-full py-5 px-10 flex flex-col items-center">
                <h1 className="text-5xl text-center font-medium text-black">Profile</h1>
                <Breadcrums BreadcrumbsItem={BreadcrumbsItem} />
            </div>

      <section className="flex items-center justify-center">
        <ProfileTabs active="favourites" />
      </section>

      <section className="mt-2">
        {/* <OrderCard orderDate="09-02-2024" orderNumber="4858–35424–2323" total="1000 Rs" deliveringTo="Irfan Ahmed" /> */}
      </section>

    </section>
    // </main>
  )
}
