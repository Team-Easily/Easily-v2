import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // React States
  const resetStates = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const submitGoToRegister = () => {
    navigation.push('Register');
  };

  const submitLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
      navigation.push('Nav Bar');
      resetStates();
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <View>
          <Button title={'Login'} onPress={submitLogin} />
          <Button
            style={styles.button}
            title={'Create New Account'}
            onPress={() => {
              submitGoToRegister();
            }}
          />
        </View>
      </View>
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    // height: '100%',
    marginTop: 300,
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // loginContainer: {
  //   width: '70%',
  //   borderRadius: 25,
  //   padding: 100,
  //   // marginTop: 300,
  // },
  // loginText: {
  //   color: 'white',
  // },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: '.5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 20,
    width: 40,
    backgroundColor: 'red',
  },
  // form: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // gap: '1rem',
  //   // marginVertical: '.5rem',
  // },
  // input: {
  //   marginTop: 20,
  //   width: 300,
  //   height: 40,
  //   paddingHorizontal: 10,
  //   borderRadius: 50,
  //   backgroundColor: '#DCDCDC',
  // },
});

export default LoginScreen;
