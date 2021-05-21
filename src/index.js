import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import store from "./store"
import { signIn } from './AuthService';

var signInState = sessionStorage.getItem('loginState');

if (signInState == undefined || signInState == null) {
  signIn();
}
else {
  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

  ReactDOM.render(app, document.getElementById("root"))
}

// const app = (
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// )

// ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
