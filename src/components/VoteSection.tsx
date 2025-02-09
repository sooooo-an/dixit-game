import { useGameStore } from '../store/store'
import RadioInput from './ui/RadioInput'

type Props = {
  value: string
  setValue: (value: string) => void
  uniqueId: string
}

export default function VoteSection({ uniqueId, setValue, value }: Props) {
  const currentStoryteller = useGameStore((state) => state.currentStoryteller)
  const players = useGameStore((state) => state.players)
  const votedPlayers = players.filter(({ id }) => id !== uniqueId && id !== currentStoryteller?.id)
  return (
    <div>
      <span className="block">투표</span>
      <div className="flex justify-around">
        {votedPlayers.map(({ id, name }) => (
          <RadioInput
            label={name}
            value={id}
            checked={value === id}
            handleChange={setValue}
            name={`${uniqueId}_votedFor`}
            id={`${uniqueId}_votedFor_${id}`}
            key={`${uniqueId}_votedFor_${id}`}
          />
        ))}
      </div>
    </div>
  )
}
