import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Title } from 'react-native-paper';
import PropTypes from 'prop-types';

const ClockView = (props) => {
  return (
    <View style={styles.clockviewContainer}>
      <Title style={styles.clockViewHeader}>{props.time.type} Time</Title>
      <Title style={styles.timeText}>
        {props.time.minutes}:{padZero(props.time.seconds)}
      </Title>
    </View>
  );
};

ClockView.propTypes = {
  time: PropTypes.shape({
    type: PropTypes.string,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
};

ClockView.defaultProps = {
  time: {
    type: 'Default',
    minutes: 25,
  },
};

const padZero = (number) => {
  if (number.toString().length === 1) {
    return '0' + number.toString();
  } else {
    return number;
  }
};

const styles = StyleSheet.create({
  clockviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2.5rem',
  },

  clockViewHeader: {
    fontSize: '1.25rem',
    color: '#ffffff',
  },

  timeText: {
    fontSize: '4.7rem',
    color: '#ffffff',
    marginTop: '1.25rem',
    marginBottom: '2rem',
  },
});

export default ClockView;
