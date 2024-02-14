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
                      'h-20',
                      match.status === 'IN_PLAY' && 'bg-green-500',
                      match.status === 'PAUSED' && 'bg-yellow-500'
                    )}
                  >
                    <TableCell>
                      <div className="flex justify-start">
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

                    <TableCell className="text-center font-extrabold">
                      {match.status === 'TIMED'
                        ? formatearFecha(match.utcDate)
                            .split(' ')
                            .map((element) => (
                              <p key={Math.random()}>{element}</p>
                            ))
                        : match.score.fullTime.home +
                          '-' +
                          match.score.fullTime.away}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end">
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
