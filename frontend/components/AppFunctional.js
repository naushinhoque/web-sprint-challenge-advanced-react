import React, { useState, useEffect } from 'react';
import axios from 'axios'

const initialMessage = '';

export default function AppFunctional(props) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [steps, setSteps] = useState(0);
  const [index, setIndex] = useState(4);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [error, setError] = useState('');

  const getXY = () => {
    const calculatedX = (index % 3) + 1;
    let calculatedY;
    if (index < 3) calculatedY = 1;
    else if (index < 6) calculatedY = 2;
    else if (index < 9) calculatedY = 3;
    return [calculatedX, calculatedY];
  };

  const reset = () => {
    setMessage('');
    setEmail('');
    setSteps(0);
    setIndex(4);
    setX(2);
    setY(2);
  };

  function getNextIndex(direction) {
    switch (direction) {
      case 'up':
        return index < 3 ? index : index - 3;
      case 'down':
        return index > 5 ? index : index + 3;
      case 'left':
        return index % 3 === 0 ? index : index - 1;
      case 'right':
        return (index - 2) % 3 === 0 ? index : index + 1;
      default:
        return index;
    }
  }

  const move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    setSteps((prevSteps) => prevSteps + 1);
    setMessage(initialMessage);
    setIndex(nextIndex);
  };

  const onChange = (evt) => {
    const { value } = evt.target;
    setEmail(value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (email === 'foo@bar.baz') {
      setError('foo@bar.baz failure #23');
      return;
    }

    axios
      .post('http://localhost:9000/api/result', {
        x,
        y,
        steps,
        email,
      })
      .then((res) => {
        if (res.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      })
      .catch((error) => {
        setError(error.response.data.message); // Update the error state
        console.error('Error:', error);
      });

    // Reset coordinates and steps
    reset();
  };

  const updateCoordinates = () => {
    const [calculatedX, calculatedY] = getXY();
    setX(calculatedX);
    setY(calculatedY);
  };

  useEffect(() => {
    updateCoordinates();
  }, [index]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"> </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
      <input id="email" type="email" onChange={onChange} value={email} />
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
