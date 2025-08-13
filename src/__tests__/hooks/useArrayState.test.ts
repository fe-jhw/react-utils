import { renderHook, act } from '@testing-library/react-hooks'
import { useArrayState } from '@/hooks'

type Item = { id: number; name: string }

const initial: readonly Item[] = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
]

test('initial state is set and push works', () => {
  const { result } = renderHook(() => useArrayState<Item>(initial))

  expect(result.current[0]).toHaveLength(2)

  act(() => result.current[1].push({ id: 3, name: 'c' }))
  expect(result.current[0]).toHaveLength(3)
  expect(result.current[0][2]).toEqual({ id: 3, name: 'c' })
})

test('removeByProp removes matching items', () => {
  const { result } = renderHook(() => useArrayState<Item>(initial))

  act(() => result.current[1].removeByProp('id', 2))
  expect(result.current[0]).toEqual([{ id: 1, name: 'a' }])
})

test('replaceByProp replaces first by default and replaceAll replaces all', () => {
  const duplicated: readonly Item[] = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 2, name: 'bb' },
  ]
  const { result, rerender } = renderHook(({ init }) => useArrayState<Item>(init), {
    initialProps: { init: duplicated },
  })

  act(() => result.current[1].replaceByProp('id', 2, { id: 2, name: 'B' }))
  expect(result.current[0]).toEqual([
    { id: 1, name: 'a' },
    { id: 2, name: 'B' },
    { id: 2, name: 'bb' },
  ])

  rerender({ init: duplicated })
  act(() => result.current[1].replaceByProp('id', 2, { id: 2, name: 'B' }, { replaceAll: true }))
  expect(result.current[0]).toEqual([
    { id: 1, name: 'a' },
    { id: 2, name: 'B' },
    { id: 2, name: 'B' },
  ])
})

test('upsertByProp updates or inserts based on key', () => {
  const { result } = renderHook(() => useArrayState<Item>(initial))

  act(() => result.current[1].upsertByProp('id', { id: 2, name: 'B2' }))
  expect(result.current[0][1]).toEqual({ id: 2, name: 'B2' })

  act(() => result.current[1].upsertByProp('id', { id: 3, name: 'c' }))
  expect(result.current[0]).toHaveLength(3)
  expect(result.current[0][2]).toEqual({ id: 3, name: 'c' })
})

test('clear and setAt and insertAt and removeAt work', () => {
  const { result } = renderHook(() => useArrayState<Item>(initial))

  act(() => result.current[1].insertAt(1, { id: 9, name: 'x' }))
  expect(result.current[0]).toEqual([
    { id: 1, name: 'a' },
    { id: 9, name: 'x' },
    { id: 2, name: 'b' },
  ])

  act(() => result.current[1].setAt(1, { id: 9, name: 'xx' }))
  expect(result.current[0][1]).toEqual({ id: 9, name: 'xx' })

  act(() => result.current[1].removeAt(1))
  expect(result.current[0]).toEqual([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ])

  act(() => result.current[1].clear())
  expect(result.current[0]).toEqual([])
})

test('removeWhere and replaceWhere work', () => {
  const { result } = renderHook(() => useArrayState<Item>(initial))

  act(() => result.current[1].removeWhere(item => item.id === 1))
  expect(result.current[0]).toEqual([{ id: 2, name: 'b' }])

  act(() => result.current[1].replaceWhere(item => item.id === 2, { id: 2, name: 'B' }))
  expect(result.current[0]).toEqual([{ id: 2, name: 'B' }])
})


