import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const Controls = (props) => {
  const startPauseText = props.isTimerRunning ? 'Pause' : 'Start';
  return (
    <View style={style.controlContainer}>
      <Button
        style={style.button}
        onPress={props.onStartPausePress}
        title={startPauseText}
        mode='contained'
        color='#ffffff'
        labelStyle={{ color: 'tomato', fontSize: 18 }}
      >
        {startPauseText}
      </Button>
      <Button
        style={style.button}
        onPress={props.onResetPress}
        title='Reset'
        mode='outlined'
        color='#ffffff'
        labelStyle={{ color: 'white', fontSize: 18 }}
      >
        Reset
      </Button>
    </View>
  );
};

Controls.propTypes = {
  onStartPausePress: PropTypes.func,
  onResetPress: PropTypes.func,
};

const style = StyleSheet.create({
  controlContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  button: {
    margin: '0.5rem',
    borderColor: '#ffffff',
    borderWidth: '1px',
  },
});

export default Controls;
