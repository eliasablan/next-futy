interface Area {
  id: number
  name: string
  code: string
  flag: string
}

interface CurrentSeason {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: any
}

export interface League {
  id: number
  area: Area
  name: string
  code: string
  type: string
  emblem: string
  plan: string
  currentSeason: CurrentSeason
  numberOfAvailableSeasons: number
  lastUpdated: string
}
