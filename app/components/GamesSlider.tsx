import React from 'react'
import SwiperCards from './SwiperCards'
import Link from 'next/link'
import Image from 'next/image'
import AddToWishList from './AddToWishList'

const GamesSlider = ({games , title , slidesPerView=4, } : {games : any[] , title : string , slidesPerView?:number}) => {
    
  return (
    <div>
        <div className='mt-14 h-full flex flex-col gap-6'>
            <h1 className='text-white text-2xl lg:text-4xl'> {title}</h1>
            <SwiperCards className='h-full' slidesPerView={slidesPerView} paginationImages={false} items={
            games.map((game : any)=> {
                return ({
                card : (
                <div  key={game.name} className='group relative'>
                    <div className=' after:w-0 group-hover:after:w-full after:absolute after:inset-0 after:h-full after:bg-rose-500/60 after:rounded-2xl after:duration-300  w-full h-96 rounded-2xl overflow-hidden relative'>
                    <Image className='object-cover group-hover:scale-125 group-hover:rotate-6 duration-150' fill src={game.background_image} alt={game.name}/>
                    </div>
                    <Link href={`/game/${game.id}`} className='text-base text-white font-semibold mt-2 line-clamp-1'>{game.name}</Link>
                    <div className='absolute top-2 left-4 cursor-pointer'>
                      <AddToWishList plus gameId={game.id.toString()}/>
                    </div>
                </div>
                )
                }
                )
            })}/>
        </div>
    </div>
  )
}

export default GamesSlider
