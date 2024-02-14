import React from 'react'
import MatchesCard from '@/components/MatchesCard'
import SearchBar from '@/components/SearchBar'
import { fetchDayMatches } from '@/lib/data/queries'

export default async function Games() {
  const matches = await fetchDayMatches()

  return (
    <>
      <SearchBar />
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <MatchesCard matches={matches.matches} />
      </div>
    </>
  )
}
