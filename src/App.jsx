import { useState, useEffect, useRef } from 'react';
import './App.css';
function App() {
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinutes] = useState(25);
  let [start, setStart] = useState(false);

  let intervalRef = useRef();

  const decreaseSeconds = () => setSeconds((prev) => prev - 1);
  const decreaseMinute = () => {
    setMinutes((prev) => prev - 1);
    setSeconds(59);
  };
  /* the pause func */

  const handleClick = () => {
    setStart((start) => !start);
  };

  /* the main counter  func */

  useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          decreaseSeconds();
        } else {
          if (minute > 0) {
            decreaseMinute();
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [seconds, minute, start]);

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
              <li className="pomodoro_tab">
                <a href="App.jsx"> pomodoro </a>
              </li>
              <li className=" short break"> short break</li>
              <li className=" long break">long break</li>
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

            <button
              onClick={() => {
                setStart(false);
                setSeconds(0);
                setMinutes(25);
              }}
            >
              reset
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;
