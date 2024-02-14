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
        'no-scrollbar overflow-y-scroll bg-primary-foreground text-primary lg:overflow-y-visible',
        'fixed inset-y-0 left-0 z-10 flex min-h-svh w-64 transform flex-col justify-between border-r transition duration-200 ease-out lg:inset-0 lg:translate-x-0',
        !mobileMenuOpen && '-translate-x-full'
      )}
    >
      <div className="flex flex-1 flex-col items-center">
        <Link
          href="/"
          className="flex h-28 w-full items-center justify-center border-b border-primary-foreground bg-accent p-5 hover:bg-destructive lg:p-0"
        >
          <Image src={ballLogo} width={36} height={36} alt="ball" />
        </Link>
        <nav className="flex w-full flex-col items-center">
          {leagues &&
            leagues.map((league) => (
              <SidebarLeagueLink key={league.id} {...league} />
            ))}
        </nav>
      </div>
      <div className="flex justify-between p-4">
        <ProfileButton />
        <ModeToggle />
      </div>
    </aside>
  )
}
