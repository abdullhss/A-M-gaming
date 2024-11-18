import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className='lg:w-[40%] w-full flex items-center justify-between relative'>
        <Input className=' bg-[#333839] '/>
        <SearchIcon className='absolute right-4 w-5 h-5 cursor-pointer hover:text-rose-400 duration-150'/>
    </div>
  )
}

export default Search
