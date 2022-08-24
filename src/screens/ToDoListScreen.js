import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Task from '../components/Task';
import { auth, db } from '../firebase';

const TodoItemButton = () => {
  const nav = useNavigation();

  return <Button title="TodoItem" onPress={() => nav.navigate('TodoItem')} />;
};

export const TodoListScreen = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy); //removes task items from the list
  };

  return (
    <View style={styles.container}>
      {/* Todays todo list container */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's todo list</Text>
        <View style={styles.items}>
          {/* This is where our todo items will go */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <TodoItemButton />
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Add </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
