import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHUme1RqiwTEtXVyqvkhRF9g2LZDfNOdA",
  authDomain: "glitch-af185.firebaseapp.com",
  databaseURL: "https://glitch-af185-default-rtdb.firebaseio.com",
  projectId: "glitch-af185",
  storageBucket: "glitch-af185.appspot.com",
  messagingSenderId: "964545501619",
  appId: "1:964545501619:web:0db0bca4499a8b441093c6",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export const Providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage;
export default Firebase;
