import React from 'react'
import { fetchLeague } from '@/lib/actions'
import StandingsCard from '@/components/StandingsCard'
import MatchesCard from '@/components/MatchesCard'
import LeagueCard from '@/components/LeagueCard'

export default async function LeaguePage({
  params,
}: {
  params: { code: string }
}) {
  const league = await fetchLeague(params.code)
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-2xl font-semibold lg:col-span-2">
        {league.name}
      </h1>
      <div className="grid h-fit gap-4">
        <LeagueCard league={league} />
        <MatchesCard code={params.code} />
      </div>
      <StandingsCard code={params.code} />
    </div>
  )
}
