import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore();

  // const googleSignInWithPopup = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log('SUCCESS!', user);
  //       setDoc(doc(db, 'users', user.uid), {
  //         userName: user.displayName,
  //         email: user.email,
  //       });
  //       navigation.push('Nav Bar');
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  // const googleSignInWithRedirect = () => {
  //   signInWithRedirect(auth, provider);
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;

  //       // The signed-in user info.
  //       const user = result.user;
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

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
          {/* <FontAwesome.Button
            name='google'
            backgroundColor='#4285F4'
            style={(styles.button, styles.googleButton)}
            onPress={googleSignInWithRedirect}
          >
            Login with Google
          </FontAwesome.Button> */}

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
    fontFamily: 'Trebuchet MS',
  },
});

export default LoginScreen;
