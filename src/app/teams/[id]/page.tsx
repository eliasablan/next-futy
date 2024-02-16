import React from 'react'
import { fetchTeam, fetchMatches } from '@/lib/data/queries'
import { Team } from '@/lib/types/team'
import TeamCard from '@/components/TeamCard'
import PlayersCard from '@/components/PlayersCard'
import MatchesCard from '@/components/MatchesCard'
import { Match } from '@/lib/types/match'

const TeamPage = async ({ params }: { params: { id: number } }) => {
  const team: Team = await fetchTeam(params.id)
  const matches: Match[] = await fetchMatches(params.id)
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <h1 className="col-span-1 text-3xl font-semibold lg:col-span-2">
        {team.name}
      </h1>
      <div className="grid h-fit gap-4">
        <TeamCard team={team} />
        <MatchesCard matches={matches} />
      </div>
      <PlayersCard players={team.squad} />
    </div>
  )
}

export default TeamPage
