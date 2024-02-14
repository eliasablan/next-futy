import React from 'react'
import { League } from '@/lib/types/league'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Button } from './ui/button'

import Link from 'next/link'
import Image from 'next/image'
import { fetchLeagues } from '@/lib/data/queries'

export default async function LeaguesCard() {
  const leagues: League[] = await fetchLeagues()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leagues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="mx-auto mt-2 grid w-full grid-cols-2 justify-items-center gap-2 xs:grid-cols-3">
            {leagues &&
              leagues.map((league) => (
                <Button
                  key={league.id}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-40 w-full border px-2"
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
                    <span className="mt-5 w-full overflow-hidden text-ellipsis text-wrap ">
                      {league.name ? league.name : 'Not found'}
                    </span>
                  </Link>
                </Button>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
