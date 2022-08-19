import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../firebase';

export default function Main() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const updatePassword = (text) => {
    // setPassword(text);
  };
  const updateEmail = (text) => {
    // setEmail(text);
  };
  const updateUserName = (text) => {
    // setUserName(text);
  };

  const submitForm = async () => {
    // setIsError(false);
    if (isRegistering) {
      await submitRegister();
    } else {
      await submitLogin();
    }
  };
  const submitRegister = async () => {
    // dispatch(setStatus('loading'));
    try {
      // await registerWithEmailAndPassword(email, password);
    } catch (error) {
      // setIsError(true);
      setErrMessage(error);
    } finally {
      // dispatch(setStatus('idle'));
      resetStates();
    }
  };
  const submitLogin = async () => {
    try {
      // const user = await logInWithEmailAndPassword(email, password);
      if (user) {
        // dispatch(setIsLoggedIn(true));
      }
    } catch (error) {
      // setIsError(true);
      setErrMessage(error);
    } finally {
      resetStates();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => {
            setIsRegistering(false);
          }}
          title={'Login'}
        />
        <Button
          style={styles.button}
          title={'Register'}
          onPress={() => {
            setIsRegistering(true);
          }}
        />
      </View>
      <View style={styles.form}>
        {/* {isRegistering ? (
          <TextInput
            placeholder="username"
            value={userName}
            onChangeText={updateUserName}
            style={styles.input}
          />
        ) : null} */}
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={updateEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={updatePassword}
          style={styles.input}
        />
        <Button title={'Submit'} onPress={submitForm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
  loginContainer: {
    width: '70%',
    borderRadius: 25,
    padding: 100,
    marginTop: 300,
  },
  loginText: {
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: '.5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 25,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginVertical: '.5rem',
  },
  input: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
});
