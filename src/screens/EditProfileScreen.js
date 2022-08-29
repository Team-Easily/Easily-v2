import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { auth, db } from "../firebase/firebase";
import { NavigationHelpersContext } from "@react-navigation/native";

export const EditProfileScreen = () => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        address: address,
      });
    } catch (error) {
      console.error(error);
    } finally {
      getUser();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <View>
        <TextInput
          value={user.userName}
          placeholder={userName ? userName : "username"}
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
        {/* <TextInput
          value={user.firstName}
          placeholder="firstName"
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
        <TextInput
          value={user.lastName}
          placeholder="lastName"
          onChangeText={(text) => {
            setUserName(text);
          }}
        /> */}
        <TextInput
          value={user.address}
          placeholder={address ? address : "address"}
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
