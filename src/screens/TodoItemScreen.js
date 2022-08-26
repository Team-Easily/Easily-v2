import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Headline,
  Title,
} from 'react-native';
import { useDispatch } from 'react-redux';

export const TodoItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id } = route.params;

  //TODO: getTodoById - write in FirebaseMethods, todoSlice
  //UseEffect(getTodo)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Your Task </Text>
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
