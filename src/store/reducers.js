import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

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

//Sale and Inventory
import saleAndInventory from "./salesAndInventory/reducer"

import sla from "./sla/reducer"

//RTS Order bank
import orderBank from "./orderBank/reducer"

//DQM Common
import dqmCommon from "./dqm/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  retailCustomer,
  commercialCustomer,
  products,
  roadTanker,
  terminal,
  msGraph,
  saleAndInventory,
  sla,
  orderBank,
  dqmCommon,
})

export default rootReducer