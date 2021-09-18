import React, { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import alarmBackground from '../Res/alarm-background.jpg';

const Alarm = () => {
    const [intialTime, setInitialTime] = useState(0);
    const [newTime, setNewTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timeRemainingPercent, setTimeRemainingPercent] = useState(0);

    const setInitialAndRemainingTime = (input) => {
        setInitialTime(input);
        setTimeRemaining(input);
    }
    
    const newTimeOnClick = () => setInitialAndRemainingTime(newTime * 60);

    const countdownTime = () => {
        const tick = () => {
          if(timeRemaining !== 0 && intialTime !== 0){
            setTimeRemainingPercent(Math.round( (1 - (timeRemaining / intialTime)) * 100) );
            setTimeRemaining(timeRemaining => timeRemaining - 1);
          } else if(timeRemaining === 0)  {
            setTimeRemainingPercent(100);
            setInitialAndRemainingTime(0);
          }
        }
    
        setTimeout(tick, 1000);
    }

    const showAlert = () => alert('Max Timer is 60 Minutes. Please select a valid drink alarm timer');

    useEffect(() => countdownTime(), [timeRemaining,intialTime]);

    useEffect(() => setInitialAndRemainingTime(0), [newTime]);

    return (
        <div className='Page col alarm' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${alarmBackground})`, justifyContent: 'space-evenly'}}>
            <div className='col'>
                <h1>{timeRemaining === 0 ? 
                    `Time to take a drink now!` : 
                    `Take a drink in...${String(Math.floor(timeRemaining/60)).padStart(2, '0')}:${String(timeRemaining % 60).padStart(2, '0')} minutes`}
                </h1>

                <ProgressBar completed={timeRemainingPercent} width='600px' bgColor='rgb(37,174,244)' labelSize='18px' labelAlignment={timeRemainingPercent <= 10 ? 'left' : 'center'}/>
            </div>

            <div className='col'>
                <h2>Set A New Drink Alarm Timer (Minutes)</h2>

                <input type='number' maxLength='2' max='60' min='1' value={newTime} onChange={e => setNewTime(e.target.value)}/>
            </div>

            <button onClick={newTime && newTime <= 60 ? newTimeOnClick : showAlert}>Start New Timer</button>
        </div>
    )
}

export default Alarm;