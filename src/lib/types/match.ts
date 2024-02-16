export interface CardMatch {
  area: Area
  competition: Competition
  season: Season
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  group: any
  lastUpdated: string
  homeTeam: HomeTeam
  awayTeam: AwayTeam
  score: Score
  odds: Odds
  referees: Referee[]
}

export interface Match {
  area: Area
  competition: Competition
  season: Season
  id: number
  utcDate: string
  status: string
  minute?: number
  injuryTime?: number
  attendance?: number
  venue: string
  matchday: number
  stage: string
  group: any
  lastUpdated: string
  homeTeam: HomeTeam
  awayTeam: AwayTeam
  score: Score
  goals?: Goal[]
  penalties?: any[]
  bookings?: Booking[]
  substitutions?: Substitution[]
  odds: Odds
  referees: Referee[]
}

export interface Area {
  id: number
  name: string
  code: string
  flag: string
}

export interface Competition {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

export interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: any
}

export interface HomeTeam {
  id: number
  name: string
  shortName: string
  tla: string | null
  crest: string
}

export interface AwayTeam {
  id: number
  name: string
  shortName: string
  tla: string | null
  crest: string
}

export interface Score {
  winner: string
  duration: string
  fullTime: FullTime
  halfTime: HalfTime
}

export interface FullTime {
  home: number
  away: number
}

export interface HalfTime {
  home: number
  away: number
}

export interface Odds {
  msg: string
}

export interface Referee {
  id: number
  name: string
  type: string
  nationality: string
}

export interface Goal {
  minute: number
  injuryTime: any
  type: string
  team: Team
  scorer: Scorer
  assist: Assist
  score: Score2
}

export interface Booking {
  minute: number
  team: Team2
  player: Player
  card: string
}

export interface Substitution {
  minute: number
  team: Team3
  playerOut: PlayerOut
  playerIn: PlayerIn
}

export interface Team {
  id: number
  name: string
}

export interface Scorer {
  id: number
  name: string
}

export interface Assist {
  id: number
  name: string
}

export interface Team2 {
  id: number
  name: string
}

export interface Player {
  id: number
  name: string
}

export interface Score2 {
  home: number
  away: number
}

export interface Team3 {
  id: number
  name: string
}

export interface PlayerOut {
  id: number
  name: string
}

export interface PlayerIn {
  id: number
  name: string
}
