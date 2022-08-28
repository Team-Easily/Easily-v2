import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import {
  getTodosByUid,
  addTodosByUser,
  deleteTodoById,
} from '../firebase/firebaseMethods';
import { auth, db } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, addToTodos } from '../components/todos/todoSlice';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Headline,
  Title,
  Checkbox,
  Button,
  TextInput,
  List,
  IconButton,
  ProgressBar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

export const ToDoListScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  // const user = useSelector((state) => state.auth.currentUser);
  const [user, setUser] = useState(auth.currentUser);
  // JR: using user from redux, not making a db fetch
  const [todoName, setTodoName] = useState('');
  const [form, setForm] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');
  const [todoFrequency, setTodoFrequency] = useState('');
  const [completed, setCompleted] = useState(false);
  const nav = useNavigation();
  const [confettiCount, setConfettiCount] = useState(0);
  let explosion;

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  const getTodos = async () => {
    const todos = await getTodosByUid(auth.currentUser.uid);
    dispatch(setTodos(todos));
  };

  const getProgress = () => {
    const points = user.points;
    switch (true) {
      case points < 11:
        return user.points / 10;
      case points < 21:
        return user.points / 10 - 1;
      case points < 31:
        return user.points / 10 - 2;
      case points < 41:
        return user.points / 10 - 3;
      case points < 51:
        return user.points / 10 - 4;
      default:
        return 0;
    }
  };

  const getProgressColor = () => {
    const points = user.points;
    switch (true) {
      case points < 11:
        return '#98dfea';
      case points < 21:
        return '#90be6d';
      case points < 31:
        return '#07beb8';
      case points < 41:
        return '#8f3985';
      case points < 51:
        return '#2c497f';
      default:
        return '#98dfea';
    }
  };

  const countConfetti = () => {
    if (confettiCount >= 2) {
      explosion && explosion.start();
      setConfettiCount(1);
    } else {
      setConfettiCount(confettiCount + 1);
    }
  };

  const addPointToUser = async (id) => {
    const userDocRef = doc(db, 'users', id);
    try {
      await updateDoc(userDocRef, {
        points: increment(1),
      });
    } catch (err) {
      alert(err);
    } finally {
      getUser();
      countConfetti();
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
    } finally {
      getUser();
    }
  };

  const handleCheckedChange = async (id, todoCompleted) => {
    const taskDocRef = doc(db, 'todos', id);
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
      getTodos();
    }
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
        completed: completed,
        frequency: 'once',
        // createdAt: Timestamp.now(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTodoName('');
      setForm(false);
      setTodoDescription('');
      setTodoFrequency('');
      setCompleted(false);
      getTodos();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.tasksWrapper}>
        <View style={styles.row}>
          <Headline>Today's Tasks</Headline>
          <Title style={{ color: '#2c497f' }}>{user.points} pts</Title>
        </View>
        <ProgressBar
          progress={getProgress()}
          color={getProgressColor()}
          style={styles.progressBar}
        />
        <ConfettiCannon
          count={200}
          origin={{ x: -50, y: 0 }}
          autoStart={false}
          ref={(ref) => (explosion = ref)}
        />
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
                        status={todo.completed ? 'checked' : 'unchecked'}
                        onPress={() =>
                          handleCheckedChange(todo.id, todo.completed)
                        }
                      />
                    </View>
                  )}
                  right={() => (
                    <View style={styles.buttonContainer}>
                      <IconButton
                        icon="trash-can-outline"
                        color="#2c497f"
                        onPress={() => handleDelete(todo.id)}
                      />
                      <IconButton
                        icon="pencil-outline"
                        color="#2c497f"
                        onPress={() =>
                          nav.navigate('TodoItem', {
                            id: todo.id,
                          })
                        }
                      />
                    </View>
                  )}
                />
              );
            })
          ) : (
            <Title style={styles.noTasks}> No Tasks for Today! </Title>
          )}
        </View>
      </ScrollView>
      <List.Accordion
        style={styles.accordion}
        title="Add Task"
        left={(props) => <List.Icon {...props} icon="playlist-plus" />}
      >
        <TextInput
          placeholder="task name"
          value={todoName}
          onChangeText={(text) => setTodoName(text)}
        />
        <TextInput
          placeholder="task description"
          value={todoDescription}
          onChangeText={(text) => setTodoDescription(text)}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          color="#90be6d"
          contentStyle={{ height: 45, width: 290 }}
          labelStyle={{
            color: 'white',
            fontSize: 16,
          }}
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
  progressBar: {
    marginTop: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
    marginTop: 10,
  },
  noTasks: {
    color: '#2c497f',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
