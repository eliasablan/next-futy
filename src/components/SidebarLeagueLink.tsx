'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'

import { League } from '@/lib/types/league'
import { cn } from '@/lib/utils'

export function SidebarLeagueLink(league: League) {
  const pathname = usePathname()
  return (
    // <TooltipProvider>
    //   <Tooltip defaultOpen={true}>
    //     <TooltipTrigger asChild>
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(
        'h-14 w-14',
        pathname === `/leagues/${league.code}` &&
          'bg-accent-foreground dark:bg-accent'
      )}
    >
      <Link href={`/leagues/${league.code}`}>
        <Image
          src={league.emblem}
          alt={league.name}
          width={40}
          height={40}
        />
      </Link>
    </Button>
    //     </TooltipTrigger>
    //     <TooltipContent
    //       align="center"
    //       side="right"
    //       sideOffset={0}
    //       className="z-[9999]"
    //       // alignOffset={5}
    //       // avoidCollisions={true}
    //     >
    //       <p>{league.name}</p>
    //       {/* <TooltipArrow /> */}
    //     </TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
  )
}
