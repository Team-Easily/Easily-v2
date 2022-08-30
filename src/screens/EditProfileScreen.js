import React, { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { Headline, Button, TextInput } from 'react-native-paper';
import { auth, db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../firebase/firebaseMethods';

export const EditProfileScreen = ({ navigation }) => {
  const userUid = useSelector((state) => state.auth.currentUserUid);
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

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
        console.log('PHOTO URL: ', photoURL);
        await updateDoc(doc(db, 'users', userUid), { imageUrl: photoURL });
      }
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

  const ImageComponent = () => {
    if (image !== '') {
      return (
        <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <Headline>Edit Profile</Headline>
          <ImageComponent />
          {/* {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150 }}
            />
          )} */}
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
