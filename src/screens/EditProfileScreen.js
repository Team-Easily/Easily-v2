import React, { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Headline, Button, TextInput } from 'react-native-paper';
import { auth, db } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../firebase/firebaseMethods';
import { setCurrentUser } from '../components/auth/authSlice';

export const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, 'users', user.uid));
    if (docSnap.exists()) {
      dispatch(setCurrentUser(docSnap.data()));
      console.log(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    try {
      if (image !== '') {
        const photoURL = await uploadImageAsync(image);
        await updateDoc(doc(db, 'users', user.uid), { imageUrl: photoURL });
      }
      if (userName !== '') {
        await updateDoc(doc(db, 'users', user.uid), { userName: userName });
      }
      if (firstName !== '') {
        await updateDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
        });
      }
      if (lastName !== '') {
        await updateDoc(doc(db, 'users', user.uid), { lastName: lastName });
      }
      if (address !== '') {
        await updateDoc(doc(db, 'users', user.uid), { address: address });
      }
    } catch (error) {
      console.error(error);
    } finally {
      getUser();
      navigation.push('Profile');
    }
  };

  const ImageComponent = () => {
    if (image !== '') {
      return (
        <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: '4rem',
            paddingTop: '3rem',
            justifyContent: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Headline>Edit Profile</Headline>
            <ImageComponent />
          </View>
          <View>
            <Button
              style={styles.button}
              mode='contained'
              onPress={pickImage}
              color='#90be6d'
              contentStyle={{ height: 45 }}
              labelStyle={{
                color: 'white',
                fontSize: 18,
              }}
            >
              Set Avatar Image
            </Button>

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
  },
  textInput: {
    marginTop: 15,
  },
  button: {
    minWidth: 180,
    marginTop: 15,
  },
});
