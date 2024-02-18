'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

import { League } from '@/lib/types/league'
import { cn } from '@/lib/utils'
import { MenuContext } from './MenuProvider'

export function SidebarLeagueLink(league: League) {
  const { setMobileMenuOpen } = useContext(MenuContext)
  const pathname = usePathname()
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(
        'h-auto min-h-16 w-full rounded-none border-b px-4',
        pathname === `/leagues/${league.code}` && 'border bg-accent'
      )}
    >
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href={`/leagues/${league.code}`}
        className="gap-x-3 px-6 antialiased"
      >
        <Image
          src={league.emblem}
          alt={league.name}
          width={30}
          height={30}
          className="absolute left-4"
        />
        <p className="my-5 ml-8 w-full text-wrap text-sm font-medium leading-tight tracking-wider lg:my-4">
          {league.name}
        </p>
      </Link>
    </Button>
  )
}
