import React from 'react'
import LeaguesCard from '@/components/LeaguesCard'

const Leagues = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-3xl font-semibold lg:col-span-2">
        Leagues
      </h1>
      <LeaguesCard />
    </div>
  )
}

export default Leagues
