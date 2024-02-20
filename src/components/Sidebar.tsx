'use client'
import React, { useContext, useEffect, useState } from 'react'
import { MenuContext } from '@/components/MenuProvider'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'

import { fetchLeagues } from '@/lib/data/queries'

import ballLogo from '../../public/ball.png'

import { SidebarLeagueLink } from './SidebarLeagueLink'

import { ModeToggle } from './ThemeButton'
import { ProfileButton } from './ProfileButton'

import { League } from '@/lib/types/league'
import { Button } from './ui/button'

export default function Sidebar() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [leagues, setLeagues] = useState<League[]>([])
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(MenuContext)

  useEffect(() => {
    if (session) {
      fetchLeagues()
        .then((res) => {
          setLeagues(res)
        })
        .then(() => setIsLoading(false))
    }
  }, [session])

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
            {session ? (
              isLoading ? (
                <p className="mt-6">Loading</p>
              ) : (
                leagues.map((league) => (
                  <SidebarLeagueLink key={league.id} {...league} />
                ))
              )
            ) : (
              <div className="mx-auto mt-8 text-center">
                <p>Sigin for more</p>
                <Button className="mt-4" onClick={() => signIn()}>
                  Sign in
                </Button>
              </div>
            )}
          </nav>
        </div>
        <div className="sticky bottom-0 left-0 flex h-auto w-full justify-between border-t bg-primary-foreground text-primary">
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
