import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import Weather from './Weather';

export const DashboardScreen = () => {
  const [currentUser, setcurrentUser] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setcurrentUser(user);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <Headline style={styles.headline1}>Welcome,</Headline>
        <Headline style={styles.headline2}>
          {currentUser?.displayName}!
        </Headline>
        <Weather />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 30,
  },
  headline1: {
    color: '#2c497f',
    marginBottom: 20,
    fontSize: 35,
    fontWeight: '500',
  },
  headline2: {
    color: '#2c497f',
    marginBottom: 40,
    fontSize: 35,
    fontWeight: '800',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
