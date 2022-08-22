import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from '../firebase';

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
      <View style={styles.form}>
        <TextInput
          placeholder="name"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button title={'Submit'} onPress={submitRegister} />
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
