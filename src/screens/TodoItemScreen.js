import React, { useEffect, useState } from 'react';
import { updateDoc, doc, increment } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Headline,
  Title,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setTodo } from '../components/todos/todoSlice';
import { getTodoById, updateTodo } from '../firebase/firebaseMethods';

export const TodoItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const [completed, setCompleted] = useState(todo.completed);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>{todo.title}</Text>
        <Text style={styles.items}>{todo.description}</Text>
        <View style={styles.checkboxOutline}>
          <Checkbox
            style={{ borderWidth: '1px' }}
            status={todo.completed ? 'checked' : 'unchecked'}
            onPress={() => handleCheckedChange(todo.id, todo.completed)}
          />
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
});
