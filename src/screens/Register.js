import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { registerWithEmailAndPassword } from '../firebase/firebaseMethods';
import { TextInput, Button } from 'react-native-paper';

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
