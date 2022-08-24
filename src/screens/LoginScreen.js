import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase';
import * as Google from 'expo-google-app-auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

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

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '650975721235-81qfqcr0vui92b5l28lckmclljkolh47.apps.googleusercontent.com',
        scopes: ['profile', 'email', 'calendar'],
      });
      if (result.type === 'success') {
        setAccessToken(result.accessToken);
        // return result.accessToken;
      } else {
        console.log('Permission denied');
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <FontAwesome.Button
            name='google'
            backgroundColor='#4285F4'
            style={(styles.button, styles.googleButton)}
            onPress={signInWithGoogleAsync}
          >
            Login with Google
          </FontAwesome.Button>

          <Button title={'Login'} onPress={submitLogin} style={styles.button} />

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
    marginTop: 300,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: '.5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
  googleButton: {
    fontFamily: 'Roboto',
  },
});

export default LoginScreen;
