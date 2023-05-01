import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDBRCVF4n6bwnTlGOnpY6dQdajrzVNqI7M",
//   authDomain: "social-baddies.firebaseapp.com",
//   projectId: "social-baddies",
//   storageBucket: "social-baddies.appspot.com",
//   messagingSenderId: "381553314202",
//   appId: "1:381553314202:web:4e0bc3b7034d980b305223",
//   measurementId: "G-LP2Y6JGBPZ"
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage(app);