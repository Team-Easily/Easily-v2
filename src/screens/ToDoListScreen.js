import React, { useEffect, useState } from 'react';
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
import { auth, getTodosByUid, addTodosByUser } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, addToTodos } from '../components/todos/todoSlice';
import { Timestamp } from 'firebase/firestore';

export const TodoListScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [todoName, setTodoName] = useState('');
  const [form, setForm] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getTodosByUid(auth.currentUser.uid);
      dispatch(setTodos(todos));
    };
    setTodos();
  }, [todos]);

  const handleSubmit = async () => {
    try {
      await addTodosByUser({
        title: todoName,
        description: todoDescription,
        author: auth.currentUser.uid,
        completed: false,
        created: Timestamp.now(),
      });
      Keyboard.dismiss();
    } catch (err) {
      console.error(err);
    } finally {
      setTodoName('');
      setForm(false);
      setTodoDescription('');
    }
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
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              return (
                <View key={index}>
                  {todo.title}: {todo.description}
                  <Button
                    title={'Mark as Completed'}
                    onPress={() => completeTask(index)}
                  />
                  <Button
                    title={'Delete'}
                    // onPress={() => completeTask(index)}
                  />
                </View>
              );
            })
          ) : (
            <Text> No Tasks for Today! </Text>
          )}
        </View>
      </View>
      <View style={styles.writeTaskWrapper}>
        <Button title={'Add Task'} onPress={() => setForm(!form)} />
        {form ? (
          <View>
            <TextInput
              placeholder="task name"
              value={todoName}
              onChangeText={(text) => setTodoName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="task description"
              value={todoDescription}
              onChangeText={(text) => setTodoDescription(text)}
              style={styles.input}
            />
            <Button title={'Submit'} onPress={handleSubmit} />
          </View>
        ) : null}
      </View>
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
