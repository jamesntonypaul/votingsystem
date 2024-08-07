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
  apiKey: "----XXXX----",
  authDomain: "----XXXX----",
  databaseURL: "----XXXX----",
  projectId: "----XXXX----",
  storageBucket: "----XXXX----",
  messagingSenderId: "----XXXX----",
  appId: "----XXXX----",
  measurementId: "----XXXX----"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app)
const store = getStorage(app)
export {app,auth,db,store};
