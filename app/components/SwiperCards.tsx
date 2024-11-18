"use client"

import Image from 'next/image'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import {Swiper , SwiperSlide} from "swiper/react"
import type SwiperType from "swiper" 

const SwiperCards = ({items , paginationImages , className=""} : {items: {src : string , card : ReactNode }[] , paginationImages:boolean , className?: string})  => {
    const [swiper , setSwiper] = useState<SwiperType | null>()
    const [progress , setProgress] = useState(0)

    
    useEffect(()=>{
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7))
        }, 110);
        return () => {clearInterval(interval)}
    } , [progress])


    useEffect(()=>{
        swiper?.on("slideChange" ,()=>{
            setProgress(0) 
        })
    } , [swiper])
    
    return (
        <div className='flex flex-col gap-4'>
            <Swiper
                modules={[Autoplay]}
                autoplay={{delay:3000}}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={()=>{console.log("change");}}
                onSwiper={(swiper)=>{setSwiper(swiper);}}
                className= {` w-full ${className} h-96`}
            >
                {items.map( ( {card} , idx) => {return(
                    <SwiperSlide key={idx}>{card}</SwiperSlide>
                )})}
            </Swiper>
            <div className='flex items-center gap-4 '>
                {paginationImages && items.map(({src} , idx )=> {return(
                    <div onClick={()=>{swiper?.slideTo(idx)}} className='relative cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:opacity-60 duration-200 rounded-xl overflow-hidden max-w-md w-full h-40' key={idx}>
                        {swiper?.realIndex === idx && (
                            <div style={{ width:`${progress}%`}} className=' duration-150 absolute w-0 h-full bg-gray-600 opacity-50 z-10'></div>
                        )}
                        <Image alt={"image-pagination"} src={src} fill className='object-cover'/>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default SwiperCards
