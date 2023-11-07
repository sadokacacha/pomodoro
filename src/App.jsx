import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinutes] = useState(25);
  const [start, setstart] = useState(true);

  let intervalRef = useRef();

  const decreaseSeconds = () => setSeconds((prev) => prev - 1);
  const decreaseMinute = () => {
    setMinutes((prev) => prev - 1);
    setSeconds(59);
  };
  const startCounter = () => setstart((start) => !start);
  /* the pause func */

  const handleClick = () => {
    if (!start) {
      intervalRef.current = setInterval(decreaseSeconds, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    startCounter();
  };

  /* the main counter  func */

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        decreaseSeconds();
      } else {
        if (minute > 0) {
          decreaseMinute();
        }
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [seconds, minute]);

  /* the alert one idk why i added this */

  if (seconds === 0 && minute === 0) {
    alert('times up desu');
  }

  return (
    <div className="pomodoro_app">
      <div className="top_bar">
        <h1> pomodoro </h1>
        <hr className="title_line" />
      </div>
      <div className="pomo_container">
        <div className="pomo_Count">
          <div className="pomodoro_type">
            <ul>
              <li> pomodoro </li>
              <li>break</li>
              <li>long break</li>
            </ul>
          </div>

          <span className="timer_countdown">
            {' '}
            <p>{`${minute.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}`}</p>
          </span>

          <div className="btn">
            <button onClick={handleClick}>{start ? 'start' : 'pause'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
