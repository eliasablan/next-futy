import React from 'react'
import { fetchMatch } from '@/lib/data/queries'
import { Match } from '@/lib/types/match'
import MatchSummaryCard from '@/components/MatchSummaryCard'

const MatchPage = async ({ params }: { params: { id: number } }) => {
  const match: Match = await fetchMatch(params.id)
  console.log({ match })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="grid h-fit gap-4">
        {/* {match.homeTeam.name} vs {match.awayTeam.name} */}
        <MatchSummaryCard match={match} />
        {/* <MatchesCard matches={matches} /> */}
      </div>
      {/* <PlayersCard players={team.squad} /> */}
    </div>
  )
}

export default MatchPage
