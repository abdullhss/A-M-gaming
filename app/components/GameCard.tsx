import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaPlaystation, FaSteam, FaXbox } from 'react-icons/fa'

import { HoverCardContent } from '@radix-ui/react-hover-card'
import AddToWishList from './AddToWishList'
import ImageSwitcher from './ImageSwitcher'

const GameCard = ({game , wishlist} : {game : any , wishlist? :boolean}) => {
  return (
    <HoverCard>
        <div className='flex relative flex-col items-start gap-4'>
            <HoverCardTrigger className='relative w-full opacity-85 cursor-pointer'>
                <div>
                    <div className='relative flex flex-col gap-2'>
                        <Link href={`/games/${game.id}`} className='w-full overflow-hidden h-64 relative rounded-xl'>
                            <Image className="object-cover" src={game.background_image} alt={game.name} fill />
                        </Link>
                        <Link href={`/games/${game.id}`} className='text-sm line-clamp-1 font-semibold text-white'>
                            {game.name}
                        </Link>
                        <div className='mt-2 flex items-center gap-1'>
                            {game.parent_platforms.map((platform : any , i:any)=>(
                                <p key={`${platform.id}-${i}`}>
                                    {
                                        platform.platform.slug === "pc" ? (
                                            <FaSteam/>
                                        ) : platform.platform.slug.includes("playstation") ? (
                                            <FaPlaystation className='text-blue-600'/>
                                        ) : platform.platform.slug.includes("xbox") ? (
                                            <FaXbox className='text-green-600'/>
                                        ) : null
                                    }
                                </p>
                            ))}
                        </div>{" "}
                    </div>
                </div>
            </HoverCardTrigger>
            {
                wishlist && (
                    <div className='absolute left-2 z-10 cursor-pointer top-2'>
                        <AddToWishList plus gameId={game.id.toString()}/>
                    </div>
                )
            }
            <HoverCardContent align='center' className='w-full bg-transparent border-none z-20 '>
                {
                    game.short_screenshots && (
                        <ImageSwitcher game={game} images={wishlist? game.short_screenshots.results : game.short_screenshots}/>
                    )
                }
            </HoverCardContent>
        </div>

    </HoverCard>
  )
}

export default GameCard
