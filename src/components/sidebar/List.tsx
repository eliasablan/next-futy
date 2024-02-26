import React from 'react'
import { getServerSession } from 'next-auth'

import { SidebarItem } from '@/components/sidebar/SidebarItem'

type DataFetch = {
  ok: boolean
  data: FollowingsType
}

type FollowingsType = {
  teams: string[]
  leagues: string[]
  players: string[]
}

type User = {
  email: string
  name: string
  image: string
}

async function getData(session: { user: User }): Promise<DataFetch> {
  const res = await fetch(
    `${process.env.VERCEL_URL}/api/user/${session.user.email}`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function List() {
  const session: { user: User } | null = await getServerSession()
  if (!session) return null

  const sidebarFollowings = await getData(session)
  return (
    <>
      {sidebarFollowings.data.leagues.length > 0 && (
        <div className="w-full bg-secondary-foreground py-2 text-center text-sm text-secondary">
          Competitions
        </div>
      )}
      {sidebarFollowings.data.leagues.map((code: string) => (
        <SidebarItem key={`leagues:${code}`} type="leagues" id={code} />
      ))}
      {sidebarFollowings.data.teams.length > 0 && (
        <div className="w-full bg-secondary-foreground py-2 text-center text-sm text-secondary">
          Teams
        </div>
      )}
      {sidebarFollowings.data.teams.map((id: string) => (
        <SidebarItem key={`teams:${id}`} type="teams" id={id} />
      ))}

      {sidebarFollowings.data.players.length > 0 && (
        <div className="w-full bg-secondary-foreground py-2 text-center text-sm text-secondary">
          Players
        </div>
      )}
      {sidebarFollowings.data.players.map((id: string) => (
        <SidebarItem key={`players:${id}`} type="players" id={id} />
      ))}
    </>
  )
}
