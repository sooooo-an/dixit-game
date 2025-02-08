import { Player } from './player'
import { Votes } from './vote'

const STATUS_TYPE = {
  PENDING: 'pending',
  PROGRESS: 'progress',
  COMPLETED: 'completed',
} as const

type Status = (typeof STATUS_TYPE)[keyof typeof STATUS_TYPE]

type Scores = {
  [playerId: string]: number
}

type History = {
  round: number
  storyteller: Player
  scores: Scores
  votes: Votes
}

type Rules = {
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
  winner: Player
  status: Status
}
