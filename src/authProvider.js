import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase/firebase";
import { setIsLoggedIn } from "./components/auth/authSlice";
import { useDispatch } from "react-redux";

export const AuthContext = createContext({});
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) setAuthUser(user);
        else setAuthUser(null);
      }),
    []
  );

  const signInManually = async (email, password) => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      dispatch(setIsLoggedIn(true));
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API. We'll probably want to add it to the store.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      })
      .finally(() => {
        dispatch(setIsLoggedIn(true));
      });
    //   console.log(user);
    //   return user;
  };

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  const memo = useMemo(
    () => ({
      authUser,
      logout,
      signInManually,
      signInWithGoogle,
    }),
    [authUser]
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
