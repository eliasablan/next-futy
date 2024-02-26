'use server'

import { DateRange } from 'react-day-picker'
import { kv } from '@vercel/kv'

import { formatearDateRange } from './utils'

import { LeagueStanding } from './types/standing'
import { Match } from './types/match'
import { CardTeam } from './types/team'
import { League } from './types/league'

interface FetchCompetitionsData {
  ok: boolean
  competitions?: League[]
  code?: number
  message?: string
}

export const fetchCompetitions =
  async (): Promise<FetchCompetitionsData> => {
    const competitions_url =
      process.env.FOOTBALL_DATA_ORG_URL + 'competitions/' || ''
    const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

    const res = await fetch(competitions_url, {
      headers: {
        'X-Auth-Token': auth_token,
      },
    })
    const data = await res.json()
    if (data.errorCode) {
      return { ok: false, code: data.errorCode, message: data.message }
    }
    return { ok: true, competitions: data.competitions }
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

interface FetchTeamsData {
  ok: boolean
  teams?: CardTeam[]
  offset?: number
  code?: number
  message?: string
}

export const fetchTeams = async ({
  page = 1,
  limit = 12,
}): Promise<FetchTeamsData> => {
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
  if (data.errorCode) {
    return { ok: false, code: data.errorCode, message: data.message }
  }
  return { ok: true, teams: data.teams, offset: (page - 1) * limit }
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

interface FetchMatchesData {
  ok: boolean
  matches?: Match[]
  code?: number
  message?: string
}

export const fetchMatches = async (
  code: string | undefined,
  team: number | undefined,
  date: DateRange | undefined
): Promise<FetchMatchesData> => {
  let matches_url = process.env.FOOTBALL_DATA_ORG_URL || null
  if (matches_url) {
    if (code) matches_url += 'competitions/' + code
    if (team) matches_url += 'teams/' + team
    matches_url += '/matches?' + formatearDateRange(date)
  }

  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  if (!matches_url) {
    return { ok: false, code: 404, message: 'No API URL loaded' }
  }
  const res = await fetch(new URL(matches_url), {
    cache: 'no-store',
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
  if (data.errorCode) {
    return { ok: false, code: data.errorCode, message: data.message }
  }
  return { ok: true, matches: data.matches }
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

export const kvIsFollowing = async (
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

export const kvChangeFollowStatus = async (
  data: FormData,
  session: any
) => {
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
