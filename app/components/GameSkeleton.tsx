import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const GameSkeleton = ({number = 12} : {number? : number}) => {
  return (
    Array.from({length : number }).map((_,index) => (
    <div key={index} className='flex flex-col space-y-3'>
        <Skeleton className='h-64 w-full rounded-xl'/>
        <div className='space-y-2'>
            <Skeleton className='h-4 w-[80%]'/>
            <Skeleton className='h-4 w-[75%]'/>
        </div>
    </div>
    ))
  )
}

export default GameSkeleton
