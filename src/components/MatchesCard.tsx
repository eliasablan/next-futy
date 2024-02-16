import React from 'react'
import { cn, formatearFecha } from '@/lib/utils'
import { Match } from '@/lib/types/match'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'

export default function MatchesCard({
  matches,
}: {
  matches?: Match[] | any
}) {
  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-xl">Games</CardTitle>
          <CollapsibleTrigger className="!mt-1">
            <CaretSortIcon className="h-8 w-8" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t pt-3">
            {matches.length === 0 && (
              <p className="mx-2">No games in the current week</p>
            )}
            {matches.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Home</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-right">Away</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match: Match) => (
                    <TableRow
                      key={match.id}
                      className={cn(
                        match.status === 'IN_PLAY' && 'bg-secondary',
                        match.status === 'PAUSED' && 'bg-destructive'
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center justify-start font-medium">
                          <Image
                            src={match.homeTeam.crest}
                            width={25}
                            height={25}
                            alt="Away Team Crest"
                          />
                          <span className="mx-2">
                            {match.homeTeam.shortName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        <p className="text-xs font-normal">
                          {match.status === 'TIMED' &&
                            formatearFecha(match.utcDate).split(' ')[1]}
                          {match.status === 'IN_PLAY' && 'Live'}
                          {match.status === 'PAUSED' && 'Pause'}
                          {match.status === 'FINISHED' && 'FT'}
                        </p>
                        <p>
                          {match.status === 'TIMED' &&
                            formatearFecha(match.utcDate)
                              .split(' ')[0]
                              .substring(0, 5)}
                          {match.status !== 'TIMED' &&
                            match.score.fullTime.home +
                              '-' +
                              match.score.fullTime.away}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end font-medium">
                          <span className="mx-2">
                            {match.awayTeam.shortName}
                          </span>
                          <Image
                            src={match.awayTeam.crest}
                            width={25}
                            height={25}
                            alt="Away Team Crest"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
