import {
  GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_RTS_ORDER_BANK_TABLE_DATA,
  CLEAR_RTS_ORDER_BANK_TABLE_DATA,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA_FAIL,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA,
  GET_ORDERBANK,
  GET_ORDERBANK_SUCCESS,
  GET_ORDERBANK_FAIL,
  ADD_ORDERBANK,
  ADD_ORDERBANK_SUCCESS,
  ADD_ORDERBANK_FAIL,
  EDIT_ORDERBANK,
  EDIT_ORDERBANK_SUCCESS,
  EDIT_ORDERBANK_FAIL,
  EDIT_ORDERBANK_CLEAR,
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
  SEND_MULTIPLE_ORDER_BANK_DN,
  SEND_MULTIPLE_ORDER_BANK_DN_SUCCESS,
  SEND_MULTIPLE_ORDER_BANK_DN_FAIL,
  CLEAR_SCHEDULING,
  CLEAR_SCHEDULING_SUCCESS,
  CLEAR_SCHEDULING_FAIL,
  UPDATE_ORDER_BANK_TABLE_DATA,
  DELETE_ORDERBANK_DETAIL,
  DELETE_ORDERBANK_DETAIL_SUCCESS,
  DELETE_ORDERBANK_DETAIL_FAIL,
  VIEW_ORDERBANK_DETAIL,
  VIEW_ORDERBANK_DETAIL_SUCCESS,
  VIEW_ORDERBANK_DETAIL_FAIL,
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
  GET_CROSS_TERMINAL,
  GET_CROSS_TERMINAL_SUCCESS,
  GET_CROSS_TERMINAL_FAIL,
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
  REMOVE_ORDER_FROM_SHIPMENT_FAIL,
  REMOVE_SHIPMENT_FROM_EVENT,
  REMOVE_SHIPMENT_FROM_EVENT_SUCCESS,
  REMOVE_EVENT,
  REMOVE_EVENT_SUCCESS,
  // UPDATE_OB_EVENT,
  // UPDATE_OB_EVENT_SUCCESS,
  // UPDATE_OB_EVENT_FAIL,
  GET_WEB_SOCKET_MESSAGE_SUCCESS,
  // GET_WEB_SOCKET_MESSAGE,
  GET_OB_RT_DETAILS,
  GET_OB_RT_DETAILS_SUCCESS,
  GET_OB_RT_DETAILS_FAIL,
  UPDATE_OB_RT_DETAILS,
  UPDATE_OB_RT_DETAILS_SUCCESS,
  UPDATE_OB_RT_DETAILS_FAIL,
  GET_SEND_BULK_SHIPMENT,
  GET_SEND_BULK_SHIPMENT_SUCCESS,
  GET_SEND_BULK_SHIPMENT_FAIL,
  GET_RUN_AUTO_SCHEDULING,
  GET_RUN_AUTO_SCHEDULING_SUCCESS,
  GET_RUN_AUTO_SCHEDULING_FAIL,
  CLEAR_GANTT_DATA,
  GET_SHIPMENT_DETAIL_SUCCESS,
  GET_SHIPMENT_DETAIL_FAIL,
  GET_SHIPMENT_DETAIL,
  DRAG_AND_DROP_SHIPMENT_AREA,
  DRAG_AND_DROP_SHIPMENT_AREA_SUCCESS,
  DRAG_AND_DROP_SHIPMENT_AREA_FAIL,
  // GET_GANTT_EVENT_VALIDATION,
  // GET_GANTT_EVENT_VALIDATION_SUCCESS,
  // GET_GANTT_EVENT_VALIDATION_FAIL,
  GET_SHIPMENT_DETAILS_ON_VEHICLE,
  GET_SHIPMENT_DETAILS_ON_VEHICLE_SUCCESS,
  GET_SHIPMENT_DETAILS_ON_VEHICLE_FAIL,
  DRAG_ORDER_TO_SHIPMENT,
  DRAG_ORDER_TO_SHIPMENT_SUCCESS,
  DRAG_ORDER_TO_SHIPMENT_FAIL,
  RUN_AUTO_SCHEDULE,
  RUN_AUTO_SCHEDULE_SUCCESS,
  RUN_AUTO_SCHEDULE_FAIL,
  GET_OB_TOTAL_UNSCHEDULE,
  GET_OB_TOTAL_UNSCHEDULE_SUCCESS,
  GET_OB_TOTAL_UNSCHEDULE_FAIL,
  SET_BRYNTUM_FILTER,
  UPDATE_SHIPMENT,
  UPDATE_SHIPMENT_SUCCESS,
  UPDATE_SHIPMENT_FAIL,
  // DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_RESTRICTED,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_CONFIRM_RESTRICTIONS,
  HIGHLIGHT_RTS_GANTTCHART,
} from './actionTypes'

export const getRTSOrderBankTableData = params => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA,
  params,
})

export const getRTSOrderBankTableDataSuccess = response => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  payload: response,
})

export const getRTSOrderBankTableDataFail = error => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  payload: error,
})

export const getShipmentOfOderBankGanttChart = params => ({
  type: GET_SHIPMENT_ORDER_BANK_TABLE_DATA,
  params,
})

export const getShipmentOfOderBankGanttChartSuccess = response => ({
  type: GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS,
  payload: response,
})

export const getShipmentOfOderBankGanttChartFail = error => ({
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

export const getEditOrderBankDetail = params => ({
  type: EDIT_ORDERBANK,
  params,
})

export const getEditOrderBankDetailSuccess = response => ({
  type: EDIT_ORDERBANK_SUCCESS,
  payload: response,
})

export const getEditOrderBankDetailFail = error => ({
  type: EDIT_ORDERBANK_FAIL,
  payload: error,
})

export const getEditOrderBankDetailClear = () => ({
  type: EDIT_ORDERBANK_CLEAR,
})

export const getOrderBankDetail = params => {
  return {
    type: GET_ORDERBANK_TABLE_INFORMATION,
    params,
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
  payload: error,
})

export const refreshOderBankDN = params => ({
  type: REFRESH_ORDER_BANK_DN,
  params,
})

export const refreshOderBankDNSuccess = response => ({
  type: REFRESH_ORDER_BANK_SUCCESS,
  payload: response,
})

export const refreshOderBankDNFail = error => ({
  type: REFRESH_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const sendOrderBankDN = params => ({
  type: SEND_ORDER_BANK_DN,
  params,
})

export const sendOrderBankDNSuccess = response => ({
  type: SEND_ORDER_BANK_DN_SUCCESS,
  payload: response,
})

export const sendOrderBankDNFail = error => ({
  type: SEND_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const sendMultipleOrderBankDN = params => ({
  type: SEND_MULTIPLE_ORDER_BANK_DN,
  params,
})

export const sendMultipleOrderBankDNSuccess = response => ({
  type: SEND_MULTIPLE_ORDER_BANK_DN_SUCCESS,
  payload: response,
})

export const sendMultipleOrderBankDNFail = error => ({
  type: SEND_MULTIPLE_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const clearScheduling = params => ({
  type: CLEAR_SCHEDULING,
  params,
})

export const clearSchedulingSuccess = response => ({
  type: CLEAR_SCHEDULING_SUCCESS,
  payload: response,
})

export const clearSchedulingFail = error => ({
  type: CLEAR_SCHEDULING_FAIL,
  payload: error,
})

export const updateOrderBankTableData = payload => ({
  type: UPDATE_ORDER_BANK_TABLE_DATA,
  payload,
})

export const viewOrderBankDetail = params => ({
  type: VIEW_ORDERBANK_DETAIL,
  params,
})

export const viewOrderBankDetailSuccess = response => ({
  type: VIEW_ORDERBANK_DETAIL_SUCCESS,
  payload: response,
})

export const viewOrderBankDetailFail = error => ({
  type: VIEW_ORDERBANK_DETAIL_FAIL,
  payload: error,
})

export const deleteOrderBankDetail = params => ({
  type: DELETE_ORDERBANK_DETAIL,
  params,
})

export const deleteOrderBankDetailSuccess = response => ({
  type: DELETE_ORDERBANK_DETAIL_SUCCESS,
  payload: response,
})

export const deleteOrderBankDetailFail = error => ({
  type: DELETE_ORDERBANK_DETAIL_FAIL,
  payload: error,
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
  payload: error,
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

export const processPaymentInGanttChart = payload => ({
  type: PROCESS_PAYMENT_IN_GANTT_CHART,
  payload,
})

export const processPaymentInGanttChartSuccess = response => ({
  type: PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS,
  payload: response,
})

export const processPaymentInGanttChartFail = error => ({
  type: PROCESS_PAYMENT_IN_GANTT_CHART_FAIL,
  payload: error,
})

export const cancelPaymentInGanttChart = payload => ({
  type: CANCEL_PAYMENT_IN_GANTT_CHART,
  payload,
})

export const cancelPaymentInGanttChartSuccess = response => ({
  type: CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS,
  payload: response,
})

export const cancelPaymentInGanttChartFail = error => ({
  type: CANCEL_PAYMENT_IN_GANTT_CHART_FAIL,
  payload: error,
})

export const sendOrderInGanttChart = payload => ({
  type: SEND_ORDER_IN_GANTT_CHART,
  payload,
})

export const sendOrderInGanttChartSuccess = response => ({
  type: SEND_ORDER_IN_GANTT_CHART_SUCCESS,
  payload: response,
})

export const sendOrderInGanttChartFail = error => ({
  type: SEND_ORDER_IN_GANTT_CHART_FAIL,
  payload: error,
})

export const getRTSOderBankGanttChart = payload => ({
  type: GET_RTS_GANTT_CHART_DATA,
  payload,
})

export const getRTSOderBankGanttChartSuccess = response => ({
  type: GET_RTS_GANTT_CHART_DATA_SUCCESS,
  payload: response,
})

export const getRTSOderBankGanttChartFail = error => ({
  type: GET_RTS_GANTT_CHART_DATA_FAIL,
  payload: error,
})

// @params { highlightBy: 'high' | 'request' | 'future' | 'backlog' }
export const highlightRTSGanttChart = params => ({
  type: HIGHLIGHT_RTS_GANTTCHART,
  payload: params,
})

export const dragOrderBankToGanttChart = ({
  shift_date,
  vehicle,
  order_banks,
}) => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART,
  shift_date,
  vehicle,
  order_banks,
})

// <params> is <order_banks[]>
export const dragOrderBankToGanttChartSuccess = params => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS,
  payload: params,
})

export const dragOrderBankToGanttChartFail = error => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL,
  error,
})

// @params = { orders: orderBank[], proceed: boolean }
export const dragOrderBankToGanttChartConfirm = params => ({
  type: DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_CONFIRM_RESTRICTIONS,
  payload: params,
})

export const selectVehicleShipment = ({ vehicle, resourceId }) => ({
  type: SELECT_VEHICLE_RTS_SHIPMENT,
  vehicle,
  resourceId,
})

export const deselectVehicleShipment = () => ({
  type: DESELECT_VEHICLE_RTS_SHIPMENT,
})

export const removeOrderFromShipment = params => ({
  type: REMOVE_ORDER_FROM_SHIPMENT,
  params,
})

export const removeOrderFromShipmentSuccess = params => ({
  type: REMOVE_ORDER_FROM_SHIPMENT_SUCCESS,
  params,
})

export const removeOrderFromShipmentFail = params => ({
  type: REMOVE_ORDER_FROM_SHIPMENT_FAIL,
  params,
})

export const removeShipmentFromEvent = params => ({
  type: REMOVE_SHIPMENT_FROM_EVENT,
  params,
})

export const removeShipmentFromEventSuccess = params => ({
  type: REMOVE_SHIPMENT_FROM_EVENT_SUCCESS,
  payload: params,
})

export const removeEvent = params => ({
  type: REMOVE_EVENT,
  params,
})

export const removeEventSuccess = params => ({
  type: REMOVE_EVENT_SUCCESS,
  params,
})

// export const updateOBEvent = params => ({
//   type: UPDATE_OB_EVENT,
//   params,
// })
// export const updateOBEventSuccess = params => ({
//   type: UPDATE_OB_EVENT_SUCCESS,
//   params,
// })
// export const updateOBEventFail = params => ({
//   type: UPDATE_OB_EVENT_FAIL,
//   params,
// })

export const getWebsocketMessageSuccess = data => ({
  type: GET_WEB_SOCKET_MESSAGE_SUCCESS,
  payload: data,
})

export const getOBRTDetails = params => ({
  type: GET_OB_RT_DETAILS,
  params,
})

export const getOBRTDetailsSuccess = data => ({
  type: GET_OB_RT_DETAILS_SUCCESS,
  payload: data,
})

export const getOBRTDetailsFail = error => ({
  type: GET_OB_RT_DETAILS_FAIL,
  payload: error,
})

export const updateOBRTDetails = params => ({
  type: UPDATE_OB_RT_DETAILS,
  params,
})

export const updateOBRTDetailsSuccess = data => ({
  type: UPDATE_OB_RT_DETAILS_SUCCESS,
  payload: data,
})

export const updateOBRTDetailsFail = error => ({
  type: UPDATE_OB_RT_DETAILS_FAIL,
  payload: error,
})

export const clearGanttData = () => ({
  type: CLEAR_GANTT_DATA,
})

export const setBryntumFilter = payload => ({
  type: SET_BRYNTUM_FILTER,
  payload,
})

export const clearRTSOrderBankTableData = () => ({
  type: CLEAR_RTS_ORDER_BANK_TABLE_DATA,
})

export const getShipmentDetail = params => ({
  type: GET_SHIPMENT_DETAIL,
  params,
})

export const getShipmentDetailSuccess = response => ({
  type: GET_SHIPMENT_DETAIL_SUCCESS,
  payload: response,
})

export const getShipmentDetailFail = error => ({
  type: GET_SHIPMENT_DETAIL_FAIL,
  payload: error,
})
export const getShipmentDetailsOnVehicle = params => ({
  type: GET_SHIPMENT_DETAILS_ON_VEHICLE,
  params,
})

export const getShipmentDetailsOnVehicleSuccess = response => ({
  type: GET_SHIPMENT_DETAILS_ON_VEHICLE_SUCCESS,
  payload: response,
})

export const getShipmentDetailsOnVehicleFail = error => ({
  type: GET_SHIPMENT_DETAILS_ON_VEHICLE_FAIL,
  payload: error,
})

export const onDragAndDropShipmentArea = params => ({
  type: DRAG_AND_DROP_SHIPMENT_AREA,
  params,
})

export const onDragAndDropShipmentAreaSuccess = response => ({
  type: DRAG_AND_DROP_SHIPMENT_AREA_SUCCESS,
  payload: response,
})

export const onDragAndDropShipmentAreaFail = error => ({
  type: DRAG_AND_DROP_SHIPMENT_AREA_FAIL,
  payload: error,
})

// export const getGanttEventValidation = params => ({
//   type: GET_GANTT_EVENT_VALIDATION,
//   params,
// })

// export const getGanttEventValidationSuccess = params => ({
//   type: GET_GANTT_EVENT_VALIDATION_SUCCESS,
//   params,
// })

// export const getGanttEventValidationFail = params => ({
//   type: GET_GANTT_EVENT_VALIDATION_FAIL,
//   params,
// })

export const onDragOrderToShipment = params => ({
  type: DRAG_ORDER_TO_SHIPMENT,
  params,
})

export const onDragOrderToShipmentSuccess = response => ({
  type: DRAG_ORDER_TO_SHIPMENT_SUCCESS,
  payload: response,
})

export const onDragOrderToShipmentFail = error => ({
  type: DRAG_ORDER_TO_SHIPMENT_FAIL,
  payload: error,
})

export const runAutoSchedule = params => ({
  type: RUN_AUTO_SCHEDULE,
  params,
})

export const runAutoScheduleSuccess = response => ({
  type: RUN_AUTO_SCHEDULE_SUCCESS,
  payload: response,
})

export const runAutoScheduleFail = error => ({
  type: RUN_AUTO_SCHEDULE_FAIL,
  payload: error,
})

export const getOBTotalUnschedule = params => ({
  type: GET_OB_TOTAL_UNSCHEDULE,
  params,
})

export const getOBTotalUnscheduleSuccess = response => ({
  type: GET_OB_TOTAL_UNSCHEDULE_SUCCESS,
  payload: response,
})

export const getOBTotalUnscheduleFail = error => ({
  type: GET_OB_TOTAL_UNSCHEDULE_FAIL,
  payload: error,
})

export const updateShipment = params => ({
  type: UPDATE_SHIPMENT,
  params,
})

export const updateShipmentSuccess = params => ({
  type: UPDATE_SHIPMENT_SUCCESS,
  params,
})

export const updateShipmentFail = error => ({
  type: UPDATE_SHIPMENT_FAIL,
  payload: error,
})
