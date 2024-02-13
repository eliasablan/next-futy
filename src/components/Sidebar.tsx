'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ballLogo from '../../public/ball.png'

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
        'no-scrollbar fixed inset-y-0 left-0 z-10 flex min-h-svh w-[4.5rem] transform flex-col justify-between space-y-6 border-r bg-background transition duration-200 ease-out lg:inset-0 lg:translate-x-0',
        // same as above but with 'overflow-y-scroll' to make the sidebar scrollable
        // 'no-scrollbar fixed inset-y-0 left-0 z-10 flex min-h-svh w-[4.5rem] transform flex-col justify-between space-y-6 overflow-y-scroll border-r bg-background transition duration-200 ease-out lg:inset-0 lg:translate-x-0',
        !mobileMenuOpen && '-translate-x-full'
      )}
    >
      <div className="flex flex-1 flex-col items-center space-y-3">
        <Link
          href="/"
          className="flex w-full items-center justify-center bg-accent p-5 hover:bg-destructive lg:h-20 lg:p-0"
        >
          <Image src={ballLogo} width={35} height={35} alt="ball" />
        </Link>
        <nav className="flex flex-col items-center space-y-2 px-1">
          {leagues &&
            leagues.map((league) => (
              <SidebarLeagueLink key={league.id} {...league} />
            ))}
        </nav>
      </div>
      <div className="flex justify-center border-t p-2">
        <ModeToggle />
      </div>
    </aside>
  )
}
