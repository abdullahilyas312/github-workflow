"use client";
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'
import Link from "next/link";
import Image from "next/image";
// import { BiSolidTrashAlt } from "react-icons/bi";
import Breadcrumbs from '@/components/ui/Breadcrums';
import Faq from '@/components/ui/Faq';
import { faqs } from '@/data/objects/faqs';


export default function FaqPage() {
    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'Faqs', href: ROUTES_CONSTANTS.FAQ },
    ]
    return (
        <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-16 font-poppins">
            <div className="w-full py-5 px-10 flex flex-col items-center">
                <h1 className="text-5xl text-center font-medium">Frequently Asked Questions</h1>
                <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
            </div>
            
            <div className="w-full max-w-6xl">
                <Faq faqs={faqs} />
            </div>
        </section>
    )
}