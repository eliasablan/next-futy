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

export default function MatchesCard({
  matches,
}: {
  matches?: Match[] | any
}) {
  if (matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 text-center">
            No games played or to be played in the current week
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Games</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Home</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-right">Away</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match: Match) => {
              if (
                match.status === 'TIMED' ||
                match.status === 'FINISHED' ||
                match.status === 'IN_PLAY' ||
                match.status === 'PAUSED'
              )
                return (
                  <TableRow
                    key={match.id}
                    className={cn(
                      'h-10',
                      match.status === 'IN_PLAY' && 'bg-secondary',
                      match.status === 'PAUSED' && 'bg-destructive'
                    )}
                  >
                    <TableCell>
                      <div className="flex justify-start font-medium">
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
                      <div className="flex justify-end font-medium">
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
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
