import { obtenerSemanaActual } from '../utils'

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

export const fetchCompetitionStandings = async (code: string) => {
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
  const data = await res.json()
  return data
}

export const fetchCompetitionMatches = async (code: string) => {
  const competition_url =
    `${process.env.FOOTBALL_DATA_ORG_URL}competitions/${code}/matches?${obtenerSemanaActual()}` ||
    ''
  const auth_token = process.env.FOOTBALL_DATA_ORG_API_KEY || ''

  const res = await fetch(competition_url, {
    cache: 'no-store',
    headers: {
      'X-Auth-Token': auth_token,
    },
  })
  const data = await res.json()
  return data
}
