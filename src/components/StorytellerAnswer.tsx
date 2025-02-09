import { GuessType } from '../models/vote'
import RadioInput from './ui/RadioInput'

type Props = {
  value: GuessType
  setValue: (value: GuessType) => void
  uniqueId: string
}

export default function StorytellerAnswer({ value, setValue, uniqueId }: Props) {
  const handleChange = (value: string) => {
    const guess = value as GuessType
    setValue(guess)
  }

  return (
    <>
      <span>정답 여부</span>
      <div className="flex justify-between gap-2 px-2">
        <RadioInput
          label="정답"
          value="correct"
          checked={value === 'correct'}
          handleChange={handleChange}
          name={`${uniqueId}_guess`}
          id={`${uniqueId}_guess_correct`}
        />
        <RadioInput
          label="오답"
          value="incorrect"
          checked={value === 'incorrect'}
          handleChange={handleChange}
          name={`${uniqueId}_guess`}
          id={`${uniqueId}_guess_incorrect`}
        />
      </div>
    </>
  )
}
