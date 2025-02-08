export const COUNTER_ACTION = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
} as const

export type CounterActionType = (typeof COUNTER_ACTION)[keyof typeof COUNTER_ACTION]
