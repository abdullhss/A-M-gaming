"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MotionItem from './defaults/MotionItme'
import { GoPeople } from 'react-icons/go'
const ImageSwitcher = ({images , game} : {images : any[] , game:any}) => {

  const [activeIndex ,setActiveIndex ] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=>{
      setActiveIndex(a => (1+a ) % images.length)
    } , 1000) 

    return ()=>clearInterval(t) ;
  } , [game , images.length])

  return (
    <div className='flex flex-col gap-4 py-3 px-8 rounded-xl bg-[#888] overflow-hidden'>
      <div className='flex items-center gap-2 justify-between text-rose-500 font-semibold'>
        <h1>{game.name}</h1>
        <p className='text-sm mt-1'>{game.released}</p>
      </div>
      <div className='w-80 h-36 rounded-xl overflow-hidden relative '>
        {images.map((image , index)=>(
                <MotionItem
                  key={image.id} 
                  initial={{opacity : 0}}
                  animate={{opacity : activeIndex === index ? 1 : 0}}
                  className='absolute inset-0 '
                  >

                  <Image alt={`game screenshots`} fill src={image.image} className='object-cover rounded-xl'/>
                </MotionItem>
        ))}
      </div>
      <p className='text-lg font-semibold flex items-center gap-2 text-rose-500'>
        <GoPeople/>
        {game.reviews_count}
      </p>
    </div>
  )
}

export default ImageSwitcher
