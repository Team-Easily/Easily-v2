import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Headline } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const DashboardScreen = () => {
  const nav = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);

  return (
    <View style={styles.layout}>
      <Headline>Dashboard</Headline>
      {user ? <Text>{user.email}</Text> : nav.navigate("Login")}
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
