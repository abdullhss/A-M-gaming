"use client"
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useGetUser } from '@/lib/QueryFonctions';
import Spinner from '../components/defaults/Spinner';
import { toast } from 'react-toastify';
import { AddToWishList, removeFromWishList } from '../actions/actions';
import { useQueryClient } from '@tanstack/react-query';

interface WishlistProps {
    handleAddToWishList : (gameId : string) => void ,
    wishlist : string[],
}


const wishlistContext = createContext <WishlistProps | null > (null) ; 

export const WishListProvider = ({children} :{children : ReactNode}) => {

    const [mount , setMount] = useState(false) ;
    const {user , isLoading} = useGetUser() ; 
    const [wishListLocal , setWishListLocal] = useLocalStorageState<string []>("wishList" , user?.data? [...user?.data.wishlist]:[]) ; 
    
    useEffect( ()=>{setMount(true)},[]) ;

    const queryClient = useQueryClient() ; 
    const wishlist = user?.data ? user.data.wishlist : wishListLocal ;
    
    const handleAddToWishList = async (gameId:string)=>{
      if(!mount){
        return null
      }
      const isInWishList :string[] = wishlist.some( (wish : any) => wish == gameId); 
      
      if(user?.data){
        const res = isInWishList? await removeFromWishList(gameId) : await AddToWishList(gameId) ;
        
        if(res.success ){
          toast.success(res.success)
          queryClient.invalidateQueries({queryKey:["user"]})
        }else{
          console.log("te");
          toast.error(res.error)
        }
      }
      else{
          if(isInWishList){
            setWishListLocal( (prev)=> prev.filter((wish)=> wish !== gameId)) ;
            toast.success("removed from wish list ")
          }
          else{
            setWishListLocal((prev)=>[...prev , gameId])
            toast.success("added to wish list ")
          }
        }
    }
      
    if(!mount){
      return null
    }
    else{
      if(isLoading){
        return(
          <Spinner/>
        )
      }

      console.log("wishlist " , wishlist);
      
      return (
        <wishlistContext.Provider value={{handleAddToWishList , wishlist}}>
            {children}
        </wishlistContext.Provider>
      )
    }
}

export const useWishList = ()=>{
    const context = useContext(wishlistContext) ;
    // error beacuse context is null why ?
    if(!context){
        throw new Error("useWishList must be used within a wishlistProvider")
    }
    return(context)
}