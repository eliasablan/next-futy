import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

import { fetchTeams } from '@/lib/data/queries'

import { Team } from '@/lib/types/team'
import { SearchParams } from '@/lib/types/searchParams'

export default async function TeamsCard({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const totalPages = 636
  const page = Number(searchParams.page) || 1
  const { teams }: { teams: Team[] } = await fetchTeams({ page })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Teams</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Table of teams */}
        <div className="relative">
          <div className="mx-auto mt-2 grid w-full grid-cols-2 justify-items-center gap-2 xs:grid-cols-3">
            {teams &&
              teams.map((team) => (
                <Button
                  key={team.id}
                  asChild
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-40 w-full border px-2',
                    !team.tla && 'pointer-events-none opacity-35'
                  )}
                >
                  <Link
                    className="flex flex-col text-center"
                    href={`/teams/${team.tla}`}
                  >
                    {team.crest && (
                      <Image
                        src={team.crest}
                        alt={team.name}
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="mt-5 w-full overflow-hidden text-ellipsis text-wrap">
                      {team.name ? team.name : 'Not found'}
                    </span>
                  </Link>
                </Button>
              ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="container mx-auto inline-block">
          <Pagination className="mt-6">
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${page - 1}`} />
                </PaginationItem>
              )}

              {page > 2 && (
                <PaginationItem>
                  <PaginationLink href={`?page=${page - 2}`}>
                    <PaginationEllipsis />
                  </PaginationLink>
                </PaginationItem>
              )}

              {page > 1 && (
                <PaginationItem>
                  <PaginationLink href={`?page=${page - 1}`}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  className="pointer-events-none opacity-50"
                  href={`?page=${page}`}
                  isActive
                >
                  {page}
                </PaginationLink>
              </PaginationItem>

              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink href={`?page=${page + 1}`}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink href={`?page=${page + 2}`}>
                    <PaginationEllipsis />
                  </PaginationLink>
                </PaginationItem>
              )}

              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}
