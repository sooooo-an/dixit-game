import { FormEvent, useState } from 'react'
import SettingIcon from '../components/ui/icons/SettingIcon'
import Controller from '../components/ui/Controller'
import { BUTTON_TYPE, BUTTON_VARIANT, COUNTER_ACTION, CounterActionType } from '../models/ui'
import { MAXIMUM_PLAYERS, MINIMUM_PLAYERS } from '../models/player'
import PlayerInputs from '../components/PlayerInputs'
import Button from '../components/ui/Button'
import SettingModal from '../components/SettingModal'

export default function DixitSetup() {
  const [names, setNames] = useState<string[]>(initialize)
  const [open, setOpen] = useState(false)

  const updateInputCount = (type: CounterActionType) => {
    const current = type === COUNTER_ACTION.INCREASE ? [...names, ''] : names.slice(0, -1)
    setNames(current)
  }

  const updateName = (names: string[]) => {
    setNames(names)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // initializeDixitGame(names, INITIAL_SCORING_RULE)
  }

  const toggleSettingModal = (open: boolean) => {
    setOpen(open)
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col items-center gap-3">
      <Controller
        value={names.length}
        handleClick={updateInputCount}
        min={MINIMUM_PLAYERS}
        max={MAXIMUM_PLAYERS}
      />
      <PlayerInputs inputs={names} updateInputs={updateName} />
      <Button type={BUTTON_TYPE.SUBMIT} variant={BUTTON_VARIANT.NORMAL}>
        Start Game!
      </Button>
      <Button
        type={BUTTON_TYPE.BUTTON}
        variant={BUTTON_VARIANT.CIRCLE}
        onClick={() => toggleSettingModal(true)}
        className="absolute right-5"
      >
        <SettingIcon />
      </Button>
      <span className="text-white">이야기꾼 순서: 플레이어 작성 순서</span>
      {open && <SettingModal onClose={() => toggleSettingModal(false)} />}
    </form>
  )
}

const initialize = new Array(4).fill('')
