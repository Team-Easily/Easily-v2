import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <LoginButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  layout: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: '-3rem',
  },
  logo: {
    marginTop: '-3rem',
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
