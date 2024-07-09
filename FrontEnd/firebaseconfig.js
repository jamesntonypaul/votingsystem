// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwAHEJqCzxsjspVigf7OyfD_G3-RZW3uE",
  authDomain: "voting-system-f4e07.firebaseapp.com",
  databaseURL: "https://voting-system-f4e07-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "voting-system-f4e07",
  storageBucket: "voting-system-f4e07.appspot.com",
  messagingSenderId: "121285527313",
  appId: "1:121285527313:web:bd0e0f426a94f37cfceeb0",
  measurementId: "G-F4RNDSZ3QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app)
const store = getStorage(app)
export {app,auth,db,store};