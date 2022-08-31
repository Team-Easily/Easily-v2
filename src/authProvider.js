import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase/firebase';

export const AuthContext = createContext({});
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (err) {
      console.error(err);
      throw err;
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
      });
    //   console.log(user);
    //   return user;
  };

  const logout = async () => {
    await signOut(auth);
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
