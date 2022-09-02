import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import {
  getTodosByUid,
  addTodosByUser,
  deleteTodoById,
} from '../firebase/firebaseMethods';
import { auth, db } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../components/todos/todoSlice';
import { setCurrentUser } from '../components/auth/authSlice';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {
  DefaultTheme,
  Headline,
  Title,
  Checkbox,
  Button,
  TextInput,
  List,
  IconButton,
  ProgressBar,
  Provider,
  Portal,
  Modal,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

export const ToDoListScreen = ({ navigation }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const todo = useSelector((state) => state.todos.todo);
  const user = useSelector((state) => state.auth.currentUser);

  //form details
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoFrequency, setTodoFrequency] = useState('');

  //flags
  const [form, setForm] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  let explosion;

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, 'users', user.uid));
    if (docSnap.exists()) {
      dispatch(setCurrentUser(docSnap.data()));
    } else {
      console.log('No such document!');
    }
  };

  const getTodos = async () => {
    const todos = await getTodosByUid(user.uid);
    dispatch(setTodos(todos));
  };

  useEffect(() => {
    getTodos();
    console.log('GETTING TODOS');
  }, [todo]);

  const getProgress = () => {
    const points = user.points;
    switch (true) {
      case points < 6:
        return user.points / 5;
      case points < 11:
        return user.points / 5 - 1;
      case points < 16:
        return user.points / 5 - 2;
      case points < 21:
        return user.points / 5 - 3;
      case points < 26:
        return user.points / 5 - 4;
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
    explosion && explosion.start();
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const checkModal = () => {
    const points = user.points;
    if (
      points === 9 ||
      points === 19 ||
      points === 29 ||
      points === 39 ||
      points === 49
    )
      showModal();
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
      checkModal();
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
        removePointFromUser(user.uid);
      } else {
        addPointToUser(user.uid);
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
        author: user.uid,
        completed: completed,
        frequency: 'once',
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
    <Provider theme={DefaultTheme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.tasksWrapper}>
          <Portal>
            <Modal
              visible={modalVisible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalContainerStyle}
            >
              <Title style={{ textAlign: 'center' }}>
                You're doing great!
                <br /> Keep up the momentum!
              </Title>
              <Image
                style={styles.coffeeMaker}
                source={require('../assets/coffee-maker.gif')}
              />
            </Modal>
          </Portal>
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
                      <View style={{ paddingTop: 5 }}>
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
                          icon='pencil-outline'
                          color='#2c497f'
                          onPress={() =>
                            nav.navigate('TodoItem', {
                              id: todo.id,
                            })
                          }
                        />
                        <IconButton
                          icon='trash-can-outline'
                          color='#8f3985'
                          onPress={() => handleDelete(todo.id)}
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
            contentStyle={styles.submitButton}
            labelStyle={{
              color: 'white',
              fontSize: 16,
            }}
          >
            Submit
          </Button>
        </List.Accordion>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    height: '100%',
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
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
  submitButton: {
    width: 265,
    height: 50,
  },
  accordion: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
  },
  coffeeMaker: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
