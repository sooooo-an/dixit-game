import ScoreboardBody from '../components/ScoreboardBody'
import ScoreboardRow from '../components/ScoreboardRow'
import { useGameStore } from '../store/store'

export default function DixitBoard() {
  const players = useGameStore((state) => state.players)
  const totals = useGameStore((state) => state.totals)
  const columns = players.map(({ name }) => name)

  return (
    <section>
      <ScoreboardRow columns={columns} label="이름" />
      <ScoreboardBody />
      <ScoreboardRow columns={totals} label="총합" />
    </section>
  )
}
