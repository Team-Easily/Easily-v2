import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { auth } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, addToTodos } from '../components/todos/todoSlice';
import { documentId, Timestamp } from 'firebase/firestore';
import {
  getTodosByUid,
  addTodosByUser,
  deleteTodoById,
  addPointToUser,
  removePointFromUser,
} from '../firebase/firebaseMethods';
import {
  Headline,
  Title,
  Text,
  Checkbox,
  Button,
  TextInput,
  List,
  IconButton,
} from 'react-native-paper';

export const ToDoListScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [todoName, setTodoName] = useState('');
  const [form, setForm] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');
  const [todoFrequency, setTodoFrequency] = useState('');
  const [checked, setChecked] = useState(false);

  const getTodos = async () => {
    const todos = await getTodosByUid(auth.currentUser.uid);
    // console.log(todos);
    console.log(auth.currentUser.points);
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
        frequency: 'once',
        // createdAt: Timestamp.now(),
      });
      Keyboard.dismiss();
    } catch (err) {
      console.error(err);
    } finally {
      setTodoName('');
      setForm(false);
      setTodoDescription('');
      setTodoFrequency('');
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

  const toggleComplete = (checked) => {
    if (!checked) {
      setChecked(true);
      addPointToUser(auth.currentUser.uid);
    } else {
      setChecked(false);
      removePointFromUser(auth.currentUser);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Headline>Today's Tasks</Headline>
        <Title>{auth.currentUser.points} pts</Title>
        <View style={styles.items}>
          {todos.length > 0 ? (
            todos.map((todo, idx) => {
              return (
                <List.Item
                  style={{ color: '#2c497f' }}
                  key={idx}
                  title={todo.title}
                  description={todo.description}
                  left={() => (
                    <View style={styles.checkboxOutline}>
                      <Checkbox
                        style={{ borderWidth: '1px' }}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => toggleComplete(checked)}
                        // onPress={() => {
                        //   setChecked(!checked);
                        // }}
                      />
                    </View>
                  )}
                  right={() => (
                    <IconButton
                      icon='trash-can-outline'
                      color='#2c497f'
                      onPress={() => handleDelete(todo.id)}
                    />
                  )}
                />
              );
            })
          ) : (
            <Title style={{ color: '#2c497f' }}> No Tasks for Today! </Title>
          )}
        </View>
      </View>

      <List.Accordion
        style={styles.accordion}
        title='Add Task'
        left={(props) => <List.Icon {...props} icon='playlist-plus' />}
      >
        <TextInput
          placeholder='task name'
          value={todoName}
          onChangeText={(text) => setTodoName(text)}
        />
        <TextInput
          placeholder='task description'
          value={todoDescription}
          onChangeText={(text) => setTodoDescription(text)}
        />
        <Button
          mode='contained'
          onPress={handleSubmit}
          color='#90be6d'
          contentStyle={{ height: 45 }}
          labelStyle={{ color: 'white', fontSize: 16 }}
        >
          Submit
        </Button>
      </List.Accordion>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    height: '100%',
    // paddingTop: 30,
  },
  tasksWrapper: {
    paddingTop: 30,
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
  accordion: {
    // position: 'absolute',
    // bottom: 0,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
