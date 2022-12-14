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
import {
  getTodoById,
  updateTodo,
  deleteTodoById,
} from '../firebase/firebaseMethods';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

export const TodoItemScreen = ({ route }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const todos = useSelector((state) => state.todos.todos);
  const user = useSelector((state) => state.auth.currentUser);
  const [completed, setCompleted] = useState(todo.completed);
  const [todoDescription, setTodoDescription] = useState('');
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'one-time', value: 'one-time' },
    { label: 'weekly', value: 'weekly' },
    { label: 'monthly', value: 'monthly' },
  ]);
  const nav = useNavigation();

  const getTodo = async () => {
    const todo = await getTodoById(route.params.id);
    dispatch(setTodo(todo));
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
    try {
      await updateDoc(taskDocRef, {
        completed: !todoCompleted,
      });
      if (todoCompleted) {
        removePointFromUser(user.uid);
      } else {
        addPointToUser(user.uid);
      }
    } catch (err) {
      alert(err);
    } finally {
      getTodo();
    }
  };

  const handleSubmit = async () => {
    await updateTodo(todo.id, {
      ...(todoDescription !== '' && { description: todoDescription }),
      ...(!!value && { frequency: value }),
    });
    // dispatch(editTodo(todo.id));
    getTodo();
    nav.navigate('TodoList');
    setTodoDescription('');
    setValue(value);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodoById(id);
      nav.navigate('TodoList');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        <View style={styles.titleRow}>
          <Title style={styles.sectionTitle}>{todo.title}</Title>
          <IconButton
            icon='timer-outline'
            color='#90be6d'
            size={28}
            onPress={() => nav.navigate('Pomodoro')}
          />
        </View>
        <TextInput
          style={styles.itemDescription}
          placeholder={todo.description ? todo.description : ''}
          value={todoDescription}
          onChangeText={(text) => setTodoDescription(text)}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.iconContainer}>
          <DropDownPicker
            style={styles.dropDown}
            placeholder={todo.frequency}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            schema={{ selectable: 'selectable' }}
            containerStyle={{ width: 100 }}
            textStyle={{
              fontSize: 15,
            }}
          />
          <View style={styles.icons}>
            <Checkbox
              style={styles.checkboxOutline}
              status={todo.completed ? 'checked' : 'unchecked'}
              onPress={() => handleCheckedChange(todo.id, todo.completed)}
            />
            <IconButton
              icon='trash-can-outline'
              color='#8f3985'
              onPress={() => handleDelete(todo.id)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode='contained'
            onPress={handleSubmit}
            color='#90be6d'
            contentStyle={{ height: 45 }}
            labelStyle={{
              color: 'white',
              fontSize: 18,
            }}
          >
            Submit
          </Button>
          <Button
            style={styles.button}
            mode='contained'
            onPress={() => nav.navigate('TodoList')}
            color='#07BEB8'
            contentStyle={{ height: 45 }}
            labelStyle={{
              color: 'white',
              fontSize: 18,
            }}
          >
            Back
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#F6F6F6',
  },
  layout: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F6F6F6',
    paddingLeft: 20,
    paddingRight: 20,
  },
  checkboxOutline: {
    height: 37,
    marginRight: 10,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#2c497f',
    fontSize: '1.5rem',
    fontWeight: '500',
  },
  titleRow: {
    marginBottom: '0.7rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  items: {
    marginTop: 10,
  },
  itemDescription: {
    marginVertical: '2rem',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    marginVertical: '2rem',
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: '1rem',
    alignItems: 'center',
  },
  button: {
    margin: 0,
    minWidth: 180,
    marginBottom: 15,
  },
  dropDown: {
    borderColor: '#999999',
    justifyContent: 'flex-start',
    fontSize: 12,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
