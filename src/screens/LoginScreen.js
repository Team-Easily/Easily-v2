import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase/firebaseMethods';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
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
        // This gives you a Google Access Token. You can use it to access the Google API. We'll probably want to add it to the store.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;

        // get user points, if user is not already in db then register
        if (!googleUser.points) {
          setDoc(doc(db, 'users', googleUser.uid), {
            address: '',
            email: googleUser.email,
            firstName: '',
            imageUrl: googleUser.photoURL,
            lastName: '',
            points: 0,
            uid: googleUser.uid,
            userName: googleUser.displayName,
          });
        }

        dispatch(setUserUid(googleUser.uid));
        navigation.push('Nav Bar');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
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

          <Button
            style={{ marginTop: 15 }}
            icon='google'
            mode='contained'
            onPress={googleSignInWithPopup}
            color='#4285F4'
            contentStyle={{ height: 45 }}
            labelStyle={{ color: 'white', fontSize: 18 }}
          >
            Login with Google
          </Button>

          <Button
            style={{ marginTop: 15 }}
            mode='text'
            onPress={() => {
              submitGoToRegister();
            }}
            contentStyle={{ height: 45 }}
            labelStyle={{ color: '#2c497f', fontSize: 18 }}
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
    marginTop: 100,
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
  },
  logo: {
    height: 150,
    width: 150,
    margin: 30,
  },
  googleButton: {
    fontFamily: 'Roboto',
  },
});

export default LoginScreen;
