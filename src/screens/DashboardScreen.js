import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.layout}>
      <View>
        <Headline>Welcome {currentUser?.displayName}!</Headline>
        <Weather />
      </View>
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
