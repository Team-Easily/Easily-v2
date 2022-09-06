import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

const ConfigTimerInput = (props) => {
  return (
    <View style={style.configInputContainer}>
      <Title style={style.typeText}>{props.data.type} Time </Title>
      <TextInput
        style={style.inputField}
        defaultValue={`${props.data.minutes}`}
        onChangeText={(text) => {
          props.data.minutes = parseInt(text);
          props.onUpdate(props.data);
        }}
        placeholder='Minutes'
        keyboardType='numeric'
        color='tomato'
      />
    </View>
  );
};

ConfigTimerInput.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    minutes: PropTypes.number.isRequired,
    // seconds: PropTypes.number.isRequired,
  }),
};

const style = StyleSheet.create({
  configInputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    color: '#ffffff',
    marginTop: '.75rem',
    marginBottom: '.5rem',
  },
  inputField: {
    borderRadius: 5,
    opacity: 0.75,
    marginBottom: '.50rem',
    height: 53,
    width: 100,
    color: 'tomato',
  },
});

export default ConfigTimerInput;
