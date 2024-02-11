import React from 'react'
import StandingsCard from '@/components/StandingsCard'
import {
  fetchCompetitionStandings,
  fetchCompetitionMatches,
} from '@/lib/data/queries'
import MatchesCard from '@/components/MatchesCard'

export default async function LeaguePage({
  params,
}: {
  params: { code: string }
}) {
  const standings = await fetchCompetitionStandings(params.code)
  const matches = await fetchCompetitionMatches(params.code)

  return (
    <>
      <section className="flex w-full flex-col px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-medium">
            {standings.competition.name}
          </h2>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <MatchesCard matches={matches.matches} />
        <StandingsCard
          type={standings.competition.type}
          standings={standings.standings}
        />
      </section>
    </>
  )
}
