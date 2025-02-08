import React, { useEffect, useRef } from 'react'
import CloseIcon from './icons/CloseIcon'

type Props = {
  name: string
  handleChange: (name: string, value: string) => void
  placeholder?: string
  isAutoFocusing?: boolean
  value: string
}

export default function TextInput({
  name,
  handleChange,
  placeholder = '텍스트를 작성해주세요',
  isAutoFocusing = false,
  value,
}: Props) {
  const ref = useRef<HTMLInputElement>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleChange(name, value)
  }

  const reset = () => {
    handleChange(name, '')
    ref?.current?.focus()
  }

  useEffect(() => {
    if (!isAutoFocusing) {
      return
    }

    ref?.current?.focus()
  }, [])

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md bg-white/10 px-2 py-4 text-white placeholder-gray-200 outline-none"
        value={value}
        name={name}
        onChange={onChange}
        ref={ref}
      />
      {value && (
        <button
          type="button"
          onClick={reset}
          className="absolute top-4 right-2 text-2xl text-gray-200/80 outline-none hover:text-gray-200/90"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
