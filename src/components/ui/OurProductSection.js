'use client'

import { useState } from "react"
import ProductCard from "@/components/ui/ProductCard";
import FilterBar from "@/components/ui/FilterBar"
import Link from "next/link";
import { ROUTES_CONSTANTS } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/DAL/products";
import { IMAGE_BASE_URL, BUSINESS_ID } from "@/config/config";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getAllProductsByCategory , getAllProductsByGender } from "@/DAL/products";


export default function OurProductSection({ heading = "Our Product", show = false, filtering = false, categoryId, categoryName, gender, setCategoryName }) {

  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState("lowPrice");
  const [viewMode, setViewMode] = useState("grid"); 

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", pageSize, sort, filtering ? categoryId : gender],
    queryFn: ({ pageParam = 1 }) => {
      if (filtering) {
        return getAllProductsByCategory(pageSize, pageParam, sort, BUSINESS_ID, categoryId);
      } else {
        return getAllProductsByGender(pageSize, pageParam, gender);
      }
    },
    getNextPageParam: (lastPage) => {
      // Check if there are more pages based on your API response structure
      const totalPages = lastPage?.data?.totalPages;
      const currentPage = lastPage?.data?.pageNumber || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !filtering || !!categoryId || !!gender,
  });

  // Flatten all pages into a single array
  const filteredData = data?.pages?.flatMap(page => page?.data?.content || []) || [];

  const showMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  return (
    <section className="w-full py-16 text-center font-poppins">
      {show && (
        <h2 className="text-4xl font-medium mb-2">{heading}</h2>
      )}
      {filtering && categoryName && (
        <h2 className="text-4xl font-medium mb-2">{categoryName} Products</h2>
      )}
      {filtering && (
        <FilterBar 
          productData={filteredData} 
          viewMode={viewMode}
          setViewMode={setViewMode}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sort={sort}
          setSort={setSort}
        />
      )}
      {isLoading && (
        <section className="font-poppins w-full flex flex-col gap-10 items-center justify-center mx-auto pt-40 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </section>
      )}
      {isError && (
        <div className="text-center py-8">
          <p className="text-red-500">Error loading products: {error?.message}</p>
        </div>
      )}
      {!isLoading && !isError && (
        <div className={`max-w-6xl mx-auto mt-8 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
            : 'flex flex-col gap-4'
        }`}>
        {filteredData && filteredData.length > 0 ? filteredData.map((product) => {

          const productName = product.productName || product.title || product.name || "Unknown Product";
          const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          
          const images = product.productImageDtos?.filter((image) => image.type === "Cover Photo")?.map((image) => 
            image.imageUrl.startsWith('http') ? image.imageUrl : `${IMAGE_BASE_URL}/${image.imageUrl}`
          ) || [];          
          
          
          return (
            <ProductCard 
              key={product.id} 
              title={productName} 
              slug={slug} 
              id={product.id}
              images={images} 
              price={product.retailPrice || product.price} 
              originalPrice={product.basePrice || product.oldPrice}
              viewMode={viewMode}
              categoryId={categoryId ? categoryId : product.categoryId}
            />
          );
        }) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
        </div>
      )}
      <div className="mt-10">
        {show && hasNextPage && (
          <button 
            onClick={showMore} 
            disabled={isFetchingNextPage}
            className="px-14 py-2 border border-[var(--color-buttons)] text-sm font-medium cursor-pointer text-[var(--color-buttons)] hover:bg-[var(--bg-color-buttons)] hover:text-[var(--color-White)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetchingNextPage ? "Loading..." : "Show More"}
          </button>
        )}
      </div>
    </section>
  );
}
