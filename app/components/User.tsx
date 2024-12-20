"use client"
import Image from 'next/image'
import React from 'react'

const User = ({user , floatRight=false} : {user :{name:string , avatar : {secure_url : string} } ,floatRight ?:boolean}) => {
  console.log(user);
  
    return (
    <div className={`flex items-center gap-3 `}>
      <h1 className={`text-base text-white ${floatRight ? "block" : "hidden"}` }>{user.name}</h1>
      
      <div className='w-12 h-12 relative overflow-hidden rounded-full'>
        <Image fill src={user.avatar.secure_url} alt={`${user.name}`} className='object-cover'/>
      </div>
      
      <h1 className={`text-base text-white ${floatRight && "hidden"}` }>{user.name}</h1>
    </div>
  )
}

export default User
