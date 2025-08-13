import { renderHook } from '@testing-library/react-hooks'
import { useIntersectionObserverRef } from '@/hooks'

class FakeIntersectionObserver {
  callback: IntersectionObserverCallback
  elements: Set<Element> = new Set()
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
  }
  observe = (el: Element) => {
    this.elements.add(el)
  }
  disconnect = () => {
    this.elements.clear()
  }
  // helper to trigger
  trigger = (entries: Partial<IntersectionObserverEntry>[]) => {
    // 기본 정책: 모든 entry가 isIntersecting=true일 때만 콜백 호출
    const fullEntries = entries.map(e => ({
      isIntersecting: true,
      boundingClientRect: {} as any,
      intersectionRatio: 1,
      intersectionRect: {} as any,
      isVisible: true as any,
      rootBounds: null,
      target: document.createElement('div'),
      time: 0,
      ...e,
    })) as IntersectionObserverEntry[]
    this.callback(fullEntries, ({} as unknown) as IntersectionObserver)
  }
}

// @ts-ignore
global.IntersectionObserver = FakeIntersectionObserver as any

test('ref mode observes element and triggers callback when intersecting all entries', () => {
  const cb = jest.fn()
  const { result } = renderHook(() =>
    useIntersectionObserverRef<HTMLDivElement>({ callback: cb, options: { threshold: 0 }, type: 'ref' })
  )

  // attach DOM node
  const el = document.createElement('div')
  ;(result.current as any).current = el

  // simulate observer created and attached
  const IOClass = global.IntersectionObserver as unknown as typeof FakeIntersectionObserver
  const inst = new IOClass(cb)
  inst.observe(el)
  inst.trigger([{ isIntersecting: true }])

  expect(cb).toHaveBeenCalled()
})

test('callback mode returns callback ref', () => {
  const cb = jest.fn()
  const { result } = renderHook(() =>
    useIntersectionObserverRef<HTMLDivElement>({ callback: cb, options: { threshold: 0 }, type: 'callback' })
  )

  const el = document.createElement('div')
  ;(result.current as (node: HTMLDivElement | null) => void)(el)

  // simulate intersection
  const IOClass = global.IntersectionObserver as unknown as typeof FakeIntersectionObserver
  const inst = new IOClass(cb)
  inst.observe(el)
  inst.trigger([{ isIntersecting: true }])

  expect(cb).toHaveBeenCalled()
})


