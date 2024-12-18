import { Input } from '@/components/ui/input'
import { useGetGames } from '@/lib/QueryFonctions'
import { AnimatePresence } from 'framer-motion'
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import MotionItem from './defaults/MotionItme'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'

const Search = () => {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const { games, isLoading } = useGetGames({ query: search, isDisabled: search === '' })

  const outSideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (outSideRef.current && !outSideRef.current.contains(e.target as Node)) {
        setSearch('')
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const time = setTimeout(() => {
      setSearch(query)
    }, 500)

    return () => clearTimeout(time)
  }, [query])

  console.log(games)

  return (
    <div ref={outSideRef} className="lg:w-[40%] w-full flex items-center justify-between relative">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} className=" bg-[#333839] " />
      <div className="flex items-center absolute right-0">
        <SearchIcon className="absolute right-8 w-5 h-5 cursor-pointer hover:text-rose-400 duration-150" />
        <XIcon
          className="hover:text-rose-400 duration-150"
          onClick={() => {
            setQuery('')
            setSearch('')
          }}
        />
      </div>
      <AnimatePresence>
        {(games?.data || isLoading) && (
          <MotionItem
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="absolute w-full top-full z-50 bg-[#222425] rounded-xl shadow-sm max-h-[40vh] overflow-y-scroll left-0"
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2 flex items-start gap-2 px-4 py-2">
                  <Skeleton className="h-20 rounded-2xl w-[40%]" />
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))
            ) : games?.data.results.length > 0 ? (
              games?.data.results.map((game: any) => (
                <div key={game.id} className="hover:bg-rose-600 duration-200 flex flex-col gap-2 px-4 py-2">
                  <Link href={`/game/${game.id}`} className={'flex gap-3 items-start w-full h-full'}>
                    <div className="rounded-2xl relative overflow-hidden w-[40%] bg-neutral-900 h-20">
                      <Image alt={game.name} fill className="object-cover" src={game.background_image || ''} />
                    </div>
                    <h1 className="font-semibold text-white">{game.name}</h1>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-white py-4">No Games found with "{search}" query</p>
            )}
          </MotionItem>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Search
