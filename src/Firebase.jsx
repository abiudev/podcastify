// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  OAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_zGomFzp9Kra8vLEUXw0GGWqD1lHGvRg",
  authDomain: "podcastify-e5022.firebaseapp.com",
  projectId: "podcastify-e5022",
  storageBucket: "podcastify-e5022.appspot.com",
  messagingSenderId: "308629898645",
  appId: "1:308629898645:web:f8c30f71c3366cb6c3a29c",
  measurementId: "G-YD3ECMC0FL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app); // Pass app to getAuth()
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
const twitterProvider = new TwitterAuthProvider();

export {
  googleProvider,
  facebookProvider,
  appleProvider,
  twitterProvider,
  signInWithPopup,
};
export default app;
