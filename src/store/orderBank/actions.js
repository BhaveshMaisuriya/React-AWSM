import {
  GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_RTS_ORDER_BANK_TABLE_DATA,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA_FAIL,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA,
  GET_ORDERBANK,
  GET_ORDERBANK_SUCCESS,
  GET_ORDERBANK_FAIL,
  ADD_ORDERBANK,
  ADD_ORDERBANK_SUCCESS,
  ADD_ORDERBANK_FAIL,  
  UPDATE_ORDERBANK_TABLE_INFORMATION,
  UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  GET_ORDERBANK_TABLE_INFORMATION,
  GET_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  GET_ORDERBANK_TABLE_INFORMATION_FAIL,
  REFRESH_ORDER_BANK_DN,
  REFRESH_ORDER_BANK_SUCCESS,
  REFRESH_ORDER_BANK_DN_FAIL,
  SEND_ORDER_BANK_DN,
  SEND_ORDER_BANK_DN_SUCCESS,
  SEND_ORDER_BANK_DN_FAIL,
  UPDATE_ORDER_BANK_TABLE_DATA,
  DELETE_ORDERBANK_DETAIL,
  DELETE_ORDERBANK_DETAIL_SUCCESS,
  DELETE_ORDERBANK_DETAIL_FAIL,
  SEND_DN_STATUS_REQUEST,
  SEND_DN_STATUS_REQUEST_SUCCESS,
  SEND_DN_STATUS_REQUEST_FAIL,
  GET_ORDER_BANK_AUDITLOG,
  GET_ORDER_BANK_AUDITLOG_SUCCESS,
  GET_ORDER_BANK_AUDITLOG_FAIL,
  GET_CLEAR_SCHEDULING,
  GET_CLEAR_SCHEDULING_SUCCESS,
  GET_CLEAR_SCHEDULING_FAIL,  
  GET_DELETE_MULTIPLE_ORDER,
  GET_DELETE_MULTIPLE_ORDER_SUCCESS,
  GET_DELETE_MULTIPLE_ORDER_FAIL,
  GET_CROSS_TERMINALR,
  GET_CROSS_TERMINALR_SUCCESS,
  GET_CROSS_TERMINALR_FAIL,  
  PROCESS_PAYMENT_IN_GANTT_CHART,
  PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS,
  PROCESS_PAYMENT_IN_GANTT_CHART_FAIL,
  CANCEL_PAYMENT_IN_GANTT_CHART,
  CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS,
  CANCEL_PAYMENT_IN_GANTT_CHART_FAIL,
  SEND_ORDER_IN_GANTT_CHART,
  SEND_ORDER_IN_GANTT_CHART_SUCCESS,
  SEND_ORDER_IN_GANTT_CHART_FAIL,
  GET_RTS_GANTT_CHART_DATA,
  GET_RTS_GANTT_CHART_DATA_SUCCESS,
  GET_RTS_GANTT_CHART_DATA_FAIL,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL,
  SELECT_VEHICLE_RTS_SHIPMENT,
  DESELECT_VEHICLE_RTS_SHIPMENT,
  REMOVE_ORDER_FROM_SHIPMENT,
  REMOVE_ORDER_FROM_SHIPMENT_SUCCESS,
  REMOVE_SHIPMENT_FROM_EVENT, REMOVE_SHIPMENT_FROM_EVENT_SUCCESS,
  REMOVE_EVENT,
  REMOVE_EVENT_SUCCESS,
  UPDATE_OB_EVENT,
  UPDATE_OB_EVENT_SUCCESS,
  UPDATE_OB_EVENT_FAIL,
  GET_WEB_SOCKET_MESSAGE_SUCCESS,
  GET_WEB_SOCKET_MESSAGE,
  GET_OB_RT_DETAILS,
  GET_OB_RT_DETAILS_SUCCESS,
  GET_OB_RT_DETAILS_FAIL,
  UPDATE_OB_RT_DETAILS,
  UPDATE_OB_RT_DETAILS_SUCCESS,
  UPDATE_OB_RT_DETAILS_FAIL,
} from "./actionTypes"

export const getRTSOrderBankTableData = (params) => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA,
  params,
})

export const getRTSOrderBankTableDataSuccess = (response) => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  payload: response,
})

export const getRTSOrderBankTableDataFail = (error) => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  payload: error,
})

export const getShipmentOfOderBankGanttChart = (params) => ({
  type: GET_SHIPMENT_ORDER_BANK_TABLE_DATA,
  params,
})

export const getShipmentOfOderBankGanttChartSuccess = (response) => ({
  type: GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS,
  payload: response,
})

export const getShipmentOfOderBankGanttChartFail = (error) => ({
  type: GET_SHIPMENT_ORDER_BANK_TABLE_DATA_FAIL,
  payload: error,
})

export const getOrderBank = params => ({
  type: GET_ORDERBANK,
  params,
})

export const getOrderBankSuccess = response => ({
  type: GET_ORDERBANK_SUCCESS,
  payload: response,
})

export const getOrderBankFail = error => ({
  type: GET_ORDERBANK_FAIL,
  payload: error,
})

export const addOrderBank = params => ({
  type: ADD_ORDERBANK,
  params,
})

export const addOrderBankSuccess = response => ({
  type: ADD_ORDERBANK_SUCCESS,
  payload: response,
})

export const addOrderBankFail = error => ({
  type: ADD_ORDERBANK_FAIL,
  payload: error,
})

export const getOrderBankDetail = (params) => {
  return {
    type: GET_ORDERBANK_TABLE_INFORMATION,
    params
  }
}

export const getOrderBankDetailSuccess = response => ({
  type: GET_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  payload: response,
})

export const getOrderBankDetailFail = error => ({
  type: GET_ORDERBANK_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const updateOrderbankTableInformation = data => ({
  type: UPDATE_ORDERBANK_TABLE_INFORMATION,
  data,
})

export const updateOrderbankTableInformationSuccess = event => ({
  type: UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  payload: event,
})

export const updateOrderbankTableInformationFail = error => ({
  type: UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  payload: error
})

export const refreshOderBankDN = (params) => ({
  type: REFRESH_ORDER_BANK_DN,
  params,
})

export const refreshOderBankDNSuccess = (response) => ({
  type: REFRESH_ORDER_BANK_SUCCESS,
  payload: response,
})


export const refreshOderBankDNFail = (error) => ({
  type: REFRESH_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const sendOrderBankDN = (params) => ({
  type: SEND_ORDER_BANK_DN,
  params,
})

export const sendOrderBankDNSuccess = (response) => ({
  type: SEND_ORDER_BANK_DN_SUCCESS,
  payload: response,
})

export const sendOrderBankDNFail = (error) => ({
  type: SEND_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const updateOrderBankTableData = (payload) => ({
  type: UPDATE_ORDER_BANK_TABLE_DATA,
  payload,
})

export const deleteOrderBankDetail = (params) => ({
  type: DELETE_ORDERBANK_DETAIL,
  params,
})

export const deleteOrderBankDetailSuccess = response => ({
  type: DELETE_ORDERBANK_DETAIL_SUCCESS,
  payload: response,
})

export const deleteOrderBankDetailFail = error => ({
  type: DELETE_ORDERBANK_DETAIL_FAIL,
  payload: error
})

export const sendDNStatusRequest = params => ({
  type: SEND_DN_STATUS_REQUEST,
  params,
})

export const sendDNStatusRequestSuccess = event => ({
  type: SEND_DN_STATUS_REQUEST_SUCCESS,
  payload: event,
})

export const sendDNStatusRequestFail = error => ({
  type: SEND_DN_STATUS_REQUEST_FAIL,
  payload: error
})

export const getOrderBankAuditLog = () => ({
  type: GET_ORDER_BANK_AUDITLOG,
})

export const getOrderBankAuditLogSuccess = response => ({
  type: GET_ORDER_BANK_AUDITLOG_SUCCESS,
  payload: response,
})

export const getOrderBankAuditLogFail = error => ({
  type: GET_ORDER_BANK_AUDITLOG_FAIL,
  payload: error,
})

export const getClearScheduling = params => ({
  type: GET_CLEAR_SCHEDULING,
  params,
})

export const getClearSchedulingSuccess = response => ({
  type: GET_CLEAR_SCHEDULING_SUCCESS,
  payload: response,
})

export const getClearSchedulingFail = error => ({
  type: GET_CLEAR_SCHEDULING_FAIL,
  payload: error,
})

export const getSendBulkShipment = params => ({
  type: GET_SEND_BULK_SHIPMENT,
  params,
})

export const getSendBulkShipmentSuccess = response => ({
  type: GET_SEND_BULK_SHIPMENT_SUCCESS,
  payload: response,
})

export const getSendBulkShipmentFail = error => ({
  type: GET_SEND_BULK_SHIPMENT_FAIL,
  payload: error,
})

export const getRunAutoScheduling = params => ({
  type: GET_RUN_AUTO_SCHEDULING,
  params,
})

export const getRunAutoSchedulingSuccess = response => ({
  type: GET_RUN_AUTO_SCHEDULING_SUCCESS,
  payload: response,
})

export const getRunAutoSchedulingFail = error => ({
  type: GET_RUN_AUTO_SCHEDULING_FAIL,
  payload: error,
})

export const getdeleteMultipleOrder = params => ({
  type: GET_DELETE_MULTIPLE_ORDER,
  params,
})

export const getdeleteMultipleOrderSuccess = response => ({
  type: GET_DELETE_MULTIPLE_ORDER_SUCCESS,
  payload: response,
})

export const getdeleteMultipleOrderFail = error => ({
  type: GET_DELETE_MULTIPLE_ORDER_FAIL,
  payload: error,
})

export const getCrossTerminal = params => ({
  type: GET_CROSS_TERMINAL,
  params,
})

export const getCrossTerminalSuccess = response => ({
  type: GET_CROSS_TERMINAL_SUCCESS,
  payload: response,
})

export const getCrossTerminalFail = error => ({
  type: GET_CROSS_TERMINAL_FAIL,
  payload: error,
})

export const processPaymentInGanttChart = () => ({
  type: PROCESS_PAYMENT_IN_GANTT_CHART,
})

export const processPaymentInGanttChartSuccess = response => ({
  type: PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS,
  payload: response,
})

export const processPaymentInGanttChartFail = error => ({
  type: PROCESS_PAYMENT_IN_GANTT_CHART_FAIL,
  payload: error,
})


export const cancelPaymentInGanttChart = (param) => ({
  type: CANCEL_PAYMENT_IN_GANTT_CHART,
  payload: param,
})

export const cancelPaymentInGanttChartSuccess = response => ({
  type: CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS,
  payload: response,
})

export const cancelPaymentInGanttChartFail = error => ({
  type: CANCEL_PAYMENT_IN_GANTT_CHART_FAIL,
  payload: error,
})


export const sendOrderInGanttChart = () => ({
  type: SEND_ORDER_IN_GANTT_CHART,
})

export const sendOrderInGanttChartSuccess = response => ({
  type: SEND_ORDER_IN_GANTT_CHART_SUCCESS,
  payload: response,
})

export const sendOrderInGanttChartFail = error => ({
  type: SEND_ORDER_IN_GANTT_CHART_FAIL,
  payload: error,
})

export const getRTSOderBankGanttChart = params => ({
  type: GET_RTS_GANTT_CHART_DATA,
  params,
})

export const getRTSOderBankGanttChartSuccess = response => ({
  type: GET_RTS_GANTT_CHART_DATA_SUCCESS,
  payload: response,
})

export const getRTSOderBankGanttChartFail = error => ({
  type: GET_RTS_GANTT_CHART_DATA_FAIL,
  payload: error,
})

export const dragOrderBankToGanttChart = () => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART,
})

export const dragOrderBankToGanttChartSuccess = (dropData) => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS,
  dropData
})

export const dragOrderBankToGanttChartFail = (error) => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL,
  error,
})

export const selectVehicleShipment = ({vehicle, resourceId})=> ({
  type: SELECT_VEHICLE_RTS_SHIPMENT,
  vehicle,
  resourceId
})

export const deselectVehicleShipment = ()=>({
  type:DESELECT_VEHICLE_RTS_SHIPMENT
})

export const removeOrderFromShipment = (params) => ({
  type: REMOVE_ORDER_FROM_SHIPMENT,
  params
})

export const removeOrderFromShipmentSuccess = (params) => ({
  type: REMOVE_ORDER_FROM_SHIPMENT_SUCCESS,
  params
})


export const removeShipmentFromEvent = (params) => ({
  type: REMOVE_SHIPMENT_FROM_EVENT,
  params
})

export const removeShipmentFromEventSuccess = (params) => ({
  type: REMOVE_SHIPMENT_FROM_EVENT_SUCCESS,
  params
})

export const removeEvent = (params) => ({
  type: REMOVE_EVENT,
  params
})

export const removeEventSuccess = (params) => ({
  type: REMOVE_EVENT_SUCCESS,
  params
})

export const updateOBEvent = (params) => ({
  type: UPDATE_OB_EVENT,
  params
})

export const updateOBEventSuccess = (params) => ({
  type: UPDATE_OB_EVENT_SUCCESS,
  params
})

export const updateOBEventFail = (params) => ({
  type: UPDATE_OB_EVENT_FAIL,
  params
})

export const getWebsocketMessageSuccess = (data) => ({
  type: GET_WEB_SOCKET_MESSAGE_SUCCESS,
  payload: data,
})

export const getOBRTDetails = (params) => ({
  type: GET_OB_RT_DETAILS,
  params
})

export const getOBRTDetailsSuccess = (params) => ({
  type: GET_OB_RT_DETAILS_SUCCESS,
  params
})

export const getOBRTDetailsFail = (params) => ({
  type: GET_OB_RT_DETAILS_FAIL,
  params
})

export const updateOBRTDetails = (params) => ({
  type: UPDATE_OB_RT_DETAILS,
  params
})

export const updateOBRTDetailsSuccess = (params) => ({
  type: UPDATE_OB_RT_DETAILS_SUCCESS,
  params
})

export const updateOBRTDetailsFail = (params) => ({
  type: UPDATE_OB_RT_DETAILS_FAIL,
  params
})