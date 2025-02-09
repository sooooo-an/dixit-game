type Props = {
  label: string
  columns: (string | number)[]
}

export default function ScoreboardRow({ label, columns }: Props) {
  return (
    <div className="w-ful grid grid-cols-5 border-b border-b-[var(--border-primary)] py-2 text-center">
      <span>{label}</span>
      {columns.map((column, idx) => (
        <span key={`${label}_${idx}`}>{column}</span>
      ))}
    </div>
  )
}
