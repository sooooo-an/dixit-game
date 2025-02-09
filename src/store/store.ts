import { create } from 'zustand'
import { DixitGame, STATUS_TYPE, Scores, initializeGame } from '../models/game'
import createSelectors from './selector'
import { GUESS_TYPE, Votes } from '../models/vote'
import { Rules } from '../models/rules'
import { Player } from '../models/player'

type State = DixitGame

type Action = {
  setRules: (rules: Rules) => void
  startGame: (players: Player[]) => void
  nextRound: (votes: Votes) => void
}

type GameState = State & Action

const store = create<GameState>()((set, get) => ({
  ...initializeGame,
  setRules: (rules: Rules) =>
    set({
      rules,
    }),
  startGame: (players: Player[]) => {
    set({
      players,
      currentRound: 0,
      currentStoryteller: players[0],
      status: STATUS_TYPE.PROGRESS,
      totals: new Array(players.length).fill(0),
    })
  },
  nextRound: (votes: Votes) => {
    const { currentRound, players, history, totals, rules } = get()
    const storyteller = players[currentRound % players.length]
    const newScore = nextRoundScoreCalculator(votes, players, storyteller.id, rules)
    const newTotals = totals.map((score, idx) => score + newScore[players[idx].id])
    const isGameOver = newTotals.some((score) => score >= rules.winScore)

    set({
      currentRound: currentRound + 1,
      currentStoryteller: players[(currentRound + 1) % players.length],
      history: [...history, { round: currentRound + 1, storyteller, scores: newScore }],
      totals: newTotals,
      status: isGameOver ? STATUS_TYPE.COMPLETED : STATUS_TYPE.PROGRESS,
    })
  },
}))

export const useGameStore = createSelectors(store)

const nextRoundScoreCalculator = (
  votes: Votes,
  players: Player[],
  storytellerId: string,
  rules: Rules
): Scores => {
  const scores: Scores = players.reduce((acc, { id }) => ({ ...acc, [id]: 0 }), {})
  const isFull = new Set(Object.values(votes).map(({ guess }) => guess)).size === 1
  const { fullPoints, partialPoints, bonusPerVote } = rules

  Object.entries(votes).forEach(([playerId, vote]) => {
    if (playerId !== storytellerId) {
      scores[playerId] += isFull
        ? fullPoints
        : vote.guess === GUESS_TYPE.CORRECT
          ? partialPoints
          : 0
    }

    if (!isFull && vote.guess === GUESS_TYPE.CORRECT) {
      scores[storytellerId] = partialPoints
    }

    if (vote.guess === GUESS_TYPE.INCORRECT && vote.votedFor in scores) {
      scores[vote.votedFor] += bonusPerVote
    }
  })

  return scores
}
