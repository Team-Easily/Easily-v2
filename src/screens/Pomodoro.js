import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import CountdownTimer from '../components/pomodoro/CountdownTimer.js';
import Controls from '../components/pomodoro/Controls';
import ConfigTimerInput from '../components/pomodoro/ConfigTimerInput';
import { Headline } from 'react-native-paper';

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTimerIdx: 0,
      timers: [
        { minutes: 25, seconds: 0, type: 'Work' },
        { minutes: 5, seconds: 0, type: 'Break' },
      ],
      isTimerRunning: false,
      isTimerPaused: false,
    };
  }

  onUpdateTimerConfig = (timerObject) => {
    timerObject = this.validateTimerObject(timerObject);
    const newTimers = this.state.timers.map((timer) => {
      if (timer.type === timerObject.type) {
        return timerObject;
      } else {
        return timer;
      }
    });
    this.setState({ timers: newTimers });
  };

  validateTimerObject = (timerObject) => {
    if (isNaN(parseInt(timerObject.seconds))) {
      timerObject.seconds = 0;
    } else if (timerObject.seconds > 59) {
      timerObject.seconds = 59;
    } else if (isNaN(parseInt(timerObject.minutes))) {
      timerObject.minutes = 0;
    }
    return timerObject;
  };

  onCountdownComplete = () => {
    this.setState(
      (previousState) => ({
        currentTimerIdx: previousState.currentTimerIdx + 1,
      }),
      () => {
        this._timer.updateTimer(
          this.state.timers[
            this.state.currentTimerIdx % this.state.timers.length
          ]
        );
      }
    );
  };

  startStopButtonPress = () => {
    if (this.state.isTimerPaused && !this.state.isTimerRunning) {
      this.startTimer();
    } else if (this.state.isTimerRunning) {
      this.stopTimer();
    } else {
      // fresh start
      this.resetTimer();
      this.startTimer();
    }
  };

  resetTimer = () => {
    if (this.state.isTimerRunning) {
      this.stopTimer();
      this.setState({ currentTimerIdx: 0, isTimerPaused: false });
    }
    this._timer.updateTimer(this.state.timers[0]);
  };

  startTimer = () => {
    this.setState({ isTimerRunning: true });
    this._timer.startCountdown();
  };

  stopTimer = () => {
    this.setState({ isTimerRunning: false, isTimerPaused: true });
    this._timer.stopCountdown();
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle='light-content' />
        <ScrollView style={styles.container}>
          <Headline style={styles.headerText}>Pomodoro Timer</Headline>
          <CountdownTimer
            time={this.state.timers[this.state.currentTimerIdx]}
            onCountdownComplete={this.onCountdownComplete}
            ref={(ref) => {
              this._timer = ref;
            }}
          />
          <Controls
            onStartPausePress={this.startStopButtonPress}
            onResetPress={this.resetTimer}
            isTimerRunning={this.state.isTimerRunning}
          />
          <View style={styles.inputRow}>
            {this.state.timers.map((e, idx) => {
              return (
                <ConfigTimerInput
                  key={idx}
                  data={e}
                  onUpdate={this.onUpdateTimerConfig}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '18%',
    paddingHorizontal: '2rem',
    backgroundColor: 'tomato',
  },
  headerText: {
    fontSize: '2.4rem',
    fontWeight: '500',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '0.85rem',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
