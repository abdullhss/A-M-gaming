"use client"
import React, { useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import { MdDashboard } from 'react-icons/md'
import NavLink from './NavLink'
import Logo from '../defaults/Logo'
import { useGetUser } from '@/lib/QueryFonctions'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/actions/auth'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  {
    lable: "Home",
    link: "/",
    icon: <GoHomeFill />
  },
  {
    lable: "Games",
    link: "/games",
    icon: <MdDashboard />
  },
  {
    lable: "Wishlist",
    link: "/wishlist",
    icon: <FaHeart />
  },
  {
    lable: "Frinds",
    link: "/frinds",
    icon: <BsFillPeopleFill />
  },
]

const SideBar = () => {
  const { user, isLoading } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Burger Menu */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-50 bg-black/70 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-4/5 max-w-sm bg-black text-gray-50 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <div className="flex flex-col h-full py-5 px-6">
          <Logo />
          <nav className="flex-1 mt-4">
            {NAV_LINKS.map((navlink, idx) => (
              <NavLink key={idx} navlink={navlink} />
            ))}
          </nav>
          <div className="mt-auto">
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[70px]" />
              </div>
            ) : user?.data ? (
              <Button
                variant={"destructive"}
                onClick={async () => {
                  const res = await logout();
                  if (res.success) {
                    toast.success(res.success);
                    queryClient.invalidateQueries({ queryKey: ["user"] });
                  }
                }}
              >
                Log out
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar for Desktop */}
      <div className="hidden lg:block col-span-2 h-screen sticky inset-0 py-5 px-10 flex flex-col items-start bg-black/30 text-gray-50">
        <Logo />
        {NAV_LINKS.map((navlink, idx) => (
          <NavLink key={idx} navlink={navlink} />
        ))}
        <div className="mt-auto">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[70px]" />
            </div>
          ) : user?.data ? (
            <Button
              variant={"destructive"}
              onClick={async () => {
                const res = await logout();
                if (res.success) {
                  toast.success(res.success);
                  queryClient.invalidateQueries({ queryKey: ["user"] });
                }
              }}
            >
              Log out
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SideBar;
