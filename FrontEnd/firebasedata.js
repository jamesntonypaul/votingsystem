// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase, ref,get} from "firebase/database"
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
const voidsToUids = {};
async function mapdata () {
    try {
        const snapshot1 = await get(ref(db,`/Users/`))
        const data1 = snapshot1.val()
        for (const uid in data1) {
            const user = usersData[uid];
            const voidValue = user.VOID; // Assuming each user has a VOID property
            if (voidValue) {
              voidsToUids[voidValue] = uid;
            }
          }
        console.log(voidsToUids)
    }
    catch (error){
        console.log(error)
    }
}
const store = getStorage(app)
//export {auth,db,store};
mapdata();
