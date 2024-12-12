"use client"
import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import { MdDashboard } from 'react-icons/md'
import NavLink from './NavLink'
import Logo from '../defaults/Logo'
import { useGetUser } from '@/lib/QueryFonctions'
import { Skeleton } from '@/components/ui/skeleton'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/actions/auth'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const NAV_LINKS = [
    {
        lable : "Home",
        link : "/",
        icon : <GoHomeFill/>
    } ,
    {
        lable : "Category",
        link : "/category",
        icon : <MdDashboard/>
    } ,
    {
        lable : "Games",
        link : "/games",
        icon : <MdDashboard/>
    } ,
    {
        lable : "Wishlist",
        link : "/wishlist",
        icon : <FaHeart/>
    } ,
    {
        lable : "Frinds",
        link : "/frinds",
        icon : <BsFillPeopleFill/>
    } ,
] 

const SideBar = () => {

    const {user , isLoading} = useGetUser() ;  
    const queryClient = useQueryClient() ; 

  return (
    <div className='col-span-2'>
        <div className=' h-screen sticky inset-0 py-5 px-10 flex flex-col items-start bg-black/30 text-gray-50'>
            <Logo/>
            {
                NAV_LINKS.map((navlink , idx)=>{
                    return( <NavLink key={idx} navlink={navlink}/> )
                })
            }
            {
              isLoading ? (<div className=" mt-auto flex items-center space-x-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[70px]" />
                  </div>
                </div>) : 
                user?.data? (
                    <div className='mt-auto self-start'>
                        <NavLink navlink={{
                            lable : "Settings",
                            link : "/settings",
                            icon : <Settings/>
                        }} />
                        
                        <Button variant={"destructive"} onClick={ async ()=>{
                            const res = await logout() ;
                            if(res.success){
                                toast.success(res.success); 
                                queryClient.invalidateQueries({queryKey:["user"]});
                            }
                        }}>log out</Button>
                    </div>
                ) : null 
            }
        </div>
    </div>
  )
}

export default SideBar
