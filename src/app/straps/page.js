"use client";

import OurProductSection from "@/components/ui/OurProductSection";
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'
import Breadcrumbs from "@/components/ui/Breadcrums";


import testImg from '@/assets/ProductImages/1/ProImg1.jpg';

const Straps = () => {
    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'Straps', href: ROUTES_CONSTANTS.STRAPS },
      ]

    return (
        <section className="w-full pt-20 bg-color-White font-poppins">
            <main className="w-full py-16 px-4 text-center">
                <h2 className="text-5xl font-medium mb-2">{BreadcrumbsItem[1].label}</h2>
                <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
            </main>
            <OurProductSection filtering={true}/> 
        </section>
    );
}

export default Straps;