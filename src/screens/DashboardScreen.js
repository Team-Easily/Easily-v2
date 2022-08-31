import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import Weather from './Weather';
import useAuth from '../authProvider';

export const DashboardScreen = () => {
  const [currentUser, setcurrentUser] = useState({});
  //const currentUser = useSelector(state => state.user.user)
  const [wasCreated, setWasCreated] = useState(false);
  const { authUser } = useAuth();

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, 'users', authUser.uid));
    if (docSnap.exists()) {
      setcurrentUser(docSnap.data());
    } else {
      console.log('No such document!');
    }

    useEffect(() => {
      console.log(authUser);
      const getUserOrCreate = async () => {
        const docSnap = await getDoc(doc(db, 'users', authUser.uid));
        if (docSnap.exists()) {
          setcurrentUser(docSnap.data());
        } else {
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
        }
      };
      getUserOrCreate();
      setWasCreated(true);
    }, []);

    useEffect(() => {
      getUser();
    }, [wasCreated]);

    return (
      <View style={styles.layout}>
        <View>
          <Headline>Welcome!</Headline>
          <Weather />
        </View>
      </View>
    );
  };
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
