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
        <h3 className="timer__hello">m: {this.state.time.m} s: {this.state.time.s}</h3>
      </div>
    )
  }
}

export default Timer