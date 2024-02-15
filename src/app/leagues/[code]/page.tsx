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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <MatchesCard matches={matches.matches} />
      <StandingsCard
        type={standings.competition.type}
        standings={standings.standings}
      />
    </div>
  )
}
