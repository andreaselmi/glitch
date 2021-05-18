import { auth, Providers, firestore } from "./firebase";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { store } from "../store/store";
import {
  setCurrentUser,
  userIsAuthenticated,
  setNoUser,
  startInitializing,
  endInitializing,
} from "../store/auth";

interface AuthValues {
  fullName?: string;
  email: string;
  password: string;
}

export const login = async (values: AuthValues) => {
  try {
    await auth.signInWithEmailAndPassword(values.email, values.password);
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      return toast.error("Wrong password.");
    } else if (error.code === "auth/user-not-found") {
      return toast.error(
        "There is no user record corresponding to this identifier. The user may have been deleted."
      );
    } else toast.error("Unable to log in. Please try again later.");
  }
};

export const register = async (values: AuthValues) => {
  try {
    await auth.createUserWithEmailAndPassword(values.email, values.password);
    if (auth.currentUser) {
      await firestore.collection("users").doc(auth.currentUser.uid).set({
        provider: "Firebase",
        email: values.email,
        fullName: values.fullName,
        uid: auth.currentUser.uid,
        userImg: "",
      });
    }
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return toast.error("Email already in use. Please use another one.");
    } else if (error.code === "auth/weak-password") {
      return toast.error(
        "This password is too weak. Please use a strong password"
      );
    } else toast.error("Unable to register. Please try again later.");
    console.log(error);
  }
};

export const authStateChanged = async (user: firebase.User | null) => {
  if (user) {
    let provider = user.providerData[0]?.providerId;

    if (provider === "google.com") {
      store.dispatch(
        setCurrentUser({
          email: user.email,
          uid: user.uid,
          fullName: user.displayName,
          userImg: user.photoURL,
          provider,
        })
      );
    } else if (provider === "facebook.com") {
      const userRef = await firestore.collection("users").doc(user.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            store.dispatch(
              setCurrentUser({
                fullName: doc.data()?.fullName,
                email: doc.data()?.email,
                userImg: doc.data()?.userImg,
                uid: doc.data()?.uid,
                provider: doc.data()?.provider,
              })
            );
          } else {
            userRef.set({
              provider,
              email: user.email,
              fullName: user.displayName,
              uid: user.uid,
              userImg: "",
            });
          }
        })
        .catch((error) => {
          //TODO toast per gestire l'errore
          console.log("Error getting document:", error);
        });
    } else {
      //TODO migliorare
      await firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists)
            store.dispatch(
              setCurrentUser({
                fullName: doc.data()?.fullName,
                email: doc.data()?.email,
                userImg: doc.data()?.userImg,
                uid: doc.data()?.uid,
                provider: doc.data()?.provider,
              })
            );
        });
    }

    store.dispatch(userIsAuthenticated());
  } else {
    setNoUser();
  }
  store.dispatch(endInitializing());
};

export const googleSignIn = () => {
  try {
    auth.signInWithPopup(Providers.google);
  } catch (error) {
    toast.error("Unable to access. Try again later.");
  }
};
export const facebookSignIn = () => {
  try {
    auth.signInWithPopup(Providers.facebook);
  } catch (error) {
    toast.error("Unable to access. Try again later.");
  }
};
