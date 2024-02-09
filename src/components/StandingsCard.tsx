import React from 'react'
import Image from 'next/image'
import { CupGroup, LeagueStanding } from '@/lib/types/standing'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function StandingsCard({
  type,
  standings,
}: {
  type: string | any
  standings: LeagueStanding[] | any
}) {
  if (type == 'LEAGUE') {
    return (
      <div className="rounded-lg bg-white px-8 py-6 shadow-md shadow-gray-200 md:col-span-1 md:row-span-1">
        <div className="border-b border-gray-100 pb-2 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-medium text-gray-700">Standings</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Team</TableHead>
              <TableHead>PG</TableHead>
              <TableHead>W</TableHead>
              <TableHead>D</TableHead>
              <TableHead>L</TableHead>
              <TableHead>GD</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings[0].table.map((teamStanding: LeagueStanding) => (
              <TableRow key={teamStanding.position}>
                <TableCell className="flex w-48 font-medium">
                  {teamStanding.team.crest && (
                    <Image
                      src={teamStanding.team.crest}
                      className="mr-2"
                      width={25}
                      height={25}
                      alt="Team Crest"
                    />
                  )}
                  {teamStanding.team.shortName}
                </TableCell>
                <TableCell>{teamStanding.playedGames}</TableCell>
                <TableCell>{teamStanding.won}</TableCell>
                <TableCell>{teamStanding.draw}</TableCell>
                <TableCell>{teamStanding.lost}</TableCell>
                <TableCell>{teamStanding.goalDifference}</TableCell>
                <TableCell className="text-right">
                  {teamStanding.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  // console.log(standings[0].table[0])
  if (type == 'CUP') {
    return (
      <>
        <div className="rounded-lg bg-white px-8 py-6 shadow-md shadow-gray-200 md:col-span-1 md:row-span-1">
          <div className="border-b border-gray-100 pb-2 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-medium text-gray-700">
              Standings
            </h2>
          </div>
          {standings.map((standing: CupGroup) => (
            <div key={standing.group} className="py-4">
              <div className="border-b border-gray-100 pb-2 sm:flex sm:items-center sm:justify-between">
                <h2
                  key={standing.group}
                  className="font-medium text-gray-700"
                >
                  {standing.group}
                </h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Team</TableHead>
                    <TableHead>PG</TableHead>
                    <TableHead>W</TableHead>
                    <TableHead>D</TableHead>
                    <TableHead>L</TableHead>
                    <TableHead>GD</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standing.table.map((teamStanding: LeagueStanding) => (
                    <TableRow key={teamStanding.position}>
                      <TableCell className="flex w-48 font-medium">
                        {teamStanding.team.crest && (
                          <Image
                            src={teamStanding.team.crest}
                            className="mr-2"
                            width={25}
                            height={25}
                            alt="Team Crest"
                          />
                        )}
                        {teamStanding.team.shortName}
                      </TableCell>
                      <TableCell>{teamStanding.playedGames}</TableCell>
                      <TableCell>{teamStanding.won}</TableCell>
                      <TableCell>{teamStanding.draw}</TableCell>
                      <TableCell>{teamStanding.lost}</TableCell>
                      <TableCell>{teamStanding.goalDifference}</TableCell>
                      <TableCell className="text-right">
                        {teamStanding.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </>
    )
  }
}
