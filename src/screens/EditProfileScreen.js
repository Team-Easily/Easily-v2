import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { View, Text, Button, StyleSheet, Input } from "react-native";
import { auth, db } from "../firebase/firebase";
import { getUser, setUser } from "./ProfileScreen";

export const EditProfileScreen = () => {
  const [user] = useState({});
  console.log(user);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        userName: userName,
        address: address,
      });
    } catch (error) {
      console.error(error);
    } finally {
      getUser();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <View>
        <Input
          value={user.userName}
          placeholder="userName"
          onChangeText={(text) => {
            handleUpdate(text);
          }}
        />
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
