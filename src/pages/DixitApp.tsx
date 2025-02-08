import { STATUS_TYPE } from '../models/game'
import { useGameStore } from '../store/store'
import AppLayout from '../templates/AppLayout'
import DixitSetup from './DixitSetup'

export default function DixitApp() {
  const status = useGameStore((state) => state.status)
  return (
    <AppLayout>{status === STATUS_TYPE.PROGRESS ? <span>123</span> : <DixitSetup />}</AppLayout>
  )
}
