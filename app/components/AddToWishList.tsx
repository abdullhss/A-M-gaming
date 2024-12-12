"use client"
import React from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { Button } from '@/components/ui/button';
import { PlusCircle, XCircle } from 'lucide-react';
import { useWishList } from '../context/wishListContext';

const AddToWishList = ({gameId , plus} : {gameId : string ,plus:boolean}) => {
  
  const {handleAddToWishList , wishlist} = useWishList() ; 
  const isInWishList = wishlist?.includes(gameId)!!; 
  return (
    plus ? (
    isInWishList? (
      <XCircle onClick={ ()=>handleAddToWishList(gameId)} />
    ) : (
      <PlusCircle onClick={ ()=>handleAddToWishList(gameId) } />
    )
    ) 
    :<Button onClick={ ()=>handleAddToWishList(gameId) }>{isInWishList?"Remove From WishList" : "Add To WishList"}</Button>
  )
}

export default AddToWishList
