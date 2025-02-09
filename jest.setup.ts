import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { act } from 'react'
import { useGameStore } from './src/store/store'

afterEach(() => {
  act(() => {
    useGameStore.setState(useGameStore.getState(), true)
  })
  cleanup()
})
