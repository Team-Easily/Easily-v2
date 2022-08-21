import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Headline } from 'react-native-paper';
import { getAuth } from 'firebase/auth';

export const DashboardScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <View style={styles.layout}>
      <Headline>Dashboard</Headline>
      {user ? <Text>{user.email}</Text> : 'No user'}
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
