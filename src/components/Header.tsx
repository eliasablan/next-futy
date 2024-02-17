'use client'
import React, { useContext } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'
import { MenuContext } from './MenuProvider'

export default function Header() {
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(MenuContext)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center border-b bg-primary-foreground tracking-wider">
      <div className="mx-auto w-full max-w-7xl px-6">
        <Button
          variant="outline"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {!mobileMenuOpen ? '>' : '<'}
        </Button>

        <Button
          variant={pathname !== '/games' ? 'link' : 'secondary'}
          asChild
        >
          <Link href="/games">Games</Link>
        </Button>

        <Button
          variant={pathname !== '/leagues' ? 'link' : 'secondary'}
          asChild
        >
          <Link href="/leagues">Leagues</Link>
        </Button>

        <Button
          variant={pathname !== '/teams' ? 'link' : 'secondary'}
          asChild
        >
          <Link href="/teams">Teams</Link>
        </Button>
      </div>
    </header>
  )
}
