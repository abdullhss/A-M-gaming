import Link from 'next/link'
import React from 'react'
import {Montserrat} from "next/font/google"
import {Orbitron} from "next/font/google"


const montserrat = Montserrat({weight:["300" , "400" , "700"] , subsets:["latin"]})

const Logo = () => {
  return (
    <Link className= "flex my-2 gap-2 md:text-2xl text-xl font-semibold" href={"/"}>
        <span className='text-rose-500'>A&M</span>
        <h1 className='text'>Games</h1>
    </Link>
  )
}

export default Logo
