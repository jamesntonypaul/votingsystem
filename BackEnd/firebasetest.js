import { initializeApp } from "firebase/app";
import "firebase/database"
//const fb = require("firebase/app")
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvJu--RbhF3_CtadluqqQANNMm9IGhyBg",
  authDomain: "regifter-3df6f.firebaseapp.com",
  databaseURL: "https://regifter-3df6f-default-rtdb.firebaseio.com",
  projectId: "regifter-3df6f",
  storageBucket: "regifter-3df6f.appspot.com",
  messagingSenderId: "748955882802",
  appId: "1:748955882802:web:9c1f286f688175b56a732b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const database = firebase.database();

// Retrieve the candidates data from the Firebase database
function getCandidatesDataFromFirebase() {
  return new Promise((resolve, reject) => {
    // Replace 'candidates' with the path to the Firebase database node containing the candidates data
    database.ref('candidates').once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const data1 = getCandidatesDataFromFirebase()
console.log(data1)