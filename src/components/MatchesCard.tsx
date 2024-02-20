'use client'
import React, { useEffect } from 'react'
import {
  cn,
  formatearFecha,
  obtenerPrimerDiaSemana,
  obtenerUltimoDiaSemana,
} from '@/lib/utils'

import { Match } from '@/lib/types/match'
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
} from '@/components/ui/collapsible'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { CaretSortIcon, CalendarIcon } from '@radix-ui/react-icons'

import Image from 'next/image'
import Link from 'next/link'
import { fetchMatches } from '@/lib/data/queries'

export default function MatchesCard({
  code,
  team,
}: {
  code?: string
  team?: number
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [matches, setMatches] = React.useState<Match[] | []>([])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: obtenerPrimerDiaSemana(new Date()),
    to: obtenerUltimoDiaSemana(new Date()),
  })

  useEffect(() => {
    fetchMatches(code, team, dateRange)
      .then((res) => {
        setMatches(res)
      })
      .then(() => setIsLoading(false))
  }, [code, team, dateRange])

  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="py-3">
          <CollapsibleTrigger className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Games</CardTitle>
            <CaretSortIcon className="h-6 w-6" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t pt-3">
            <div className="flex items-center justify-center gap-x-3 pb-3">
              <p className="text-sm">Filter by date:</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    disabled={isLoading}
                    variant={'outline'}
                    className={cn(
                      'justify-start text-left font-normal',
                      !dateRange && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd, y')} -{' '}
                          {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {(!matches || matches.length === 0) && !isLoading && (
              <p className="mx-2">No games in the range</p>
            )}
            {isLoading && 'Loading matches...'}
            {matches?.length > 0 && (
              <Accordion type="single" collapsible className="border-t">
                {matches.map((match: Match) => (
                  <AccordionItem
                    key={match.id}
                    value={match.id.toString()}
                    className={cn(
                      match.status === 'IN_PLAY' && 'bg-secondary',
                      match.status === 'PAUSED' && 'bg-destructive'
                    )}
                  >
                    <AccordionTrigger
                      className="grid grid-cols-3 py-2"
                      style={{ textDecoration: 'none' }}
                    >
                      <p className="flex items-center justify-end gap-2 text-ellipsis">
                        {match.homeTeam.name}
                        <Image
                          src={match.homeTeam.crest}
                          width={25}
                          height={25}
                          alt="Home Team Crest"
                        />
                      </p>
                      <div>
                        <p>
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
                      </div>
                      <p className="flex items-center justify-start gap-2 text-ellipsis">
                        <Image
                          src={match.awayTeam.crest}
                          width={25}
                          height={25}
                          alt="Away Team Crest"
                        />
                        {match.awayTeam.name}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col bg-accent p-2 text-center text-accent-foreground">
                      <div className="flex flex-col">
                        <p className="text-base font-semibold">
                          {match.competition.name}
                        </p>
                        <p>Matchday #{match.season.currentMatchday}</p>
                        <p>{format(match.utcDate, 'yyyy/MM/dd')}</p>
                        <Button className="mx-auto" variant="link" asChild>
                          <Link href={`/match/${match.id}`}>
                            go to match page
                          </Link>
                        </Button>
                      </div>
                      {match.status === 'FINISHED' && (
                        <div className="grid grid-cols-2 pt-1">
                          <p className="col-span-2 my-1 border-y-2 border-primary-foreground py-1 text-center text-base">
                            Full time
                          </p>
                          <p>{match.score.fullTime.home}</p>
                          <p>{match.score.fullTime.away}</p>
                          <p className="col-span-2 my-1 border-y-2 border-primary-foreground py-1 text-center text-base">
                            Half time
                          </p>
                          <p>{match.score.halfTime.home}</p>
                          <p>{match.score.halfTime.away}</p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
