import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Headline, Button } from 'react-native-paper';
import Weather from './Weather';
import Calendars from './Calendar';
import useAuth from '../authProvider';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { setCurrentUser } from '../components/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GmailScreen } from './GmailScreen';
import { setEmails } from '../components/emails/emails';

export const DashboardScreen = () => {
  // const user = useSelector((state) => state.auth.currentUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const [emails, setEmails] = useState(null);
  const emails = useSelector((state) => state.emails.emails);

  const dispatch = useDispatch();
  const { authUser } = useAuth();

  useEffect(() => {
    const getUserOrCreate = async () => {
      // console.log('AUTH USER', authUser);
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

  useEffect(() => {
    if (user.uid) {
      const fetchEmailsFromGmail = async () => {
        try {
          let uri = `https://gmail.googleapis.com/gmail/v1/users/me/messages`;
          const res = await fetch(uri, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: `application/json`,
            },
          });
          const data = await res.json();
          const emailsArr = [];
          data.messages.forEach(async (message) => {
            let uri = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?key=${accessToken}`;
            const res = await fetch(uri, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: `application/json`,
              },
            });
            const data = await res.json();
            if (data.labelIds.includes('UNREAD')) {
              const email = {
                id: data.id,
                from: data.payload.headers[15].value,
                subject: data.payload.headers[14].value,
                date: data.payload.headers[17].value,
                body: data.payload.body.data,
                snippet: data.snippet,
                threadId: data.threadId,
              };
              emailsArr.push(email);
            }
            dispatch(setEmails(emailsArr));
          });
          console.log(emailsArr);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmailsFromGmail();
    }
  }, [user]);

  const handleGmailClick = () => {
    navigation.push('Gmail');
  };

  return (
    <SafeAreaView style={styles.layout}>
      <ScrollView style={styles.scrollView}>
        <Headline style={styles.headline1}>Welcome,</Headline>
        <Headline style={styles.headline2}>{user?.userName}!</Headline>
        <Weather />
        <Calendars />
        <Button
          style={{ marginTop: 15 }}
          icon='gmail'
          mode='contained'
          onPress={() => {
            handleGmailClick();
          }}
          contentStyle={{ height: 45 }}
          labelStyle={{ color: '#2c497f', fontSize: 18 }}
        >
          Gmail
        </Button>
        <GmailScreen />
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
  scrollView: {
    paddingTop: 30,
    paddingHorizontal: 20,
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
