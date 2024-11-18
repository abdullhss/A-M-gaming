import React from 'react'
import MaxWidthWrapper from './defaults/MaxWidthWrapper'
import SwiperCards from './SwiperCards'
import "swiper/css"
import Image from 'next/image'
import CardInfo from "./CardInfo"
const Hero = () => {
  return (
    <div className='mt-8 h-full'>
        <SwiperCards className=' h-[30rem]' paginationImages={true} items={[
            {card:
            <section className='relative rounded-2xl overflow-hidden w-full h-full'>
                <video autoPlay loop muted className='object-top  object-cover absolute inset-0 w-full  h-full' >
                    <source src='/spidervideo.mp4' type='video/mp4'/>
                </video>
                <CardInfo  textBtn='Find out more !' image='/news1title.webp' desc="Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5." title="BE GREATER TOGETHER"/>
            </section> , src:"/poster.webp" } , 
            
            {card:
                <section className='relative rounded-2xl overflow-hidden w-full h-full'>
                    <video autoPlay loop muted className='object-top object-cover absolute inset-0 w-full h-full' >
                        <source src='/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4' type='video/mp4'/>
                    </video>
                    <CardInfo btnClasses="bg-orange-600 hover:bg-orange-900" textBtn='Find out more !' image='/call-of-duty-black-ops-6-logo-01-en-21may24.webp' desc="Last chance to pre-order and get access to additional premium content. Call of Duty®: Black Ops 6 launches on October 25th" title="The truth lies"/>
                </section> , src:"/call-of-duty-black-ops-6-hero-desktop-01-en-21may24.webp" } , 
            {card:
                <section className='relative rounded-2xl overflow-hidden w-full h-full'>
                    <Image alt='Hero-photo' fill className='object-cover absolute w-full inset-0 h-full' src={"/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp"}/>
                    <CardInfo btnClasses="bg-white text-black hover:bg-yellow-400"  textBtn='Find out more !' image='/Dragon-Ball-Sparking-Zero-logo-01-03oct24.webp' desc="A legendary series has returned. Reach new levels of power in Dragon Ball: Sparking! Zero, out now on PS5" title="Shake the earth. Break the universe !"/>
                </section> , src:"/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp" } ,
            {card:
                <section className='relative rounded-2xl overflow-hidden w-full h-full'>
                    <video autoPlay loop muted className='object-top object-cover absolute inset-0 w-full  h-full' >
                        <source src='/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4' type='video/mp4'/>
                    </video>
                    <CardInfo btnClasses="bg-white text-black hover:bg-yellow-400" textBtn='Find out more !' image='/iconcyber.webp' desc="As cyber-enhanced mercenary V, join secret agent Solomon Reed to unravel a web of sinister political machinations." title="Freedom Always Comes At A Price…"/>
                </section> , src:"/cyb.webp" } 
                
        ]}/>
    </div>
  )
}

export default Hero
