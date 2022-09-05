import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Headline, Title, List, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AvatarComponent } from '../components/AvatarComponent';
import { RewardBadge } from '../components/rewards/RewardBadge';
import useAuth from '../authProvider';

export const ProfileScreen = ({ navigation }) => {
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
          color={'#333333'}
          title={user.address}
          left={() => (
            <List.Icon color={'#BBBBBB'} icon='map-marker-star-outline' />
          )}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        <View style={styles.header}>
          <AvatarComponent user={user} style={{ marginTop: 15 }} />
          <Headline style={styles.headline}>Hi {user.firstName}!</Headline>
        </View>
        <View style={styles.reward}>
          <RewardBadge />
          <View style={styles.tasks}>
            <Title style={styles.points}>{user?.points} Tasks</Title>
            <Title style={styles.points}>Completed!</Title>
          </View>
        </View>

        <List.Section style={styles.list}>
          <List.Item
            style={styles.listItem}
            color={'#333333'}
            title={user?.userName}
            left={() => <List.Icon color={'#BBBBBB'} icon='star' />}
          />
          <List.Item
            style={styles.listItem}
            color={'#333333'}
            title={user?.firstName + ' ' + user?.lastName}
            left={() => (
              <List.Icon
                color={'#BBBBBB'}
                icon='card-account-details-outline'
              />
            )}
          />
          <Address />
          <List.Item
            style={styles.listItem}
            color={'#333333'}
            title={user?.email}
            left={() => <List.Icon color={'#BBBBBB'} icon='email' />}
          />
        </List.Section>

        <View style={styles.buttons}>
          <Button
            style={styles.button}
            icon='account-cog-outline'
            mode='contained'
            onPress={() => navigation.push('EditProfile')}
            color='#90be6d'
            contentStyle={{ height: 40 }}
            labelStyle={{ color: 'white', fontSize: 14 }}
          >
            Edit Profile
          </Button>
          <Button
            style={styles.outlinedButton}
            icon='hand-wave'
            mode='outlined'
            onPress={handleSignOut}
            contentStyle={{ height: 40 }}
            labelStyle={{ color: '#90be6d', fontSize: 14 }}
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
    height: '100%',
  },
  layout: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headline: {
    color: '#2c497f',
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 30,
  },
  reward: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1rem',
  },
  tasks: {
    flexDirection: 'column',
    marginLeft: 25,
  },
  points: {
    marginTop: 10,
    color: '#8c8c8c',
    lineHeight: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  button: {
    minWidth: '40%',
    marginHorizontal: 5,
  },
  outlinedButton: {
    minWidth: '40%',
    marginHorizontal: 5,
    borderColor: '#90be6d',
    borderWidth: 2,
  },
  list: {
    marginHorizontal: '10%',
    marginVertical: '1rem',
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
