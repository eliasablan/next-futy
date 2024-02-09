import React from 'react'

export default function Header() {
  return (
    <header className="flex h-20 items-center border-b bg-white px-6">
      <div className="relative flex w-full items-center border-2">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-200 border-transparent bg-white py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="Search"
        />
      </div>
    </header>
  )
}
