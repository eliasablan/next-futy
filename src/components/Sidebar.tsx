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
import { ProfileButton } from './ProfileButton'

interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
  leagues: League[]
}

export function Sidebar({ leagues }: SidebarProps) {
  const { mobileMenuOpen } = useContext(MenuContext)

  return (
    <aside
      className={cn(
        'overflow-y-scroll bg-primary-foreground text-primary no-scrollbar ',
        'fixed inset-y-0 left-0 z-20 flex min-h-svh w-64 transform flex-col justify-between border-r transition duration-200 ease-out lg:inset-0 lg:translate-x-0',
        !mobileMenuOpen && '-translate-x-full'
      )}
    >
      <div className="flex flex-1 flex-col items-center">
        <Link
          href="/"
          className="inline-flex h-16 w-full items-center justify-end border-b border-primary-foreground bg-accent p-5 pr-4 hover:bg-destructive"
        >
          <h1 className="mr-2 text-2xl font-bold">Futy</h1>
          <Image src={ballLogo} width={30} height={30} alt="ball" />
        </Link>
        <nav className="flex w-full flex-col items-center">
          {leagues &&
            leagues.map((league) => (
              <SidebarLeagueLink key={league.id} {...league} />
            ))}
        </nav>
      </div>
      <div className="container sticky bottom-0 left-0 flex justify-between border-t bg-primary-foreground p-2 text-primary">
        <ProfileButton />
        <ModeToggle />
      </div>
    </aside>
  )
}
