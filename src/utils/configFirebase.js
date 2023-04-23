import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "REPLACE_HERE",
  authDomain: "REPLACE_HERE",
  projectId: "REPLACE_HERE",
  storageBucket: "REPLACE_HERE",
  messagingSenderId: "REPLACE_HERE",
  appId: "REPLACE_HERE"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;