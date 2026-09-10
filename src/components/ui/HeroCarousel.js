"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';

import { slidesData } from '@/data/objects/HeroData';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'


import '@/styles/carouselAndSlider.css';

const HeroCarousel = () => {
  return (
    <main className="relative font-poppins w-full overflow-hidden">
      <Swiper
        effect="fade"
        modules={[EffectFade, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
      >

        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className='relative w-full h-[90vh] px-10 bg-cover bg-center flex items-center justify-start'
              style={{ backgroundImage: `url(${slide.backgroundImage.src})` }}
            >
              <div className="relative bg-color-secondary flex flex-col items-start justify-start z-10 px-4 md:px-8 lg:px-16 lg:py-16 rounded-[10px] max-w-2xl">
                {slide.newArrival && (
                  <span className="inline-block color-gray py-1 px-2 rounded-md text-sm mb-2">
                    New Arrival
                  </span>
                )}
                <h2 className="text-3xl color-primary md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg color-gray leading-relaxed mb-6">{slide.description}</p>
                <button
                  className="bg-color-primary color-White font-bold py-3 px-6 text-lg transition duration-300"
                  onClick={() => (window.location.href = slide.buttonLink)}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="custom-pagination flex gap-4"></div>
      </div>
    </main>
  );
};

export default HeroCarousel;
