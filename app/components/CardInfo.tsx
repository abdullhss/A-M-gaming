import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import MotionItme from './defaults/MotionItme'

const CardInfo = ({title , desc , image , textBtn , btnClasses=""} : {title: string, desc:string , image:string , textBtn : string , btnClasses?:string}) => {
  return (
    <MotionItme className=' flex flex-col items-start absolute left-20 top-20 max-w-md' initial={{opacity : 0 , y:30}} whileInView={{opacity:1 , y:0 , transition:{duration:1 }}} >
          <div className='w-96 h-36 relative'>
              <Image alt={title || "logo"} fill className='object-contain' src={image}/>
          </div>
          <h1 className='text-white text-2xl font-semibold '>{title}</h1>
          <p className='text-base text-gray-200 mt-4'>{desc}</p>
          <Button className={`rounded-full text-gray-50 ${btnClasses} mt-10`}>{textBtn}</Button>
    </MotionItme>
  )
}

export default CardInfo