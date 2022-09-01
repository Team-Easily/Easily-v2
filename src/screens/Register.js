import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { registerWithEmailAndPassword } from '../firebase/firebaseMethods';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import useAuth from '../authProvider';

const Register = ({ navigation }) => {
  const { signInManually, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const dispatch = useDispatch();

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
        // dispatch(setUserUid(user.uid));
        navigation.push('Nav Bar');
      } catch (error) {
        Alert.alert('Sign up failed', 'Please try again.');
      }
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
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <TextInput
          placeholder="name"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          mode="flat"
        />
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ marginTop: 15 }}
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
        <Button
          style={{ marginTop: 15 }}
          icon="send"
          mode="contained"
          onPress={submitRegister}
          color="#07BEB8"
          contentStyle={{ height: 45 }}
          labelStyle={{ color: 'white', fontSize: 18 }}
        >
          Register
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
            submitGoToLogin();
          }}
          contentStyle={{ height: 45 }}
          labelStyle={{ color: '#2c497f', fontSize: 18 }}
        >
          Login
        </Button>
      </View>
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
});

export default Register;
