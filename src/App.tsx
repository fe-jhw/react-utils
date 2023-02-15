import { useIntersectionObserverRef } from '@/hooks/useIntersectionObserver'

function App() {
  const ref = useIntersectionObserverRef<HTMLDivElement>({
    callback: entries => console.log('나는 배열~'),
    type: 'callback',
  })
  const ref2 = useIntersectionObserverRef<HTMLDivElement>({
    callback: entries => console.log('나는 콜백 아닌뎅~'),
  })
  return (
    <div className="App">
      {new Array(15).fill(0).map((e, idx) => (
        <div key={idx} style={{ width: '100%', height: '200px', border: '1px solid black', fontSize: '64px' }}>
          {idx}
        </div>
      ))}
      {/* <div ref={ref} style={{ width: '100%', height: '200px', border: '1px solid black', backgroundColor: 'black' }} /> */}
      {new Array(10).fill(0).map((e, idx) => (
        <div
          ref={ref}
          key={idx}
          style={{
            width: '100%',
            height: '200px',
            border: '1px solid black',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '64px',
          }}
        >
          {idx + 15}
        </div>
      ))}
      <div
        ref={ref2}
        style={{
          width: '100%',
          height: '200px',
          border: '1px solid black',
          backgroundColor: 'black',
          color: 'white',
          fontSize: '64px',
        }}
      >
        나는 콜백아님~
      </div>
    </div>
  )
}

export default App
