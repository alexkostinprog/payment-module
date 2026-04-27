import { useEffect, useRef, useState } from 'react'
import './App.css'
import Todos from './components/Todos/Todos';

function App() {
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<number | null>(null); 

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCounter(prev => prev + 10);
      }, 10);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStop = () => {
    setIsRunning(false);
    setCounter(0);
  };

  const handlePause = () => {
    setIsRunning(prev => !prev);
  };

  const hours = Math.floor((counter / 1000) / 3600);
  const minutes = Math.floor((counter / 1000) / 60) % 60;
  const seconds = Math.floor((counter / 1000) % 60);
  const milliseconds = Math.floor(counter % 100);

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p className="counterText">
            <span>{ hours.toString().padStart(2, "0") } </span>
            <span> : </span> 
            <span>{ minutes.toString().padStart(2, "0") } </span>
            <span> : </span> 
            <span>{ seconds.toString().padStart(2, "0") }</span>
            <span>.</span>
            <span>{ milliseconds.toString().padStart(2, "0") }</span>
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

      <Todos />
    </>
  )
}

export default App
