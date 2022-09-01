import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import Weather from './Weather';
<<<<<<< HEAD
import Calendars from './Calendar';
=======
import useAuth from '../authProvider';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { setCurrentUser } from '../components/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> a2dc51b50325d35cb22fad0d29278aa0633ae1e3

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
      <View style={styles.layout}>
        <Headline style={styles.headline1}>Welcome,</Headline>
        <Headline style={styles.headline2}>{user?.userName}!</Headline>
        <Weather />
        <Calendars />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 30,
  },
  headline1: {
    color: '#2c497f',
    marginBottom: 20,
    fontSize: 35,
    fontWeight: '500',
  },
  headline2: {
    color: '#2c497f',
    marginBottom: 40,
    fontSize: 35,
    fontWeight: '800',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
