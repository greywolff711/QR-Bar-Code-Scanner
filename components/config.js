// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDMcmat7ZwUX5bn56lyyJwts780xHwXDU",
  authDomain: "crud-2-e74cd.firebaseapp.com",
  projectId: "crud-2-e74cd",
  storageBucket: "crud-2-e74cd.appspot.com",
  messagingSenderId: "455453938174",
  appId: "1:455453938174:web:fb18d747986e13dfc070af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);