import { useState } from 'react'
import { useDebounce } from 'use-debounce'

export interface IDebouncedInputProps {
  defaultValue?: string
  // delay in ms
  delay?: number
}

export function useDebouncedInput({ defaultValue = '', delay = 500 }: IDebouncedInputProps = {}) {
  const [inputValue, setInputValue] = useState<string>(defaultValue)
  const [debouncedInputValue] = useDebounce(inputValue, delay)

  return { inputValue, setInputValue, debouncedInputValue }
}
