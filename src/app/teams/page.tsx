import React from 'react'
import TeamsCard from '@/components/TeamsCard'
import { SearchParams } from '@/lib/types/searchParams'
import SearchBar from '@/components/SearchBar'

const Teams = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <>
      <SearchBar />
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <TeamsCard searchParams={searchParams} />
      </div>
    </>
  )
}

export default Teams
