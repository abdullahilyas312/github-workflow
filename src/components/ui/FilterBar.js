'use client'

import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { PiCirclesFourFill } from "react-icons/pi";
import { LuGalleryVertical } from "react-icons/lu";
import { getAllProducts } from "@/DAL/products";
import { useQuery } from "@tanstack/react-query";

export default function FilterBar({ productData, viewMode, setViewMode, pageSize, setPageSize, pageNumber, setPageNumber, sort, setSort }) {


    const handleSort = (type, value) => {
        // console.log("type", type)

        if (type === 'sort' && value === 'price-asc') {
            setSort('lowPrice')
        }
        if (type === 'sort' && value === 'price-desc') {
            setSort('highPrice')
        }
        if (type === 'sort' && value === 'title') {
            setSort('title')
        }
        if (type === 'pageSize' && value) {
            setPageSize(value)
        }
    }



    return (
        <main className="w-full py-10 px-5 bg-[#F9F1E754] flex items-center justify-evenly mb-8">
            <div className="flex items-center gap-8">
                <div className="flex text-black items-center gap-7">
                    {/* <button onClick={() => handleSort('sort', 'price-asc')} className="text-sm flex items-center justify-center cursor-pointer">
                        <HiOutlineAdjustmentsHorizontal className="text-2xl" />
                        <span className="ml-2 text-lg">Filter</span>
                    </button> */}
                    {/* <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1"> */}
                        <button 
                            onClick={() => setViewMode('grid')} 
                            className={`p-2 rounded cursor-pointer transition-colors ${
                                viewMode === 'grid' ? 'bg-gray-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            title="Grid View"
                        >
                            <PiCirclesFourFill className="text-xl" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')} 
                            className={`p-2 rounded cursor-pointer transition-colors ${
                                viewMode === 'list' ? 'bg-gray-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            title="List View"
                        >
                            <LuGalleryVertical className="text-xl" />
                        </button>
                    {/* </div> */}
                </div>
                <div className="p-1 px-8 border-l-2 border-[#9F9F9F] ">
                    <span className="mx-1">Showing {productData.length} results</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm">Show</span>
                    <select defaultValue={pageSize} onChange={(e) => handleSort("pageSize",e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm">
                        {Array.from({ length: 5 }, (_, i) => (i + 1) * 20).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm">Sort by</span>
                    <select onChange={(e) => handleSort("sort",e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm">
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
        </main>
    )
}
