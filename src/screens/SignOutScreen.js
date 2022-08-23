import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export const SignOutScreen = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth);
    navigation.push('Welcome');
  };

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Sign Out</Text>
      <Button onPress={handleSignOut} title='Sign Out' />
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
