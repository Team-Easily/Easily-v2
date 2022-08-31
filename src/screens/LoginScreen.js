import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setUserUid } from '../components/auth/authSlice';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import useAuth from '../authProvider';

const LoginScreen = ({ navigation }) => {
  const { authUser, signInManually, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
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
      const user = await signInManually(email, password);
      console.log(user);
      //      dispatch(user.uid);
      navigation.push('Nav Bar');
      resetStates();
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  const googleSignInWithPopup = () => {
    signInWithGoogle();
    // get user points, if user is not already in db then register
    navigation.push('Nav Bar');
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="flat"
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ marginTop: 15 }}
          mode="flat"
        />
        <View>
          <Button
            style={{ marginTop: 15 }}
            icon="send"
            mode="contained"
            onPress={submitLogin}
            color="#07BEB8"
            contentStyle={{ height: 45 }}
            labelStyle={{ color: 'white', fontSize: 18 }}
          >
            Login
          </Button>

          <Button
            style={{ marginTop: 15 }}
            icon="google"
            mode="contained"
            onPress={() => {
              googleSignInWithPopup();
              console.log(authUser);
            }}
            color="#4285F4"
            contentStyle={{ height: 45 }}
            labelStyle={{ color: 'white', fontSize: 18 }}
          >
            Login with Google
          </Button>

          <Button
            style={{ marginTop: 15 }}
            mode="text"
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
    marginTop: 300,
    marginLeft: 40,
    marginRight: 40,
  },
  googleButton: {
    fontFamily: 'Roboto',
  },
});

export default LoginScreen;
