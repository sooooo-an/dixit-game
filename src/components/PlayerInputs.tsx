import TextInput from './ui/TextInput'

type Props = {
  inputs: string[]
  updateInputs: (inputs: string[]) => void
}

export default function PlayerInputs({ inputs, updateInputs }: Props) {
  const onChange = (name: string, value: string) => {
    const idx = Number(name)

    if (!isNaN(idx) && idx >= 0 && idx < inputs.length) {
      const newNames = [...inputs]
      newNames[idx] = value
      updateInputs(newNames)
    }
  }

  return (
    <>
      {inputs.map((input, idx) => (
        <TextInput
          name={idx + ''}
          handleChange={onChange}
          isAutoFocusing={idx === 0}
          key={idx}
          value={input}
        />
      ))}
    </>
  )
}
