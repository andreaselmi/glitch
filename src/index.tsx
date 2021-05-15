import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//style
import "@fontsource/roboto";
import "./assets/css/globalStyle.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
//store
import { Provider } from "react-redux";
import { store } from "./store/store";
//react animate on scroll
import AOS from "aos";
AOS.init();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
