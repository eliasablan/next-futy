import React from 'react'
import { formatearFecha } from '@/lib/utils'
import { Match } from '@/lib/types/match'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'

export default function MatchesCard({
  matches,
}: {
  matches?: Match[] | any
}) {
  if (matches.length === 0) {
    return (
      <div className="rounded-lg bg-white px-8 py-6 shadow-md shadow-gray-200 md:col-span-1 md:row-span-1">
        <div className="border-b border-gray-100 pb-2 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-medium text-gray-700">Games</h2>
        </div>
        <div className="mt-2 text-center">
          No games played or to be played in the current week
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-lg bg-white px-8 py-6 shadow-md shadow-gray-200 md:col-span-1 md:row-span-1">
      <div className="border-b border-gray-100 pb-2 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-medium text-gray-700">Games</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Home Team</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-right">Away Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match: Match) => {
            if (match.status === 'TIMED' || match.status === 'FINISHED')
              return (
                <TableRow key={match.id}>
                  <TableCell className="flex items-start justify-start gap-x-3">
                    <Image
                      src={match.homeTeam.crest}
                      width={25}
                      height={25}
                      alt="Away Team Crest"
                    />
                    <p>{match.homeTeam.shortName}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    {match.status !== 'FINISHED'
                      ? formatearFecha(match.utcDate)
                          .split(' ')
                          .map((element) => (
                            <p key={Math.random()}>{element}</p>
                          ))
                      : match.score.fullTime.home +
                        '-' +
                        match.score.fullTime.away}
                  </TableCell>
                  <TableCell className="flex items-start justify-end gap-x-3">
                    <Image
                      src={match.awayTeam.crest}
                      width={25}
                      height={25}
                      alt="Away Team Crest"
                    />
                    <p>{match.awayTeam.shortName}</p>
                  </TableCell>
                </TableRow>
              )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
