import { Ref, RefCallback, RefObject, useEffect, useRef } from 'react'

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
  const callbackOnlyIntersecting: IntersectionObserverCallback = (entries, observer) => {
    const isIntersecting = entries.map(entry => entry.isIntersecting).reduce((acc, cur) => acc && cur, true)
    if (isIntersecting) {
      callback(entries, observer)
    }
  }
  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(callbackOnlyIntersecting, options))
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (type === 'callback' || !elementRef.current || !observerRef.current) {
      return
    }
    observerRef.current.observe(elementRef.current)
    return () => observerRef.current.disconnect()
  }, [elementRef, observerRef])

  if (type === 'callback') {
    const refCallback = (element: T) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    }
    return refCallback
  }

  return elementRef
}
