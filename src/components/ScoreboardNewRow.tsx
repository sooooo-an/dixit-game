import { useMemo, useState } from 'react'
import { BUTTON_TYPE, BUTTON_VARIANT } from '../models/ui'
import { GUESS_TYPE, GuessType, Vote, Votes } from '../models/vote'
import PlayerVoteStatus from './PlayerVoteStatus'
import Button from './ui/Button'
import { Player } from '../models/player'
import { useGameStore } from '../store/store'

type Props = {
  label: string
  columns: string[]
  storyteller: Player | null
}

export default function ScoreboardNewRow({ label, columns, storyteller }: Props) {
  const nextRound = useGameStore((state) => state.nextRound)
  const [votes, setVotes] = useState<Votes>(
    columns.reduce(
      (acc, column) => ({
        ...acc,
        [column]: { guess: GUESS_TYPE.CORRECT },
      }),
      {}
    )
  )
  const disabled = useMemo(() => {
    return Object.values(votes).some(
      (vote) => !vote.guess || ('votedFor' in vote && vote.votedFor === '')
    )
  }, [votes])

  const onClickNextRound = () => {
    nextRound(votes)
  }

  const handleChangeGuess = (playerId: string, guess: GuessType) => {
    const updated = guess === GUESS_TYPE.CORRECT ? { guess } : { guess, votedFor: '' }
    setVotes((prev) => ({ ...prev, [playerId]: updated }))
  }

  const handleChangeVotedFor = (playerId: string, votedFor: string) => {
    const guess = votes[playerId].guess
    const updated = guess === GUESS_TYPE.CORRECT ? { guess } : { guess, votedFor }
    setVotes((prev) => ({ ...prev, [playerId]: updated }))
  }

  return (
    <>
      <div className="w-ful grid grid-cols-5 border-b border-b-[var(--border-primary)] py-2 text-center">
        <span>{label}</span>
        {columns.map((playerId, idx) =>
          playerId !== storyteller?.id ? (
            <PlayerVoteStatus
              key={`${playerId}_${idx}`}
              vote={votes[playerId]}
              onGuessChange={handleChangeGuess}
              onVotedForChange={handleChangeVotedFor}
              playerId={playerId}
            />
          ) : (
            <div key={`${playerId}_${idx}`}></div>
          )
        )}
      </div>
      <Button
        disabled={disabled}
        type={BUTTON_TYPE.BUTTON}
        variant={BUTTON_VARIANT.NORMAL}
        onClick={onClickNextRound}
      >
        Next Round!
      </Button>
    </>
  )
}
