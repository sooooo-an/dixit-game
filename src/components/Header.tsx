import GameIcon from './ui/icons/GameIcon'

export default function Header() {
  return (
    <header className="my-10">
      <h1>
        <a href="/" className="flex items-center gap-2 font-mono text-2xl font-semibold text-white">
          <GameIcon />
          DIXIT BOARD GAME
        </a>
      </h1>
    </header>
  )
}
