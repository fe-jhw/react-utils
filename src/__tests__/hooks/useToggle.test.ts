import { renderHook, act } from '@testing-library/react-hooks'
import { useToggle } from '@/hooks'

test('update state from false to true when toggle is called', () => {
  const { result } = renderHook(() => useToggle(false))

  expect(result.current[0]).toBe(false)

  act(() => result.current[1]())

  expect(result.current[0]).toBe(true)
})

test('allows for initial value', () => {
  const { result } = renderHook(() => useToggle(true))

  expect(result.current[0]).toBe(true)
})
