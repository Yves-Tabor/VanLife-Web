import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeFpybXQoGQ0Jm6gc4iMwJPKII3MK6rjQ",
  authDomain: "vanlife-e8303.firebaseapp.com",
  projectId: "vanlife-e8303",
  storageBucket: "vanlife-e8303.firebasestorage.app",
  messagingSenderId: "58835350204",
  appId: "1:58835350204:web:84fac22e71349e280556b9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);