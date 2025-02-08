import { BUTTON_TYPE, BUTTON_VARIANT, ButtonTypeProps, ButtonVariant } from '../../models/ui'

type Props = {
  variant: ButtonVariant
  disabled: boolean
  children: React.ReactNode
  className: string
} & ButtonTypeProps

export default function Button(props: Props) {
  const { variant, disabled, children, type, className } = props

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} ${variant === BUTTON_VARIANT.CIRCLE ? CIRCLE_STYLE : NORMAL_STYLE}`}
      onClick={type === BUTTON_TYPE.BUTTON ? props.onClick : undefined}
    >
      {children}
    </button>
  )
}

const CIRCLE_STYLE =
  'rounded-full bg-amber-600/20 p-2 text-3xl text-white shadow hover:bg-amber-600/30'
const NORMAL_STYLE = 'w-full bg-amber-200/30'
