"use client"
import React from 'react'
import Search from '../Search'
import ButtonGame from '../defaults/ButtonGame'
import { useGetUser } from '@/lib/QueryFonctions'
import { Skeleton } from '@/components/ui/skeleton'
import User from '../User'

const NavBar = () => {
  const {user , isLoading} = useGetUser() ;  

  return (
    <nav>
        <header className='flex justify-between items-center'>
            <Search/>
            {
              isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[70px]" />
                  </div>
                </div>
              ) :
              user?.data? <User user={user.data}/> : 
              (<div className='flex items-center gap-2'>
              <ButtonGame text="Login" link="/login"/>
              <ButtonGame text="Sign up" link="/signup"/>
              </div>)
            }
        </header>
    </nav>
  )
}

export default NavBar
