import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<number | null>(null); 

  const handleStop = () => {
    setIsRunning(false);
    setCounter(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePause = () => {
    setIsRunning(prev => !prev);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
      setCounter(prevCounter => prevCounter + 10);
    }, 10);
    }
  }


  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p className="counterText">
            <span>{ Math.floor((counter / 1000) / 3600).toString().padStart(2, "0") } </span>
            <span> : </span> 
            <span>{ Math.floor((counter / 1000) / 60).toString().padStart(2, "0") } </span>
            <span> : </span> 
            <span>{ Math.floor((counter / 1000) % 60).toString().padStart(2, "0") }</span>
            <span>.</span>
            <span>{ Math.floor(counter % 100).toString().padStart(2, "0") }</span>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => { handlePause()}}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          type="button"
          className="counter"
          onClick={() => { handleStop()}}
        >
          Сброс
        </button>

      </section>
    </>
  )
}

export default App
