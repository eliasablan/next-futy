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
        'h-auto w-full rounded-none border-b py-2',
        pathname === `/leagues/${league.code}` && 'border bg-accent'
      )}
    >
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href={`/leagues/${league.code}`}
        className="flex justify-center gap-x-3 px-3 antialiased"
      >
        <Image
          src={league.emblem}
          alt={league.name}
          width={30}
          height={30}
        />
        <p className="w-full text-wrap font-semibold leading-tight tracking-wider">
          {league.name}
        </p>
      </Link>
    </Button>
  )
}
