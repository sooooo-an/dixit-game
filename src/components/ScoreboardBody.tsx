import { useGameStore } from '../store/store'
import ScoreboardRow from './ScoreboardRow'
import ScoreboardNewRow from './ScoreboardNewRow'
import { useCallback, useMemo, useState } from 'react'
import { GUESS_TYPE, Vote, Votes } from '../models/vote'
import Button from './ui/Button'
import { BUTTON_TYPE, BUTTON_VARIANT } from '../models/ui'

export default function ScoreboardBody() {
  const history = useGameStore((state) => state.history)
  const players = useGameStore((state) => state.players)
  const currentRound = useGameStore((state) => state.currentRound)
  const currentStoryteller = useGameStore((state) => state.currentStoryteller)
  const nextRound = useGameStore((state) => state.nextRound)
  const getInitialVotes = useCallback(
    (storytellerId?: string) =>
      players.reduce(
        (acc: Votes, { id }) => ({
          ...acc,
          ...(storytellerId === id ? {} : { [id]: { guess: GUESS_TYPE.CORRECT } }),
        }),
        {}
      ),
    [players]
  )

  const [votes, setVotes] = useState<Votes>(() => getInitialVotes(currentStoryteller?.id))
  const disabled = useMemo(() => {
    return Object.values(votes).some(
      (vote) => !vote.guess || ('votedFor' in vote && vote.votedFor === '')
    )
  }, [votes])

  const handleVotes = (playerId: string, vote: Vote) => {
    setVotes((prev) => ({ ...prev, [playerId]: vote }))
  }

  const onClickNextRound = () => {
    const newRound = currentRound + 1
    const newStoryteller = players[newRound % players.length]
    nextRound(votes)
    setVotes(getInitialVotes(newStoryteller?.id))
  }

  return (
    <div>
      {history.map(({ storyteller, round, scores }) => (
        <ScoreboardRow
          key={`scoreboard_${round}}`}
          columns={players.map(({ id }) => scores[id])}
          label={`${round + 1}_${storyteller.name}`}
        />
      ))}
      <ScoreboardNewRow
        players={players}
        label={`이야기꾼: ${currentStoryteller?.name}`}
        votes={votes}
        handleVotes={handleVotes}
      />
      <Button
        disabled={disabled}
        type={BUTTON_TYPE.BUTTON}
        variant={BUTTON_VARIANT.NORMAL}
        onClick={onClickNextRound}
      >
        Next Round!
      </Button>
    </div>
  )
}
