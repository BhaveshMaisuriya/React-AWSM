import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Chat from "../pages/Chat/Chat"

// Pages Calendar
import Calendar from "../pages/Calendar/index"
// Dashboard
import Dashboard from "../pages/Dashboard/index"
import DashboardSaas from "../pages/Dashboard-saas/index"
// Charts
import ChartApex from "../pages/Charts/Apexcharts"
import ChartistChart from "../pages/Charts/ChartistChart"
import ChartjsChart from "../pages/Charts/ChartjsChart"
import EChart from "../pages/Charts/EChart"
import SparklineChart from "../pages/Charts/SparklineChart"
import ToastUIChart from "../pages/Charts/ToastUIChart"
import ChartsKnob from "../pages/Charts/charts-knob"

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"
import MapsLeaflet from "../pages/Maps/MapsLeaflet"
//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid"
import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile"

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

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/sales-inventory", component: DatatableTables },
  { path: "/retail-customer", component: RetailCustomer },
  { path: "/commercial-customer", component: CommercialCustomer },
  { path: "/road-tanker", component: RoadTanker },
  { path: "/product", component: Product },
  { path: "/terminal", component: Terminal },
  { path: "/cloud-cluster", component: MapsLeaflet },
  { path: "/employee-data", component: ContactsList },
  { path: "/sla-compliance", component: DatatableTables },
  { path: "/order-forecast", component: Calendar },
  { path: "/highcharts", component: HighCharts },
  { path: "/bryntum", component: Bryntum },
  { path: "/rts", component: RTS },

  { path: "/dashboard/2", component: DashboardSaas },
  { path: "/chat", component: Chat },
  { path: "/calendar", component: Calendar },
  // this route should be at the end of all other routes
  { path: "/apex-charts", component: ChartApex },
  { path: "/chartist-charts", component: ChartistChart },
  { path: "/chartjs-charts", component: ChartjsChart },
  { path: "/e-charts", component: EChart },
  { path: "/sparkline-charts", component: SparklineChart },
  { path: "/tui-charts", component: ToastUIChart },
  { path: "/charts-knob", component: ChartsKnob },
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },
  { path: "/maps-leaflet", component: MapsLeaflet },
  // Contacts
  { path: "/contacts-grid", component: ContactsGrid },
  { path: "/contacts-list", component: ContactsList },
  { path: "/contacts-profile", component: ContactsProfile },
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
