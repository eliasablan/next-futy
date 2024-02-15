import LeaguesCard from '@/components/LeaguesCard'
import MatchesCard from '@/components/MatchesCard'
import TeamsCard from '@/components/TeamsCard'
import { SearchParams } from '@/lib/types/searchParams'
import { fetchDayMatches } from '@/lib/data/queries'

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  const matches = await fetchDayMatches()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <MatchesCard matches={matches.matches} />
      <LeaguesCard />
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}

export default Home
