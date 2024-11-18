import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import { MdDashboard } from 'react-icons/md'
import NavLink from './NavLink'
import Logo from '../defaults/Logo'

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
  return (
    <div className='col-span-2'>
        <div className=' h-screen sticky inset-0 py-5 px-10 flex flex-col items-start bg-black/30 text-gray-50'>
            <Logo/>
            {
                NAV_LINKS.map((navlink , idx)=>{
                    return( <NavLink key={idx} navlink={navlink}/> )
                })
            }
        </div>
    </div>
  )
}

export default SideBar
