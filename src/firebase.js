// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
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
  setDoc,
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
const auth = getAuth(app);
const db = getFirestore();

// ----------------USERS

const logInWithEmailAndPassword = async (email, password) => {
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

const registerWithEmailAndPassword = async (userName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      userName: userName,
      email: email,
    });
    const user = userCredential.user;
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Monitor auth state - found in Firebase video, needs to be customized to use
// const monitorAuthState = async () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log(user);
//       // showApp();
//       // showLoginState(user);

//       // hideLoginError();
//     } else {
//       // showLoginForm();
//       console.log('You are not logged in.');
//     }
//   });
// };

// monitorAuthState();

const logout = async () => {
  await signOut(auth);
};

const getUserByUid = async (uid) => {
  let user;
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc, i) => {
    user = doc.data();
  });
  return user;
};

// ----------------TODOs

const getTodosByUid = async (uid) => {
  const todos = [];
  const todosRef = collection(db, 'todos');
  const q = query(todosRef, where('author', '==', uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    todos.push(doc.data());
  });
  return todos;
};

const addTodosByUser = async (data) => {
  try {
    await addDoc(collection(db, 'todos'), data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {
  app,
  auth,
  db,
  getUserByUid,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
  getTodosByUid,
  addTodosByUser,
};
