import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ClockView from "./ClockView";
import Controls from "./Controls";
import { Vibration } from "react-native";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: {
        type: "Work",
        minutes: 0,
        seconds: 10,
      },
      config: {
        work: {
          type: "Work",
          minutes: 0,
          seconds: 10,
        },
        break: {
          type: "Break",
          minutes: 0,
          seconds: 10,
        },
      },
    };

    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    this.setState({ timerRunning: true }, () => {
      this.countdown();
    });
  }

  stopTimer() {
    console.log("Stop Timer");
    this.setState({ timerRunning: false });
  }

  resetTimer() {
    this.setState({ timerRunning: false, current: this.state.config.work });
  }

  async countdown() {
    while (this.state.timerRunning) {
      if (
        this.state.current.seconds === 0 &&
        this.state.current.minutes === 0
      ) {
        Vibration.vibrate([500, 500, 500]);
        this.setState({
          current:
            this.state.current.type === "Work"
              ? this.state.config.break
              : this.state.config.work,
        });
      }
      await sleepSecond().then(() => {
        if (this.state.current.seconds - 1 < 0) {
          this.setState({
            current: {
              type: this.state.current.type,
              minutes: this.state.current.minutes - 1,
              seconds: 59,
            },
          });
        } else {
          this.setState({
            current: {
              type: this.state.current.type,
              minutes: this.state.current.minutes,
              seconds: this.state.current.seconds - 1,
            },
          });
        }
      });
    }
  }

  render() {
    return <ClockView time={this.state.current} />;
  }
}
export default Timer;
