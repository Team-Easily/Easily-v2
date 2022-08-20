import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const signOutHandler = ({ navigation }) => {
  console.log('CURRENT USER', auth.currentUser);
  signOut(auth);
  console.log('CURRENT USER AFTER SIGN OUT', auth.currentUser);
  console.log(navigation);
  navigation.navigate('Welcome');
};

const SignOutButton = () => (
  <Button onPress={signOutHandler} title='Sign Out' />
);

export const SignOutScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Sign Out</Text>
      <SignOutButton />
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
