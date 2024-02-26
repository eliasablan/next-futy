'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { LeagueStanding } from '@/lib/types/standing'
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { fetchStandings } from '@/lib/actions'

export default function StandingsCard({ code }: { code: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [standings, setStandings] = useState<LeagueStanding | null>(null)

  useEffect(() => {
    fetchStandings(code)
      .then((res) => {
        setStandings(res)
      })
      .then(() => setIsLoading(false))
  }, [code])

  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="py-3">
          <CollapsibleTrigger className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Standings</CardTitle>
            <CaretSortIcon className="h-6 w-6" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t px-6 py-3">
            {isLoading && <p>Loading standings</p>}

            {standings?.competition.type === 'LEAGUE' && (
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
                  {standings.standings[0].table.map((teamStanding) => (
                    <TableRow key={teamStanding.position}>
                      <TableCell>
                        <Link href={`/teams/${teamStanding.team.id}`}>
                          <div className="flex h-fit items-center justify-start pr-4">
                            {teamStanding.team.crest && (
                              <Image
                                src={teamStanding.team.crest}
                                className="mr-2"
                                width={22}
                                height={22}
                                alt={teamStanding.team.shortName}
                              />
                            )}
                            {teamStanding.team.shortName}
                          </div>
                        </Link>
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
            )}
            {standings?.competition.type === 'CUP' &&
              standings.standings.map((standing) => (
                <div key={standing.group} className="py-4">
                  <div className="border-b pb-2 sm:flex sm:items-center sm:justify-between">
                    <h2
                      key={standing.group}
                      className="text-base font-normal"
                    >
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
                      {standing.table.map((teamStanding) => (
                        <TableRow key={teamStanding.position}>
                          <TableCell>
                            <Link href={`/teams/${teamStanding.team.id}`}>
                              <div className="flex h-fit items-center justify-start pr-4">
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
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>{teamStanding.points}</TableCell>
                          <TableCell>{teamStanding.playedGames}</TableCell>
                          <TableCell>{teamStanding.won}</TableCell>
                          <TableCell>{teamStanding.draw}</TableCell>
                          <TableCell>{teamStanding.lost}</TableCell>
                          <TableCell>
                            {teamStanding.goalDifference}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
