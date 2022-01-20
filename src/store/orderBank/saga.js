import { takeLatest, put, call, select } from 'redux-saga/effects'
import {
  GET_ORDERBANK,
  ADD_ORDERBANK,
  EDIT_ORDERBANK,
  GET_ORDERBANK_TABLE_INFORMATION,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA,
  DELETE_ORDERBANK_DETAIL,
  VIEW_ORDERBANK_DETAIL,
  GET_RTS_ORDER_BANK_TABLE_DATA,
  SEND_ORDER_BANK_DN,
  REFRESH_ORDER_BANK_DN,
  SEND_DN_STATUS_REQUEST,
  GET_ORDER_BANK_AUDITLOG,
  GET_CLEAR_SCHEDULING,
  GET_SEND_BULK_SHIPMENT,
  GET_RUN_AUTO_SCHEDULING,
  GET_DELETE_MULTIPLE_ORDER,
  GET_CROSS_TERMINAL,
  PROCESS_PAYMENT_IN_GANTT_CHART,
  CANCEL_PAYMENT_IN_GANTT_CHART,
  SEND_ORDER_IN_GANTT_CHART,
  GET_RTS_GANTT_CHART_DATA,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART,
  REMOVE_ORDER_FROM_SHIPMENT,
  REMOVE_SHIPMENT_FROM_EVENT,
  REMOVE_EVENT,
  UPDATE_OB_EVENT,
  GET_OB_RT_DETAILS,
  UPDATE_OB_RT_DETAILS,
  GET_SHIPMENT_DETAIL,
  DRAG_AND_DROP_SHIPMENT_AREA,
  GET_GANTT_EVENT_VALIDATION,
  GET_SHIPMENT_DETAILS_ON_VEHICLE,
  DRAG_ORDER_TO_SHIPMENT,
  RUN_AUTO_SCHEDULE,
  GET_OB_TOTAL_UNSCHEDULE,
} from './actionTypes'

import {
  getRTSOrderBankTableDataSuccess,
  getRTSOrderBankTableDataFail,
  getShipmentOfOderBankGanttChartSuccess,
  getShipmentOfOderBankGanttChartFail,
  getOrderBankSuccess,
  getOrderBankFail,
  addOrderBankSuccess,
  addOrderBankFail,
  getEditOrderBankDetailSuccess,
  getEditOrderBankDetailFail,
  getOrderBankDetailFail,
  getOrderBankDetailSuccess,
  deleteOrderBankDetailFail,
  deleteOrderBankDetailSuccess,
  viewOrderBankDetailFail,
  viewOrderBankDetailSuccess,
  sendOrderBankDNFail,
  sendOrderBankDNSuccess,
  refreshOderBankDNFail,
  refreshOderBankDNSuccess,
  sendDNStatusRequestSuccess,
  sendDNStatusRequestFail,
  getOrderBankAuditLogSuccess,
  getOrderBankAuditLogFail,
  processPaymentInGanttChartSuccess,
  processPaymentInGanttChartFail,
  cancelPaymentInGanttChartSuccess,
  cancelPaymentInGanttChartFail,
  sendOrderInGanttChartSuccess,
  sendOrderInGanttChartFail,
  getRTSOderBankGanttChartSuccess,
  getRTSOderBankGanttChartFail,
  dragOrderBankToGanttChartSuccess,
  removeOrderFromShipmentSuccess,
  removeOrderFromShipmentFail,
  removeShipmentFromEventSuccess,
  removeEventSuccess,
  updateOBEventSuccess,
  getOBRTDetailsSuccess,
  getOBRTDetailsFail,
  updateOBRTDetailsSuccess,
  updateOBRTDetailsFail,
  getdeleteMultipleOrderSuccess,
  getdeleteMultipleOrderFail,
  getCrossTerminalSuccess,
  getCrossTerminalFail,
  dragOrderBankToGanttChartFail,
  getShipmentDetailSuccess,
  getShipmentDetailFail,
  onDragAndDropShipmentAreaFail,
  onDragAndDropShipmentAreaSuccess,
  getGanttEventValidationSuccess,
  getGanttEventValidationFail,
  getShipmentDetailsOnVehicleSuccess,
  getShipmentDetailsOnVehicleFail,
  onDragOrderToShipmentFail,
  onDragOrderToShipmentSuccess,
  runAutoScheduleSuccess,
  getRunAutoSchedulingSuccess,
  getRunAutoSchedulingFail,
  runAutoScheduleFail,
  getOBTotalUnscheduleSuccess,
  getOBTotalUnscheduleFail,
} from './actions'
import {
  getOrderBank,
  addOrderBank,
  editOrderBankDetail,
  getOrderBankDetail,
  getRTSOderBank,
  getShipmentOderBank,
  sendRTSOrderBank,
  refreshRTSOrderBank,
  deleteOrderBankDetail,
  viewOrderBankDetail,
  getOrderBankAuditLog,
  getClearScheduling,
  getSendBulkShipment,
  getRunAutoScheduling,
  getdeleteMultipleOrder,
  getCrossTerminal,
  getRTSOderBankGanttChart,
  sendOderToVehicle,
  getRTSOrderbankRTdetails,
  updateRTSOrderbankRTdetails,
  getShipmentDetail,
  validateGanttEventChange,
  getShipmentDetailsOnVehicle,
  runAutoSchedule,
  getTotalUnscheduleOrder,
  removeOrder,
} from '../../helpers/fakebackend_helper'

function* onGetOrderbank({ params = {} }) {
  try {
    const response = yield call(getOrderBank, params)
    yield put(getOrderBankSuccess(response, params))
  } catch (error) {
    yield put(getOrderBankFail(error.response))
  }
}

function* onAddOrderbank({ params = {} }) {
  try {
    const response = yield call(addOrderBank, params)
    yield put(addOrderBankSuccess(response, params))
  } catch (error) {
    yield put(addOrderBankFail(error.response))
  }
}

function* onEditOrderBankDetail({ params = {} }) {
  try {
    const response = yield call(editOrderBankDetail, params)
    yield put(getEditOrderBankDetailSuccess(response, params))
  } catch (error) {
    yield put(getEditOrderBankDetailFail(error.response))
  }
}

function* onGetOrderbankTableInformation({ params }) {
  try {
    const response = yield call(getOrderBankDetail, params)
    yield put(getOrderBankDetailSuccess(response))
  } catch (error) {
    yield put(getOrderBankDetailFail(error))
  }
}

function* onDeleteOrderbankTableInformation({ params }) {
  try {
    const response = yield call(deleteOrderBankDetail, params)
    yield put(deleteOrderBankDetailSuccess(response))
  } catch (error) {
    yield put(deleteOrderBankDetailFail(error))
  }
}

function* onViewOrderbankTableInformation({ params }) {
  try {
    const response = yield call(viewOrderBankDetail, params)
    yield put(viewOrderBankDetailSuccess(response))
  } catch (error) {
    yield put(viewOrderBankDetailFail(error))
  }
}

function* onGetRTSOrderBank({ params = {} }) {
  try {
    const response = yield call(getRTSOderBank, params)
    let newResponse = {}
    // when user increase page params -> scrolling action
    if (params?.page !== 0) {
      newResponse = { ...response, scrolling: true }
    } else {
      newResponse = { ...response, scrolling: false }
    }
    yield put(getRTSOrderBankTableDataSuccess(newResponse))
  } catch (error) {
    yield put(getRTSOrderBankTableDataFail(error))
  }
}

function* onGetShipmentOrderBankData({ params = {} }) {
  try {
    const response = yield call(getShipmentOderBank, params)
    yield put(getShipmentOfOderBankGanttChartSuccess(response))
  } catch (error) {
    yield put(getShipmentOfOderBankGanttChartFail(error))
  }
}

function* onGetTotalOBUnschedule({ params }) {
  try {
    const response = yield call(getTotalUnscheduleOrder, params)
    yield put(getOBTotalUnscheduleSuccess(response.data))
  } catch (error) {
    yield put(getOBTotalUnscheduleFail(error))
  }
}

// function* onPutOrderbankTableInformation({ data }) {
//   try {
//     yield call(putOrderbankDetail, data)
//     yield put(updateOrderbankTableInformationSuccess())
//   } catch (error) {
//     yield put(updateOrderbankTableInformationFail(error))
//   }
// }

function* onRefreshOrderBankDN({ params = {} }) {
  try {
    const response = yield call(refreshRTSOrderBank, params)
    yield put(refreshOderBankDNSuccess(response))
  } catch (error) {
    yield put(refreshOderBankDNFail(error))
  }
}

function* onSendOrderBankDN({ params = {} }) {
  try {
    const response = yield call(sendRTSOrderBank, params)
    yield put(sendOrderBankDNSuccess(response))
  } catch (error) {
    yield put(sendOrderBankDNFail(error))
  }
}

function* onSendDNStatusRequest({ params }) {
  try {
    // const response = yield call(sendRTSOrderBank, params)
    yield put(sendDNStatusRequestSuccess())
  } catch (error) {
    yield put(sendDNStatusRequestFail(error))
  }
}

function* onGetOrderBankAuditLog() {
  try {
    const response = yield call(getOrderBankAuditLog)
    yield put(getOrderBankAuditLogSuccess(response))
  } catch (error) {
    yield put(getOrderBankAuditLogFail(error))
  }
}

function* onGetClearScheduling(params) {
  try {
    const response = yield call(getClearScheduling, params)
    yield put(getClearSchedulingSuccess(response))
  } catch (error) {
    yield put(getClearSchedulingFail(error))
  }
}

function* onGetSendBulkShipment(params) {
  try {
    const response = yield call(getSendBulkShipment, params)
    yield put(getSendBulkShipmentSuccess(response))
  } catch (error) {
    yield put(getSendBulkShipmentFail(error))
  }
}

function* onGetRunAutoScheduling(params) {
  try {
    const response = yield call(getRunAutoScheduling, params)
    yield put(getRunAutoSchedulingSuccess(response))
  } catch (error) {
    yield put(getRunAutoSchedulingFail(error))
  }
}

function* onGetDeleteMultipleOrder(params) {
  try {
    let newResponse = {}
    const response = yield call(getdeleteMultipleOrder, params)
    if (response) {
      newResponse = {
        ...response,
        order_banks: params?.params?.order_banks,
      }
    }
    yield put(getdeleteMultipleOrderSuccess(newResponse))
  } catch (error) {
    yield put(getdeleteMultipleOrderFail(error))
  }
}

function* onGetCrossTerminal(params) {
  try {
    const response = yield call(getCrossTerminal, params)
    yield put(getCrossTerminalSuccess(response))
  } catch (error) {
    yield put(getCrossTerminalFail(error))
  }
}

function* sendRequestPaymentInGanttChart({ params = {} }) {
  try {
    // send request
    yield put(processPaymentInGanttChartSuccess(params))
  } catch (error) {
    yield put(processPaymentInGanttChartFail(error))
  }
}

function* sendRequestCancelPaymentInGanttChart({ params = {} }) {
  try {
    // send request
    yield put(cancelPaymentInGanttChartSuccess(params))
  } catch (error) {
    yield put(cancelPaymentInGanttChartFail(error))
  }
}

function* sendRequestOrderPaymentInGanttChart({ params = {} }) {
  try {
    // send request

    yield put(sendOrderInGanttChartSuccess())
  } catch (error) {
    yield put(sendOrderInGanttChartFail(error))
  }
}

function* onGetRTSOrderBankGanttChart({ params = {} }) {
  try {
    const response = yield call(getRTSOderBankGanttChart, params)
    let newResponse = {}
    // when user increase page params -> scrolling action
    if (params?.page !== 0) {
      newResponse = { ...response, scrolling: true, page: params.page }
    } else {
      newResponse = { ...response, scrolling: false, page: params.page }
    }
    yield put(getRTSOderBankGanttChartSuccess(newResponse))
  } catch (error) {
    yield put(getRTSOderBankGanttChartFail(error))
  }
}

function* onDragOrderBankToGanttChart({ shift_date }) {
  const dragOrder = yield select(store =>
    store.orderBank?.orderBankTableData?.filter(e => e.isChecked)
  )
  const selectedVehicle = yield select(store => store?.orderBank?.selectedVehicleShipment)
  try {
    if (dragOrder && dragOrder.length > 0) {
      yield call(sendOderToVehicle, {
        vehicle: selectedVehicle.vehicle,
        order_banks: dragOrder.map(e => e.id),
        shift_date: shift_date,
      })
      yield put(dragOrderBankToGanttChartSuccess(dragOrder))
    }
  } catch (error) {
    yield put(dragOrderBankToGanttChartFail(dragOrder))
  }
}

function* onRemoveOrderFromShipment(payload) {
  try {
    const response = yield call(removeOrder, payload.params)
    yield put(removeOrderFromShipmentSuccess(payload.params))
  } catch (error) {
    yield put(removeOrderFromShipmentFail(payload.params))
  }
}

function* onRemoveShipmentFromEvent(payload) {
  // call api to remove shipment here

  // call success case
  yield put(removeShipmentFromEventSuccess(payload.params))
}

function* onRemoveEvent(payload) {
  // call api to remove shipment here

  // call success case
  yield put(removeEventSuccess(payload.params))
}

function* onUpdateEvent(payload) {
  // call api to remove shipment here

  // call success case
  yield put(updateOBEventSuccess(payload.params))
}

function* onGetGanttEventValidation(payload) {
  // call api to remove shipment here
  try {
    const response = yield call(validateGanttEventChange, payload.params)
    yield put(getGanttEventValidationSuccess(response.data))
  } catch (error) {
    yield put(getGanttEventValidationFail(error))
  }
}

function* onGetOBRTDetails(payload) {
  try {
    const response = yield call(getRTSOrderbankRTdetails, payload.params)
    yield put(getOBRTDetailsSuccess(response.data))
  } catch (error) {
    yield put(getOBRTDetailsFail(error.response))
  }
}

function* onUpdateOBRTDetails(payload) {
  try {
    const response = yield call(updateRTSOrderbankRTdetails, payload.params)
    yield put(updateOBRTDetailsSuccess(response))
  } catch (error) {
    yield put(updateOBRTDetailsFail(error.response))
  }
}

function* onGetShipmentDetails(payload) {
  try {
    const response = yield call(getShipmentDetail, payload.params)
    yield put(getShipmentDetailSuccess(response.data))
  } catch (error) {
    yield put(getShipmentDetailFail(error))
  }
}

function* onGetShipmentDetailsOnVehicle(payload) {
  try {
    const response = yield call(getShipmentDetailsOnVehicle, payload.params)
    yield put(getShipmentDetailsOnVehicleSuccess(response.data))
  } catch (error) {
    yield put(getShipmentDetailsOnVehicleFail(error))
  }
}

function* onDragAndDropShipmentArea(payload) {
  try {
    yield put(onDragAndDropShipmentAreaSuccess(payload?.params))
  } catch (error) {
    yield put(onDragAndDropShipmentAreaFail(error))
  }
}

function* onDragOrderToShipment() {
  const dragOrder = yield select(store =>
    store.orderBank?.orderBankTableData?.filter(e => e.isChecked)
  )
  try {
    if (dragOrder && dragOrder.length > 0) {
      yield put(onDragOrderToShipmentSuccess(dragOrder))
    }
  } catch (error) {
    yield put(onDragOrderToShipmentFail(error))
  }
}

function* onRunningAutoSchedule({ params }) {
  try {
    const response = yield call(runAutoSchedule, params)
    yield put(runAutoScheduleSuccess(response))
  } catch (error) {
    yield put(runAutoScheduleFail(error))
  }
}

function* orderBankSaga() {
  yield takeLatest(GET_ORDERBANK, onGetOrderbank)
  yield takeLatest(ADD_ORDERBANK, onAddOrderbank)
  yield takeLatest(EDIT_ORDERBANK, onEditOrderBankDetail)
  yield takeLatest(GET_RTS_ORDER_BANK_TABLE_DATA, onGetRTSOrderBank)
  yield takeLatest(GET_SHIPMENT_ORDER_BANK_TABLE_DATA, onGetShipmentOrderBankData)
  yield takeLatest(GET_ORDERBANK_TABLE_INFORMATION, onGetOrderbankTableInformation)
  yield takeLatest(DELETE_ORDERBANK_DETAIL, onDeleteOrderbankTableInformation)
  yield takeLatest(VIEW_ORDERBANK_DETAIL, onViewOrderbankTableInformation)
  yield takeLatest(REFRESH_ORDER_BANK_DN, onRefreshOrderBankDN)
  yield takeLatest(SEND_ORDER_BANK_DN, onSendOrderBankDN)
  yield takeLatest(SEND_DN_STATUS_REQUEST, onSendDNStatusRequest)
  yield takeLatest(GET_ORDER_BANK_AUDITLOG, onGetOrderBankAuditLog)
  yield takeLatest(GET_CLEAR_SCHEDULING, onGetClearScheduling)
  yield takeLatest(GET_SEND_BULK_SHIPMENT, onGetSendBulkShipment)
  yield takeLatest(GET_RUN_AUTO_SCHEDULING, onGetRunAutoScheduling)
  yield takeLatest(GET_DELETE_MULTIPLE_ORDER, onGetDeleteMultipleOrder)
  yield takeLatest(GET_CROSS_TERMINAL, onGetCrossTerminal)
  yield takeLatest(PROCESS_PAYMENT_IN_GANTT_CHART, sendRequestPaymentInGanttChart)
  yield takeLatest(CANCEL_PAYMENT_IN_GANTT_CHART, sendRequestCancelPaymentInGanttChart)
  yield takeLatest(SEND_ORDER_IN_GANTT_CHART, sendRequestOrderPaymentInGanttChart)
  yield takeLatest(GET_RTS_GANTT_CHART_DATA, onGetRTSOrderBankGanttChart)
  yield takeLatest(DRAG_RTS_ORDER_BANK_TO_GANTT_CHART, onDragOrderBankToGanttChart)
  yield takeLatest(REMOVE_ORDER_FROM_SHIPMENT, onRemoveOrderFromShipment)
  yield takeLatest(REMOVE_SHIPMENT_FROM_EVENT, onRemoveShipmentFromEvent)
  yield takeLatest(REMOVE_EVENT, onRemoveEvent)
  yield takeLatest(UPDATE_OB_EVENT, onUpdateEvent)
  yield takeLatest(GET_GANTT_EVENT_VALIDATION, onGetGanttEventValidation)
  yield takeLatest(GET_OB_RT_DETAILS, onGetOBRTDetails)
  yield takeLatest(UPDATE_OB_RT_DETAILS, onUpdateOBRTDetails)
  yield takeLatest(GET_SHIPMENT_DETAIL, onGetShipmentDetails)
  yield takeLatest(DRAG_AND_DROP_SHIPMENT_AREA, onDragAndDropShipmentArea),
    yield takeLatest(GET_SHIPMENT_DETAILS_ON_VEHICLE, onGetShipmentDetailsOnVehicle),
    yield takeLatest(DRAG_ORDER_TO_SHIPMENT, onDragOrderToShipment)
  yield takeLatest(RUN_AUTO_SCHEDULE, onRunningAutoSchedule)
  yield takeLatest(GET_OB_TOTAL_UNSCHEDULE, onGetTotalOBUnschedule)
}

export default orderBankSaga
