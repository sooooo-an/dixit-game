import PlusIcon from './icons/PlusIcon'
import MinusIcon from './icons/MinusIcon'
import { CounterActionType, COUNTER_ACTION } from '../../models/ui'

type Props = {
  value: number
  handleClick: (type: CounterActionType) => void
  min?: number
  max?: number
}

export default function Controller({ value, handleClick, min = 0, max = Infinity }: Props) {
  const increase = () => {
    if (max <= value) {
      return
    }

    handleClick(COUNTER_ACTION.INCREASE)
  }

  const decrease = () => {
    if (min >= value) {
      return
    }
    handleClick(COUNTER_ACTION.DECREASE)
  }

  return (
    <div className="flex items-center gap-4 py-4 text-3xl text-white">
      <button onClick={decrease} type="button">
        <MinusIcon />
      </button>
      <span>{value}</span>
      <button onClick={increase} type="button">
        <PlusIcon />
      </button>
    </div>
  )
}
