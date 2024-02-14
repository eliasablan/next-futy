import React from 'react'
import { Input } from '@/components/ui/input'

export default function SearchBar() {
  return (
    <section className="sticky top-16 z-10 flex h-16 items-center border-b bg-primary-foreground p-6">
      <div className="relative flex w-full items-center">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <Input
          type="text"
          className="h-full w-full rounded-lg py-2 pl-10 pr-4 text-base focus:outline-none"
          placeholder="Search"
        />
      </div>
    </section>
  )
}
