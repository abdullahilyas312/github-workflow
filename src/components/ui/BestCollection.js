// components/WatchSliderSection.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import '@/styles/carouselAndSlider.css';

import Image from "next/image";
import bestCollection from "@/data/objects/BestCollectionsWatches";
import { BsArrowRight } from "react-icons/bs";
import clsx from "clsx";

export default function WatchSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between h-[70vh] gap-6 px-6 py-12">
      <div className="max-w-7xl flex flex-col md:flex-row items-start justify-between gap-6 mx-auto">
        <div className="md:w-1/3 flex flex-col gap-4">
          <h2 className="text-3xl font-bold leading-tight">
            50+ Beautiful Watches inspiration
          </h2>
          <p className="color-gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut el.
          </p>
          <button className="bg-color-buttons hover:border-[var(--color-buttons)] text-white px-5 py-2 w-max">
            Explore More
          </button>
        </div>

        <div className="relative md:w-2/3 w-full">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={2.5}
            loop={true}
            spaceBetween={24}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.green-custom-pagination',
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} green-custom-bullet"></span>`;
              },
            }}
          >
            {bestCollection.map((slide, index) => (
              <>
              <SwiperSlide key={slide.id}>
                <div
                  className={`transition-all duration-500 overflow-hidden shadow-md ${
                    index === activeIndex ? "h-[480px]" : "h-[320px]"
                  }`}
                >
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                  />
                  {index === activeIndex ? (
                    <div className="transition-all duration-500 absolute bottom-4 left-4 flex item-end justify-end">
                      <div className=" bg-color-White border border-white px-4 py-5">
                        <p className="text-sm text-gray-500">{slide.caption}</p>
                        <h3 className="font-semibold text-xl">{slide.title}</h3>
                      </div>
                      <div className="bg-color-buttons cursor-pointer color-White h-fit self-end p-2">
                        <BsArrowRight className="text-2xl" />
                      </div>
                    </div>
                  ) : ""}
                </div>
              </SwiperSlide>
              <div className="absolute bottom-4 left-1/2 z-50">
                <div className="green-custom-pagination flex gap-4"></div>
             </div>
              </>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
