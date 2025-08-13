import { renderHook, act } from '@testing-library/react-hooks'
import { useDebounce } from '@/hooks'

jest.useFakeTimers()

test('debounced callback is called after timeout with latest args', () => {
  const spy = jest.fn()
  const { result } = renderHook(() => useDebounce({ callback: spy, timeout: 200 }))

  act(() => {
    result.current(1)
    result.current(2)
  })

  expect(spy).not.toHaveBeenCalled()

  act(() => {
    jest.advanceTimersByTime(199)
  })
  expect(spy).not.toHaveBeenCalled()

  act(() => {
    jest.advanceTimersByTime(1)
  })
  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith(2)
})

test('cleans up pending timer on unmount', () => {
  const spy = jest.fn()
  const { result, unmount } = renderHook(() => useDebounce({ callback: spy, timeout: 100 }))

  act(() => {
    result.current('a')
  })

  unmount()
  act(() => {
    jest.runAllTimers()
  })
  expect(spy).not.toHaveBeenCalled()
})


