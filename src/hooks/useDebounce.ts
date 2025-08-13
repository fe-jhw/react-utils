import { useCallback, useEffect, useRef } from 'react'

interface UseDebounce {
  ({ callback, timeout }: { callback: (...args: any[]) => any; timeout: number }): (...args: any[]) => void
}

export const useDebounce: UseDebounce = ({ callback, timeout }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const debounced = useCallback((...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    timerRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, timeout)
  }, [timeout])

  return debounced
}
