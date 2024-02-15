import React from 'react'
import LeaguesCard from '@/components/LeaguesCard'

const Leagues = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <LeaguesCard />
    </div>
  )
}

export default Leagues
