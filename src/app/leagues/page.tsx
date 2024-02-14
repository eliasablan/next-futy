import React from 'react'
import LeaguesCard from '@/components/LeaguesCard'
import SearchBar from '@/components/SearchBar'

const Leagues = () => {
  return (
    <>
      <SearchBar />
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 2xl:grid-cols-3">
        <LeaguesCard />
      </div>
    </>
  )
}

export default Leagues
