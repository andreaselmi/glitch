import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHUme1RqiwTEtXVyqvkhRF9g2LZDfNOdA",
  authDomain: "glitch-af185.firebaseapp.com",
  projectId: "glitch-af185",
  storageBucket: "glitch-af185.appspot.com",
  messagingSenderId: "964545501619",
  appId: "1:964545501619:web:0db0bca4499a8b441093c6",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export const Providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};

export const auth = firebase.auth();
export default Firebase;
