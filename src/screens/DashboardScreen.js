import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getPointsByUser } from '../firebase/firebaseMethods';

export const DashboardScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <View style={styles.layout}>
      <Headline>Dashboard</Headline>
      {user ? (
        <View>
          <Text>{user.email}</Text>
          <Text>{user}</Text>
          {/* <Text>Points: {getPointsByUser(user)}</Text> */}
        </View>
      ) : (
        'No user'
      )}
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
