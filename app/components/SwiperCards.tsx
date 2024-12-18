"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import type SwiperType from "swiper"

interface Item {
  src ?: string;
  card: any;
}

interface SwiperCardsProps {
  items: Item[];
  paginationImages: boolean;
  className?: string;
  slidesPerView?: number;
}

const SwiperCards = ({ items, paginationImages, className = "", slidesPerView = 1 }: SwiperCardsProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7));
    }, 110);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        setProgress(0);
      });
    }
  }, [swiper]);

  return (
    <div className='flex flex-col gap-4'>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        onSwiper={(swiper) => setSwiper(swiper)}
        className={`w-full h-96 ${className}`}
      >
        {items.map(({ card }, idx) => (
          <SwiperSlide key={idx}>{card}</SwiperSlide>
        ))}
      </Swiper>
      <div className='flex items-center gap-4'>
        {paginationImages &&
          items.map(({ src }, idx) => (
            <div
              key={idx}
              onClick={() => swiper?.slideTo(idx)}
              className='relative cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:opacity-60 duration-200 rounded-xl overflow-hidden max-w-md w-full h-40'
            >
              {swiper?.realIndex === idx && (
                <div
                  style={{ width: `${progress}%` }}
                  className='duration-150 absolute w-0 h-full bg-gray-600 opacity-50 z-10'
                ></div>
              )}
              <Image alt={"image-pagination"} src={src || ""} fill className='object-cover' />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SwiperCards;
