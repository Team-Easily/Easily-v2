import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
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
  increment,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, auth, db } from './firebase';
import { v4 as uuidv4 } from 'uuid';

// Table of contents
// --AUTH
// --TODOs
// --IMAGE UPLOAD

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
      address: '',
      email: email,
      firstName: '',
      imageUrl: '',
      lastName: '',
      points: 0,
      uid: auth.currentUser.uid,
      userName: userName,
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

const addPointToUser = async (id) => {
  const userDocRef = doc(db, 'users', id);
  try {
    await updateDoc(userDocRef, {
      points: increment(1),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const removePointFromUser = async (id) => {
  const userDocRef = doc(db, 'users', id);
  try {
    await updateDoc(userDocRef, {
      points: increment(-1),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
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

const getTodoById = async (id) => {
  const docSnap = await getDoc(doc(db, 'todos', id));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document');
  }
};

const addTodosByUser = async (data) => {
  try {
    await addDoc(collection(db, 'todos'), data);
    const { title, completed } = data;
    let id;
    const todosRef = collection(db, 'todos');
    const q = query(
      todosRef,
      where('author', '==', data.author),
      where('title', '==', title),
      where('completed', '==', completed)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((todo) => {
      let docBody = todo.data();
      if (!docBody.id) {
        updateDoc(doc(db, 'todos', todo.id), { id: todo.id });
      }
    });
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

const updateTodo = async (id, data) => {
  const taskDocRef = doc(db, 'todos', id);
  try {
    console.log(taskDocRef, 'DATA', data);
    await updateDoc(taskDocRef, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteTodoById = async (id) => {
  const taskDocRef = doc(db, 'todos', id);
  try {
    await deleteDoc(taskDocRef);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ----------------IMAGE UPLOAD
const storage = getStorage(app);
const storageRef = ref(storage);

export async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuidv4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  // TypeError: blob.close is not a function
  // blob.close();

  return await getDownloadURL(fileRef);
}

export {
  getUserByUid,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
  getTodosByUid,
  addTodosByUser,
  updateTodosByUser,
  deleteTodoById,
  getTodoById,
  updateTodo,
  addPointToUser,
  removePointFromUser,
};
