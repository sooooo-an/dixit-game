import { useState } from 'react'
import { BUTTON_TYPE, BUTTON_VARIANT, COUNTER_ACTION, CounterActionType } from '../models/ui'
import ModalLayout from '../templates/ModalLayout'
import Button from './ui/Button'
import PortalModal from './ui/PortalModal'
import Controller from './ui/Controller'
import { GAME_RULES, Rules, initializeRule } from '../models/rules'

type Props = {
  onClose: () => void
}

export default function SettingModal({ onClose }: Props) {
  const [rules, setRules] = useState<Rules>(initializeRule)
  const onClickConfirm = () => {
    onClose()
  }

  const updateRules = (id: keyof Rules, action: CounterActionType) => {
    const isIncrease = action === COUNTER_ACTION.INCREASE
    setRules((prev) => ({ ...prev, [id]: isIncrease ? prev[id] + 1 : prev[id] - 1 }))
  }

  return (
    <PortalModal>
      <ModalLayout onClose={onClose}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="py-4 text-center text-2xl">게임 규칙 설정</p>
            {GAME_RULES.map(({ id, text, maxPoint }) => (
              <div key={id} className="flex items-center justify-between">
                <span>{text}</span>
                <Controller
                  value={rules[id]}
                  handleClick={(action) => updateRules(id, action)}
                  size="small"
                  max={maxPoint}
                  min={0}
                />
              </div>
            ))}
          </div>
          <Button
            variant={BUTTON_VARIANT.NORMAL}
            type={BUTTON_TYPE.BUTTON}
            onClick={onClickConfirm}
          >
            확인
          </Button>
        </div>
      </ModalLayout>
    </PortalModal>
  )
}
