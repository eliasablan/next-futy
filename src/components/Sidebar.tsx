'use client'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'

import { MenuContext } from '@/components/MenuProvider'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'

import ballLogo from '../../public/ball.png'
import { SidebarLeagueLink } from './SidebarLeagueLink'
import { ModeToggle } from './ThemeButton'
import { ProfileButton } from './ProfileButton'

export default function Sidebar() {
  const { data: session } = useSession()

  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarFollowings,
    sidebarLoading,
  } = useContext(MenuContext)

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 flex min-h-svh w-4/5 transform flex-col justify-between overflow-y-scroll border-r bg-primary-foreground text-primary transition duration-200 ease-out no-scrollbar xs:w-3/5 sm:w-1/2 lg:inset-0 lg:w-56',
          !sidebarOpen && '-translate-x-full'
        )}
      >
        <div className="flex flex-1 flex-col items-center">
          <Link
            href="/"
            className="sticky left-0 top-0 z-40 inline-flex h-16 w-full items-center justify-end bg-destructive p-5 pr-4 hover:bg-primary hover:text-primary-foreground"
          >
            <h1 className="mr-2 text-2xl font-bold">Futy</h1>
            <Image src={ballLogo} width={30} height={30} alt="ball" />
          </Link>
          <nav className="flex w-full flex-col items-center divide-y">
            {session ? (
              sidebarLoading ? (
                <p className="mt-6">Loading</p>
              ) : (
                <>
                  {/* @ts-ignore */}
                  {sidebarFollowings?.teams.length > 0 && (
                    <div className="w-full bg-secondary-foreground py-2 text-center text-sm text-secondary">
                      Teams
                    </div>
                  )}
                  {sidebarFollowings?.teams.map((id: string) => (
                    <SidebarLeagueLink
                      key={`teams:${id}`}
                      type="teams"
                      id={id}
                    />
                  ))}
                  {/* @ts-ignore */}
                  {sidebarFollowings?.leagues.length > 0 && (
                    <div className="w-full bg-secondary-foreground py-2 text-center text-sm text-secondary">
                      Leagues
                    </div>
                  )}
                  {sidebarFollowings?.leagues.map((code: string) => (
                    <SidebarLeagueLink
                      key={`leagues:${code}`}
                      type="leagues"
                      id={code}
                    />
                  ))}
                  {/* @ts-ignore */}
                  {sidebarFollowings?.players.length > 0 && (
                    <div className="w-full bg-secondary-foreground py-2 text-center text-sm text-secondary">
                      Players
                    </div>
                  )}
                  {sidebarFollowings?.players.map((id: string) => (
                    <SidebarLeagueLink
                      key={`players:${id}`}
                      type="players"
                      id={id}
                    />
                  ))}
                </>
              )
            ) : (
              <div className="mx-auto mt-8 text-center">
                <p>Sign in for more</p>
                <Button className="mt-4" onClick={() => signIn()}>
                  Sign in
                </Button>
              </div>
            )}
          </nav>
        </div>
        <div className="sticky bottom-0 left-0 flex h-auto w-full justify-between border-t bg-primary-foreground text-primary">
          <ProfileButton />
          <ModeToggle />
        </div>
      </aside>

      <div
        className={cn(
          'inset-0 z-10 bg-background opacity-70 no-scrollbar lg:hidden',
          sidebarOpen ? 'fixed' : 'hidden'
        )}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  )
}
