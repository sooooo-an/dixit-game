import { Player } from './player'
import { Rules, initializeRule } from './rules'

export const STATUS_TYPE = {
  PENDING: 'pending',
  PROGRESS: 'progress',
  COMPLETED: 'completed',
} as const

type Status = (typeof STATUS_TYPE)[keyof typeof STATUS_TYPE]

export type Scores = {
  [playerId: string]: number
}

type History = {
  round: number
  storyteller: Player
  // scores: number[]
  scores: Scores
}

export type DixitGame = {
  players: Player[]
  totals: number[]
  currentRound: number
  currentStoryteller: Player | null
  history: History[]
  rules: Rules
  winner?: Player
  status: Status
}

export const initializeGame: DixitGame = {
  players: [],
  totals: [],
  currentRound: 0,
  history: [],
  rules: initializeRule,
  status: STATUS_TYPE.PENDING,
  currentStoryteller: null,
}
