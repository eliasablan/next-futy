export interface LeagueStanding {
  position: number
  team: StandingTeam
  playedGames: number
  form: any
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export interface StandingTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

export interface CupGroup {
  stage: string
  type: string
  group: string
  table: Table[]
}

export interface Table {
  position: number
  team: GroupTeam
  playedGames: number
  form: any
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export interface GroupTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}
