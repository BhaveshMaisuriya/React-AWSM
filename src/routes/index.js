import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Dashboard from "../pages/Dashboard/index"

import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"
import RetailCustomer from "../pages/DQM/RetailCustomer"
import CommercialCustomer from "../pages/DQM/CommercialCustomer"
import HighCharts from "../pages/HighCharts"
import Bryntum from "../pages/Bryntum"
import RTS from "../pages/RTS"
import RoadTanker from "../pages/DQM/RoadTanker"
import Product from "../pages/DQM/ProductList"
import Terminal from "../pages/DQM/Terminal"
import SalesAndInventory from "../pages/DQM/SalesAndInventory"
import SLA from "../pages/DQM/SLA"
import OrderBank from "../pages/RTS/orderBank"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/sales-inventory", component: SalesAndInventory },
  { path: "/retail-customer", component: RetailCustomer },
  { path: "/commercial-customer", component: CommercialCustomer },
  { path: "/road-tanker", component: RoadTanker },
  { path: "/product", component: Product },
  { path: "/terminal", component: Terminal },
  { path: "/sla-compliance", component: DatatableTables },
  { path: "/sla", component: SLA },
  { path: "/highcharts", component: HighCharts },
  { path: "/bryntum", component: Bryntum },
  { path: "/orderbank", component: OrderBank },
  { path: "/rts", component: RTS },  
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },
  { path: "/", exact: true, component: () => <Redirect to="/retail-customer" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }