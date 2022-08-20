import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from '../firebase';
import { useDispatch, useSelector } from 'react-redux';

const LoginScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // React States
  const resetStates = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const submitForm = async () => {
    setIsError(false);
    if (isRegistering) {
      await submitRegister();
    } else {
      await submitLogin();
    }
  };
  const submitRegister = async () => {
    try {
      await registerWithEmailAndPassword(userName, email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      resetStates();
    }
  };

  const submitLogin = async () => {
    try {
      const user = await logInWithEmailAndPassword(email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      resetStates();
      navigation.push('Dashboard');
    }
  };

  return (
    <View>
      <View>
        <Button
          onPress={() => {
            setIsRegistering(false);
          }}
          title={'Login'}
        />
        <Button
          title={'Register'}
          onPress={() => {
            setIsRegistering(true);
          }}
        />
      </View>
      <View>
        {isRegistering ? (
          <TextInput
            placeholder='name'
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
        ) : null}
        <TextInput
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title={'Submit'} onPress={submitForm} />
      </View>
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

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

export default LoginScreen;
