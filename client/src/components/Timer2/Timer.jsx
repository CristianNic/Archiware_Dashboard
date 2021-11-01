// https://stackoverflow.com/questions/40885923/countdown-timer-in-react

import React, { Component } from "react";

class Timer extends Component {

  state = {
    time: [],
    timer: 0,
    seconds: 10
  }

  componentDidMount() {
    const timeLeft = this.secondsToTime(this.state.seconds)
    this.setState({
      time: timeLeft
    })
  }

  secondsToTime(secs){
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens. 
    const seconds = this.state.seconds - 1
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    })
    // Check if we are zero
    if (seconds === 0) {
      clearInterval(this.timer)
    }
  }

  render() {
    return (
      <div className="timer">
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

export default Timer


// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

// https://codepen.io/gaearon/pen/gwoJZk?editors=0110


