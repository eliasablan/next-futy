'use client'
import React, { useContext } from 'react'
import Link from 'next/link'

import { SidebarLeagueLink } from './SidebarLeagueLink'

import { League } from '@/lib/types/league'
import { MenuContext } from '@/components/MenuProvider'
import { cn } from '@/lib/utils'
import { ModeToggle } from './ThemeButton'

interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
  leagues: League[]
}

export function Sidebar({ leagues }: SidebarProps) {
  const { mobileMenuOpen } = useContext(MenuContext)

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex min-h-svh w-[4.5rem] transform flex-col space-y-6 overflow-y-auto bg-gray-200 text-gray-100 transition duration-200 ease-out lg:relative lg:inset-0 lg:translate-x-0',
        !mobileMenuOpen && '-translate-x-full'
      )}
    >
      <div className="flex flex-1 flex-col items-center space-y-6">
        <Link
          href="/"
          className="flex w-full items-center justify-center truncate whitespace-nowrap bg-blue-600 p-5 font-bold text-white lg:h-20 lg:p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            ></path>
          </svg>
        </Link>
        <nav className="flex flex-col items-center space-y-6">
          {leagues &&
            leagues.map((league) => (
              <SidebarLeagueLink key={league.id} {...league} />
            ))}
        </nav>
      </div>
      <div className="flex justify-center border-t border-gray-300 py-5">
        <ModeToggle />
      </div>
    </aside>
  )
}
