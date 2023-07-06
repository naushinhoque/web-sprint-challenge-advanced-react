import React, { useState } from 'react'

const initialMessage = '';

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    Message: '',
    Email: '',
    Steps: 0,
    Index: 4,
  });

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const { Index } = state;
    const x = (Index % 3) + 1;
    let y;
    if (Index < 3) y = 1;
    else if (Index < 6) y = 2;
    else if (Index < 9) y = 3;
    return [x, y];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [x, y] = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState((prevState) => ({
      ...prevState,
      Message: '',
      Email: '',
      Steps: 0,
      Index: 4,
    }));
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const { Index } = state;
    switch (direction) {
      case 'up':
        return Index < 3 ? Index : Index - 3;
      case 'down':
        return Index > 5 ? Index : Index + 3;
      case 'left':
        return Index % 3 === 0 ? Index : Index - 1;
      case 'right':
        return (Index - 2) % 3 === 0 ? Index : Index + 1;
      default:
        return Index;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    setState((prevState) => ({
      ...prevState,
      Steps: prevState.Steps + 1,
      Message: initialMessage,
      Index: nextIndex,
    }));
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      Email: value,
    }));
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const { Email } = state;
    console.log('Email:', Email);
  }

  return (
    <div id="wrapper">
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {state.Steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === state.Index ? ' active' : ''}`}>
            {idx === state.Index ? 'B' : null}
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
        <input id="email" type="email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
