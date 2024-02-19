import LeaguesCard from '@/components/LeaguesCard'
import MatchesCard from '@/components/MatchesCard'
import TeamsCard from '@/components/TeamsCard'

import { SearchParams } from '@/lib/types/searchParams'

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-2xl font-semibold lg:col-span-2">
        Home
      </h1>
      <div className="grid h-fit gap-4">
        <MatchesCard />
        <LeaguesCard />
      </div>
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}

export default Home
