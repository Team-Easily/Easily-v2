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
import { auth } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, addToTodos } from '../components/todos/todoSlice';
import { documentId, Timestamp } from 'firebase/firestore';
import {
  getTodosByUid,
  addTodosByUser,
  deleteTodoById,
} from '../firebase/firebaseMethods';

export const ToDoListScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [todoName, setTodoName] = useState('');
  const [form, setForm] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');

  const getTodos = async () => {
    const todos = await getTodosByUid(auth.currentUser.uid);
    console.log(todos);
    dispatch(setTodos(todos));
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodoById(id);
    } catch (err) {
      console.error(err);
    } finally {
      getTodos();
    }
  };

  const handleSubmit = async () => {
    try {
      await addTodosByUser({
        title: todoName,
        description: todoDescription,
        author: auth.currentUser.uid,
        completed: false,
        // createdAt: Timestamp.now(),
      });
      Keyboard.dismiss();
    } catch (err) {
      console.error(err);
    } finally {
      setTodoName('');
      setForm(false);
      setTodoDescription('');
      getTodos();
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // const completeTask = (index) => {
  //   let itemsCopy = [...taskItems];
  //   itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy); //removes task items from the list
  // };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {todos.length > 0 ? (
            todos.map((todo, idx) => {
              return (
                <View style={styles.items} key={idx}>
                  <Text style={styles.title}>{todo.title}:</Text>
                  <Text>{todo.description}</Text>
                  <Button
                    title={'Mark as Completed'}
                    onPress={() => console.log('Complete!')}
                  />
                  <Button
                    title={'Delete'}
                    onPress={() => handleDelete(todo.id)}
                  />
                </View>
              );
            })
          ) : (
            <Text style={styles.title}> No Tasks for Today! </Text>
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
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: '30%',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontWeight: 'bold',
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
