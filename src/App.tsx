import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Element } from "react-scroll";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import links from "./config/routes";
import SearchPage from "./views/SearchPage";
import ExplorePage from "./views/ExplorePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { auth, firestore } from "./config/firebase";
import { useAppDispatch } from "./store/hooks";
import { setCurrentUser } from "./store/user";

import Footer from "./components/Footer";
import AccountPage from "./views/AccountPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const authStateChanged = async (user: any) => {
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
        dispatch(
          setCurrentUser({
            fullName: user.displayName,
            email: user.email,
            userImg: "",
            uid: user.uid,
            provider,
          })
        );
        await firestore.collection("users").doc(user.uid).set({
          provider,
          email: user.email,
          fullName: user.displayName,
          uid: user.uid,
          userImg: "",
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

  //TODO valutare un loader all'avvio dell'app

  useEffect(() => {
    auth.onAuthStateChanged(authStateChanged);
  }, []);

  if (initializing) return null;

  //TODO valutare array di routes da mappare
  return (
    <Router>
      <CssBaseline>
        <ThemeProvider theme={darkTheme}>
          <Element name="top" />
          <Navbar links={links} />
          <Switch>
            <ProtectedRoute
              redirectPath="/"
              isAuthenticated={isAuthenticated}
              path="/account"
            >
              <AccountPage />
            </ProtectedRoute>
            <ProtectedRoute
              redirectPath="/"
              isAuthenticated={isAuthenticated}
              path="/explore"
            >
              <ExplorePage />
            </ProtectedRoute>
            <ProtectedRoute
              redirectPath="/"
              isAuthenticated={isAuthenticated}
              path="/search"
            >
              <SearchPage />
            </ProtectedRoute>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </CssBaseline>
    </Router>
  );
}

export default App;
