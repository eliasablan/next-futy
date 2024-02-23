import React from 'react'
import CompetitionsCard from '@/components/CompetitionsCard'

const Competitions = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-2xl font-semibold lg:col-span-2">
        Competitions
      </h1>
      <CompetitionsCard />
    </div>
  )
}

export default Competitions
