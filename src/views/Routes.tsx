import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

//store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentUser } from "../store/auth";

//auth
import { auth, firestore } from "../config/firebase";
import firebase from "firebase/app";

//my components
import Loader from "../components/Loader";
import ProtectedRoute from "../components/common/ProtectedRoute";

//config
import routes from "../config/routes";
import { setAccessToken } from "../config/api";

import { loadGamesFromFirestore } from "../store/games";

const Routes = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const authStateChanged = async (user: firebase.User | null) => {
    if (user) {
      let provider = user.providerData[0]?.providerId;

      if (provider === "google.com") {
        dispatch(
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
              dispatch(
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
              dispatch(
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

      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setInitializing(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged(authStateChanged);
    setAccessToken();
  }, []);

  useEffect(() => {
    if (user.uid) dispatch(loadGamesFromFirestore(user));
  }, [user]);

  if (initializing) return <Loader />;

  return (
    <Switch>
      {routes.map((route, key) => {
        if (route.private)
          return (
            <ProtectedRoute
              component={route.component}
              isAuthenticated={isAuthenticated}
              key={key}
              path={route.path}
              redirectPath="/"
            />
          );

        return (
          <Route
            component={route.component}
            exact
            key={key}
            path={route.path}
          />
        );
      })}
    </Switch>
  );
};

export default Routes;
