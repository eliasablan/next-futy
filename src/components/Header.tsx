'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="container sticky top-0 z-20 my-auto flex h-16 items-center border-b bg-primary-foreground px-6 lg:fixed">
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
    </header>
  )
}
