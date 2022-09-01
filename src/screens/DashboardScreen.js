import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import Weather from './Weather';
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
    console.log('AUTH USER', authUser);
    const getUserOrCreate = async () => {
      const docSnap = await getDoc(doc(db, 'users', authUser.uid));
      if (docSnap.exists()) {
        console.log('DOC SNAP', docSnap);
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
    <View style={styles.layout}>
      <View>
        <Headline>Welcome! {user?.userName}</Headline>
        <Weather />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
