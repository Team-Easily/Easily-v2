import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginButton = () => {
  const nav = useNavigation();

  return <Button title='Login' onPress={() => nav.navigate('Login')} />;
};

export const WelcomeScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Welcome to Easily!</Text>
      <LoginButton />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
