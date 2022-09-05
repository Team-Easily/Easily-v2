import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text } from 'react-native';
import { Headline, IconButton, Button } from 'react-native-paper';
import useAuth from '../authProvider';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { setCurrentUser } from '../components/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export const DashboardScreen = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  useEffect(() => {
    const getUserOrCreate = async () => {
      const docSnap = await getDoc(doc(db, 'users', authUser.uid));
      if (docSnap.exists()) {
        dispatch(setCurrentUser(docSnap.data()));
      } else {
        const user = {
          address: '',
          email: authUser.email,
          firstName: '',
          imageUrl: authUser.photoURL,
          lastName: '',
          points: 0,
          uid: authUser.uid,
          userName: authUser.displayName,
        };
        setDoc(doc(db, 'users', authUser.uid), {
          address: '',
          email: authUser.email,
          firstName: '',
          imageUrl: authUser.photoURL,
          lastName: '',
          points: 0,
          uid: authUser.uid,
          userName: authUser.displayName,
        });
        dispatch(setCurrentUser(user));
      }
    };
    getUserOrCreate();
  }, []);

  return (
    <SafeAreaView style={styles.layout}>
      <ScrollView style={styles.scrollView}>
        <Headline style={styles.headline1}>Welcome,</Headline>
        <Headline style={styles.headline2}>{user?.userName}!</Headline>
        <View style={styles.widgetRow}>
          <View style={styles.widgetLabelCol}>
            <Text style={styles.label}>Weather</Text>
            <IconButton
              style={styles.button}
              mode='contained'
              onPress={() => nav.navigate('Weather')}
              color='#98dfea'
              icon='cloud'
              size={45}
            ></IconButton>
          </View>
          <View style={styles.widgetLabelCol}>
            <Text style={styles.label}>Calendar</Text>
            <IconButton
              style={styles.button}
              mode='contained'
              onPress={() => nav.navigate('CalendarScreen')}
              color='#8f3985'
              icon='calendar'
              size={45}
            ></IconButton>
          </View>
        </View>
        <View style={styles.widgetRow}>
          <View style={styles.widgetLabelCol}>
            <Text style={styles.label}>Tasks</Text>
            <IconButton
              style={styles.button}
              mode='contained'
              onPress={() => nav.navigate('TodoList')}
              color='#999999'
              //   color='#c0c0c0'
              icon='format-list-bulleted'
              size={45}
            ></IconButton>
          </View>
          <View style={styles.widgetLabelCol}>
            <Text style={styles.label}>Pomodoro</Text>
            <IconButton
              style={styles.button}
              mode='contained'
              onPress={() => nav.navigate('Pomodoro')}
              color='#90be6d'
              icon='timer'
              size={45}
            ></IconButton>
          </View>
        </View>
        <View style={styles.widgetRow}>
          <View style={styles.widgetLabelCol}>
            <Text style={styles.label}>Email</Text>
            <IconButton
              style={styles.button}
              mode='contained'
              onPress={() => nav.navigate('Gmail')}
              color='#07beb8'
              icon='gmail'
              size={45}
            ></IconButton>
          </View>
          <View style={styles.widgetLabelCol}>
            <Text style={styles.label}>Events</Text>
            <IconButton
              style={styles.button}
              mode='contained'
              onPress={() => nav.navigate('Events')}
              color='#2c497f'
              icon='star'
              size={45}
            ></IconButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 55,
    paddingVertical: 35,
  },
  scrollView: {
    paddingTop: '2.5rem',
    paddingHorizontal: '3rem',
  },
  headline1: {
    color: '#2c497f',
    marginBottom: 13,
    fontSize: 33,
    fontWeight: '500',
    lineHeight: 25,
    paddingLeft: 2,
  },
  headline2: {
    color: '#2c497f',
    marginBottom: '2.5rem',
    fontSize: 33,
    fontWeight: '800',
    lineHeight: 25,
    paddingLeft: 2,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  widgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  widgetLabelCol: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    color: '#8c8c8c',
    fontSize: '1rem',
  },
  widget: {
    flex: 1,
  },
  button: {
    width: 110,
    height: 90,
    border: 'grey',
    borderWidth: 1,
    padding: 15,
    shadowColor: '#64646F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.24,
    shadowRadius: 8,
  },
});
