// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  doc,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCjwwUfOFR95aTaf_Zch-TlEEyS-pTRYxM',
  authDomain: 'easily-app.firebaseapp.com',
  projectId: 'easily-app',
  storageBucket: 'easily-app.appspot.com',
  messagingSenderId: '650975721235',
  appId: '1:650975721235:web:e225f630702ec4be298ce6',
  measurementId: 'G-E9K3XQDZLT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

export { app, auth, db };
