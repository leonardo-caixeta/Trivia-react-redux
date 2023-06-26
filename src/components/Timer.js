import React, { Component } from 'react';

export default class Timer extends Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    this.timer();
  }

  timer = () => {
    const interval = 1000;
    setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }));
      } else if (time === 0) {
        clearInterval(interval);
      }
    }, interval);
  };

  render() {
    const { time } = this.state;
    return (
      <div className="timer">
        <div>
          <span>
            {time}
            s
          </span>

        </div>
      </div>
    );
  }
}
