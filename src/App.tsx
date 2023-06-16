import { useIntersectionObserverRef } from '@/hooks/useIntersectionObserver'
import { useState } from 'react'

function App() {
  const [items, setItems] = useState<any[]>([])
  const infiniteScrollRef = useIntersectionObserverRef<HTMLDivElement>({
    callback: () => {
      setItems(prev => [...prev, ...new Array(5).fill(0)])
    },
  })
  return (
    <div className="App">
      {items.map((item, idx) => (
        <div key={idx} style={{ width: '100%', height: '200px', background: 'blue', border: '1px solid white' }} />
      ))}
      <div ref={infiniteScrollRef} />
    </div>
  )
}

export default App
