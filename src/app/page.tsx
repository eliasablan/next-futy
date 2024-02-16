import LeaguesCard from '@/components/LeaguesCard'
import MatchesCard from '@/components/MatchesCard'
import TeamsCard from '@/components/TeamsCard'

import { fetchDayMatches } from '@/lib/data/queries'

import { SearchParams } from '@/lib/types/searchParams'
import { CardMatch } from '@/lib/types/match'

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  const matches: CardMatch[] = await fetchDayMatches()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-3xl font-semibold lg:col-span-2">
        Home
      </h1>
      <div className="grid h-fit gap-4">
        <MatchesCard matches={matches} />
        <LeaguesCard />
      </div>
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}

export default Home
