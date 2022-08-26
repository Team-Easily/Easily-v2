import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Profile Screen</Text>
      <Button title='CLickHere' onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '15%',
    marginRight: '15%',
  },
  buttons: {
    alignItems: 'center',
  },
  button: {
    minWidth: 180,
    marginBottom: 15,
  },
  list: {
    marginTop: 30,
    marginBottom: 30,
  },
});
