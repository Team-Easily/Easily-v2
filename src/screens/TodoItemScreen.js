import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TodoItemScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Todo Item</Text>
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
