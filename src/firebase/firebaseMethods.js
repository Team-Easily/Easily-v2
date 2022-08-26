import { FirebaseError } from 'firebase/app';
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
import { app, auth, db } from './firebase';

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
      points: 0,
      uid: auth.currentUser.uid,
    });
    const user = userCredential.user;
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

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
    let docBody = doc.data();
    docBody['id'] = doc.id;
    todos.push(docBody);
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

const updateTodosByUser = async (data) => {
  try {
    await setDoc(collection(db, 'todos'), data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteTodoById = async (id) => {
  const taskDocRef = doc(db, 'todos', id);
  console.log('FIRESTORE TASKDOCREF:', taskDocRef);
  try {
    await deleteDoc(taskDocRef);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ----------------POINTS

const addPointToUser = async (uid) => {
  // let user = db.collection('users').doc(uid);
  // user.update({ points: getFirestore.FieldValue.increment(1) });
  // user.update({ points: user.points + 1 });
  const increment = getFirestore.FieldValue.increment(1);

  // Document reference
  const userRef = db.collection('users').doc(uid);

  // Update read count
  userRef.update({ points: increment });
};

const removePointFromUser = async (user) => {
  user.update({ points: getFirestore.FieldValue.increment(-1) });
};

export {
  getUserByUid,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
  getTodosByUid,
  addTodosByUser,
  updateTodosByUser,
  deleteTodoById,
  addPointToUser,
  removePointFromUser,
};
