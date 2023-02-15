import { Ref, useEffect, useRef } from 'react'

interface UseIntersectionObserverProps {
  readonly callback: IntersectionObserverCallback
  readonly options?: IntersectionObserverInit
  readonly type?: 'callback' | 'ref'
}

// TODO: ref 콜백형태로 관리(같은 형태 dom 배열 타겟) 추가

export const useIntersectionObserverRef = <T extends HTMLElement>({
  callback,
  options = { root: null, rootMargin: '0px', threshold: 1 },
  type = 'ref',
}: UseIntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(callback, options))
  // if (type === 'callback') {
  //   const callbackRef = (elementRef: Ref<T>) => {
  //     if (elementRef && observerRef.current) {
  //       observerRef.current.observe(elementRef)
  //     }
  //   }
  // }
  const elementRef = useRef<T>(null)
  useEffect(() => {
    if (!elementRef.current || !observerRef.current) {
      return
    }
    observerRef.current.observe(elementRef.current)
    return () => observerRef.current.disconnect()
  }, [elementRef, observerRef])

  return elementRef
}
