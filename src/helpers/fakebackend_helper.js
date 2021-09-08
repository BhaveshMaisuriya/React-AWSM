// import axios from "axios"
import { del, get, post, put, realAxiosApi as axios } from "./api_helper"
import * as url from "./url_helper"
import { orderDetails, viewOrderDetails } from "../pages/RTS/newOrderData"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get Products
// export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
// export const getProductDetail = id =>
//   get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get contacts
export const getUsers = () => get(url.GET_USERS)

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get order bank
export const getOrderBank = (params) => orderDetails

// get single order bank
export const getOrderBankDetail = (params) => viewOrderDetails

export const deleteOrderBankDetail = (params) => params

// get retail customer
export const getRetailCustomer = params =>
  axios.post(
    "/retail-customer",
    { ...params }
  )

export const getDownloadRetailCustomer = params =>
  axios.post(
    "/retail-customer",
    { ...params }
  )

export const getCommercialCustomer = params =>
  axios.post(
    "/commercial-customer",
    { ...params }
  )

export const getDownloadCommercialCustomer = params =>
  axios.post(
    "/commercial-customer",
    { ...params }
  )

export const getDownloadSales = params =>
  axios.post(
    "/commercial-customer",
    { ...params }
  )

export const getRoadTanker = params =>
  axios.post(
    "/road-tanker",
    { ...params }
  )

export const getRoadTankerDetail = vehical_id =>
  axios.get(
    `/road-tanker/${vehical_id}`,
  )

export const updateRoadTankerDetail = payload => {
  return axios.put(
    `/road-tanker/${payload.vehicle_name}`,
    payload.data
  )
}


export const getDownloadRoadTanker = params =>
  axios.post(
    "/road-tanker",
    { ...params }
  )

export const getTerminal = params =>
  axios.post(
    "/terminal",
    { ...params }
  )

export const getDownloadTerminal = params =>
  axios.post(
    "/terminal",
    { ...params }
  )

// get DQM Master Retail Cust Audit Log
export const getRetailAuditLog = payload =>
  get(url.GET_RETAIL_AUDITLOG, { payload: payload })

// get DQM Master Commercial Cust Audit Log
export const getAuditLog = (params) =>
axios.get(
  `https://cp54ul6po2.execute-api.ap-southeast-1.amazonaws.com/dev/audit-log?module=${params.module}&page=${params.page}&limit=${params.limit}`
)

// get DQM Master Commercial Cust Audit Log
export const getSalesAuditLog = payload =>
  get(url.GET_COMMERCIAL_AUDITLOG, { payload: payload })

  export const getOrderBankAuditLog = payload =>
  get(url.GET_COMMERCIAL_AUDITLOG, { payload: payload })

// get DQM Road Tanker Audit Log
export const getRoadTankerAuditLog = payload =>
  get(url.GET_ROADTANKER_AUDITLOG, { payload: payload })

// get DQM Terminal Audit Log
export const getTerminalAuditLog = payload =>
  get(url.GET_TERMINAL_AUDITLOG, { payload: payload })

export const getTerminalTableInformation = code =>
  axios
    .get(
      `/terminal/${code}`
    )
    .then(response => response.data)

// get Retail Customer Table Information
export const getTableInformation = code =>
  code !== undefined && axios
    .get(
      `/retail-customer/${code}`
    )
    .then(response => response.data)

// update Table Information
export const updateTableInformation = event => {
  return axios.put(
    `/retail-customer/${event.preValue.ship_to_party}`,
    event
  )
}
export const updateTerminalDetail = event => {
  return axios.put(
    `/terminal/${event.preValue.code}`,
    event
  )
}

// put(url.UPDATE_TABLE_INFORMATION, event)

// get DQM Master Retail Cust Filter
export const getRetailFilter = params => {
  return get(url.GET_RETAIL_FILTER, { params: params })
}
// get DQM Master Commercial Cust Filter
export const getCommercialFilter = params => {
  return get(url.GET_COMMERCIAL_FILTER, { params: params })
}

// get DQM Master Terminal Filter
export const getTerminalFilter = params => {
  return get(url.GET_TERMINAL_FILTER, { params: params })
}

// export const getProducts = params => get(url.GET_PRODUCTS, { params: params })
export const getProducts = params =>
  axios.post(
    "/product",
    { ...params }
  )

export const getDownloadProducts = params =>
  axios.post(
    "/product",
    { ...params }
  )

// get DQM Master Product Audit Log
export const getProductAuditLog = payload =>
  get(url.GET_PRODUCT_AUDITLOG, { payload: payload })

// get DQM Master Product Filter
export const getProductFilter = params =>
  get(url.GET_PRODUCT_FILTER, { params: params })

// Get DQM Master Product Details
// export const getProductDetail = productCode =>
//   get(`${url.GET_PRODUCT_DETAILS}/${productCode}`)

export const getProductDetail = productCode =>
  axios.get(
    `/product/${productCode}`
  )

// export const updateProductDetail = payload =>
//   put(`${url.GET_PRODUCT_DETAILS}/${payload.code}`, payload.body)

export const updateProductDetail = payload =>
  axios.put(
    `/product/${payload.preValue.code}`,
    payload
  )

export const getCommercialDetail = code =>
  axios
    .get(
      `/commercial-customer/${code}`
    )
    .then(response => response.data)

export const putCommercialDetail = data =>
  axios
    .put(
      `/commercial-customer/${data.preValue.ship_to_party}`,
      data
    )
    .then(response => response.data)

// get DQM Master Road Tanker Filter
export const getRoadTankerFilter = params => {
  return get(url.GET_ROADTANKER_FILTER, { params: params })
}

export const getSaleAndInventoryVarianceControl = () =>
  get(`${url.GET_SALES_AND_INVENTORY_VARIANCE_CONTROL}`)

export const updateSaleAndInventoryVarianceControl = () =>
  put(`${url.GET_SALES_AND_INVENTORY_VARIANCE_CONTROL}`)

export const getSaleAndInventoryDetail = () =>
  get(`${url.GET_SALES_AND_INVENTORY_DETAIL}`)

// update tank status modal
export const updateSaleAndInventoryTankStatusModal = () =>
  put(`/sales_and_inventory_tank_status_modal`)

export const updateSaleAndInventoryDetail = () =>
  put(`/sales_and_inventory_detail`)

// get sales and inventory table data
// "https://6073f3f2066e7e0017e78a3d.mockapi.io/api/v1/sales"
export const getSaleAndInventory = params =>
  axios.post(
    "/sales-inventory",
    { ...params }
  )

export const getSaleAndInventoryByRecordId = recordId =>{
  axios.get(`/sales-inventory/${recordId}`)
}

export const getSlaItems = params =>
  axios
    .get("/sla")
    .then(response => response.data)

export const updateSLASection = ({ category, id, data }) =>
  axios
    .put(
      `/sla/${category}/section/${id}`,
      data
    )
    .then(response => response.data)

export const getSLASection = ({ category }) =>
  axios.get(`/sla/${category}`)
    .then(response => response.data)

export const deleteSLASection = ({ category, id }) =>
  axios
    .delete(`/sla/${category}/section/${id}`)
    .then(response => response.data)

export const createSLASection = ({ category, data }) =>
  axios
    .post(
      `/sla/${category}/section`,
      data
    )
    .then(response => response.data)

export const createSLATableRecord = (data) =>
  axios
    .post(
      `/sla/${data.category}/section/${data.sectionId}/record`,
      data.recordValue
    )
    .then(response => response.data)

export const deleteSLARecord = ({ category, id, recordId }) =>
  axios
    .delete(`/sla/${category}/section/${id}/record/${recordId}`)
    .then(response => response.data)


export const updateSLARecord = (data) =>
  axios
    .put(
      `/sla/${data.category}/section/${data.sectionId}/record/${data.recordId}`,
      data.recordValue
    )
    .then(response => response.data)

export const getSlaAuditLog = payload => get(url.GET_SLA_AUDITLOG, { payload })
export const updateSlaItem = params => put(`${url.SLA_ITEMS}`)
export const updateSlaSectionNote = notes => put(`${url.SLA_ITEMS}`, notes)

export const getRTSOderBank = params => {
  return get(url.GET_RTS_ORDER_BANK, { params: params })
}

export const getShipmentOderBank = params => {
  return get(url.GET_SHIPMENT_ORDER_BANK, { params: params })
}

export const refreshRTSOrderBank = params => {
  return put(url.GET_RTS_ORDER_BANK, params)
}

export const sendRTSOrderBank = params => {
  return put(url.GET_RTS_ORDER_BANK, params)
}

export const getRTSOderBankGanttChart = params => {
  return post(url.GET_RTS_GANTT_CHART, params)
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
}
