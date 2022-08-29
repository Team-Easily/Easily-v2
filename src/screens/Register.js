import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { registerWithEmailAndPassword } from '../firebase/firebaseMethods';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUserUid } from '../components/auth/authSlice';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore();

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
        const user = await registerWithEmailAndPassword(
          userName,
          email,
          password
        );
        dispatch(setUserUid(user.uid));
        navigation.push('Nav Bar');
      } catch (error) {
        Alert.alert('Sign up failed', 'Please try again.');
      }
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
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder='name'
          value={userName}
          onChangeText={(text) => setUserName(text)}
          mode='flat'
        />
        <TextInput
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ marginTop: 15 }}
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
        <Button
          style={{ marginTop: 15 }}
          icon='send'
          mode='contained'
          onPress={submitRegister}
          color='#07BEB8'
          contentStyle={{ height: 45 }}
          labelStyle={{ color: 'white', fontSize: 18 }}
        >
          Register
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
            submitGoToLogin();
          }}
          contentStyle={{ height: 45 }}
          labelStyle={{ color: '#07BEB8', fontSize: 18 }}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default Register;
