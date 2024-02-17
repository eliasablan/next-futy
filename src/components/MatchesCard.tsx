import React from 'react'
import { cn, formatearFecha } from '@/lib/utils'
import { CardMatch } from '@/lib/types/match'
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

export default function MatchesCard({
  matches,
}: {
  matches: CardMatch[] | any
}) {
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
            {(!matches || matches.length === 0) && (
              <p className="mx-2">No games in the current week</p>
            )}
            {matches?.length > 0 && (
              <Accordion type="single" collapsible>
                {matches.map((match: CardMatch) => (
                  <AccordionItem
                    key={match.id}
                    value={match.id.toString()}
                    className={cn(
                      match.status === 'IN_PLAY' && 'bg-secondary',
                      match.status === 'PAUSED' && 'bg-destructive'
                    )}
                  >
                    <AccordionTrigger
                      className="grid grid-cols-3"
                      style={{ textDecoration: 'none' }}
                    >
                      <p className="flex items-center justify-end gap-2">
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
                      <p className="flex items-center justify-start gap-2">
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
              // <Table>
              //   <TableHeader>
              //     <TableRow>
              //       <TableHead className="text-left">Home</TableHead>
              //       <TableHead className="text-center">Score</TableHead>
              //       <TableHead className="text-right">Away</TableHead>
              //     </TableRow>
              //   </TableHeader>
              //   <TableBody>
              //     {matches.map((match: CardMatch) => (
              //       <TableRow
              //         key={match.id}
              //         className={cn(
              //           match.status === 'IN_PLAY' && 'bg-secondary',
              //           match.status === 'PAUSED' && 'bg-destructive'
              //         )}
              //       >
              //         <TableCell>
              //           <Link href={`/teams/${match.homeTeam.id}`}>
              //             <div className="flex items-center justify-start font-medium">
              //               <Image
              //                 src={match.homeTeam.crest}
              //                 width={25}
              //                 height={25}
              //                 alt="Away Team Crest"
              //               />
              //               <span className="mx-2">
              //                 {match.homeTeam.shortName}
              //               </span>
              //             </div>
              //           </Link>
              //         </TableCell>
              //         <TableCell className="text-center font-bold">
              //           <Link href={`/match/${match.id}`}>
              //             <p className="text-xs font-normal">
              // {match.status === 'TIMED' &&
              //   formatearFecha(match.utcDate).split(' ')[1]}
              // {match.status === 'IN_PLAY' && 'Live'}
              // {match.status === 'PAUSED' && 'Pause'}
              // {match.status === 'FINISHED' && 'FT'}
              //             </p>
              //             <p>
              //               {match.status === 'TIMED' &&
              //                 formatearFecha(match.utcDate)
              //                   .split(' ')[0]
              //                   .substring(0, 5)}
              //               {match.status !== 'TIMED' &&
              //                 match.score.fullTime.home +
              //                   '-' +
              //                   match.score.fullTime.away}
              //             </p>
              //           </Link>
              //         </TableCell>
              //         <TableCell>
              //           <Link href={`/teams/${match.awayTeam.id}`}>
              //             <div className="flex items-center justify-end font-medium">
              //               <span className="mx-2">
              //                 {match.awayTeam.shortName}
              //               </span>
              //               <Image
              //                 src={match.awayTeam.crest}
              //                 width={25}
              //                 height={25}
              //                 alt="Away Team Crest"
              //               />
              //             </div>
              //           </Link>
              //         </TableCell>
              //       </TableRow>
              //     ))}
              //   </TableBody>
              // </Table>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
