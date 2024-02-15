import React from 'react'
import TeamsCard from '@/components/TeamsCard'
import { SearchParams } from '@/lib/types/searchParams'

const Teams = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}

export default Teams
