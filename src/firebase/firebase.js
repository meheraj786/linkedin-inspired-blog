// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACqQaBnUcIQ1ZvXnK1TbyjHItVqkRiqaY",
  authDomain: "linkedin-inspiration.firebaseapp.com",
  projectId: "linkedin-inspiration",
  storageBucket: "linkedin-inspiration.firebasestorage.app",
  messagingSenderId: "197425938807",
  appId: "1:197425938807:web:3b53c8a05680a655b06172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig