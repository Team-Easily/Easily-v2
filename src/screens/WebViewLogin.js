import { WebView } from "react-native-webview";
import React, { useRef } from "react";
import { View, DeviceInfo, Text } from "react-native";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
} from "firebase/auth";

// const submitLoginWithGoogle = async (provider) => {
//   try {
//     const user = await signInWithGoogle(provider);
//     //JR: optionally logic here for firestore
//   } catch (error) {
//     setIsError(true);
//     setErrMessage(error);
//   }
// };

// const signInWithGoogle = async (provider) => {

// Sign in with credential from the Google user.
// signInWithCredential(auth, credential).catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.email;
//   // The credential that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
//   console.group("GoogleAuthError");
//   console.log(errorCode);
//   console.log(errorMessage);
//   console.log(email);
//   console.log(credential);
//   console.groupEnd("GoogleAuthError");
// });

// signInWithRedirect(auth, provider);

//   const user = await getRedirectResult(auth)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access Google APIs.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;

//       // The signed-in user info.
//       const user = result.user;
//       //JR: firestore user creation logic here
//       //JR: isLoggedIn state change here
//       return user;
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });

//   //JR: optionally do isLoggedIn or firestore user creation here w/ user
// };

export default WebViewLogin = () => {
  let webview = useRef();
  const uri = { uri: "http://192.168.155.219:19006" };

  const handleNav = (...a) => {
    console.log(a);
  };

  return (
    <View style={{ flex: 1, borderWidth: 2, borderColor: "red" }}>
      <WebView
        ref={webview}
        source={uri}
        originWhitelist={["*"]}
        onNavigationStateChange={handleNav}
        userAgent={DeviceInfo.userAgent}
      />
    </View>
  );
};
