"use client"
import React, { useState } from 'react'
import GridContainer from './defaults/GridContainer'
import { useGetGames } from '@/lib/QueryFonctions';
import GameSkeleton from './GameSkeleton';
import GameCard from './GameCard';
import Empty from './Empty';

const Filters = ({genres} : {genres : any}) => {
    
    const [activeGenres , setActiveGenres] = useState<number []>([]) ;
    const {games, isLoading} = useGetGames({
        filters : [{filterName : 'genres' , option:activeGenres?.join(',') }]
    });
    console.log(games);
  return (
    <GridContainer cols={11} className='gap-5 relative'>
        <div className='lg:sticky top-4 lg:h-screen col-span-full lg:col-span-2 '>
            <div className='flex flex-row flex-wrap lg:flex-col gap-3 bg-[#888] py-4 px-8 rounded-2xl'>
                {
                    genres.map((genre : any , i:number)=>(
                        <button key={i} onClick={()=>{
                            activeGenres.includes(genre.id) ? 
                            setActiveGenres(activeGenres.filter((id)=>id!==genre.id)) : 
                            setActiveGenres([...activeGenres , genre.id])
                        }}
                        className={`${
                            activeGenres.includes(genre.id) && "bg-rose-500 "  
                            
                        }text-white text-sm font-medium px-3 py-1 rounded-full`}>
                            {genre.name}
                        </button>
                    ))
                }
            </div>
        </div>
        <GridContainer cols={2} className='col-span-9 gap-5'>
            {
                isLoading?<GameSkeleton number={12}/> : 
                    games?.data.results.length > 0 ? (
                        games?.data.results.map((game : any)=><GameCard key={game.id} game={game}/>) 
                    ) : <Empty message='sorry , no games found'/>
                

            }
        </GridContainer>
    </GridContainer>
  )
}

export default Filters
