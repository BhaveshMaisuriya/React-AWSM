import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//Retail Customer
import retailCustomer from "./retailCustomer/reducer"

//CommercialCustomer
import commercialCustomer from "./commercialCustomer/reducer"

import products from "./product/reducer"

import msGraph from "./ms-graph/reducer"

//Retail Customer
import roadTanker from "./roadTanker/reducer"

//Terminal
import terminal from "./terminal/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  crypto,
  invoices,
  projects,
  tasks,
  contacts,
  retailCustomer,
  commercialCustomer,
  products,
  roadTanker,
  terminal,
  msGraph,
})

export default rootReducer
