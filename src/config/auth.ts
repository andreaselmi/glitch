import { auth, Providers, firestore } from "./firebase";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { store } from "../store/store";
import {
  setCurrentUser,
  userIsAuthenticated,
  setNoUser,
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
  }
};

//sets the user according to the provider used to log in
export const authStateChanged = async (user: firebase.User | null) => {
  if (user) {
    //data from firebaseUser
    let provider = user.providerData[0]?.providerId;
    const { email, uid, displayName, photoURL } = user;

    //data from firestore
    const userRef = await firestore.collection("users").doc(user.uid);
    const userDoc = await userRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else return null;
    });

    if (provider === "google.com") {
      store.dispatch(
        setCurrentUser({
          email: email || "",
          uid,
          fullName: displayName || "Welcome Guest",
          userImg: photoURL || "",
          provider,
        })
      );
    } else {
      if (userDoc) {
        store.dispatch(
          setCurrentUser({
            fullName: userDoc.fullName,
            email: userDoc.email,
            userImg: userDoc.userImg,
            uid: userDoc.uid,
            provider: userDoc.provider,
          })
        );
      } else {
        store.dispatch(
          setCurrentUser({
            fullName: displayName || "Welcome Guest",
            email: email || "",
            userImg: "",
            uid,
            provider: provider || "",
          })
        );
        userRef.set({
          provider,
          email,
          fullName: displayName || "Welcome Guest",
          uid,
          userImg: "",
        });
      }
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
