"use client"
import React, { useState } from 'react'
import Search from '../Search'
import ButtonGame from '../defaults/ButtonGame'
import { useGetUser } from '@/lib/QueryFonctions'
import { Skeleton } from '@/components/ui/skeleton'
import User from '../User'
import { Menu, X } from 'lucide-react'

const NavBar = () => {
  const { user, isLoading } = useGetUser();

  return (
    <nav className="">
      <header className={`justify-between items-center block md:flex`}>
        {/* Mobile Menu */}
          <div className='md:hidden'>
            {
              (
                isLoading ? (
                  <div className="flex items-center space-x-4 gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[70px]" />
                    </div>
                  </div>
                ) : user?.data ? (
                  <div className='float-right mb-2'>
                    <User user={user.data} floatRight={true} />
                  </div>
                ) : (
                  <div className="flex gap-2 p-2 mb-2">
                    <ButtonGame text="Login" link="/login" />
                    <ButtonGame text="Sign up" link="/signup" />
                  </div>
                )
            )
            }
          </div>

        <Search />

        {/* Desktop View */}
        <div className="hidden lg:flex items-center">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[70px]" />
              </div>
            </div>
          ) : user?.data ? (
            <User user={user.data} />
          ) : (
            <div className="flex items-center gap-2">
              <ButtonGame text="Login" link="/login" />
              <ButtonGame text="Sign up" link="/signup" />
            </div>
          )}
        </div>

      </header>

    </nav>
  );
};

export default NavBar;
