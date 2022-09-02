import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import Weather from './Weather';
import Calendars from './Calendar';
import useAuth from '../authProvider';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { setCurrentUser } from '../components/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const DashboardScreen = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  useEffect(() => {
    const getUserOrCreate = async () => {
      console.log('AUTH USER', authUser);
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
    <SafeAreaView>
      <ScrollView style={styles.layout}>
        <Headline style={styles.headline1}>Welcome,</Headline>
        <Headline style={styles.headline2}>{user?.userName}!</Headline>
        <Weather />
        <Calendars />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 53,
    paddingVertical: 27,
  },
  headline1: {
    color: '#2c497f',
    marginBottom: 13,
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 25,
  },
  headline2: {
    color: '#2c497f',
    marginBottom: 22,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 25,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
