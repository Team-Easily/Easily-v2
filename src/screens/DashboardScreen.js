import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Headline } from "react-native-paper";
import useAuth from "../components/auth/AuthProvider";
import { getUserByUid } from "../firebase/firebaseMethods";

export const DashboardScreen = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const newUser = await getUserByUid(user.uid);
        setCurrentUser(newUser);
      };
      getUser();
    }
  }, [user]);

  return (
    <View style={styles.layout}>
      <Headline>Dashboard</Headline>
      {currentUser ? (
        <View>
          <Text>{currentUser?.email}</Text>
          <Text>{currentUser?.points}</Text>
          <Text>{currentUser?.userName}</Text>
        </View>
      ) : (
        <Text>No user</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
