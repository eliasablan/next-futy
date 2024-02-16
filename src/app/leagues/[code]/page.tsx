import React from 'react'
import StandingsCard from '@/components/StandingsCard'
import {
  fetchCompetitionStandings,
  fetchCompetitionMatches,
  fetchLeague,
} from '@/lib/data/queries'
import MatchesCard from '@/components/MatchesCard'

export default async function LeaguePage({
  params,
}: {
  params: { code: string }
}) {
  const league = await fetchLeague(params.code)
  const standings = await fetchCompetitionStandings(params.code)
  const matches = await fetchCompetitionMatches(params.code)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-3xl font-semibold lg:col-span-2">
        {league.name}
      </h1>
      <MatchesCard matches={matches.matches} />
      <StandingsCard
        type={standings.competition.type}
        standings={standings.standings}
      />
    </div>
  )
}
