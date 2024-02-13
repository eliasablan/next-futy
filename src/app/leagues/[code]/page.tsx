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
      <h2 className="px-6 text-2xl font-medium">
        {standings.competition.name}
      </h2>
      <section className="grid grid-cols-1 gap-8 px-6 pb-12 md:grid-cols-2">
        <MatchesCard matches={matches.matches} />
        <StandingsCard
          type={standings.competition.type}
          standings={standings.standings}
        />
      </section>
    </>
  )
}
