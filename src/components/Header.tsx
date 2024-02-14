import React from 'react'
import { Input } from './ui/input'

export default function Header() {
  return (
    <header className="flex h-28 items-center border-b px-6">
      <div className="relative flex w-full items-center">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
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
          className="h-14 w-full rounded-lg py-2.5 pl-16 pr-4 text-lg focus:outline-none"
          placeholder="Search"
        />
      </div>
    </header>
  )
}
