import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Timer from "../components/pomodoro/Timer"
import Controls from '../components/pomodoro/Controls';

export default class App extends React.Component {
     constructor(props) {
    super(props);
  }

  startStopButtonPress = () => {
    if (this._timer.state.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  resetButtonPress = () => {
    this._timer.resetTimer();
  };

  startTimer = () => {
    this._timer.startTimer();
  };

  stopTimer = () => {
    this._timer.stopTimer();
  };
    
    render() { 
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text>Pomodoro Timer!</Text>
            </View>
            <Timer
              ref={(ref) => {
                this._timer = ref;
              }}
            />
            <Controls
              onStartPausePress={this.startStopButtonPress}
              onResetPress={this.resetButtonPress}
            />
          </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
