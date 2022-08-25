import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase/firebaseMethods';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // React States
  const resetStates = () => {
    setEmail('');
    setPassword('');
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
      <View>
        <TextInput
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode='flat'
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ marginTop: 15 }}
          mode='flat'
        />
        <View>
          <Button
            style={{ marginTop: 15 }}
            icon='send'
            mode='contained'
            onPress={submitLogin}
            color='#07BEB8'
            contentStyle={{ height: 45 }}
            labelStyle={{ color: 'white', fontSize: 18 }}
          >
            Login
          </Button>

          <Button title={'Login'} onPress={submitLogin} style={styles.button} />

          <Button
            style={{ marginTop: 15 }}
            mode='text'
            onPress={() => {
              submitGoToRegister();
            }}
            contentStyle={{ height: 45 }}
            labelStyle={{ color: '#07BEB8', fontSize: 18 }}
          >
            Create New Account
          </Button>
        </View>
      </View>
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    marginLeft: 40,
    marginRight: 40,
  },
  googleButton: {
    fontFamily: 'Roboto',
  },
});

export default LoginScreen;
