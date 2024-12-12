"use server"
import User from "../models/user";
import { protect } from "./auth"
import connect from "./connect";

export const removeFromWishList =async (gameid : string)=>{
    try{
        const {decode} = await protect() ;
        const user = await User.findById((decode as any).id)
        if(!user){
            return{error:"User Not Found"}
        }
        user.wishlist = user.wishlist.filter((id:string)=>id !== gameid);
        await user.save() ; 
        return{success:"game Removed from wishlist"}
    }
    catch(error){
        return {error:"remove from wishlist failed"}
    }
}

export const AddToWishList = async (gameid : string)=>{
    try{
        const {decode} = await protect() ;
        const user = await User.findById((decode as any).id)
        
        if(!user){
            return{error:"User Not Found"}
        }
        user.wishlist = user.wishlist?.filter((id:string)=>id!==gameid) || [];
        user.wishlist.push(gameid)
        await user.save() ;

        return{success:"game add to wishlist"} 
    }
    catch(error){
        return {error:"add to wishlist failed"}
    }
}