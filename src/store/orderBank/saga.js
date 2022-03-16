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
  SEND_MULTIPLE_ORDER_BANK_DN,
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
  // UPDATE_OB_EVENT,
  GET_OB_RT_DETAILS,
  UPDATE_OB_RT_DETAILS,
  GET_SHIPMENT_DETAIL,
  DRAG_AND_DROP_SHIPMENT_AREA,
  // GET_GANTT_EVENT_VALIDATION,
  GET_SHIPMENT_DETAILS_ON_VEHICLE,
  DRAG_ORDER_TO_SHIPMENT,
  RUN_AUTO_SCHEDULE,
  GET_OB_TOTAL_UNSCHEDULE,
  UPDATE_SHIPMENT,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_CONFIRM_RESTRICTIONS,
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
  sendMultipleOrderBankDNFail,
  sendMultipleOrderBankDNSuccess,
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
  // updateOBEventSuccess,
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
  // getGanttEventValidationSuccess,
  // getGanttEventValidationFail,
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
  updateShipmentSuccess,
  updateShipmentFail,
  // dragOrderBankToGanttChartRestricted,
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
  // validateGanttEventChange,
  getShipmentDetailsOnVehicle,
  runAutoSchedule,
  getTotalUnscheduleOrder,
  removeOrder,
  updateOrdersPositionInShipment,
  putShipment,
  createShipment,
  cancelShipment,
  confirmSendOrderToVehicle,
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

function* onSendMultipleOrderBankDN({ params = {} }) {
  try {
    const response = yield call(sendRTSOrderBank, params)
    yield put(sendMultipleOrderBankDNSuccess(response))
  } catch (error) {
    yield put(sendMultipleOrderBankDNFail(error))
  }
}

function* onSendDNStatusRequest({ params }) {
  try {
    const response = yield call(sendRTSOrderBank, params)
    yield put(sendDNStatusRequestSuccess(response))
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

function* sendRequestPaymentInGanttChart({ payload }) {
  // <payload> is Event data, consult factory.js
  try {
    // HACK: US 258072 - GanttChart Create-Shipment
    const response = yield call(createShipment, { id: payload.id })
    // const response = { data: { id: payload.id, scheduled_status: 'BlockedDN' } }
    yield put(processPaymentInGanttChartSuccess(response.data))
  } catch (error) {
    yield put(processPaymentInGanttChartFail(error))
  }
}

function* sendRequestCancelPaymentInGanttChart({ payload }) {
  // <payload> is Event data, consult factory.js
  try {
    // HACK: US 258067 - GanttChart Cancel-Shipment
    const response = yield call(cancelShipment, { id: payload.id })
    // const response = { data: { id: 632, scheduled_status: 'PendingShipment' } }
    yield put(cancelPaymentInGanttChartSuccess(response.data))
  } catch (error) {
    yield put(cancelPaymentInGanttChartFail(error))
  }
}

function* sendRequestOrderPaymentInGanttChart({ params }) {
  // <params> is Event data, consult factory.js
  try {
    const ids = [params.id]

    const response = yield call(sendRTSOrderBank, ids)
    yield put(sendOrderInGanttChartSuccess(response.data))
  } catch (error) {
    yield put(sendOrderInGanttChartFail(error))
  }
}

function* onGetRTSOrderBankGanttChart({ params }) {
  try {
    const response = yield call(getRTSOderBankGanttChart, params)
    const payload = {
      ...response,
      page: params.page,
      shiftDate: params.filter.shift_date.date_from,
    }
    // console.log(params)
    // page > 0 means user is scrolling
    payload.scrolling = params.page > 0
    yield put(getRTSOderBankGanttChartSuccess(payload))
  } catch (error) {
    console.error(error)
    yield put(getRTSOderBankGanttChartFail(error))
  }
}

// GANTTCHART Drag&Drop
function* onDragOrderBankToGanttChart({ shift_date, vehicle, order_banks }) {
  try {
    if (!order_banks) {
      const dragOrder = order_banks
        ? order_banks
        : yield select(store =>
            store.orderBank?.orderBankTableData?.filter(e => e.isChecked)
          )
      order_banks = dragOrder.map(e => e.id) // <--- map to order indexes for production
      // order_banks = dragOrder // <--- FULL ORDER BANK RECORD for testing
    }

    if (!vehicle) {
      const selectedVehicle = yield select(
        store => store.orderBank.selectedVehicleShipment
      )
      vehicle = selectedVehicle.resourceId
    }

    if (order_banks && order_banks.length > 0) {
      const response = yield call(sendOderToVehicle, {
        vehicle: vehicle,
        order_banks: order_banks,
        shift_date: shift_date,
      })

      // server will return order_banks with full orderBank, not just my {id}
      // const response = {
      //   data: {
      //     soft_constraints: ['soft constraint detected'],
      //     // hard_constraints: ['hard constraint detected'],
      //     data: order_banks,
      //   },
      // }

      const payload = {
        orders: order_banks,
        vehicle,
      }

      if (
        response.data.hard_constraints &&
        response.data.hard_constraints.length
      ) {
        payload.constraints = response.data.hard_constraints
        payload.requiresConfirmation = false
      } else if (
        response.data.soft_constraints &&
        response.data.soft_constraints.length
      ) {
        payload.constraints = response.data.soft_constraints
        payload.requiresConfirmation = true
      }
      yield put(dragOrderBankToGanttChartSuccess(payload))
    }
  } catch (error) {
    console.error(error)
    yield put(dragOrderBankToGanttChartFail(order_banks))
  }
}

// function* onDragOrderBankToGanttChartConfirm({ proceed, orderIndexes }) {
function* onDragOrderBankToGanttChartConfirm(params) {
  const { payload } = params
  const {
    proceed = false,
    orderIndexes = [],
    justClearConstraints = false,
  } = payload
  const vehicle = yield select(
    store => store?.orderBank?.selectedVehicleShipment
  )
  try {
    if (proceed) {
      const response = yield call(
        confirmSendOrderToVehicle({
          actionType: 'Proceed',
          order_banks: [...orderIndexes],
          vehicle: vehicle.resourceId,
        })
      )
      // const response = {
      //   data: {
      //     orders: orderIndexes,
      //     vehicle: vehicle.resourceId,
      //   },
      // }
      yield put(dragOrderBankToGanttChartSuccess(response.data))
    } else {
      if (!justClearConstraints) {
        yield call(
          confirmSendOrderToVehicle({
            order_banks: [...orderIndexes],
            actionType: 'Cancel',
            vehicle: vehicle.resourceId,
          })
        )
      }
    }
  } catch (error) {
    console.error(error)
    yield put(dragOrderBankToGanttChartFail())
  }
}

function* onRemoveOrderFromShipment(payload) {
  try {
    yield call(removeOrder, payload.params)
    yield put(removeOrderFromShipmentSuccess(payload.params))
  } catch (error) {
    yield put(removeOrderFromShipmentFail(payload.params))
  }
}

function* onRemoveShipmentFromEvent({ params }) {
  try {
    // @params = { shipmentId, eventId }
    yield put(removeShipmentFromEventSuccess(params))
  } catch (error) {}
}

function* onRemoveEvent(payload) {
  try {
    yield put(removeEventSuccess(payload.params))
  } catch (error) {}
}

// function* onUpdateEvent(payload) {
//   try {
//     yield put(updateOBEventSuccess(payload.params))
//   } catch (error) {}
// }

// function* onGetGanttEventValidation(payload) {
//   try {
//     const response = yield call(validateGanttEventChange, payload.params)
//     yield put(getGanttEventValidationSuccess(response.data))
//   } catch (error) {
//     yield put(getGanttEventValidationFail(error))
//   }
// }

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

function* onDragAndDropShipmentArea({ params }) {
  try {
    const { data, shipmentId } = params
    const sendThis = {
      shipmentId,
      orderIds: data[shipmentId].orders.map(o => o.id),
    }
    yield call(updateOrdersPositionInShipment, sendThis)
    yield put(onDragAndDropShipmentAreaSuccess(data))
  } catch (error) {
    yield put(onDragAndDropShipmentAreaFail(error))
  }
}

function* onDragOrderToShipment() {
  try {
    const dragOrder = yield select(store =>
      store.orderBank?.orderBankTableData?.filter(e => e.isChecked)
    )
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

function* onUpdateShipment({ params }) {
  try {
    yield call(putShipment, params)
    // console.log(response)
    // <params> is { id: number, data: {...order_bank}}
    yield put(updateShipmentSuccess(params))
  } catch (error) {
    yield put(updateShipmentFail(error))
  }
}

function* orderBankSaga() {
  yield takeLatest(GET_ORDERBANK, onGetOrderbank)
  yield takeLatest(ADD_ORDERBANK, onAddOrderbank)
  yield takeLatest(EDIT_ORDERBANK, onEditOrderBankDetail)
  yield takeLatest(GET_RTS_ORDER_BANK_TABLE_DATA, onGetRTSOrderBank)
  yield takeLatest(
    GET_SHIPMENT_ORDER_BANK_TABLE_DATA,
    onGetShipmentOrderBankData
  )
  yield takeLatest(
    GET_ORDERBANK_TABLE_INFORMATION,
    onGetOrderbankTableInformation
  )
  yield takeLatest(DELETE_ORDERBANK_DETAIL, onDeleteOrderbankTableInformation)
  yield takeLatest(VIEW_ORDERBANK_DETAIL, onViewOrderbankTableInformation)
  yield takeLatest(REFRESH_ORDER_BANK_DN, onRefreshOrderBankDN)
  yield takeLatest(SEND_ORDER_BANK_DN, onSendOrderBankDN)
  yield takeLatest(SEND_MULTIPLE_ORDER_BANK_DN, onSendMultipleOrderBankDN)
  yield takeLatest(SEND_DN_STATUS_REQUEST, onSendDNStatusRequest)
  yield takeLatest(GET_ORDER_BANK_AUDITLOG, onGetOrderBankAuditLog)
  yield takeLatest(GET_CLEAR_SCHEDULING, onGetClearScheduling)
  yield takeLatest(GET_SEND_BULK_SHIPMENT, onGetSendBulkShipment)
  yield takeLatest(GET_RUN_AUTO_SCHEDULING, onGetRunAutoScheduling)
  yield takeLatest(GET_DELETE_MULTIPLE_ORDER, onGetDeleteMultipleOrder)
  yield takeLatest(GET_CROSS_TERMINAL, onGetCrossTerminal)
  yield takeLatest(
    PROCESS_PAYMENT_IN_GANTT_CHART,
    sendRequestPaymentInGanttChart
  )
  yield takeLatest(
    CANCEL_PAYMENT_IN_GANTT_CHART,
    sendRequestCancelPaymentInGanttChart
  )
  yield takeLatest(
    SEND_ORDER_IN_GANTT_CHART,
    sendRequestOrderPaymentInGanttChart
  )
  yield takeLatest(GET_RTS_GANTT_CHART_DATA, onGetRTSOrderBankGanttChart)
  yield takeLatest(
    DRAG_RTS_ORDER_BANK_TO_GANTT_CHART,
    onDragOrderBankToGanttChart
  )
  yield takeLatest(
    DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_CONFIRM_RESTRICTIONS,
    onDragOrderBankToGanttChartConfirm
  )
  yield takeLatest(REMOVE_ORDER_FROM_SHIPMENT, onRemoveOrderFromShipment)
  yield takeLatest(REMOVE_SHIPMENT_FROM_EVENT, onRemoveShipmentFromEvent)
  yield takeLatest(REMOVE_EVENT, onRemoveEvent)
  // yield takeLatest(UPDATE_OB_EVENT, onUpdateEvent)
  // yield takeLatest(GET_GANTT_EVENT_VALIDATION, onGetGanttEventValidation)
  yield takeLatest(GET_OB_RT_DETAILS, onGetOBRTDetails)
  yield takeLatest(UPDATE_OB_RT_DETAILS, onUpdateOBRTDetails)
  yield takeLatest(GET_SHIPMENT_DETAIL, onGetShipmentDetails)
  yield takeLatest(DRAG_AND_DROP_SHIPMENT_AREA, onDragAndDropShipmentArea),
    yield takeLatest(
      GET_SHIPMENT_DETAILS_ON_VEHICLE,
      onGetShipmentDetailsOnVehicle
    ),
    yield takeLatest(DRAG_ORDER_TO_SHIPMENT, onDragOrderToShipment)
  yield takeLatest(RUN_AUTO_SCHEDULE, onRunningAutoSchedule)
  yield takeLatest(GET_OB_TOTAL_UNSCHEDULE, onGetTotalOBUnschedule)
  yield takeLatest(UPDATE_SHIPMENT, onUpdateShipment)
}

export default orderBankSaga
