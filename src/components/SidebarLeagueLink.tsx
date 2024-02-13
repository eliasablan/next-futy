'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { League } from '@/lib/types/league'
import { cn } from '@/lib/utils'
import { MenuContext } from './MenuProvider'

export function SidebarLeagueLink(league: League) {
  const { setMobileMenuOpen } = useContext(MenuContext)
  const pathname = usePathname()
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
              'h-14 w-14',
              pathname === `/leagues/${league.code}` && 'border bg-accent'
            )}
          >
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href={`/leagues/${league.code}`}
            >
              <Image
                src={league.emblem}
                alt={league.name}
                width={40}
                height={40}
              />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-lg" align="center" side="right">
          {league.name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
