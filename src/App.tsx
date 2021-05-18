import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Element } from "react-scroll";
//material ui
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//store
import { useAppDispatch } from "./store/hooks";
import { setCurrentUser } from "./store/user";

//auth
import { auth, firestore } from "./config/firebase";
import firebase from "firebase/app";

//my components
import AccountPage from "./views/AccountPage";
import ExplorePage from "./views/ExplorePage";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import SearchPage from "./views/SearchPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

//config
import darkTheme from "./config/theme";
import links from "./config/routes";
import { setAccessToken } from "./config/api";

function App() {
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

  //TODO valutare un loader all'avvio dell'app

  useEffect(() => {
    auth.onAuthStateChanged(authStateChanged);
    setAccessToken();
  }, []);

  if (initializing) return <Loader />;

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
