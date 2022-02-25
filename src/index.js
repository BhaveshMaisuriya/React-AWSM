import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import MslaErrorPage from "./common/MslaErrorPage"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import store from "./store"
import { runValidateUser } from "./AuthService"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

runValidateUser().then(() => {
  ReactDOM.render(app, document.getElementById("root"))
  serviceWorker.unregister()
})
