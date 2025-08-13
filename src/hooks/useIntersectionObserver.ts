import { RefCallback, RefObject, useEffect, useRef } from 'react'

interface UseIntersectionObserverRefProps {
  readonly callback: IntersectionObserverCallback
  readonly options?: IntersectionObserverInit
  readonly type?: 'callback' | 'ref'
}

export const useIntersectionObserverRef = <T extends HTMLElement>({
  callback,
  options = { root: null, rootMargin: '0px', threshold: 0 },
  type = 'ref',
}: UseIntersectionObserverRefProps): RefCallback<T> | RefObject<T> => {
  const elementRef = useRef<T>(null)
  const callbackRef = useRef<IntersectionObserverCallback>(callback)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<T | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const isSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window
    if (!isSupported) {
      return
    }
    const wrappedCallback: IntersectionObserverCallback = (entries, observer) => {
      // 기본 정책 유지: 모든 entry가 교차 중일 때만 실행
      const isIntersecting = entries
        .map(entry => entry.isIntersecting)
        .reduce((acc, cur) => acc && cur, true)
      if (isIntersecting) {
        callbackRef.current(entries, observer)
      }
    }

    // 기존 옵저버 정리 후 재생성 (options 변경 시)
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
    observerRef.current = new IntersectionObserver(wrappedCallback, options)

    // ref 타입일 경우 이미 연결된 element 관찰
    if (type === 'ref' && elementRef.current) {
      observerRef.current.observe(elementRef.current)
    }
    // callback 타입일 경우 마지막 전달된 element 관찰
    if (type === 'callback' && lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [options, type])

  if (type === 'callback') {
    const refCallback: RefCallback<T> = (element: T | null) => {
      lastElementRef.current = element
      if (!observerRef.current) {
        return
      }
      if (element) {
        observerRef.current.observe(element)
      }
    }
    return refCallback
  }

  return elementRef
}
