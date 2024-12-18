import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { getGamesByIds, searchGames } from '../api/api'
import GamesSlider from '../components/GamesSlider';

export default async function Home() {

  
  // random games 
  const {data} = await searchGames("" , 3 , [] , 9) ;
  const games = data.results ;

  // PS5 Games 
  const ps5 = await searchGames("" , 1 ,[
    {filterName : "platforms" , option :"187"},
    {filterName : "ordering" , option :"-metacritic"},
  ] ,9)
  
  // PC Games
  const pc = await searchGames("" , 1 ,[
    {filterName : "platforms" , option :"4"},
  ] ,9)
  
  const selectedGames = await getGamesByIds(["799265" , "58550" , "2462" , "494384" , "452634"]) ; 
  return (
    <main>
      <Hero/>
      <GamesSlider games={games} slidesPerView={3} title='Top Games' />
      <GamesSlider games={ps5.data.results} slidesPerView={2} title='Top PS5 Games'/>
      <GamesSlider slidesPerView={3} games={selectedGames.map((game)=>game.data)} title='Playstation Exclusives'/>
      <GamesSlider games={pc.data.results} slidesPerView={2} title='Top PC Games'/>
      
    </main>
  )
}