import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7Zv02HrIvd1NZuCSiPe4pc-EgtVDopzQ",
  authDomain: "mg-media-news.firebaseapp.com",
  projectId: "mg-media-news",
  storageBucket: "mg-media-news.appspot.com",
  messagingSenderId: "590000200033",
  appId: "1:590000200033:web:6b48331ad33fcab85dcd20"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
