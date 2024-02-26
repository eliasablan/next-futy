'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'

import { useSidebarContext } from '@/contexts/SidebarPrivader'

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext()
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
            className={cn('block h-5 w-5', sidebarOpen && 'hidden')}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className={cn('hidden h-5 w-5', sidebarOpen && 'block')}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
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
