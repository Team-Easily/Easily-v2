import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-native-paper';

const auth = getAuth();

export const SignOutScreen = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth);
    navigation.push('Welcome');
  };

  return (
    <View style={styles.layout}>
      <Button
        style={{ marginTop: 15 }}
        icon='hand-wave'
        mode='contained'
        onPress={handleSignOut}
        color='#8f3985'
        contentStyle={{ height: 45 }}
        labelStyle={{ color: 'white', fontSize: 18 }}
      >
        Sign Out
      </Button>
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
