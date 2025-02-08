export const GUESS_TYPE = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
} as const

export type Votes = {
  [playerId: string]: Vote
}

export type Vote =
  | { guess: typeof GUESS_TYPE.CORRECT }
  | { guess: typeof GUESS_TYPE.INCORRECT; votedFor: string }
