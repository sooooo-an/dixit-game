const GUESS_TYPE = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
} as const

type Vote = Record<
  string,
  { guess: typeof GUESS_TYPE.CORRECT } | { guess: typeof GUESS_TYPE.INCORRECT; votedFor: string }
>

export type Votes = {
  [playerId: string]: Vote
}
