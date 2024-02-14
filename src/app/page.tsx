import LeaguesCard from '@/components/LeaguesCard'
import MatchesCard from '@/components/MatchesCard'
import TeamsCard from '@/components/TeamsCard'
import { SearchParams } from '@/lib/types/searchParams'
import { fetchDayMatches } from '@/lib/data/queries'

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const matches = await fetchDayMatches()

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 2xl:grid-cols-3">
      <MatchesCard matches={matches.matches} />
      <LeaguesCard />
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}
