import { useIntersectionObserverRef } from '@/hooks/useIntersectionObserver'

function App() {
  const ref = useIntersectionObserverRef<HTMLDivElement>({ callback: entries => console.log(entries) })
  return (
    <div className="App">
      {new Array(15).fill(0).map((e, idx) => (
        <div key={idx} style={{ width: '100%', height: '200px', border: '1px solid black' }} />
      ))}
      <div ref={ref} style={{ width: '100%', height: '200px', border: '1px solid black', backgroundColor: 'black' }} />
      {new Array(15).fill(0).map((e, idx) => (
        <div key={idx} style={{ width: '100%', height: '200px', border: '1px solid black' }} />
      ))}
    </div>
  )
}

export default App
