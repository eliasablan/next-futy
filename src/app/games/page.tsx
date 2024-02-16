import React from 'react'
import MatchesCard from '@/components/MatchesCard'
import { fetchDayMatches } from '@/lib/data/queries'

const Games = async () => {
  const matches = await fetchDayMatches()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-2xl font-semibold lg:col-span-2">
        Games
      </h1>
      <MatchesCard matches={matches.matches} />
    </div>
  )
}

export default Games
