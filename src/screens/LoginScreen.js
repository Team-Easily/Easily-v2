import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { logInWithEmailAndPassword } from '../firebase/firebaseMethods';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import useAuth from '../authProvider';

const LoginScreen = ({ navigation }) => {
  const { signInManually, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const db = getFirestore();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.push('Nav Bar');
    }
  }, [isLoggedIn]);

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
      signInManually(email, password);
      resetStates();
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  const googleSignInWithPopup = () => {
    signInWithGoogle();
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
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
            onPress={googleSignInWithPopup}
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
