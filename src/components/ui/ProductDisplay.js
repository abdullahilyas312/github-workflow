'use client';

import Image from "next/image";
import { notFound } from "next/navigation";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useState, useRef } from "react";
import { use } from 'react';
import AddToCartButton from "@/components/ui/AddToCartButton";
import { IMAGE_BASE_URL } from "@/config/config";

export default function ProductDisplay({ params , productData}) {
  // const { slug } = use(params);
  // const product = products.find((item) => item.slug === slug);

  const product = productData?.productDto;
  const productDetails = productData?.productDetailsDto;
  // const productImages = [productData?.productDetailsDto.coverImage, ...productData?.productDetailsDto.productImages];

  const productImages = [
    productData?.productDetailsDto?.coverImage,
    ...(productData?.productDetailsDto?.productImages || [])
  ];
  
  // Filter images
  const imageFiles = productImages.filter(
    item => item?.fileType?.startsWith("image/")
  );
  
  // Filter videos
  const videoFiles = productImages.filter(
    item => item?.fileType?.startsWith("video/")
  );


  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(imageFiles[0] ? `${IMAGE_BASE_URL}/${imageFiles[0]?.imageUrl}` : '');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const videoRefs = useRef([]);

  const handleImageHover = (imageIndex) => {
    // Pause all videos when hovering over images
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    setSelectedImage(`${IMAGE_BASE_URL}/${imageFiles[imageIndex]?.imageUrl}`);
    setSelectedVideo(null);
    setIsVideoSelected(false);
  };

  const handleVideoHover = (idx) => {
    const video = videoRefs.current[idx];
    // console.log("video element", video);
    if (video) {
      video.play().catch(error => {
        // console.error("Error playing video:", error);
      });
    }
    
    // Calculate the actual video file index
    const videoFileIndex = idx - imageFiles.length;
    setSelectedVideo(`${IMAGE_BASE_URL}/${videoFiles[videoFileIndex]?.imageUrl}`);
    setIsVideoSelected(true);
  };

  const handleVideoLeave = (idx) => {
    // console.log("handleVideoLeave", idx);
    const video = videoRefs.current[idx];
    if (video) {
      video.pause();
      video.currentTime = 0; 
    }
  };

  const handleMouseLeave = () => {
    // Pause all videos when mouse leaves
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // Reset to first image when mouse leaves
    setSelectedImage(imageFiles[0] ? `${IMAGE_BASE_URL}/${imageFiles[0]?.imageUrl}` : '');
    setSelectedVideo(null);
    setIsVideoSelected(false);
  };


  return (
    <div className="max-w-7xl grid md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="flex gap-4 w-full items-start justify-center">
        <div className="flex flex-col space-y-4" onMouseLeave={handleMouseLeave}>
          {/* {product?.image?.map((img, idx) => ( */}
          {imageFiles?.map((img, idx) => (
            <div key={idx} onMouseEnter={() => handleImageHover(idx)} className="w-16 h-16 overflow-hidden cursor-pointer rounded-md">
              <Image src={`${IMAGE_BASE_URL}/${img?.imageUrl}`} alt={product.productName} width={100} height={100} className="object-cover w-full h-full" />
            </div>
          ))}
          {videoFiles?.map((video, idx) => {
            const videoIndex = imageFiles.length + idx; // Offset by imageFiles length
            return (
            <div 
              key={videoIndex} 
              onMouseEnter={() => handleVideoHover(videoIndex)}
              onMouseLeave={() => handleVideoLeave(videoIndex)}
              className="relative w-16 h-16 overflow-hidden cursor-pointer rounded-md"
            >
              <video
                ref={(el) => videoRefs.current[videoIndex] = el}
                src={`${IMAGE_BASE_URL}/${video?.imageUrl}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
                preload="metadata"
                muted
                loop
              />
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 pointer-events-none">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center" style={{ background: "rgba(255, 255, 255, 0.7)" }}>
                  <div className="w-0 h-0 border-l-[8px] border-y-[6px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
          {isVideoSelected && selectedVideo ? (
            <video 
              src={selectedVideo} 
              width={1000} 
              height={500} 
              className="object-cover w-full h-full" 
              controls 
              autoPlay
              muted
              loop
              preload="metadata"
            />
          ) : selectedImage ? (
            <Image src={selectedImage} width={1000} height={500} alt={product.productName} className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full flex flex-col items-start justify-start space-y-6">
        <h1 className="text-4xl font-semibold text-gray-900">{product.productName}</h1>
        <p className="text-2xl text-gray-400">Rs. {product.retailPrice}</p>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div>⭐⭐⭐⭐⭐½</div>
          <span>| 5 Customer Review</span>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          {productDetails.description}
        </p>

        {/* <div className="space-y-2">
          <h4 className="text-sm text-gray-700">Size</h4>
          <div className="flex gap-3">
            {product.size.map((size) => (
              <button key={size} className="px-3 py-1 cursor-pointer border rounded bg-[#F9F1E7]">{size}</button>
            ))}
          </div>
        </div> */}

        {/* <div className="space-y-2">
          <h4 className="text-sm text-gray-700">Color</h4>
          <div className="flex gap-4">
            {product.color.map((color, i) => (
              <span key={i} className={`w-6 h-6 rounded-full cursor-pointer border ${color}`}></span>
            ))}
          </div>
        </div> */}

        <div className="flex items-center gap-4">
          <div className="flex border px-2 py-3 rounded-md">
            <button className="px-3">-</button>
            <span className="px-3">1</span>
            <button className="px-3">+</button>
          </div>
          <AddToCartButton
            bgColor="bg-[var(--bg-color-buttons)]"
            textcolor="text-[var(--color-White)]"
            onAddToCart={() => ({
              slug: product.slug,
              id: product.id,
              title: product.productName,
              price: product.retailPrice,
              qty: 1,
              image: selectedImage,
            })}
          />
          {/* <button className="border border-black px-6 py-3 rounded-md font-medium">+ Compare</button> */}
        </div>

        <div className="w-full flex flex-col mt-10 pt-8 border-[#D9D9D9] border-t text-sm space-y-2 text-gray-600">
          <div className="flex items-center justify-start">
            <p className="w-1/6 p-2 text-[#9F9F9F]">
              SKU:
            </p>
            <span className="text-[#9F9F9F] p-2 w-1/2 font-medium">
              {product.sku}
            </span>
          </div>
          <div className="flex items-center justify-start">
            <p className="w-1/6 p-2 text-[#9F9F9F]">
              Category:
            </p>
            <span className="text-[#9F9F9F] p-2 w-1/2 font-medium">
              {product.categoryName}
            </span>
          </div>
          {/* <div className="flex items-center justify-start">
            <p className="w-1/6 p-2 text-[#9F9F9F]">
              Tags:
            </p>
            <span className="text-[#9F9F9F] p-2 w-1/2 font-medium">
              {product.tags}
            </span>
          </div> */}
          <div className="flex items-center justify-start">
            <p className="w-1/6 p-2 text-[#9F9F9F]">
              Share:
            </p>
            <span className="flex items-center gap-4 p-2 w-1/2 font-medium">
              <FaFacebookF className="w-4 h-4" />
              <FaLinkedinIn className="w-4 h-4" />
              <FaTwitter className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
