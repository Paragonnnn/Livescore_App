// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANO8XXuxgvXXBajnzggg9YObKxdoWuRGI",
  authDomain: "parascore-a1be3.firebaseapp.com",
  projectId: "parascore-a1be3",
  storageBucket: "parascore-a1be3.appspot.com",
  messagingSenderId: "753371744593",
  appId: "1:753371744593:web:885ed6f339a723e79dab70",
  measurementId: "G-LPEEEP6G4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
const analytics = getAnalytics(app);