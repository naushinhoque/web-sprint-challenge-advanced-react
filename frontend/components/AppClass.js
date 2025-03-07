import React from 'react';
import axios from 'axios';

const initialMessage = '';

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      steps: 0,
      index: 4,
      x: 2,
      y: 2,
      error: '',
      successMessage: '',
    };
  }

  getXY = () => {
    const calculatedX = (this.state.index % 3) + 1;
    let calculatedY;
    if (this.state.index < 3) calculatedY = 1;
    else if (this.state.index < 6) calculatedY = 2;
    else if (this.state.index < 9) calculatedY = 3;
    return [calculatedX, calculatedY];
  };

  //Reset message to empty string 
  reset = () => {
    this.setState({
      message: '',
      email: '',
      steps: 0,
      index: 4,
      x: 2,
      y: 2,
      error: '',
      successMessage: '',
    });
  };

  getNextIndex = (direction) => {
    const { index } = this.state;
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
  };

  move = (evt) => {
    const direction = evt.target.id;
  
    if (direction === 'up' && this.state.index < 3) {
      this.setState({ message: "You can't go up" });
      return;
    }
  
    if (direction === 'down' && this.state.index > 5) {
      this.setState({ message: "You can't go down" });
      return;
    }
  
    if (direction === 'right' && (this.state.index + 1) % 3 === 0) {
      this.setState({ message: "You can't go right" });
      return;
    }
  
    if (direction === 'left' && this.state.index % 3 === 0) {
      this.setState({ message: "You can't go left" });
      return;
    }

    if (direction === 'up' || direction === 'right') {
      this.setState({ movedBeforeSubmit: true }); // Set the flag if UP or RIGHT is clicked
    }
  
    this.setState(
      (prevState) => {
        const nextIndex = this.getNextIndex(direction);
        return {
          steps: prevState.steps + 1,
          message: initialMessage,
          index: nextIndex,
        };
      },
      () => {
        this.updateCoordinates(); 
      }
    );
  };

  onChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      email: value,
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { email, x, y, steps, movedBeforeSubmit} = this.state;
    axios
      .post('http://localhost:9000/api/result', {
        x,
        y,
        steps,
        email,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ successMessage: res.data.message, email: ""});
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: 'An error occurred. Please try again later.' });
        }
        console.error('Error:', error);
      });

     //Reset coordinates and steps
    //if (!email.trim() && !movedBeforeSubmit) {
    //  this.reset();
    //} else {
    //  this.setState({ movedBeforeSubmit: false }); // Reset the flag for the next submission
    //}
  };
  

  updateCoordinates = () => {
    const [calculatedX, calculatedY] = this.getXY();
    this.setState({
      x: calculatedX,
      y: calculatedY,
    });
  };

  componentDidMount() {
    this.updateCoordinates();
  }

  render() {
    const {
      message,
      email,
      steps,
      index,
      x,
      y,
      error,
      successMessage,
    } = this.state;
    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx === this.state.index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
          <h3 id="message">{this.state.error}</h3>
          <h3 id="success-message">{this.state.successMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" onChange={this.onChange} value={this.state.email} />
          <input id="submit" type="submit" />
        </form>
      </div>
    );
  }
}


