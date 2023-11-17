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


 const handlePomodoro = () => {
   setMinutes(25);
   setSeconds(0);
   setStart(false);
 };


  const handleShortBreakClick = () => {
    setMinutes(5);
    setSeconds(0);
    setStart(false);
  };

  const handleLongBreakClick = () => {
    setMinutes(15);
    setSeconds(0);
    setStart(false);
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

  /* the alert one idk why i added this  ,   !! must replay this with  a sound effect when the counter is done !! */

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
            <button className="" onClick={handlePomodoro} >pomodoro </button>
            <button className=" short break" onClick={handleShortBreakClick}>
              {' '}
              short break
            </button>
            <button className=" long break" onClick={handleLongBreakClick}>
              long break
            </button>
          </div>

          <span className="timer_countdown">
            {' '}
            <p>{`${minute.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}`}</p>
          </span>

          <div className="btn">
            <button className="startUpBtn" onClick={handleClick}>
              {start ? 'start' : 'paused'}
            </button>

            <button
              onClick={() => {
                setStart(false);
                setSeconds(0);
                setMinutes(25);
              }}
            >
              {' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
