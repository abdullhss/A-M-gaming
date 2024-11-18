import { cn } from '@/lib/utils'
import React from 'react'

const MaxWidthWrapper = ({children, noPadding ,className=""} : {children : React.ReactNode , noPadding?:boolean , className?:string}) => {
  return (
    <section className={cn("max-w-[1375px] w-full px-10" , className , {"py-0" : noPadding} , {"py-5" : !noPadding})}>
      {children}
    </section>
  )
}

export default MaxWidthWrapper
