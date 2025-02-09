import { GUESS_TYPE, GuessType, Vote } from '../models/vote'
import StorytellerAnswer from './StorytellerAnswer'
import VoteSection from './VoteSection'

type Props = {
  vote: Vote
  onGuessChange: (playerId: string, guess: GuessType) => void
  onVotedForChange: (playerId: string, votedFor: string) => void
  playerId: string
}

export default function PlayerVoteStatus({
  vote,
  onGuessChange,
  onVotedForChange,
  playerId,
}: Props) {
  const IS_SHOW_VOTE = vote?.guess === GUESS_TYPE.INCORRECT

  const handleGuess = (guess: GuessType) => {
    onGuessChange(playerId, guess)
  }

  const handleVotedFor = (votedFor: string) => {
    onVotedForChange(playerId, votedFor)
  }

  return (
    <div>
      <StorytellerAnswer value={vote.guess} setValue={handleGuess} uniqueId={playerId} />
      {IS_SHOW_VOTE && (
        <VoteSection value={vote.votedFor} setValue={handleVotedFor} uniqueId={playerId} />
      )}
    </div>
  )
}
