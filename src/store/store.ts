import { create } from 'zustand'
import { DixitGame, Rules, STATUS_TYPE, Scores, initializeGame } from '../models/game'
import { uuid } from '../utils/uuid'
import createSelectors from './selector'
import { GUESS_TYPE, Votes } from '../models/vote'

type State = DixitGame

type Action = {
  startGame: (playerNames: string[], rules: Rules) => void
  nextRound: (votes: Votes) => void
  updateRound: (roundIdx: number, scores: Scores) => void
}

type GameState = State & Action

const store = create<GameState>()((set, get) => ({
  ...initializeGame,
  startGame: (playerNames: string[], rules: Rules) => {
    const players = playerNames.map((name) => ({ name, id: uuid() }))

    set({
      players,
      rules,
      currentRound: 0,
      status: STATUS_TYPE.PROGRESS,
      totals: players.map(() => 0),
    })
  },
  nextRound: (votes: Votes) => {
    const { currentRound, players, history, totals, rules } = get()
    const storyteller = players[currentRound % players.length]

    const isFull = new Set(Object.values(votes).map(({ guess }) => guess)).size === 1
    const newScore = Object.entries(votes).reduce((acc: Scores, [playerId, vote]) => {
      const { guess } = vote
      const calculateScore = () => {
        if (isFull) {
          return storyteller.id === playerId ? 0 : rules.fullPoints
        } else {
          return storyteller.id === playerId
            ? rules.partialPoints
            : guess === GUESS_TYPE.CORRECT
              ? rules.partialPoints
              : 0
        }
      }

      return {
        ...acc,
        [playerId]: calculateScore(),
        ...(guess === GUESS_TYPE.INCORRECT ? { [vote.votedFor]: acc[vote.votedFor] + 1 } : {}),
      }
    }, {})

    set({
      currentRound: currentRound + 1,
      history: [...history, { round: currentRound + 1, storyteller, votes, scores: newScore }],
      totals: players.map(({ id }, idx) => totals[idx] + newScore[id]),
    })
  },

  updateRound: (roundIdx: number, scores: Scores) => {
    const { history, players, totals } = get()
    if (!history[roundIdx]) return

    const newHistory = history.map((prevHistory, idx) => {
      return roundIdx === idx
        ? { ...prevHistory, scores: { ...prevHistory.scores, ...scores } }
        : prevHistory
    })

    const updatedTotals = players.map(({ id }, idx) => {
      const prevScore = history[roundIdx]?.scores[id] || 0
      return id in scores ? totals[idx] - prevScore + scores[id] : totals[idx]
    })

    set({
      history: newHistory,
      totals: updatedTotals,
    })
  },
}))

export const useStore = createSelectors(store)
