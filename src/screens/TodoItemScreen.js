import React, { useEffect, useState } from 'react';
import { updateDoc, doc, increment } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Checkbox,
  TextInput,
  Button,
  Title,
  IconButton,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setTodo } from '../components/todos/todoSlice';
import { getTodoById, updateTodo } from '../firebase/firebaseMethods';

export const TodoItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const [completed, setCompleted] = useState(todo.completed);
  const [todoDescription, setTodoDescription] = useState(
    todo.description ? todo.description : ''
  );

  const getTodo = async () => {
    const todo = await getTodoById(route.params.id);
    dispatch(setTodo(todo));
    console.log(todo);
  };

  useEffect(() => {
    getTodo();
  }, []);

  const addPointToUser = async (id) => {
    const userDocRef = doc(db, 'users', id);
    try {
      await updateDoc(userDocRef, {
        points: increment(1),
      });
    } catch (err) {
      alert(err);
    }
  };

  const removePointFromUser = async (id) => {
    const userDocRef = doc(db, 'users', id);
    try {
      await updateDoc(userDocRef, {
        points: increment(-1),
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleCheckedChange = async (id, todoCompleted) => {
    const taskDocRef = doc(db, 'todos', id);
    console.log(todo.id);
    try {
      await updateDoc(taskDocRef, {
        completed: !todoCompleted,
      });
      if (todoCompleted) {
        removePointFromUser(auth.currentUser.uid);
      } else {
        addPointToUser(auth.currentUser.uid);
      }
    } catch (err) {
      alert(err);
    } finally {
      getTodo();
    }
  };

  const handleSubmit = async () => {
    try {
      await updateTodo(todo.id, {
        description: todoDescription,
      });
      alert('Updated!');
    } catch (err) {
      console.error(err);
    } finally {
      getTodo();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <Title style={styles.sectionTitle}>{todo.title}</Title>
        <TextInput
          style={styles.itemDescription}
          placeholder={todoDescription}
          value={todoDescription}
          onChangeText={(text) => setTodoDescription(text)}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.checkboxOutline}>
            <Checkbox
              style={{ borderWidth: '1px' }}
              status={todo.completed ? 'checked' : 'unchecked'}
              onPress={() => handleCheckedChange(todo.id, todo.completed)}
            />
          </View>
          <IconButton
            icon="trash-can-outline"
            color="#2c497f"
            onPress={() => handleDelete(todo.id)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            color="#90be6d"
            contentStyle={{ height: 54, width: 180 }}
            labelStyle={{
              color: 'white',
              fontSize: 16,
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    height: '100%',
  },
  taskWrapper: {
    paddingTop: '30%',
    paddingHorizontal: 20,
  },
  checkboxOutline: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 37,
    marginRight: 10,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
  },
  items: {
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    marginTop: 5,
    justifyContent: 'center',
  },
  itemDescription: {
    height: 100,
  },
});
