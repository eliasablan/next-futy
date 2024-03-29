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
import { CaretSortIcon } from '@radix-ui/react-icons'

import Image from 'next/image'
import { Team } from '@/lib/types/team'
import FollowButton from './FollowButton'

export default async function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="h-fit">
      <Collapsible defaultOpen>
        <CardHeader className="py-3">
          <CollapsibleTrigger className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">About</CardTitle>
            <CaretSortIcon className="h-6 w-6" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="border-t">
            <div className="flex flex-col items-center pt-4">
              <Image
                src={team.crest}
                alt={team.name}
                width={200}
                height={200}
              />
              <p className="inline-flex gap-3 pt-4 font-semibold">
                {team.area?.flag && (
                  <Image
                    src={team.area.flag}
                    alt={team.area.name}
                    width={20}
                    height={20}
                  />
                )}
                {team.name}
              </p>
              <p className="pt-2">
                {team.coach?.name && (
                  <p>
                    <b>Coach: </b>
                    {team.coach.name}
                  </p>
                )}
              </p>
              <p className="pt-2">
                {team.venue && (
                  <p>
                    <b>Stadium: </b>
                    {team.venue}
                  </p>
                )}
              </p>
              <p className="pt-2">
                <b>Foundation: </b>
                {team.founded}
              </p>
              <FollowButton
                type="teams"
                id={team.id.toString()}
                name={team.name}
                emblem={team.crest}
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
