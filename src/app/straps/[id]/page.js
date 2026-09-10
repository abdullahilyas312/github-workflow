'use client';

import Breadcrumbs from "@/components/ui/Breadcrums";
import { ROUTES_CONSTANTS } from '@/constants/routesConstants';
import { use } from 'react';
import ProductTabs from "@/components/ui/ProductTabs";
import ProductDisplay from "@/components/ui/ProductDisplay";
import ProductCard from "@/components/ui/ProductCard";
import OurProductSection from "@/components/ui/OurProductSection";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/DAL/products";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProductPage({ params }) {

  // const { slug } = use(params);
  // const product = products.find((item) => item.slug === slug);

  const { id } = use(params);

  
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    // queryKey: [QUERY_CONSTANTS.ACCOUNT_HEAD],
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  console.log("product", product?.data);

  // Show loader while data is loading
  if (isLoading) {
    return (
      <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
        {/* <div className="w-full py-5 px-10 bg-[#F9F1E7] flex items-center justify-start">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
        </div> */}
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
        <div className="w-full py-5 px-10 bg-[#F9F1E7] flex items-center justify-start">
          <Breadcrumbs BreadcrumbsItem={[
            { label: 'Home', href: ROUTES_CONSTANTS.HOME },
            { label: 'Straps', href: ROUTES_CONSTANTS.STRAPS },
            { label: 'Error', href: '#' },
          ]} />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
            <p className="text-gray-600">{error?.message || 'Something went wrong'}</p>
          </div>
        </div>
      </section>
    );
  }

  const BreadcrumbsItem = [
    { label: 'Home', href: ROUTES_CONSTANTS.HOME },
    { label: 'Straps', href: ROUTES_CONSTANTS.STRAPS },
    { label: product?.data?.productDto?.productName, href: `${ROUTES_CONSTANTS.STRAPS}/${product?.data?.productDto?.id}` },
  ];

  return (
    <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
      <div className="w-full py-5 px-10 bg-[#F9F1E7] flex items-center justify-start">
        <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
      </div>
      <ProductDisplay params={params} productData={product?.data} />
      {/* <ProductTabs image={product.image.slice(0, 2)} /> */}
      {/* <ProductTabs image={product?.data?.productDetailsDto?.productImages?.slice(0, 2)} /> */}
      {/* <OurProductSection heading = "Related Products" show = {true} productData = {products.slice(0, 4)} filtering = {false} /> */}
    </section>
  );
}
