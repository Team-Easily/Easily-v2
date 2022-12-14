import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text } from 'react-native';
import { Headline, IconButton, Button } from 'react-native-paper';
import useAuth from '../authProvider';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { setCurrentUser } from '../components/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export const DashboardScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  });

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
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
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
              onPress={() => navigation.push('TodoStackScreen')}
              color='#999999'
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
              icon='timer-outline'
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  layout: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: '3rem',
  },
  headline1: {
    color: '#2c497f',
    marginTop: '2rem',
    marginBottom: 13,
    fontSize: 35,
    fontWeight: '500',
    lineHeight: 25,
    paddingLeft: 2,
  },
  headline2: {
    color: '#2c497f',
    marginBottom: '3.5rem',
    fontSize: 35,
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
