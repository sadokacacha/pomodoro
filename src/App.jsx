import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinutes] = useState(25);

  let [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive == true) {
      interval = setInterval(() => {
        setSeconds((prevCounter) => {
          if (prevCounter === 0) {
            setMinutes((prevCounter2) => prevCounter2 - 1);
            return 0;
          } 
          return prevCounter - 1;
        });
        return 0;
      });
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  return (
    <div className="pomodoro_app">
      <div className="top_bar">
        <h1> pomodoro </h1>
        <hr />
      </div>

      <div className="pomo_Count">
        <div className="pomodoro_type">
          <ul>
            <li> pomodoro </li>
            <li>break</li>
            <li>long break</li>
          </ul>
        </div>

        <div className="timer_countdown">
          {' '}
          {minute} : {seconds}{' '}
        </div>

        <div>
          <button
            onClick={() => {
              setTimerActive(true);
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
