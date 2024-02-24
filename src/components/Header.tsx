'use client'
import React, { useContext } from 'react'
import { MenuContext } from './MenuProvider'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import Link from 'next/link'

import { Button } from './ui/button'

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useContext(MenuContext)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 flex min-h-16 w-full items-center justify-between border-b bg-primary-foreground py-2 tracking-wider">
      <div
        className={cn(
          'mx-auto flex w-full max-w-7xl items-center justify-between px-6',
          sidebarOpen && 'justify-end lg:justify-between'
        )}
      >
        <Button
          className="z-60 h-10 w-10 rounded-lg p-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn('block', sidebarOpen && 'hidden')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className={cn('hidden h-5 w-5', sidebarOpen && 'block')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </Button>

        <div className={cn(sidebarOpen && 'hidden lg:block')}>
          <Button
            variant={pathname !== '/games' ? 'link' : 'secondary'}
            asChild
          >
            <Link href="/games">Games</Link>
          </Button>

          <Button
            variant={pathname !== '/competitions' ? 'link' : 'secondary'}
            asChild
          >
            <Link href="/competitions">Competitions</Link>
          </Button>

          <Button
            variant={pathname !== '/teams' ? 'link' : 'secondary'}
            asChild
          >
            <Link href="/teams">Teams</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
