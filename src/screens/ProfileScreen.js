import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { Avatar, Headline, Title, List, Button } from 'react-native-paper';
import { auth, db } from '../firebase/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

export const ProfileScreen = ({ navigation }) => {
  const userUid = useSelector((state) => state.auth.currentUserUid);
  const [user, setUser] = useState({});
  const [avatarInitial, setAvatarInitial] = useState('');

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, 'users', userUid));
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getUser();
  }, [userUid]);

  useEffect(() => {
    getAvatarInitial();
  }, [user]);

  const handleSignOut = () => {
    signOut(getAuth());
    navigation.push('Welcome');
  };

  const getAvatarInitial = () => {
    if (user.userName) setAvatarInitial(user.userName[0]);
    else setAvatarInitial('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ alignItems: 'center' }}>
          {user.imageUrl ? (
            <Image
              style={styles.avatar}
              source={{
                uri: user.imageUrl,
              }}
            />
          ) : (
            <Avatar.Text
              size={100}
              label={avatarInitial}
              style={{ marginBottom: 30 }}
            />
          )}

          <Headline>{user.userName}</Headline>
          {user.firstName && <Headline>{user.firstName}</Headline>}
          {user.lastName && <Headline>{user.lastName}</Headline>}
          <Title style={{ color: 'grey' }}>Points: {user?.points}</Title>
        </View>

        <List.Section style={styles.list}>
          {user.address && (
            <List.Item
              color={'#464A4E'}
              title={user?.address}
              left={() => (
                <List.Icon color={'#A3A4A6'} icon='map-marker-star-outline' />
              )}
            />
          )}
          <List.Item
            color={'#464A4E'}
            title={user?.email}
            left={() => <List.Icon color={'#A3A4A6'} icon='email' />}
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
    marginLeft: '20%',
    marginRight: '20%',
  },
  buttons: {
    alignItems: 'center',
  },
  button: {
    minWidth: 180,
    marginBottom: 15,
  },
  list: {
    marginTop: 15,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
  },
});
