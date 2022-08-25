import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Platform,
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logInWithEmailAndPassword } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// const WebViewLogin = Platform.OS !== "web" ? require("./WebViewLogin.js").default : () => null;
const LoginScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isWebViewLogin, setIsWebViewLogin] = useState(false);

  const provider = new GoogleAuthProvider();
  // React States
  const resetStates = () => {
    setEmail("");
    setPassword("");
    setUserName("");
  };

  const submitGoToRegister = () => {
    navigation.push("Register");
  };

  const signInWithGoogle = async (provider) => {
    const auth = getAuth();
    console.log(provider);
    console.log(auth);

    // ***signInWithPopup working***
    // =============================

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     console.log(credential, token, user);
    //     // ...
    //     //JR:  firestore isLoggedIn and
    //     //JR:  user creation logic here
    //     return user;
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });

    // *** log In with redirect and WebView or WebBrowser component *** WIP
    // ====================================================================

    signInWithRedirect(auth, provider);

    //JR: optionally do isLoggedIn or firestore user creation here w/ user
  };

  const submitLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
      navigation.push("Nav Bar");
      resetStates();
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  const submitLoginWithGoogle = async (provider) => {
    try {
      signInWithGoogle(provider);
      //JR: optionally logic here for firestore
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    }
  };

  // useEffect(() => {
  //   // JR: setting user in the login may not get done before state change of auth
  //   // JR: onAuthStateChange in firebase.js may interrupt full process before render
  //   setUserInfo(auth);
  // }, [auth]);

  // useEffect(() => {
  //   // JR: if there's a logged in user, nav to Nav Bar?
  //   if (userInfo) {
  //     navigation.push("Nav Bar");
  //   }
  // }, [userInfo]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {!isWebViewLogin ? (
        <View style={styles.container}>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <FontAwesome.Button
              name="google"
              backgroundColor="#4285F4"
              style={styles.googleButton}
              onPress={() => {
                if (Platform.OS === "web") {
                  submitLoginWithGoogle(provider);
                } else {
                  // setIsWebViewLogin(true);
                  WebBrowser.openAuthSessionAsync(
                    "https://192.168.155.219:19006"
                  );
                }
              }}
            >
              Login with Google
            </FontAwesome.Button>
            <Text>{Platform.OS}</Text>
            <Button
              title={"Login"}
              onPress={submitLogin}
              style={styles.button}
            />

            <Button
              style={styles.button}
              title={"Create New Account"}
              onPress={() => {
                submitGoToRegister();
              }}
            />
          </View>
          {isError ? (
            <Text style={{ alignSelf: "center" }}>{errMessage.message}</Text>
          ) : null}
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {/* WebViewLogin Below*/}

          <WebViewLogin />
          {/* <Button
            title={"Sign In With Email"}
            onPress={() => {
              setIsWebViewLogin(false);
            }}
          /> */}
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    maxHeight: 300,
    // minHeight: 150,
  },
  buttonContainer: {
    flex: 1,
    width: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  input: {
    width: "100%",
    minWidth: 150,
    maxWidth: 225,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 30,
    padding: 5,
    alignSelf: "center",
  },
  googleButton: {
    // fontFamily: "Roboto",
  },
});

export default LoginScreen;
