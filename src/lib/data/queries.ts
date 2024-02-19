'use server'
import { DateRange } from 'react-day-picker'
import { formatearDateRange } from '../utils'
import { LeagueStanding } from '../types/standing'

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

export const fetchMatch = async (id: number) => {
  const team_url = process.env.FOOTBALL_DATA_ORG_URL + 'matches/' + id
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(team_url, {
    cache: 'no-store',
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
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
  const data = await res.json()
  return data.matches
}
