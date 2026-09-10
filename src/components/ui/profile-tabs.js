"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ROUTES_CONSTANTS } from "@/constants/routesConstants"

export function ProfileTabs({ active = "orders" }) {
  const base = "inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm transition-colors"
  const inactive = "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
  const activeCls = "border-brand text-brand bg-[color-mix(in_oklab,var(--color-brand)_8%,white)]"

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Link
        href={ROUTES_CONSTANTS.ORDERS}
        className={cn(base, active === "orders" ? activeCls : inactive)}
        aria-current={active === "orders" ? "page" : undefined}
      >
        Past Orders
      </Link>
      <Link 
        href={ROUTES_CONSTANTS.FAVOURITES} 
        className={cn(base, active === "favourites" ? activeCls : inactive)}
        aria-current={active === "favourites" ? "page" : undefined}
        // onClick={(e) => {
        //   e.preventDefault();
        //   // TODO: Implement favourites page
        //   // console.log("Favourites page not implemented yet");
        // }}
      >
        Favourites
      </Link>
      {/* <Link href="#" className={cn(base, active === "account" ? activeCls : inactive)}>
        Account Info
      </Link> */}
      <Link 
        href={ROUTES_CONSTANTS.SETTINGS} 
        className={cn(base, active === "settings" ? activeCls : inactive)}
        aria-current={active === "settings" ? "page" : undefined}
        // onClick={(e) => {
        //   e.preventDefault();
        //   // TODO: Implement settings page
        //   // console.log("Settings page not implemented yet");
        // }}
      >
        Settings
      </Link>
    </div>
  )
}
