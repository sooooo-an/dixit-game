export const COUNTER_ACTION = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
} as const

export type CounterActionType = (typeof COUNTER_ACTION)[keyof typeof COUNTER_ACTION]

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
} as const

export const BUTTON_VARIANT = {
  CIRCLE: 'circle',
  NORMAL: 'normal',
} as const

type ButtonType = {
  type: typeof BUTTON_TYPE.BUTTON
  onClick: () => void
}

type SubmitType = {
  type: typeof BUTTON_TYPE.SUBMIT
}

export type ButtonTypeProps = ButtonType | SubmitType
export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT]
