import { ChangeEvent } from 'react'

type Props = {
  label: string
  value: string
  checked: boolean
  name: string
  disabled?: boolean
  handleChange: (name: string, value: string) => void
  id: string
}

export default function RadioInput({
  label,
  value,
  checked,
  name,
  disabled = false,
  handleChange,
  id,
}: Props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  return (
    <label htmlFor={id}>
      <input
        type="radio"
        value={value}
        checked={checked}
        name={name}
        disabled={disabled}
        onChange={onChange}
        id={id}
      />
      <span>{label}</span>
    </label>
  )
}
