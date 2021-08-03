import React, { useState } from 'react';
import { timer } from 'rxjs';
import Display from './Display';
import { Button } from './Button';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const source = timer(0, 100);
let subscriber;

const initialState = 0;

function App() {
  const [seconds, setSeconds] = useState(initialState);
  const [minutes, setMinutes] = useState(initialState);
  const [hours, setHours] = useState(initialState);
  const [disabled, setDisabled] = useState(false);

  const start = () => {
    subscriber = source.subscribe((n) => {
      if (n === 10) {
        setMinutes((prevState) => prevState + 1);
        subscriber.unsubscribe();
        start();
      }
      setSeconds(n);
    });
  };

  if (minutes === 3) {
    setHours((prevState) => prevState + 1);
    setMinutes(initialState);
  }

  const setInitialTime = () => {
    setSeconds(initialState);
    setMinutes(initialState);
    setHours(initialState);
  };

  const stop = () => {
    if (subscriber) {
      subscriber.unsubscribe();
    }
    setInitialTime();
    setDisabled(false);
  };

  const reset = () => {
    if (!subscriber) {
      return;
    } else {
      subscriber.unsubscribe();
    }
    setInitialTime();
    start();
  };

  return (
    <div style={style} className="App">
      <Display time={{ seconds, minutes, hours }} />
      <div style={{ display: 'flex', marginTop: 25 }}>
        <Button
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            start();
          }}
        >
          Start
        </Button>
        <Button onClick={stop}>Stop</Button>
        <Button
          onClick={() => {
            console.log('setMinutes: ', minutes);
          }}
        >
          Wait
        </Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

export default App;
