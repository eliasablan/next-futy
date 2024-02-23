import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './ui/collapsible'
import { Button } from './ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'

import Link from 'next/link'
import Image from 'next/image'
import { fetchCompetitions } from '@/lib/data/queries'

export default async function CompetitionsCard() {
  const { ok, message, competitions } = await fetchCompetitions()

  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="py-3">
          <CollapsibleTrigger className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Competitions</CardTitle>
            <CaretSortIcon className="h-6 w-6" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t">
            <div className="relative">
              <div className="mx-auto mt-2 grid w-full grid-cols-2 justify-items-center gap-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
                {ok ? (
                  competitions &&
                  competitions.map((competition) => (
                    <Button
                      key={competition.id}
                      asChild
                      variant="ghost"
                      size="icon"
                      className="flex h-32 w-full flex-col justify-center border px-2"
                    >
                      <Link
                        className="flex flex-col text-center"
                        href={`/competitions/${competition.code}`}
                      >
                        {competition.emblem && (
                          <Image
                            src={competition.emblem}
                            alt={competition.name}
                            width={40}
                            height={40}
                          />
                        )}
                        <span className="mt-2 w-full overflow-hidden text-ellipsis text-wrap">
                          {competition.name
                            ? competition.name
                            : 'Not found'}
                        </span>
                      </Link>
                    </Button>
                  ))
                ) : (
                  <div className="col-span-full text-center">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
