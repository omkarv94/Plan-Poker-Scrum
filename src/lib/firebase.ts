// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtBpmUrIDCguSXD8QAcQapST2oiUodafE",
  authDomain: "ope-plan-poker.firebaseapp.com",
  projectId: "ope-plan-poker",
  databaseURL: "https://ope-plan-poker-default-rtdb.firebaseio.com/",
  storageBucket: "ope-plan-poker.firebasestorage.app",
  messagingSenderId: "906890633117",
  appId: "1:906890633117:web:e6a3112994210626925974"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);