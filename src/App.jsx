import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(60);
  const [minute, setMinutes] = useState(24);
  const [pause, setPause] = useState(false);

  let intervalRef = useRef();

  const decreaseSeconds = () => setSeconds((prev) => prev - 1);
  useEffect(() => {
    intervalRef.current = setInterval(decreaseSeconds, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseSeconds, 1000);
    }
    setPause((prev) => !prev);
  };

  return (
    <div className="pomodoro_app">
      <div className="top_bar">
        <h1> pomodoro </h1>
        <hr />
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
          {minute} : {seconds}{' '}
        </span>

        <div className='btn'>
          <button onClick={handleClick}>{pause ? 'start' : 'pause'}</button>
        </div>
      </div>
</div>
     
    </div>
  );
}

export default App;
