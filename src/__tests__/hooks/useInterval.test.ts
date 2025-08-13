import { renderHook, act } from '@testing-library/react-hooks'
import { useInterval } from '@/hooks'

jest.useFakeTimers()

test('calls callback repeatedly at given interval', () => {
  const spy = jest.fn()
  renderHook(() => useInterval(spy, 100))

  act(() => {
    jest.advanceTimersByTime(350)
  })

  expect(spy).toHaveBeenCalledTimes(3)
})

test('does not run when interval is null', () => {
  const spy = jest.fn()
  const { rerender } = renderHook(({ n }) => useInterval(spy, n), { initialProps: { n: null as number | null } })

  act(() => {
    jest.advanceTimersByTime(300)
  })
  expect(spy).not.toHaveBeenCalled()

  rerender({ n: 50 })
  act(() => {
    jest.advanceTimersByTime(120)
  })
  expect(spy).toHaveBeenCalledTimes(2)
})


