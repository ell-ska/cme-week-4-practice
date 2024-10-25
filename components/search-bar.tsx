'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Search } from 'lucide-react'

import { get } from '@/utils/get'
import { SearchResponse } from '@/app/api/search/route'

export const SearchBar = () => {
  const pathname = usePathname()

  const [query, setQuery] = useState('')
  const { data } = useQuery<SearchResponse>({
    queryKey: ['search', query],
    queryFn: async () => get(`/api/search?query=${query}`),
    enabled: () => (query && query.length >= 3 ? true : false),
  })

  useEffect(() => {
    setQuery('')
  }, [pathname])

  return (
    <div className='relative w-full max-w-lg'>
      <div className='flex w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-zinc-400'>
        <label htmlFor='search'>
          <Search size={20} />
        </label>
        <input
          id='search'
          type='text'
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
          placeholder='search...'
          className='text-zinc-800 outline-none'
        />
      </div>
      {data && (
        <div className={searchResultClasses}>
          {data.length === 0 ? (
            <div className='px-4'>no posts found with that title!</div>
          ) : (
            data.map(({ id, title, slug }) => (
              <Link
                key={id}
                href={`/post/${slug}`}
                className={searchResultItemClasses}
              >
                {title}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

const searchResultClasses =
  'absolute top-[calc(100%+.5rem)] flex w-full flex-col gap-2 rounded-2xl bg-white py-4 shadow-md'
const searchResultItemClasses = 'w-full px-4 py-2 hover:bg-slate-50'
