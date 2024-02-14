'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="my-auto flex h-16 items-center border-b px-6">
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
