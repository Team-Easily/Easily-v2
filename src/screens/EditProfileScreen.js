import React, { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Headline, Button, TextInput } from 'react-native-paper';
import { auth, db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

export const EditProfileScreen = ({ navigation }) => {
  const userUid = useSelector((state) => state.auth.currentUserUid);
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, 'users', userUid));
    if (docSnap.exists()) {
      setUser(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };
  useEffect(() => {
    getUser();
  }, [userUid]);

  const handleUpdate = async () => {
    try {
      if (userName !== '') {
        await updateDoc(doc(db, 'users', userUid), { userName: userName });
      }
      if (firstName !== '') {
        await updateDoc(doc(db, 'users', userUid), { firstName: firstName });
      }
      if (lastName !== '') {
        await updateDoc(doc(db, 'users', userUid), { lastName: lastName });
      }
      if (address !== '') {
        await updateDoc(doc(db, 'users', userUid), { address: address });
      }
    } catch (error) {
      console.error(error);
    } finally {
      getUser();
      navigation.push('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <Headline>Edit Profile</Headline>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            value={userName}
            placeholder={user.userName ? user.userName : 'username'}
            onChangeText={(text) => {
              setUserName(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            value={firstName}
            placeholder={user.firstName ? user.firstName : 'First Name'}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            value={lastName}
            placeholder={user.lastName ? user.lastName : 'Last Name'}
            onChangeText={(text) => {
              setLastName(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            value={address}
            placeholder={user.address ? user.address : 'Address'}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <Button
            style={styles.button}
            mode='contained'
            onPress={handleUpdate}
            color='#90be6d'
            contentStyle={{ height: 45 }}
            labelStyle={{
              color: 'white',
              fontSize: 18,
            }}
          >
            Update
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
    // paddingHorizontal: 30,
    // alignContent: "center",
  },
  textInput: {
    marginTop: 15,
  },
  button: {
    minWidth: 180,
    marginTop: 15,
  },
  // buttons: {
  //   alignItems: 'center',
  // },
  // button: {
  //   minWidth: 180,
  //   marginBottom: 15,
  // },
  // list: {
  //   marginTop: 30,
  //   marginBottom: 30,
  // },
});
