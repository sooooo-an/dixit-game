import Header from '../components/Header'

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-[var(--background-dark)] p-4">
      <div className="container flex flex-col items-center">
        <Header />
        <main className="w-full flex-1">{children}</main>
      </div>
    </div>
  )
}
