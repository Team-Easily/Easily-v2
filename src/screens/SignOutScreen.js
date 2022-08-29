import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { signOut } from "firebase/auth";
import { Button } from "react-native-paper";
import useAuth from "../components/auth/AuthProvider";
import { logout } from "../firebase/firebaseMethods";

export const SignOutScreen = ({ navigation }) => {
  const { signOutUser } = useAuth();
  const handleSignOut = () => {
    signOutUser();
    navigation.push("Welcome");
  };

  return (
    <View style={styles.layout}>
      <Button
        style={{ marginTop: 15 }}
        icon="hand-wave"
        mode="contained"
        onPress={handleSignOut}
        color="#8f3985"
        contentStyle={{ height: 45 }}
        labelStyle={{ color: "white", fontSize: 18 }}
      >
        Sign Out
      </Button>
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
