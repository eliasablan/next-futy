import LeaguesCard from '@/components/LeaguesCard'
import TeamsCard from '@/components/TeamsCard'
import { SearchParams } from '@/lib/types/searchParams'

export default function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 2xl:grid-cols-3">
      <LeaguesCard />
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}
