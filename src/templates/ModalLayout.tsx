import Button from '../components/ui/Button'
import CloseIcon from '../components/ui/icons/CloseIcon'
import { BUTTON_TYPE, BUTTON_VARIANT } from '../models/ui'

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export default function ModalLayout({ children, onClose }: Props) {
  return (
    <section className="fixed top-0 left-0 z-2 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70">
      <div className="relative h-3/5 w-4/5 max-w-7xl rounded-2xl bg-[#85431b] p-4">
        {children}
        <Button
          type={BUTTON_TYPE.BUTTON}
          onClick={onClose}
          variant={BUTTON_VARIANT.CIRCLE}
          className="absolute top-5 right-5"
        >
          <CloseIcon />
        </Button>
      </div>
    </section>
  )
}
