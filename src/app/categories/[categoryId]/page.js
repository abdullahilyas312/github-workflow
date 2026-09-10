"use client";

import OurProductSection from "@/components/ui/OurProductSection";
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'
import Breadcrumbs from "@/components/ui/Breadcrums";
import { useCategory } from '@/context/CategoryContext';

import { use } from 'react';

const Categories = ({ params }) => {
  const { categoryId } = use(params);
  const { selectedCategory } = useCategory();
  
  const categoryName = selectedCategory?.name || 'Categories';

  const BreadcrumbsItem = [
    { label: 'Home', href: ROUTES_CONSTANTS.HOME },
    { label: categoryName, href: ROUTES_CONSTANTS.CATEGORIES },
  ]

    return (
        <section className="w-full pt-20 bg-color-White font-poppins">
            <main className="w-full py-16 px-4 text-center">
                <h2 className="text-5xl font-medium mb-2">{categoryName}</h2>
                <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
            </main>
            <OurProductSection 
                filtering={true} 
                categoryId={categoryId}
                categoryName={categoryName}
            /> 
        </section>
    );
}

export default Categories;