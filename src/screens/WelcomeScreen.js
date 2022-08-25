import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const LoginButton = () => {
  const nav = useNavigation();

  return (
    <Button
      style={{ marginTop: 15 }}
      icon='send'
      mode='contained'
      onPress={() => nav.navigate('Login')}
      color='#07BEB8'
      contentStyle={{ height: 45 }}
      labelStyle={{ color: 'white', fontSize: 18 }}
    >
      Login
    </Button>
  );
};

export const WelcomeScreen = () => {
  return (
    <View style={styles.layout}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <LoginButton />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: 210,
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    margin: 30,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
