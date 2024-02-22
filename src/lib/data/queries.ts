'use server'
import { DateRange } from 'react-day-picker'
import { formatearDateRange } from '../utils'
import { LeagueStanding } from '../types/standing'
import { Match, Matches } from '../types/match'
import { kv } from '@vercel/kv'

export const fetchLeagues = async () => {
  const competitions_url =
    process.env.FOOTBALL_DATA_ORG_URL + 'competitions/' || ''
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(competitions_url, {
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
  return data.competitions
}

export const fetchLeague = async (code: string) => {
  const league_url =
    process.env.FOOTBALL_DATA_ORG_URL + 'competitions/' + code
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(league_url, {
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
  return data
}

export const fetchTeams = async ({ page = 1, limit = 12 }) => {
  const teams_url =
    process.env.FOOTBALL_DATA_ORG_URL +
    'teams/' +
    `?limit=${limit}` +
    `&offset=${(page - 1) * limit}`
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(teams_url, {
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
  return { teams: data.teams, offset: data.filters.offset }
}

export const fetchTeam = async (id: number) => {
  const team_url = process.env.FOOTBALL_DATA_ORG_URL + 'teams/' + id
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(team_url, {
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
  return data
}

export const fetchMatches = async (
  code: string | undefined,
  team: number | undefined,
  date: DateRange | undefined
) => {
  if (!process.env.FOOTBALL_DATA_ORG_URL) return []

  let matches_url = process.env.FOOTBALL_DATA_ORG_URL
  if (code) matches_url += 'competitions/' + code
  if (team) matches_url += 'teams/' + team
  matches_url += '/matches?' + formatearDateRange(date)

  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(matches_url, {
    cache: 'no-store',
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data: Matches = await res.json()
  return data.matches
}

export const fetchMatch = async (id: number) => {
  const team_url = process.env.FOOTBALL_DATA_ORG_URL + 'matches/' + id
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(team_url, {
    cache: 'no-store',
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data: Match = await res.json()
  return data
}

export const fetchStandings = async (code: string) => {
  const competition_url =
    `${process.env.FOOTBALL_DATA_ORG_URL}competitions/${code}/standings` ||
    ''
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(competition_url, {
    cache: 'no-store',
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data: LeagueStanding = await res.json()
  return data
}

export const isFollowing = async (
  type: string,
  id: string,
  session: any
): Promise<boolean> => {
  try {
    return (
      (await kv.sismember(
        `user:${session.user.email}:following:${type}`,
        id.toString()
      )) === 1
    )
  } catch (error) {
    return false
  }
}

export const followUnfollow = async (data: FormData, session: any) => {
  try {
    const action = data.get('action')
    const type = data.get('element_type')
    const id = data.get('id')
    const name = data.get('name')
    const emblem = data.get('emblem')
    let kvres = null
    if (action === 'follow') {
      // seguir equipo
      kvres = await kv.sadd(
        `user:${session.user.email}:following:${type}`,
        id
      )
      const existsInCache = await kv.exists(`data:${type}:${id}`)
      if (existsInCache === 0) {
        // actualizar datos
        // @ts-ignore
        storeFollowingData(type, id, name, emblem)
      }
    } else {
      // dejar de seguir equipo
      kvres = await kv.srem(
        `user:${session.user.email}:following:${type}`,
        id
      )
    }
    return { ok: kvres === 1, action }
  } catch (error) {
    return { ok: false, error }
  }
}

export const storeFollowingData = async (
  type: string,
  id: string,
  name: string,
  emblem: string
) => {
  try {
    const data = await kv.hset(`data:${type}:${id}`, {
      link: `/${type}/${id}`,
      name,
      emblem,
    })
    return data
  } catch (error) {
    return { ok: false, error }
  }
}

interface FollowingData {
  ok: boolean
  data?: {
    link: string
    name: string
    emblem: string
  }
  error?: any
}

export const getFollowingData = async (
  type: string,
  id: string
): Promise<FollowingData> => {
  try {
    const data = await kv.hgetall(`data:${type}:${id}`)

    // @ts-ignore
    return { ok: false, data }
  } catch (error) {
    return { ok: false, error }
  }
}
