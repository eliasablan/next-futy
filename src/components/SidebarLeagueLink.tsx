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
        'h-16 w-full rounded-none border-b border-secondary',
        pathname === `/leagues/${league.code}` && 'border-2 bg-accent'
      )}
    >
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href={`/leagues/${league.code}`}
        className="flex justify-center gap-x-4"
      >
        <Image
          src={league.emblem}
          alt={league.name}
          width={40}
          height={40}
        />
        <p className="w-40 text-wrap">{league.name}</p>
      </Link>
    </Button>
  )
}
