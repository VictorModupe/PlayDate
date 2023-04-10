import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGrmdySnb0aG-PENdO8fauiF8fSbCUZaI",
  authDomain: "playdate-8f9f2-default-rtdb.firebaseio.com",
  projectId: "playdate-8f9f2",
  storageBucket: "playdate-8f9f2.appspot.com",
  messagingSenderId: "533469404118",
  appId: "1:533469404118:android:741b6b9f6262124891e277",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage();
const database = getDatabase();

export { db, storage, database, app };
