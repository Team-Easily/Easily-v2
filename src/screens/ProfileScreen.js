import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { Headline, Title, List, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AvatarComponent } from '../components/AvatarComponent';
import useAuth from '../authProvider';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const user = useSelector((state) => state.auth.currentUser);
  const [avatarInitial, setAvatarInitial] = useState('');

  useEffect(() => {
    getAvatarInitial();
  }, [user]);

  const handleSignOut = () => {
    logout();
    navigation.push('Welcome');
  };

  const getAvatarInitial = () => {
    if (user.userName) setAvatarInitial(user.userName[0]);
    else setAvatarInitial('');
  };

  const Address = () => {
    if (user.address !== '') {
      return (
        <List.Item
          style={styles.listItem}
          color={'#2c497f'}
          title={user.address}
          left={() => (
            <List.Icon color={'#A3A4A6'} icon='map-marker-star-outline' />
          )}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ alignItems: 'center' }}>
          <AvatarComponent user={user} />
          <Headline style={styles.headline}>{user.userName}</Headline>
          <Headline style={styles.headline}>
            {user?.firstName} {user?.lastName}
          </Headline>
          <Title style={styles.points}>Points: {user?.points}</Title>
        </View>

        <List.Section style={styles.list}>
          <Address />
          <List.Item
            style={styles.listItem}
            color={'#2c497f'}
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
            icon='hand-wave'
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
    marginLeft: 20,
    marginRight: 20,
  },
  headline: {
    color: '#2c497f',
    fontSize: 30,
    fontWeight: '500',
  },
  points: {
    marginTop: 10,
    color: 'grey',
  },
  buttons: {
    alignItems: 'center',
  },
  button: {
    minWidth: 180,
    marginBottom: 15,
  },
  list: {
    marginHorizontal: '10%',
    marginVertical: 20,
  },
  listItem: {
    margin: 0,
    padding: 0,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
  },
});
