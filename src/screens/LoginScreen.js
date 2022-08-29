import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { logInWithEmailAndPassword } from "../firebase/firebaseMethods";
import { TextInput, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { setUserUid } from "../components/auth/authSlice";
import { auth } from "../firebase/firebase";
import useAuth from "../components/auth/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { signInWithGoogle } = useAuth();

  // React States
  const resetStates = () => {
    setEmail("");
    setPassword("");
  };

  // handlers
  const submitGoToRegister = () => {
    navigation.push("Register");
  };

  const submitLogin = async () => {
    try {
      const user = await logInWithEmailAndPassword(email, password);
      dispatch(setUserUid(user.uid));
      navigation.push("Nav Bar");
      resetStates();
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="flat"
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ marginTop: 15 }}
          mode="flat"
        />
        <View>
          <Button
            style={{ marginTop: 15 }}
            icon="send"
            mode="contained"
            onPress={submitLogin}
            color="#07BEB8"
            contentStyle={{ height: 45 }}
            labelStyle={{ color: "white", fontSize: 18 }}
          >
            Login
          </Button>

          <Button title={"Login"} onPress={submitLogin} style={styles.button} />

          <Button
            style={{ marginTop: 15 }}
            mode="text"
            onPress={() => {
              submitGoToRegister();
            }}
            contentStyle={{ height: 45 }}
            labelStyle={{ color: "#07BEB8", fontSize: 18 }}
          >
            Create New Account
          </Button>
          <FontAwesome.Button
            name="google"
            backgroundColor="#4285F4"
            onPress={signInWithGoogle}
            style={{ backgroundColor: "#07BEB8" }}
          >
            Login with Google
          </FontAwesome.Button>
        </View>
      </View>
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default LoginScreen;
