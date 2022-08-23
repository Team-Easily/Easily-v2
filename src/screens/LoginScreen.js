import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase';
// import * as Google from 'expo-google-app-auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  query,
  doc,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';

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

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore();

  const googleSignInWithPopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('SUCCESS!', user);
        setDoc(doc(db, 'users', user.uid), {
          userName: user.displayName,
          email: user.email,
        });
        navigation.push('Nav Bar');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
          <Button title={'Login'} onPress={submitLogin} style={styles.button} />

          <FontAwesome.Button
            name='google'
            backgroundColor='#4285F4'
            style={(styles.button, styles.googleButton)}
            onPress={googleSignInWithPopup}
          >
            Login with Google
          </FontAwesome.Button>

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
