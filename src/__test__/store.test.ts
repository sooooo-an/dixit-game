import { useGameStore } from '../store/store'
import { STATUS_TYPE, initializeGame } from '../models/game'
import { act } from 'react'
import { GUESS_TYPE, Votes } from '../models/vote'

const mockPlayers = [
  { id: 'A', name: 'Alice' },
  { id: 'B', name: 'Bob' },
  { id: 'C', name: 'Charlie' },
  { id: 'D', name: 'David' },
]

const initializeTestStore = () => {
  useGameStore.setState({ ...initializeGame, players: mockPlayers })
  act(() => {
    useGameStore.getState().startGame(mockPlayers)
  })
}

describe('Game Store (Using Zustand Directly)', () => {
  beforeEach(() => {
    useGameStore.setState(initializeGame)
  })

  test('초기 상태가 올바르게 설정되어야 한다.', () => {
    const store = useGameStore.getState()
    expect(store.status).toBe(STATUS_TYPE.PENDING)
    expect(store.players).toEqual([])
    expect(store.currentRound).toBe(0)
  })

  test('startGame()가 호출되면 게임이 시작되어야 한다', () => {
    act(() => {
      useGameStore.getState().startGame(mockPlayers)
    })

    const updatedStore = useGameStore.getState()
    expect(updatedStore.status).toBe(STATUS_TYPE.PROGRESS)
    expect(updatedStore.players).toEqual(mockPlayers)
    expect(updatedStore.currentStoryteller).toEqual(mockPlayers[0])
    expect(updatedStore.totals.length).toEqual(mockPlayers.length)
  })
})

describe('nextRound() 기능 테스트', () => {
  beforeEach(initializeTestStore)

  const runNextRound = (mockVotes: Votes) => {
    act(() => {
      useGameStore.getState().nextRound(mockVotes)
    })
    return useGameStore.getState()
  }

  test('플레이어 모두 이야기꾼을 맞췄을 때', () => {
    const mockVotes: Votes = {
      B: { guess: GUESS_TYPE.CORRECT },
      C: { guess: GUESS_TYPE.CORRECT },
      D: { guess: GUESS_TYPE.CORRECT },
    }

    const updatedStore = runNextRound(mockVotes)

    expect(updatedStore.currentRound).toBe(1)
    expect(updatedStore.currentStoryteller?.id).toBe('B')
    expect(updatedStore.totals).toEqual([0, 2, 2, 2])
  })

  test('플레이어 모두 이야기꾼을 맞추지 못했을 때', () => {
    const mockVotes: Votes = {
      B: { votedFor: 'C', guess: GUESS_TYPE.INCORRECT },
      C: { votedFor: 'B', guess: GUESS_TYPE.INCORRECT },
      D: { votedFor: 'B', guess: GUESS_TYPE.INCORRECT },
    }

    const updatedStore = runNextRound(mockVotes)

    expect(updatedStore.currentRound).toBe(1)
    expect(updatedStore.currentStoryteller?.id).toBe('B')
    expect(updatedStore.totals).toEqual([0, 4, 3, 2])
  })

  test('플레이어 일부만 이야기꾼을 맞췄을 때', () => {
    const mockVotes: Votes = {
      B: { votedFor: 'C', guess: GUESS_TYPE.INCORRECT },
      C: { guess: GUESS_TYPE.CORRECT },
      D: { votedFor: 'B', guess: GUESS_TYPE.INCORRECT },
    }

    const updatedStore = runNextRound(mockVotes)

    expect(updatedStore.currentRound).toBe(1)
    expect(updatedStore.currentStoryteller?.id).toBe('B')
    expect(updatedStore.totals).toEqual([3, 1, 4, 0])
  })
})
