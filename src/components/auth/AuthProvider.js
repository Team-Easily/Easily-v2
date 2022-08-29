import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import * as Google from 'expo-auth-session/providers/google'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../../firebase/firebase";

export const AuthContext = createContext({});

const config = {
  iosClientId:
    "650975721235-cuo4brm0mdv0a99ah7atir0gii68t450.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "location"],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);
      }),
    []
  );

  const signOutUser = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log(result);
      const result = await Google.logInAsync(config);
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        signInWithCredential(auth, credential);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const memo = useMemo(
    () => ({
      user,
      signOutUser,
      signInWithGoogle,
    }),
    [user]
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

//custom Hook - use it instead to get user anywhere you would need it from getAuth()
export default function useAuth() {
  return useContext(AuthContext);
}
