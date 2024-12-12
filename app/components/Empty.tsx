import Link from 'next/link'
import React from 'react'

const Empty = ({message , link , linkText} : {message? : string, link?:string , linkText?:string}) => {
  return (
    <div className='flex flex-col items-center gap-4'>
        <p className='text-gray-50 font-semibold text-lg'>{message || "Sorry, no games found in this page"}</p>
        {link && 
            <Link href={link} className='text-rose-500 hover:underline hover:text-rose-400 duration-150 text-base'>
                {linkText || "Browse More Games"}
            </Link>}
    </div>
  )
}

export default Empty
