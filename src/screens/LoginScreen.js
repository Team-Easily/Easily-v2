import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase/firebaseMethods';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TextInput, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setUserUid } from '../components/auth/authSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore();

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
      const user = await logInWithEmailAndPassword(email, password);
      dispatch(setUserUid(user.uid));
      navigation.push('Nav Bar');
      resetStates();
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  const googleSignInWithPopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;
        console.dir;

        // get user points, if user is not already in db then register
        if (!googleUser.points) {
          setDoc(doc(db, 'users', googleUser.uid), {
            userName: googleUser.displayName,
            email: googleUser.email,
            points: 0,
            uid: googleUser.uid,
            imageUrl: googleUser.photoURL,
          });
          console.log('GMAIL USER REGISTERED!', googleUser);
        }

        console.log('GMAIL USER LOGGED IN!', googleUser);
        navigation.push('Nav Bar');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
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
          <FontAwesome.Button
            name='google'
            backgroundColor='#4285F4'
            style={(styles.button, styles.googleButton)}
            onPress={googleSignInWithPopup}
          >
            Login with Google
          </FontAwesome.Button>

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
