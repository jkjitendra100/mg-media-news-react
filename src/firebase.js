import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx2cqZD1weLWKwb4E2JlPwEIKYoeQ3FZo",
  authDomain: "mg-media-news-1dc24.firebaseapp.com",
  projectId: "mg-media-news-1dc24",
  storageBucket: "mg-media-news-1dc24.appspot.com",
  messagingSenderId: "630319903307",
  appId: "1:630319903307:web:6248ca6e65fee9857c53ce",
  measurementId: "G-TL3KGL4FY4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
