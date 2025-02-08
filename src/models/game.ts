import { Player } from './player'
import { Votes } from './vote'

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
  scores: Scores
  votes: Votes
}

export type Rules = {
  partialPoints: number
  fullPoints: number
  bonusPerVote: number
  winScore: number
}

export type DixitGame = {
  players: Player[]
  totals: number[]
  currentRound: number
  history: History[]
  rules: Rules
  winner?: Player
  status: Status
}

export const initializeRule: Rules = {
  partialPoints: 3,
  fullPoints: 2,
  bonusPerVote: 1,
  winScore: 30,
}

export const initializeGame: DixitGame = {
  players: [],
  totals: [],
  currentRound: 0,
  history: [],
  rules: initializeRule,
  status: STATUS_TYPE.PENDING,
}
