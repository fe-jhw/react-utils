import { useCallback, useMemo, useState } from 'react'

export interface UseArrayStateActions<T> {
  readonly set: React.Dispatch<React.SetStateAction<readonly T[]>>
  readonly clear: () => void
  readonly push: (item: T) => void
  readonly pushMany: (items: readonly T[]) => void
  readonly insertAt: (index: number, item: T) => void
  readonly removeAt: (index: number) => void
  readonly removeWhere: (predicate: (item: T, index: number, array: readonly T[]) => boolean) => void
  readonly removeByProp: <K extends keyof T>(key: K, value: T[K]) => void
  readonly setAt: (index: number, item: T) => void
  readonly replaceWhere: (
    predicate: (item: T, index: number, array: readonly T[]) => boolean,
    newItem: T,
    options?: { replaceAll?: boolean }
  ) => void
  readonly replaceByProp: <K extends keyof T>(key: K, value: T[K], newItem: T, options?: { replaceAll?: boolean }) => void
  readonly upsertByProp: <K extends keyof T>(key: K, newItem: T) => void
}

export const useArrayState = <T,>(initial: readonly T[] = []): readonly [readonly T[], UseArrayStateActions<T>] => {
  const [state, setState] = useState<readonly T[]>(() => [...initial])

  const clear = useCallback(() => {
    setState(prev => (prev.length === 0 ? prev : []))
  }, [])

  const push = useCallback((item: T) => {
    setState(prev => [...prev, item])
  }, [])

  const pushMany = useCallback((items: readonly T[]) => {
    setState(prev => (items.length === 0 ? prev : [...prev, ...items]))
  }, [])

  const insertAt = useCallback((index: number, item: T) => {
    setState(prev => {
      const safeIndex = Math.max(0, Math.min(index, prev.length))
      return [...prev.slice(0, safeIndex), item, ...prev.slice(safeIndex)]
    })
  }, [])

  const removeAt = useCallback((index: number) => {
    setState(prev => {
      if (index < 0 || index >= prev.length) return prev
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const removeWhere = useCallback((predicate: (item: T, index: number, array: readonly T[]) => boolean) => {
    setState(prev => {
      const hasMatch = prev.some((item, idx, arr) => predicate(item, idx, arr))
      if (!hasMatch) return prev
      return prev.filter((item, idx, arr) => !predicate(item, idx, arr))
    })
  }, [])

  const removeByProp = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState(prev => {
      const hasMatch = prev.some(item => item[key] === value)
      if (!hasMatch) return prev
      return prev.filter(item => item[key] !== value)
    })
  }, [])

  const setAt = useCallback((index: number, item: T) => {
    setState(prev => {
      if (index < 0 || index >= prev.length) return prev
      if (prev[index] === item) return prev
      return prev.map((v, i) => (i === index ? item : v))
    })
  }, [])

  const replaceWhere = useCallback(
    (
      predicate: (item: T, index: number, array: readonly T[]) => boolean,
      newItem: T,
      options?: { replaceAll?: boolean }
    ) => {
      const replaceAll = options?.replaceAll ?? false
      setState(prev => {
        if (replaceAll) {
          const hasMatch = prev.some((item, idx, arr) => predicate(item as T, idx, arr))
          if (!hasMatch) return prev
          return prev.map((item, idx, arr) => (predicate(item as T, idx, arr) ? newItem : item))
        }
        const index = prev.findIndex((item, idx, arr) => predicate(item as T, idx, arr))
        if (index === -1) return prev
        return prev.map((item, i) => (i === index ? newItem : item))
      })
    },
    []
  )

  const replaceByProp = useCallback(
    <K extends keyof T>(key: K, value: T[K], newItem: T, options?: { replaceAll?: boolean }) => {
      const replaceAll = options?.replaceAll ?? false
      setState(prev => {
        if (replaceAll) {
          const hasMatch = prev.some(item => item[key] === value)
          if (!hasMatch) return prev
          return prev.map(item => (item[key] === value ? newItem : item))
        }
        const index = prev.findIndex(item => item[key] === value)
        if (index === -1) return prev
        return prev.map((item, i) => (i === index ? newItem : item))
      })
    },
    []
  )

  const upsertByProp = useCallback(<K extends keyof T>(key: K, newItem: T) => {
    setState(prev => {
      const index = prev.findIndex(item => item[key] === newItem[key])
      if (index === -1) {
        return [...prev, newItem]
      }
      if (prev[index] === newItem) return prev
      return prev.map((v, i) => (i === index ? newItem : v))
    })
  }, [])

  const actions = useMemo<UseArrayStateActions<T>>(
    () => ({
      set: setState,
      clear,
      push,
      pushMany,
      insertAt,
      removeAt,
      removeWhere,
      removeByProp,
      setAt,
      replaceWhere,
      replaceByProp,
      upsertByProp,
    }),
    [clear, insertAt, push, pushMany, removeAt, removeByProp, removeWhere, replaceByProp, replaceWhere, setAt, upsertByProp]
  )

  return [state, actions] as const
}


