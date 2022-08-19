import React from "react";
import { View, StyleSheet, Button } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => onPressLogin()}
      >
        Log in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loginContainer: {
    width: "70%",
    backgroundColor: "#ff5a66",
    borderRadius: 25,
    padding: 100,
    marginTop: 300,
  },
  loginText: {
    color: "white",
  },
});
