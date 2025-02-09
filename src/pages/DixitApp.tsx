import { STATUS_TYPE } from '../models/game'
import { useGameStore } from '../store/store'
import AppLayout from '../templates/AppLayout'
import DixitBoard from './DixitBoard'
import DixitSetup from './DixitSetup'

export default function DixitApp() {
  const status = useGameStore((state) => state.status)
  return <AppLayout>{status === STATUS_TYPE.PROGRESS ? <DixitBoard /> : <DixitSetup />}</AppLayout>
}
