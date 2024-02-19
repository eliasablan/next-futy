'use client'
import React, { useContext } from 'react'
import { MenuContext } from '@/components/MenuProvider'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import ballLogo from '../../public/ball.png'

import { SidebarLeagueLink } from './SidebarLeagueLink'

import { ModeToggle } from './ThemeButton'
import { ProfileButton } from './ProfileButton'

import { League } from '@/lib/types/league'

interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
  leagues: League[]
}

export function Sidebar({ leagues }: SidebarProps) {
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(MenuContext)

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 flex min-h-svh w-4/5 transform flex-col justify-between overflow-y-scroll border-r bg-primary-foreground text-primary transition duration-200 ease-out no-scrollbar xs:w-3/5 sm:w-1/2 lg:inset-0 lg:w-56',
          !mobileMenuOpen && '-translate-x-full'
        )}
      >
        <div className="flex flex-1 flex-col items-center">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="sticky left-0 top-0 z-40 inline-flex h-16 w-full items-center justify-end bg-destructive p-5 pr-4 hover:bg-primary hover:text-primary-foreground"
          >
            <h1 className="mr-2 text-2xl font-bold">Futy</h1>
            <Image src={ballLogo} width={30} height={30} alt="ball" />
          </Link>
          <nav className="flex w-full flex-col items-center divide-y">
            {leagues &&
              leagues.map((league) => (
                <SidebarLeagueLink key={league.id} {...league} />
              ))}
          </nav>
        </div>
        <div className="sticky bottom-0 left-0 flex min-h-16 w-full justify-between border-t bg-primary-foreground text-primary">
          <ProfileButton />
          <div></div>
          <ModeToggle />
        </div>
      </aside>

      <div
        className={cn(
          'inset-0 z-10 bg-background opacity-70 no-scrollbar lg:hidden',
          mobileMenuOpen ? 'fixed' : 'hidden'
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
