"use client"
import React, { ReactElement } from 'react'
import ButtonSvg from '../ButtonSvg'
import Link from 'next/link'
import Spinner from './Spinner'
const ButtonGame = ({className="" , onClick , link , text , icon , disabled= false} : {className?:string , onClick?:()=> void , link?: string , text : string , icon?:ReactElement , disabled?: boolean}) => {
  return (
    <button className={`${className} relative min-w-[100px] hover:text-rose-400 duration-150 px-6 flex-initial gap-2 py-2  text-center m-auto`} onClick={ ()=>{onClick && onClick() } } disabled={disabled}>
        {ButtonSvg(false)}
        <span className='relative '> { disabled? <Spinner/> : link ? <Link href={link}>{text}</Link> : text} </span>
        {icon && icon}
    </button>
  )
}

export default ButtonGame
