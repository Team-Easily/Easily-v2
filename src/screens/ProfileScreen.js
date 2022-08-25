import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Avatar, Headline, Title, List, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../firebase/firebase';
import { getAuth, signOut } from 'firebase/auth';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

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
  }, []);

  const handleSignOut = () => {
    signOut(getAuth());
    navigation.push('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            src={{ uri: 'tinyurl.com/24arcnk3' }}
            size={100}
            style={{ marginBottom: 30 }}
          />
          <Headline>{user.userName}</Headline>
          <Title style={{ color: 'grey' }}>Points: {user?.points}</Title>
        </View>

        <List.Section style={styles.list}>
          {user.address ? (
            <List.Item
              title={user?.address}
              left={() => <List.Icon icon='map-marker-star-outline' />}
            />
          ) : (
            ''
          )}
          <List.Item
            title={user?.email}
            left={() => <List.Icon color={'grey'} icon='email' />}
          />
        </List.Section>

        <View style={styles.buttons}>
          <Button
            style={styles.button}
            icon='account-cog-outline'
            mode='contained'
            onPress={() => navigation.push('EditProfile')}
            color='#90be6d'
            contentStyle={{ height: 45 }}
            labelStyle={{ color: 'white', fontSize: 16 }}
          >
            Edit Profile
          </Button>
          <Button
            style={styles.button}
            icon='exit-to-app'
            // icon='hand-wave'
            mode='contained'
            onPress={handleSignOut}
            color='#90be6d'
            contentStyle={{ height: 45 }}
            labelStyle={{ color: 'white', fontSize: 16 }}
          >
            Sign Out
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '15%',
    marginRight: '15%',
  },
  buttons: {
    alignItems: 'center',
  },
  button: {
    minWidth: 180,
    marginBottom: 15,
  },
  list: {
    marginTop: 30,
    marginBottom: 30,
  },
});
