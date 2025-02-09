import { GUESS_TYPE, GuessType, Vote, Votes } from '../models/vote'
import PlayerVoteStatus from './PlayerVoteStatus'
import { Player } from '../models/player'

type Props = {
  label: string
  players: Player[]
  votes: Votes
  handleVotes: (playerId: string, vote: Vote) => void
}

export default function ScoreboardNewRow({ label, players, handleVotes, votes }: Props) {
  const handleChangeGuess = (playerId: string, guess: GuessType) => {
    const updated = guess === GUESS_TYPE.CORRECT ? { guess } : { guess, votedFor: '' }
    handleVotes(playerId, updated)
  }

  const handleChangeVotedFor = (playerId: string, votedFor: string) => {
    const guess = votes[playerId].guess
    const updated = guess === GUESS_TYPE.CORRECT ? { guess } : { guess, votedFor }
    handleVotes(playerId, updated)
  }

  return (
    <div className="w-ful grid grid-cols-5 border-b border-b-[var(--border-primary)] py-2 text-center">
      <span>{label}</span>
      {players.map(({ id: playerId }, idx) =>
        playerId in votes ? (
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
  )
}
