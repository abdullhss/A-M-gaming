"use client" ;

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react'

const NavLink = ({navlink} : {navlink : {link : string , lable:string , icon : ReactElement}}) => {
    const pathName = usePathname()
    const isActive = (pathName === navlink.link)
  return (
    <Link href={navlink.link} className={ `flex ${isActive? "text-rose-400" : "text-gray-50" } gap-2 items-center p-3 rounded-md  duration-200 hover:text-rose-400 my-3`}>
        {React.cloneElement(navlink.icon ,{className: "w-6 h-6"})}
        <span>{navlink.lable}</span>
    </Link>
  )
}

export default NavLink
