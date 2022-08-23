import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import { registerWithEmailAndPassword } from '../firebase';
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

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const validate = () => {
    if (email === '') {
      setEmailError('Please enter a valid email.');
    }
    if (password === '') {
      setPasswordError('Please enter your password.');
    }
    if (userName === '') {
      setUsernameError('Please enter a valid username.');
    }
    if (emailError || passwordError || usernameError) {
      return false;
    }
    return true;
  };

  const submitGoToLogin = () => {
    navigation.push('Login');
  };

  const submitRegister = async () => {
    if (validate()) {
      try {
        await registerWithEmailAndPassword(userName, email, password);
        navigation.push('Nav Bar');
      } catch (error) {
        Alert.alert('Sign up failed', 'Please try again.');
      }
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
      <View style={styles.form}>
        <TextInput
          placeholder='name'
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
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
        <Button title={'Submit'} onPress={submitRegister} />

        <FontAwesome.Button
          name='google'
          backgroundColor='#4285F4'
          style={(styles.button, styles.googleButton)}
          onPress={googleSignInWithPopup}
        >
          Login with Google
        </FontAwesome.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    alignItems: 'center',
    gap: 5,
    marginVertical: 1,
  },
});

export default Register;
