"use client"

import { getUser } from "@/app/actions/auth";
import { getGamesByIds, searchGames } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query"

export const useGetUser = ()=>{
    const {data : user , isLoading} = useQuery({
        queryKey:["user"] ,
        queryFn : ()=>getUser() 
    });
    return {user , isLoading}
}
export const useGetGamesWithId = (ids : string[]) => {
    const {data :games , isLoading} = useQuery({
        queryKey : [`games-${ids}`] ,
        queryFn : ()=> getGamesByIds(ids) ,
    });
    return {games, isLoading} ;
}
export const useGetGames = ({query ="", page=1 , pageSize=12 , filters=[] , isDisabled=false} : 
    {   
        query ?: string ,
        page?:number ,
        pageSize?:number ,
        filters?:{ filterName : string , option : string }[] | any,
        isDisabled?:boolean
    })=>{
    const {data : games , isLoading} = useQuery({
        queryKey : [`games-${page}-${JSON.stringify(filters)}-${query}`] ,
        queryFn : async  ()=> await searchGames(query , page, filters,pageSize) ,
        enabled: !isDisabled , 
    })
    return {games , isLoading} ; 
}