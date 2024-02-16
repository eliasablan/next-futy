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
import { Match } from '@/lib/types/match'
import Link from 'next/link'

export default async function MatchSummaryCard({
  match,
}: {
  match: Match
}) {
  console.log(match)
  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-xl leading-none">Summary</CardTitle>
          <CollapsibleTrigger className="!mt-1">
            <CaretSortIcon className="h-8 w-8" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t">
            <div className="flex flex-col items-center pt-4">
              <Link href={`/leagues/${match.competition.code}`}>
                <h3 className="text-xl font-bold">
                  {match.competition.name}
                </h3>
              </Link>
              <div className="container mt-6 flex justify-around px-0 text-lg">
                <div className="flex flex-col items-center justify-between gap-2">
                  <Link href={`/teams/${match.homeTeam.id}`}>
                    <Image
                      src={match.homeTeam.crest}
                      height={100}
                      width={100}
                      alt={match.homeTeam.name}
                      className="max-h-24"
                    />
                    <p className="mt-4 max-w-24 text-center text-sm">
                      {match.homeTeam.shortName || match.homeTeam.name}
                    </p>
                  </Link>
                  <p className="text-center text-7xl">
                    {match.score.fullTime.home}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Link href={`/teams/${match.awayTeam.id}`}>
                    <Image
                      src={match.awayTeam.crest}
                      height={100}
                      width={100}
                      alt={match.awayTeam.name}
                      className="max-h-24"
                    />
                    <p className="mt-4 max-w-24 text-center text-sm">
                      {match.awayTeam.shortName || match.awayTeam.name}
                    </p>
                  </Link>
                  <p className="text-center text-7xl">
                    {match.score.fullTime.away}
                  </p>
                </div>
              </div>
            </div>
            <h3 className="mt-2 text-center text-xl font-bold">
              {match.status === 'FINISHED' && 'FT'}
              {match.status === 'PAUSED' && 'HT'}
            </h3>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
