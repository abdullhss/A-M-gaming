"use client"
import React from 'react'
import { useGetGamesWithId } from '@/lib/QueryFonctions'
import { useWishList } from '@/app/context/wishListContext';
import GridContainer from '@/app/components/defaults/GridContainer';
import GameCard from '@/app/components/GameCard';
import Spinner from '@/app/components/defaults/Spinner';
import GameSkeleton from '@/app/components/GameSkeleton';
import Empty from '@/app/components/Empty';

const page = () => {
    const {wishlist}  = useWishList() ;
    console.log(wishlist);
    const {games , isLoading} = useGetGamesWithId(wishlist) ; 
    

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <h1 className='font-bold text-2xl'>My wish list </h1>
      <GridContainer cols={4} className='gap-4'>
          {
            isLoading? <GameSkeleton number={12}/> 
            : wishlist.length > 0 ?   
            games?.map((game :any , i)=>(
              <GameCard wishlist={true} key={i} game={{
                ...game.data , 
                short_screenshots : game.screenshots
              }} />
            )) : 
            <Empty 
              message='You have not added any games to wishlist yet !' 
              link='/games' linkText='Browse More Games'/>
          }
      </GridContainer>
    </div>
  )
}

export default page
