import React from 'react'
import { Squad } from '@/lib/types/team'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'

export default async function PlayersCard({
  players,
}: {
  players: Squad[]
}) {
  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-xl leading-none">Squad</CardTitle>
          <CollapsibleTrigger className="!mt-1">
            <CaretSortIcon className="h-8 w-8" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t pt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Pos</TableHead>
                  <TableHead>Birth</TableHead>
                  <TableHead>Nat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players &&
                  players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>
                        {player.position === 'Goalkeeper'
                          ? 'GK'
                          : player.position === 'Defence'
                            ? 'DF'
                            : player.position === 'Midfield'
                              ? 'MF'
                              : player.position === 'Offence'
                                ? 'FW'
                                : player.position}
                      </TableCell>
                      <TableCell>
                        {player.dateOfBirth
                          .substring(2)
                          .split('-')
                          .reverse()
                          .join('/')}
                      </TableCell>
                      <TableCell>{player.nationality}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* <div className="mx-auto mt-2 grid w-full grid-cols-2 justify-items-center gap-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
                {leagues &&
                  leagues.map((league) => (
                    <Button
                      key={league.id}
                      asChild
                      variant="ghost"
                      size="icon"
                      className="flex h-32 w-full flex-col justify-center border px-2"
                    >
                      <Link
                        className="flex flex-col text-center"
                        href={`/leagues/${league.code}`}
                      >
                        {league.emblem && (
                          <Image
                            src={league.emblem}
                            alt={league.name}
                            width={40}
                            height={40}
                          />
                        )}
                        <span className="mt-2 w-full overflow-hidden text-ellipsis text-wrap">
                          {league.name ? league.name : 'Not found'}
                        </span>
                      </Link>
                    </Button>
                  ))}
              </div> */}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
