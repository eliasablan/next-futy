import React from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'

import Image from 'next/image'
import FollowButton from './FollowButton'
import { League } from '@/lib/types/league'

export default async function LeagueCard({ league }: { league: League }) {
  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="py-3">
          <CollapsibleTrigger className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">About</CardTitle>
            <CaretSortIcon className="h-6 w-6" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t">
            <div className="flex flex-col items-center pt-4">
              <Image
                src={league.emblem}
                alt={league.name}
                width={200}
                height={200}
              />
              <p className="inline-flex gap-3 pt-4 font-semibold">
                {league.area?.flag && (
                  <Image
                    src={league.area.flag}
                    alt={league.area.name}
                    width={20}
                    height={20}
                  />
                )}
                {league.name}
              </p>
              <FollowButton
                type="leagues"
                id={league.code}
                name={league.name}
                emblem={league.emblem}
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
