import React from 'react'
import { fetchMatch } from '@/lib/data/queries'
import MatchSummaryCard from '@/components/MatchSummaryCard'

const MatchPage = async ({ params }: { params: { id: number } }) => {
  const match = await fetchMatch(params.id)
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-2xl font-semibold lg:col-span-2">
        {match.homeTeam.shortName || match.homeTeam.name}
        {' vs. '}
        {match.awayTeam.shortName || match.awayTeam.name}
      </h1>
      <div className="grid h-fit gap-4">
        <MatchSummaryCard match={match} />
      </div>
    </div>
  )
}

export default MatchPage
