"use client"

import Image from 'next/image'
import Link from 'next/link'

import AddToCartOverlay from './AddToCartOverlay'
import { useState } from 'react'

export default function ProductCard({  images = [], title, subtitle, price, originalPrice, discount, slug = '#', viewMode = 'grid', id = '#', categoryId = '#' }) {
  const [hover, setHover] = useState(false)

  // console.log("images", images)
  
  if (viewMode === 'list') {
    return (
      <div className="flex bg-[#F4F5F7] hover:shadow-xl transition-shadow rounded-lg overflow-hidden h-48">
        <div
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative w-64 h-full flex-shrink-0"
        >
          {/* <Link href={`/straps/${slug}`}> */}
          <Link href={`/categories/${categoryId}/products/${id}`}>
            <Image
              src={images[0]}
              alt={title}
              fill
              className="relative w-full h-full z-20 object-cover"
            />
          </Link>

          {hover && (<AddToCartOverlay 
             onAddToCart={() => ({
              slug,
              id,
              title,
              price,
              quantity: 1,
              image: images[0],
            })}
             />
          )}

          {discount && (
            <span className="absolute top-3 right-3 bg-color-discount color-White text-xs font-semibold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            {/* <Link href={`/straps/${slug}`}> */}
            <Link href={`/categories/${categoryId}/products/${id}`}>
              <h3 className="font-semibold text-xl text-gray-800 mb-2 hover:text-blue-600 transition-colors">{title}</h3>
            </Link>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{subtitle}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">Rs {price}</span>
              {originalPrice && (
                <span className="line-through text-sm text-gray-400">Rs {originalPrice}</span>
              )}
            </div>
            
            {/* <div className="flex items-center space-x-2">
              <Link href={`/straps/${slug}`}>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </Link>
            </div> */}
          </div>
          
        </div>
      </div>
    )
  }

  return (
    <div className="block overflow-hidden bg-[#F4F5F7] hover:shadow-xl transition-shadow">
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative w-full h-72"
      >
        {/* <Link href={`/straps/${slug}`}> */}
        <Link href={`/categories/${categoryId}/products/${id}`}>
          <Image
            src={images[0]}
            alt={title}
            fill
            className="relative w-full h-full z-20 object-cover"
          />
        </Link>

        {hover && (<AddToCartOverlay 
           onAddToCart={() => ({
            slug,
            id,
            title,
            price,
            quantity: 1,
            image: images[0],
          })}
           />
      )}

        {discount && (
          <span className="absolute top-4 right-8 bg-color-discount color-White text-xs font-semibold px-2 py-4 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* <Link href={`/straps/${slug}`}> */}
      <Link href={`/categories/${categoryId}/products/${id}`}>
        <div className="p-4 flex flex-col items-start">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-2">{subtitle}</p>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">Rs {price}</span>
            {originalPrice && (
              <span className="line-through text-sm text-gray-400">Rs {originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}  
