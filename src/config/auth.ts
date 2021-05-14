import { auth, Providers } from "./firebase";
import { toast } from "react-toastify";

interface AuthValues {
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
