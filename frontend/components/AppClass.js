import React from 'react'
import axios from 'axios'

const initialMessage = ''

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Message: '',
      Email: '',
      Steps: 0,
      Index: 4,
      x: 2,
      y: 2
    };
  }

  getXY = (gridSize, cellIndex) => {
    const { Index } = this.state
    const x = (Index % 3) + 1
    let y
    if (Index < 3) y = 1
    else if (Index < 6) y = 2
    else if (Index < 9) y = 3
    return [x, y]
  }

  getXYMessage = () => {
    const [x, y] = this.getXY()
    this.setState({ x: x, y: y})
    return `Coordinates (${x}, ${y})`
  }

  reset = () => {
    this.setState({
      Message: '',
      Email: '',
      Steps: 0,
      Index: 4
    });
  }

  getNextIndex = (direction) => {
    const { Index } = this.state
    switch (direction) {
      case 'up':
        return (Index < 3) ? Index : Index - 3
      case 'down':
        return (Index > 5) ? Index : Index + 3
      case 'left':
        return (Index % 3 === 0) ? Index : Index - 1
      case 'right':
        return ((Index - 2) % 3 === 0) ? Index : Index + 1
    }
    return nextIndex;
  }

  move = (evt) => {
    console.log('up');
    console.log(evt);
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
    const steps = this.state.Steps + 1;
    this.setState({
      ...this.state,
      Steps: this.state.Steps + 1,
      Message: initialMessage,
      Index: nextIndex,
    });
  }

  onChange = (evt) => {
    this.setState({ Email: evt.target.value });
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { Email } = this.state;

    axios.post('http://localhost:9000/api/result', {
      "x": this.state.x, "y": this.state.y, "steps": this.state.Steps, "email": this.state.Email
    })
      .then(res => {
        if (res.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email')
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
    

    // Reset coordinates and steps
    this.setState((prevState) => ({
      ...prevState,
      Message: '',
      Email: '',
      Steps: 0,
      Index: 4
    }));
  }

render() {
  const { className } = this.props;
  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {this.getXYMessage()}</h3>
        <h3 id="steps">You moved {this.Steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === this.state.Index ? ' active' : ''}`}>
            {idx === this.state.Index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{this.state.Message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={this.move}>LEFT</button>
        <button id="up" onClick={this.move}>UP</button>
        <button id="right" onClick={this.move}>RIGHT</button>
        <button id="down" onClick={this.move}>DOWN</button>
        <button id="reset" onClick={this.reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
        <input id="submit" type="submit" onClick={this.onSubmit}></input>
      </form>
    </div>
  );
}
}


  //render() {
  //  const { className } = this.props
  //  return (
  //  <div id="wrapper" className={className}>
  //  <div className="info">
  //    <h3 id="coordinates">Coordinates {this.getXYMessage()}</h3>
  //    <h3 id="steps">You moved {this.Steps} times</h3>
  //  </div>
  //  <div id="grid">
  //    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
  //      <div key={idx} className={`square${idx === this.state.Index ? ' active' : ''}`}>
  //        {idx === this.state.Index ? 'B' : null}
  //      </div>
  //    ))}
  //  </div>
  //  <div className="info">
  //    <h3 id="message">{this.state.Message} </h3>
  //  </div>
  //  <div id="keypad">
  //        <button id="left" onClick={this.move}>LEFT</button>
  //        <button id="up" onClick={this.move}>UP</button>
  //        <button id="right" onClick={this.move}>RIGHT</button>
  //        <button id="down" onClick={this.move}>DOWN</button>
  //        <button id="reset" onClick={this.reset}>reset</button>
  //      </div>
  //      <form>
  //        <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
  //        <input id="submit" type="submit" onClick={this.onSubmit}></input>
  //      </form>
  //    </div>
  //  )
  //}


