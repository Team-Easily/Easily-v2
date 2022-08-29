import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { auth, db } from "../firebase/firebase";
import { useSelector } from "react-redux";

export const EditProfileScreen = ({ navigation }) => {
  const userUid = useSelector((state) => state.auth.currentUserUid);
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, "users", userUid));
    if (docSnap.exists()) {
      setUser(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getUser();
  }, [userUid]);

  const handleUpdate = async () => {
    try {
      if (userName !== "") {
        await updateDoc(doc(db, "users", userUid), { userName: userName });
      }
      if (firstName !== "") {
        await updateDoc(doc(db, "users", userUid), { firstName: firstName });
      }
      if (lastName !== "") {
        await updateDoc(doc(db, "users", userUid), { lastName: lastName });
      }
      if (address !== "") {
        await updateDoc(doc(db, "users", userUid), { address: address });
      }
    } catch (error) {
      console.error(error);
    } finally {
      getUser();
      navigation.push("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <View>
        <TextInput
          value={userName}
          placeholder={user.userName ? user.userName : "username"}
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
        <TextInput
          value={firstName}
          placeholder={user.firstName ? user.firstName : "First Name"}
          onChangeText={(text) => {
            setFirstName(text);
          }}
        />
        <TextInput
          value={lastName}
          placeholder={user.lastName ? user.lastName : "Last Name"}
          onChangeText={(text) => {
            setLastName(text);
          }}
        />
        <TextInput
          value={address}
          placeholder={user.address ? user.address : "Address"}
          onChangeText={(text) => {
            setAddress(text);
          }}
        />
        <Button onPress={handleUpdate}>Update</Button>
      </View>
      <Button title="ClickHere" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  buttons: {
    alignItems: "center",
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
