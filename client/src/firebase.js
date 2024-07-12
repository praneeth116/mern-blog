// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f617f.firebaseapp.com",
  projectId: "mern-blog-f617f",
  storageBucket: "mern-blog-f617f.appspot.com",
  messagingSenderId: "316229487717",
  appId: "1:316229487717:web:86b20e2829d809c6ab8a8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);