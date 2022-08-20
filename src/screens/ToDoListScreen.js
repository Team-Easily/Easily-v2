import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TodoItemScreen } from './TodoItemScreen';

const TodoItemButton = () => {
  const nav = useNavigation();

  return <Button title='TodoItem' onPress={() => nav.navigate('TodoItem')} />;
};

export const TodoListScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Todo List</Text>
      <TodoItemButton />
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
