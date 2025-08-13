import { useCallback, useState } from 'react'

export const useToggle = (initialValue: boolean = false): [boolean, () => void, () => void, () => void] => {
  const [state, setState] = useState<boolean>(initialValue)
  const toggle = useCallback(() => setState(prev => !prev), [])
  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])
  return [state, toggle, setTrue, setFalse]
}
