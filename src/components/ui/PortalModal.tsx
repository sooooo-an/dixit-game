import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
}

export default function PortalModal({ children }: Props) {
  if (typeof window === undefined) {
    return null
  }

  const node = document.getElementById('portal')!

  return createPortal(children, node)
}
