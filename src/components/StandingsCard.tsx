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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function StandingsCard({
  type,
  standings,
}: {
  type: string | any
  standings: LeagueStanding[] | any
}) {
  if (type == 'LEAGUE') {
    return (
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-xl">Standings</CardTitle>
        </CardHeader>
        <CardContent className="border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Pts</TableHead>
                <TableHead>G</TableHead>
                <TableHead>W</TableHead>
                <TableHead>D</TableHead>
                <TableHead>L</TableHead>
                <TableHead>{'+/-'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings[0].table.map((teamStanding: LeagueStanding) => (
                <TableRow key={teamStanding.position}>
                  <TableCell>
                    <div className="flex h-6 justify-start">
                      {teamStanding.team.crest && (
                        <Image
                          src={teamStanding.team.crest}
                          className="mr-2"
                          h-6
                          width={22}
                          height={22}
                          alt={teamStanding.team.shortName}
                        />
                      )}
                      {teamStanding.team.shortName}
                    </div>
                  </TableCell>
                  <TableCell>{teamStanding.points}</TableCell>
                  <TableCell>{teamStanding.playedGames}</TableCell>
                  <TableCell>{teamStanding.won}</TableCell>
                  <TableCell>{teamStanding.draw}</TableCell>
                  <TableCell>{teamStanding.lost}</TableCell>
                  <TableCell>{teamStanding.goalDifference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  if (type == 'CUP') {
    return (
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-xl">Standings</CardTitle>
        </CardHeader>
        <CardContent className="border-t">
          {standings.map((standing: CupGroup) => (
            <div key={standing.group} className="py-4">
              <div className="border-b pb-2 sm:flex sm:items-center sm:justify-between">
                <h2 key={standing.group} className="text-base font-normal">
                  {standing.group}
                </h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Pts</TableHead>
                    <TableHead>G</TableHead>
                    <TableHead>W</TableHead>
                    <TableHead>D</TableHead>
                    <TableHead>L</TableHead>
                    <TableHead>{'+/-'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standing.table.map((teamStanding: LeagueStanding) => (
                    <TableRow key={teamStanding.position}>
                      <TableCell className="flex w-40 px-2 font-medium">
                        {teamStanding.team.crest && (
                          <Image
                            src={teamStanding.team.crest}
                            className="mr-2"
                            width={22}
                            height={22}
                            alt="Team Crest"
                          />
                        )}
                        {teamStanding.team.shortName}
                      </TableCell>
                      <TableCell>{teamStanding.points}</TableCell>
                      <TableCell>{teamStanding.playedGames}</TableCell>
                      <TableCell>{teamStanding.won}</TableCell>
                      <TableCell>{teamStanding.draw}</TableCell>
                      <TableCell>{teamStanding.lost}</TableCell>
                      <TableCell>{teamStanding.goalDifference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
}
