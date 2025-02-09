import { useGameStore } from '../store/store'
import ScoreboardRow from './ScoreboardRow'
import ScoreboardNewRow from './ScoreboardNewRow'

export default function ScoreboardBody() {
  const history = useGameStore((state) => state.history)
  const playerIds = useGameStore((state) => state.players).map(({ id }) => id)
  const currentStoryteller = useGameStore((state) => state.currentStoryteller)

  return (
    <div>
      {history.map(({ storyteller, round, scores }) => (
        <ScoreboardRow
          key={`scoreboard_${round}}`}
          columns={playerIds.map((id) => scores[id])}
          label={`${round + 1}_${storyteller.name}`}
        />
      ))}
      <ScoreboardNewRow
        columns={playerIds}
        label={`이야기꾼: ${currentStoryteller?.name}`}
        storyteller={currentStoryteller}
      />
    </div>
  )
}
