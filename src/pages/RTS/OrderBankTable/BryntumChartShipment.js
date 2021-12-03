import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { Col, Row } from "reactstrap"
import { createPopper } from "@popperjs/core"
import { ganttChartTableMapping } from "./tableMapping"
import "./index.scss"
import { BryntumGrid } from "@bryntum/schedulerpro-react"
import "@bryntum/schedulerpro/schedulerpro.classic-dark.css"
import "@bryntum/schedulerpro/schedulerpro.classic-light.css"
import "@bryntum/schedulerpro/schedulerpro.classic.css"
import "@bryntum/schedulerpro/schedulerpro.material.css"
import "@bryntum/schedulerpro/schedulerpro.stockholm.css"
import "../style.scss"
import ConfirmDNStatusModal from "./confirmDNStatusModal"
import TerminalRelayModal from "./TerminalRelayModal"
import {
  cancelPaymentInGanttChart,
  deselectVehicleShipment,
  getRTSOderBankGanttChart,
  getShipmentOfOderBankGanttChart,
  processPaymentInGanttChart,
  selectVehicleShipment,
  sendOrderInGanttChart,
} from "../../../store/actions"
import { cloneDeep } from "lodash"
import { Droppable } from "react-beautiful-dnd"
import OrderBankShipmentModal from "./OrderBankShipmentModal"
import PlannedLoadTimesModal from "./PlannedLoadTimesModal"
import BryntumDragDropAreaShipment from "./BryntumDragDropAreaShipment/BryntumDragDropAreaShipment"
import ChartColumnFilter from "./ChartColumnFilter"
import ShiftPopover from "./ShiftPopover"

const EventContextList = {
  SHIPMENT: "shipment",
  CANCEL_SHIPMENT: "cancel_shipment",
  SEND_ORDER: "send_order",
  TERMINAL_RELAY: "terminal_relay",
  PLAN_LOAD_TIMES: "planned_load_time",
}

export const bryntumSchedulerTableNameForCookie =
  "rts-gantt-chart-bryntum-scheduler"

function BryntumChartTable(props) {
  const { bryntumCurrentColumns, onSelectVehicle, onDeselectVehicle } = props
  const tableData = useRef([])
  const setTableData = newData => {
    tableData.current = newData
  }
  const colsRef = useRef(bryntumCurrentColumns)
  const [modal, setModal] = useState(false)
  const [dropdownSelectedItem, setDropdownSelectedItem] = useState(null)
  const [filterCondition, setFilterCondition] = useState([])
  const [eventsData, setEventsData] = useState([])
  const [shipmentDblclick, setShipmentDblclick] = useState(false)
  const schedulerProRef = useRef()
  const firstRender = useRef(true)
  const [filterList, setFilterList] = useState([])

  useEffect(() => {
    const { getRTSOderBankGanttChart } = props
    getRTSOderBankGanttChart()
  }, [])
  useEffect(() => {
    setFilterList(
      Object.keys(bryntumCurrentColumns).map(e => ({
        key: e,
        type: ganttChartTableMapping[e].type,
      }))
    )
  }, [bryntumCurrentColumns])

  const toggle = () => setModal(!modal)

  const removeShipmentHandler = () => {
    const { instance: scheduler } = schedulerProRef.current
    const newEventsData = eventsData.filter(
      v => v.id !== dropdownSelectedItem.itemSelectedId
    )
    scheduler.eventStore.remove(dropdownSelectedItem.record)
    scheduler.eventStore.data = newEventsData
    setEventsData(newEventsData)
  }

  const changeColorOfEventHandler = (
    color,
    isPending = false,
    eventType = undefined
  ) => {
    const newData = cloneDeep(eventsData)
    let itemSelected = newData.filter(
      v => v.id == dropdownSelectedItem.itemSelectedId
    )
    itemSelected[0].eventColor = color
    itemSelected[0].isPending = isPending
    if (eventType) {
      itemSelected[0].eventType = eventType
    }
    setEventsData(newData)
  }

  const sendRequestsHandler = () => {
    switch (dropdownSelectedItem.type) {
      case EventContextList.SHIPMENT: {
        changeColorOfEventHandler("#9F79B7", true)
        setTimeout(() => {
          props.processPaymentInGanttChart(null)
        }, 2000)
        break
      }
      case EventContextList.CANCEL_SHIPMENT: {
        changeColorOfEventHandler("#aeaeae", true)
        setTimeout(() => {
          props.processCancelPaymentInGanttChart(dropdownSelectedItem)
          // removeShipmentHandler();
        }, 2000)
        break
      }
      case EventContextList.SEND_ORDER: {
        props.processSendOrderInGanttChart(null)
        break
      }
      default:
        break
    }
    toggle()
  }

  const updateResourceRecords = (updateData, preventClear = false) => {
    const scheduler = schedulerProRef.current?.instance
    if (scheduler) {
      if (preventClear) {
        scheduler.data = updateData
      } else {
        updateData.forEach(e => {
          scheduler?.store?.add(e)
        })
      }
      setTableData(updateData)
    }
  }

  const schedulerproConfig = {
    columns: [],
    autoHeight: true,
    fullLastRow: false,
    autoLoad: true,
    columnLine: true,
    autoSync: true,
    autoCommit: true,
    rowHeight: 35,
    barMargin: 0,
    resourceMargin: 0,
    listeners: {
      cellClick: function (grid) {
        // click row to select Vehicle shipment
        const { record } = grid
        if (record?.data?.vehicle && record?.data?.id) {
          const { id: resourceId, vehicle } = record.data
          onSelectVehicle({ resourceId, vehicle })
        }
      },
    },
  }

  function toggleShipment() {
    setShipmentDblclick(!shipmentDblclick)
  }

  function onShiftDateChange(recordId, value) {
    const currentTableData = tableData.current
    const recordIndex = currentTableData.findIndex(e => e.id === recordId)
    if (recordIndex >= 0) {
      currentTableData[recordIndex] = {
        ...currentTableData[recordIndex],
        shift: value,
      }
    }
    updateResourceRecords([...currentTableData], true)
  }

  function onStatusChange(recordId, value) {
    const currentTableData = tableData.current
    const recordIndex = currentTableData.findIndex(e => e.id === recordId)
    if (recordIndex >= 0) {
      currentTableData[recordIndex] = {
        ...currentTableData[recordIndex],
        status: value,
      }
    }
    updateResourceRecords([...currentTableData], true)
  }

  function generateColumnsObj(tableMap) {
    return {
      text:
        ganttChartTableMapping?.[tableMap]?.label_short ??
        ganttChartTableMapping?.[tableMap]?.label,
      field: tableMap,
      width: "100px",
      editor: null,
      renderer: ({ value, column, record }) => {
        switch (column.field) {
          case "vehicle": {
            return (
              <div className="chart-vehicle-cell">
                <div className="value">{value}</div>
                {record.pto && <div className="suffix">{record.pto}</div>}
              </div>
            )
          }
          // case "shift": {
          //   return (
          //     <div className="chart-shift-cell">
          //       <ShiftPopover record={record} onChange={onShiftDateChange} type="shift" list="shift_list"/>
          //     </div>
          //   )
          // }
          case "status": {
            return (
              <div className="chart-status-cell">
                <ShiftPopover
                  record={record}
                  onChange={onStatusChange}
                  type="status"
                />
              </div>
            )
          }
        }
        return <div>{value}</div>
      },
      headerRenderer: ({ column }) => {
        return `
                <div class="d-flex align-items-center chart-header" id="chart-column-${column.data.field}">
                  <div>${column.data.text}</div>
                  <button id="chart-column-${column.data.field}-button">
                    <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="AWSM-Calendar" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="TF-Icon---Dropdown" transform="translate(1.000000, 3.000000)" fill="currentColor">
                                <polygon id="Dropdown-Icon-Copy-2" points="6 6 11 11 16 6"></polygon>
                            </g>
                        </g>
                    </svg>
                  </button>
                </div>`
      },
    }
  }

  for (const tableMap of Object.keys(colsRef.current)) {
    schedulerproConfig.columns.push(generateColumnsObj(tableMap))
  }
  useEffect(() => {
    if (props.isSendRequestProcess && dropdownSelectedItem?.itemSelectedId) {
      if (dropdownSelectedItem.type === EventContextList.CANCEL_SHIPMENT) {
        removeShipmentHandler()
      } else {
        changeColorOfEventHandler("#615E9B")
      }
    }
  }, [props.isSendRequestProcess])

  useEffect(() => {
    if (bryntumCurrentColumns) {
      Object.keys(bryntumCurrentColumns).forEach(e => {
        const el = document.getElementById(`chart-column-${e}-button`)
        if (el) {
          el.addEventListener("click", event => {
            event.stopPropagation()
            event.preventDefault()
            const tooltip = document.getElementById(`chart-tooltip-${e}`)
            createPopper(el, tooltip, {
              placement: "bottom",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 20],
                  },
                },
              ],
            })
            tooltip.classList.toggle("hide")
            Object.keys(bryntumCurrentColumns).forEach(f => {
              if (f !== e) {
                const hideEl = document.getElementById(`chart-tooltip-${f}`)
                hideEl.classList.add("hide")
              }
            })
          })
        }
      })
    }
    firstRender.current = false
  }, [bryntumCurrentColumns])

  const hideFilterElement = dataKey => {
    const hideEl = document.getElementById(`chart-tooltip-${dataKey}`)
    if (hideEl) {
      hideEl.classList.add("hide")
    }
  }

  const onApplyFilter = (data, dataKey) => {
    const index = filterCondition.findIndex(e => e.key === dataKey)
    const newFilterCondition = [...filterCondition]
    if (index >= 0) {
      newFilterCondition[index] = { ...newFilterCondition[index], data: data }
    } else {
      newFilterCondition.push({ data, key: dataKey })
    }
    setFilterCondition(newFilterCondition)
    hideFilterElement(dataKey)
  }

  const onResetFilter = dataKey => {
    const index = filterCondition.findIndex(e => e.key === dataKey)
    if (index >= 0) {
      const newFilterCondition = [...filterCondition]
      newFilterCondition.splice(index, 1)
      setFilterCondition(newFilterCondition)
    }
    hideFilterElement(dataKey)
  }

  useEffect(() => {
    const newTableData = props.ganttChartData.table.filter(e => {
      return filterCondition.every(condition => {
        return condition.data.includes(e[condition.key])
      })
    })
    updateResourceRecords(newTableData)
  }, [filterCondition, props.currentTab])

  return (
    <div className="rts-table-container scroll" id="scrollableDiv">
      <div
        className="container-orderbank gant-chart-table"
        style={{ maxWidth: "100%" }}
      >
        <Row className="w-100" style={{ height: "100%" }}>
          <Col lg={12} className="pr-0">
            <Droppable key="shipment-chart" droppableId="shipment-chart">
              {(provided, snapshot) => {
                return (
                  <div
                    className="rts-gantt-chart border-0"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {snapshot.isDraggingOver && <div className="on-dragging" />}
                    <div className="w-100 d-flex justify-content-between">
                      <div className="rounded wrapper-bryntum-shipment-grid border-bryntum-table">
                        <BryntumGrid
                          {...schedulerproConfig}
                          autoSync
                          resources={props.ganttChartData.table}
                          syncDataOnLoad
                          ref={schedulerProRef}
                        />
                      </div>
                      <BryntumDragDropAreaShipment />
                    </div>
                  </div>
                )
              }}
            </Droppable>
          </Col>
        </Row>
        {filterList.map(e => {
          return (
            <ChartColumnFilter
              key={e.key}
              filterKey={e.key}
              filterData={props.ganttChartData.table}
              type={e.type}
              onApply={onApplyFilter}
              onReset={onResetFilter}
            />
          )
        })}
      </div>
      {(dropdownSelectedItem?.type === EventContextList.SHIPMENT ||
        dropdownSelectedItem?.type === EventContextList.CANCEL_SHIPMENT ||
        dropdownSelectedItem?.type === EventContextList.SEND_ORDER) && (
        <ConfirmDNStatusModal
          isOpen={modal}
          onSend={sendRequestsHandler}
          onCancel={toggle}
          headerContent={dropdownSelectedItem?.header || ""}
          bodyContent={`Are you sure you want to ${
            dropdownSelectedItem?.body || ""
          }`}
          styleColor={dropdownSelectedItem?.styleColor}
        />
      )}
      {dropdownSelectedItem?.type === EventContextList.TERMINAL_RELAY && (
        <TerminalRelayModal
          isOpen={modal}
          onSend={sendRequestsHandler}
          onCancel={toggle}
        />
      )}
      {dropdownSelectedItem?.type === EventContextList.PLAN_LOAD_TIMES && (
        <PlannedLoadTimesModal
          isOpen={modal}
          onSend={sendRequestsHandler}
          onCancel={toggle}
        />
      )}
      {shipmentDblclick && (
        <OrderBankShipmentModal
          open={shipmentDblclick}
          istoggle={toggleShipment}
        />
      )}
    </div>
  )
}

const mapStateToProps = ({ orderBank }) => {
  return {
    isSendRequestProcess: orderBank.isSendRequestProcess,
    ganttChartData: orderBank.ganttChart,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    processPaymentInGanttChart: params =>
      dispatch(processPaymentInGanttChart(params)),
    processCancelPaymentInGanttChart: params =>
      dispatch(cancelPaymentInGanttChart(params)),
    processSendOrderInGanttChart: params =>
      dispatch(sendOrderInGanttChart(params)),
    getRTSOderBankGanttChart: params =>
      dispatch(getRTSOderBankGanttChart(params)),
    getShipmentOfOderBankGanttChart: params =>
      dispatch(getShipmentOfOderBankGanttChart(params)),
    onSelectVehicle: params => dispatch(selectVehicleShipment(params)),
    onDeselectVehicle: () => dispatch(deselectVehicleShipment()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BryntumChartTable)
