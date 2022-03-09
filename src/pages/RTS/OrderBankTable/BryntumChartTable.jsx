import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { createPopper } from '@popperjs/core'
import moment from 'moment'
import { Droppable } from 'react-beautiful-dnd'
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { ganttChartTableMapping } from './tableMapping'

import BryntumPopup from './BryntumPopup'
import RedAlertIcon from 'assets/images/AWSM-Red-Alert.svg'
import YellowAlertIcon from 'assets/images/AWSM-Soft-Overrule.svg'
import ConfirmDNStatusModal from './confirmDNStatusModal'
import TerminalRelayModal from './TerminalRelayModal'
import {
  processPaymentInGanttChart,
  cancelPaymentInGanttChart,
  sendOrderInGanttChart,
  getShipmentOfOderBankGanttChart,
  removeEvent,
  // updateOBEvent,
  // getGanttEventValidation,
  selectVehicleShipment,
  // dragOrderBankToGanttChart,
  updateShipment,
} from 'store/actions'
import ChartColumnFilter from './ChartColumnFilter'
import OrderBankShipmentModal from './OrderBankShipmentModal'
import OrderBankSapAlertModal from './OrderBankSapAlertModal'
import OrderBankRoadTankerModal from './OrderBankRoadTankerModal'
import PlannedLoadTimesModal from './PlannedLoadTimesModal'
import AlertOverruleModal from './AlertOverruleModal'
import { DATE_TIME_FORMAT, TIME_FORMAT_SHORT } from 'store/orderBank/factory'

import './BryntumChartTable.scss'

const EventSchedulerStatus = {
  ARE_YET_CREATED_PAYMENT: 'not yet to be created',
  CREATED_PAYMENT: 'created',
  CANCELLATION: 'Cancellation',
}
const EventContextList = {
  SHIPMENT: 'shipment',
  CANCEL_SHIPMENT: 'cancel_shipment',
  SEND_ORDER: 'send_order',
  TERMINAL_RELAY: 'terminal_relay',
  PLAN_LOAD_TIMES: 'planned_load_time',
  DELETE_SHIPMENT: 'delete_shipment',
  UPDATE_SHIPMENT: 'update_shipment',
  UNDO_LAST_UPDATE: 'undo_last_update',
}

export const bryntumSchedulerTableNameForCookie =
  'rts-gantt-chart-bryntum-scheduler'

function BryntumChartTable(props) {
  const {
    bryntumCurrentColumns,
    onSelectVehicle,
    onFilterChange,
    dateConfig,
    terminal,
    ganttChartState,
    handleResetAll,
  } = props
  const tableData = useRef([])
  const chartRef = useRef()
  const colsRef = useRef(bryntumCurrentColumns)
  const [modal, setModal] = useState(false)
  const [dropdownSelectedItem, setDropdownSelectedItem] = useState(null)
  const [shipmentDblclick, setShipmentDblclick] = useState(false)
  const [roadTankerModalShow, setRoadTankerModal] = useState(false)
  const [selectedVehicleID, setSelectedVehicleID] = useState(null)
  const firstRender = useRef(true)
  const [filterList, setFilterList] = useState([])
  const [popupShown, showPopup] = useState(false)
  const [eventRecord, setEventRecord] = useState(null)
  const [eventStore, setEventStore] = useState(null)
  const [resourceStore, setResourceStore] = useState(null)

  const [bryntumTable, setBryntumTable] = useState({
    page: 0,
    filterCondition: [],
    sortDirection: 'asc',
    sortField: 'vehicle',
  })

  useEffect(() => onFilterChange(bryntumTable), [bryntumTable])

  useEffect(
    () => setBryntumTable({ ...bryntumTable, page: 0 , filterCondition: []}),
    [dateConfig, terminal]
  )

  useEffect(() => {
    const { instance } = chartRef.current
    instance.store.listeners = {
      sort(e) {
        const { ascending, field } = e.sorters[0]
        const opt = {
          sortDirection: ascending ? 'asc' : 'desc',
          sortField: field,
        }

        setBryntumTable(state => {
          // no changes? do not trigger sorting ;)
          if (
            opt.sortField === state.sortField &&
            opt.sortDirection === state.sortDirection
          )
            return state

          return { ...state, ...opt, page: 0 }
        })
      },
    }

    const { eventStore, resourceStore } = instance
    setEventStore(eventStore)
    setResourceStore(resourceStore)
  }, [])

  const showEditor = useCallback(eventRecord => {
    if (typeof eventRecord._data.id !== 'number') return
    setEventRecord(eventRecord)
    showPopup(true)
  }, [])

  const hideEditor = useCallback(() => {
    // If isCreating is still true, user clicked cancel
    if (eventRecord.isCreating) {
      eventStore.remove(eventRecord)
      eventRecord.isCreating = false
    }
    setEventRecord(null)
    showPopup(false)
  }, [eventRecord, eventStore])

  const refreshGanttChartTable = () => {
    props.clearGanttData()

    setTimeout(() => {
      setBryntumTable({ ...bryntumTable })
    }, 1000)
  }

  // CONTROL GANTTCHART EVENTS
  useEffect(() => {
    const { instance: scheduler } = chartRef.current
    const { eventStore } = scheduler

    eventStore.data = ganttChartState.events
    scheduler.renderRows()
  }, [ganttChartState.events])

  useEffect(() => {
    setFilterList(
      Object.keys(bryntumCurrentColumns).map(e => ({
        key: e,
        type: ganttChartTableMapping[e]?.type,
      }))
    )
  }, [bryntumCurrentColumns])

  useEffect(() => {
    tableData.current = props.ganttChartTableData
  }, [props.ganttChartTableData])

  const toggle = () => setModal(!modal)

  const updateModalHandler = (type, eventRecord) => {
    const data = {}
    switch (type) {
      case EventContextList.SHIPMENT: {
        data.type = EventContextList.SHIPMENT
        data.header = 'Create Shipment'
        data.body = 'Proceed for Shipment Creation?'
        data.styleColor = 'success'
        // this is Event data, consult factory.js
        data.record = eventRecord.originalData
        break
      }
      case EventContextList.CANCEL_SHIPMENT: {
        data.type = EventContextList.CANCEL_SHIPMENT
        data.header = 'Cancel Shipment Confirmation'
        data.body = 'proceed with this shipment cancellation?'
        data.styleColor = 'danger'
        // this is Event data, consult factory.js
        data.record = eventRecord.originalData
        break
      }
      case EventContextList.SEND_ORDER: {
        data.type = EventContextList.SEND_ORDER
        data.header = 'Send Orders for DN'
        data.body = "Send this shipment's order for DN?"
        data.styleColor = 'success'
        data.record = eventRecord.originalData
        break
      }
      case EventContextList.TERMINAL_RELAY: {
        data.type = EventContextList.TERMINAL_RELAY
        break
      }
      case EventContextList.PLAN_LOAD_TIMES: {
        data.type = EventContextList.PLAN_LOAD_TIMES
        data.record = eventRecord.originalData
        break
      }
      case EventContextList.UPDATE_SHIPMENT: {
        data.type = EventContextList.UPDATE_SHIPMENT
        data.record = eventRecord
        break
      }
      case EventContextList.DELETE_SHIPMENT: {
        data.type = EventContextList.DELETE_SHIPMENT
        data.record = eventRecord
        break
      }
      default: {
        data.header = ''
        data.body = ''
        break
      }
    }
    data.itemSelectedId = eventRecord.data?.id
    if (
      data.type !== EventContextList.UPDATE_SHIPMENT &&
      data.type !== EventContextList.DELETE_SHIPMENT
    )
      toggle()
    setDropdownSelectedItem(data)
  }

  const sendRequestsHandler = val => {
    switch (dropdownSelectedItem.type) {
      case EventContextList.SHIPMENT: {
        props.processPaymentInGanttChart(dropdownSelectedItem.record)
        break
      }
      case EventContextList.CANCEL_SHIPMENT: {
        props.processCancelPaymentInGanttChart(dropdownSelectedItem.record)
        break
      }
      case EventContextList.SEND_ORDER: {
        props.processSendOrderInGanttChart(dropdownSelectedItem.record)
        break
      }
      case EventContextList.DELETE_SHIPMENT: {
        props.onRemoveEvent(dropdownSelectedItem?.itemSelectedId)
        // scheduler.eventStore.remove(dropdownSelectedItem.record)
        break
      }
      case EventContextList.UNDO_LAST_UPDATE: {
        break
      }
      case EventContextList.PLAN_LOAD_TIMES: {
        // $val format is HH:mm:ss
        const planned_load_time = dateConfig.date_from + 'T' + val
        props.updateShipment({
          id: dropdownSelectedItem.record.id,
          data: { planned_load_time },
        })
      }
    }

    toggle()
  }

  const chartConfig = {
    columns: [],
    autoCommit: true,
    autoLoad: true,
    syncDataOnLoad: true,
    autoHeight: true,
    rowHeight: 30,
    barMargin: 0,
    createEventOnDblClick: false,
    zoomOnMouseWheel: false,
    forceFit: true,
    features: {
      eventDragCreate: false,
      taskEdit: false,
      eventEdit: {
        editorConfig: {
          type: 'myCustomEditorType',
        },
      },
      eventTooltip: {
        disabled: true,
      },
      eventCopyPaste: false,
      eventDrag: {
        nonWorkingTime: true,
      },
      nonWorkingTime: true,
      resourceNonWorkingTime: true,
      timeRanges: {
        showCurrentTimeLine: false,
      },
      scheduleMenu: {
        items: {
          addEvent: false,
        },
      },
    },
    startDate: dateConfig.date_from ?? moment.utc().format('YYYY-MM-dd'),
    viewPreset: {
      base: 'hourAndDay',
      headers: [
        {
          unit: 'day',
          dateFormat: 'dddd. Do MMM YYYY',
        },
        {
          unit: 'hour',
          dateFormat: 'HH',
          increment: 1,
          renderer(startDate, endDate, headerConfig, i) {
            const hour = moment(startDate)

            // these are <momentjs objects>
            const { from, to } = ganttChartState.terminal.operatingTime

            const classList = ['terminal-hours']

            if (
              from &&
              to &&
              from.isValid() &&
              to.isValid() &&
              (hour.hour() === from.hour() || hour.hour() === to.hour())
            ) {
              classList.push('has-indicator', 'font-weight-bold')

              const presenter = hour.hour() === from.hour() ? from : to
              const minute = presenter.minute()
              // minute 00-19 => move arrow to left
              if (minute >= 0 && minute <= 19)
                classList.push('has-indicator-left')
              // minute 41-59 => move arrow to right
              else if (minute >= 41 && minute < 60)
                classList.push('has-indicator-right')
              // minute 20-40 => arrow center
              else classList.push('has-indicator-middle')

              // start = left, end = right, undefined = center
              // headerConfig.align = undefined

              // add CSS classes to header cell
              headerConfig.headerCellCls = classList.join(' ')
            }

            return hour.format('HH')
          },
        },
      ],
      timeResolution: {
        unit: 'second',
        increment: 1,
      },
    },
    listeners: {
      cellClick(grid) {
        const { record } = grid
        if (record?.data?.vehicle && record?.data?.id) {
          const { id: resourceId, vehicle } = record.data
          onSelectVehicle({ resourceId, vehicle })
        }
      },
      beforeEventEdit({ eventRecord, resourceRecord }) {
        ShipmentDblclickModal(eventRecord)
        eventRecord.resourceId = resourceRecord.id
        showEditor(eventRecord)
        return false
      },
    },
    eventMenuFeature: {
      // menuitem of event right click handler
      processItems({ eventRecord, items }) {
        const data = eventRecord.data,
          flags = eventRecord.data.flags

        if (flags.isBackground) return false

        if (
          eventRecord.data?.eventType === EventSchedulerStatus.CANCELLATION ||
          eventRecord.data?.isPending
        )
          return false
        if (!eventRecord.data?.resourceOrder) {
          items.sendOrderForDS.hidden = true
        } else {
          let check = eventRecord.data?.resourceOrder.filter(v => !v.DNNumber)
          items.sendOrderForDS.disabled = !check.length
        }
        if (eventRecord.data?.status === EventSchedulerStatus.CREATED_PAYMENT) {
          items.createShipment.hidden = true
          items.sendOrderForDS.hidden = true
          items.terminalRelay.hidden = true
        }
      },
      items: {
        editEvent: false,
        deleteEvent: false,
        sendOrderForDS: {
          text: 'Send Orders for DN',
          onItem({ eventRecord }) {
            updateModalHandler(EventContextList.SEND_ORDER, eventRecord)
          },
        },
        plannedLoadTime: {
          text: 'Planned Load Times',
          onItem({ eventRecord }) {
            updateModalHandler(EventContextList.PLAN_LOAD_TIMES, eventRecord)
          },
        },
        terminalRelay: {
          text: 'Terminal Relay',
          onItem({ eventRecord }) {
            updateModalHandler(EventContextList.TERMINAL_RELAY, eventRecord)
          },
        },
        createShipment: {
          text: 'Create Shipment',
          onItem({ eventRecord }) {
            updateModalHandler(EventContextList.SHIPMENT, eventRecord)
          },
        },
        cancel: {
          text: 'Cancel',
          onItem({ eventRecord }) {
            updateModalHandler(EventContextList.CANCEL_SHIPMENT, eventRecord)
          },
        },
      },
    },
    horizontalEventSorterFn: (a, b) => (b.startDateMS > a.startDateMS ? 1 : -1),
    eventRenderer({ eventRecord, renderData }) {
      eventRecord.cls = 'has-background'

      const { instance } = chartRef.current,
        dateToPx = date =>
          instance.getCoordinateFromDate(date) - renderData.left

      // <eventRecord.originalData> consult factory.js
      const data = eventRecord.originalData,
        { background, flags, supplement } = eventRecord.originalData

      let bgTemplate = ''

      if (background.startDate && background.endDate) {
        const bgOffset = {
          start: dateToPx(
            moment(background.startDate, DATE_TIME_FORMAT, true).toDate()
          ),
          end: dateToPx(
            moment(background.endDate, DATE_TIME_FORMAT, true).toDate()
          ),
        }

        bgTemplate = `
          <div class="event-background"
              style="transform: translateX(${bgOffset.start}px);
                      width: ${bgOffset.end - bgOffset.start}px;">
          </div>
        `
      }

      return flags.isBackground
        ? ''
        : `${bgTemplate}
        <div class="event-data ${
          renderData.width < 360 && 'event-data-marquee'
        }"
            style="background-color: ${eventRecord.eventColor}; 
                   width: ${renderData.width}px;">
          ${
            eventRecord.eventType === 'SAP Alert'
              ? `<img src=${RedAlertIcon} class="icon-alignment" alt="alerticon" />`
              : ''
          }
          
          ${flags.hasSoftRestriction ? `<img src=${YellowAlertIcon} />` : ''}

          <div class="event-data-details">
            <div class="white-bg brdr-radius">
              <p>${eventRecord.id}</p>
            </div>
            <div class="blue-bg brdr-radius">
              <p>${supplement.terminal}</p>
            </div>
            <div class="white-text brdr-radius">
              <p>${moment(data.startDate, DATE_TIME_FORMAT, true).format(
                TIME_FORMAT_SHORT
              )} hrs</p>
            </div>
            
            <div class="white-text brdr-radius">
              <p>${moment(data.endDate, DATE_TIME_FORMAT, true).format(
                TIME_FORMAT_SHORT
              )} hrs</p>
            </div>
          </div>
        </div>`
    },
  }

  function ShipmentDblclickModal(event) {
    const allowedShipmentModel = ['Blocked DN', 'Shipment Created', 'Scheduled']
    updateModalHandler(EventContextList.DELETE_SHIPMENT, event)
    if (allowedShipmentModel.includes(event._data.eventType)) {
      const { getShipmentOfOderBankGanttChart } = props
      getShipmentOfOderBankGanttChart()
      setShipmentDblclick(true)
    }
    if (event._data.eventType === 'SAP Alert') {
      toggle()
    }
  }

  function toggleShipment() {
    setShipmentDblclick(!shipmentDblclick)
  }

  function showRoadTanker(event) {
    setSelectedVehicleID(event.target.innerText)
    toggleRoadTanker()
  }

  function toggleRoadTanker() {
    setRoadTankerModal(!roadTankerModalShow)
  }

  function generateColumnsObj(tableMap) {
    const text =
      ganttChartTableMapping?.[tableMap]?.label_short ??
      ganttChartTableMapping?.[tableMap]?.label
    return {
      text,
      field: tableMap,
      width: text.toLowerCase() === 'vehicle' ? '130px' : '100px',
      editor: null,
      renderer: ({ value, column, record }) => {
        switch (column.field) {
          case 'vehicle': {
            return (
              <div className="chart-vehicle-cell">
                <div
                  className="value"
                  onClick={showRoadTanker}
                  style={{ cursor: 'pointer' }}
                >
                  {value}
                </div>
                {record.pump_type && (
                  <div className="suffix">{record.pump_type}</div>
                )}
              </div>
            )
          }
        }
        return value
      },
      headerRenderer: ({ column }) => {
        return `
                <div class="d-flex align-items-center chart-header" id="chart-column-${column.data.field}">
                  <div>${column.data.text}</div>
                  <button id="gantt-chart-column-${column.data.field}-button">
                    <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="AWSM-Calendar" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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
    chartConfig.columns.push(generateColumnsObj(tableMap))
  }

  useEffect(() => {
    let isMounted = true // prevent bryntum maximum render
    if (
      chartRef.current &&
      chartRef.current.instance &&
      isMounted &&
      !firstRender.current
    ) {
      const { instance: scheduler } = chartRef.current
      const { ganttChartAllRadio } = props
      if (!ganttChartAllRadio) {
        setEventsData(prevEventsData => {
          const newEventsData = prevEventsData.map(event => {
            event.highlight = true
            return event
          })
          scheduler.eventStore.data = newEventsData
          return newEventsData
        })
      }
      if (ganttChartAllRadio) {
        setEventsData(prevEventsData => {
          const newEventsData = prevEventsData.map(event => {
            if (event.eventType === 'Scheduled') {
              event.highlight = event.eventFilter === ganttChartAllRadio
            }
            if (event.eventType !== 'Scheduled') {
              event.highlight = true
            }
            return event
          })
          scheduler.eventStore.data = newEventsData
          return newEventsData
        })
      }
    }

    return () => {
      isMounted = false
    }
  }, [props.ganttChartAllRadio])

  useEffect(() => {
    if (chartRef.current && !firstRender.current) {
      const { instance: scheduler } = chartRef.current
      for (const col of Object.keys(ganttChartTableMapping)) {
        if (scheduler.columns.get(col)) {
          scheduler.columns.get(col).remove()
        }
      }
      for (const newCol of Object.keys(bryntumCurrentColumns)) {
        scheduler.columns.add(generateColumnsObj(newCol))
      }
    }
  }, [bryntumCurrentColumns])

  useEffect(() => {
    if (bryntumCurrentColumns) {
      Object.keys(bryntumCurrentColumns).forEach(e => {
        const el = document.getElementById(`gantt-chart-column-${e}-button`)
        if (el) {
          el.addEventListener('click', event => {
            event.stopPropagation()
            event.preventDefault()
            const tooltip = document.getElementById(`gantt-chart-tooltip-${e}`)
            createPopper(el, tooltip, {
              placement: 'bottom',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [40, 20],
                  },
                },
              ],
            })
            tooltip.classList.toggle('hide')
            Object.keys(bryntumCurrentColumns).forEach(f => {
              if (f !== e) {
                const hideEl = document.getElementById(
                  `gantt-chart-tooltip-${f}`
                )
                hideEl.classList.add('hide')
              }
            })
          })
        }
      })
    }
    firstRender.current = false
  }, [bryntumCurrentColumns])

  const hideFilterElement = dataKey => {
    const $el = document.getElementById(`gantt-chart-tooltip-${dataKey}`)
    if ($el) {
      $el.classList.add('hide')
    }
  }

  const onApplyFilter = (data, dataKey) => {
    const index = bryntumTable.filterCondition.findIndex(e => e.key === dataKey)
    const newFilterCondition = [...bryntumTable.filterCondition]
    if (index >= 0) {
      newFilterCondition[index] = { ...newFilterCondition[index], data: data }
    } else {
      newFilterCondition.push({ data, key: dataKey })
    }

    setBryntumTable(state => ({
      ...state,
      filterCondition: newFilterCondition,
      page: 0,
    }))

    hideFilterElement(dataKey)
  }

  const onResetFilter = dataKey => {
    const index = bryntumTable.filterCondition.findIndex(e => e.key === dataKey)
    if (index >= 0) {
      const newFilterCondition = [...bryntumTable.filterCondition]
      newFilterCondition.splice(index, 1)

      setBryntumTable(state => ({
        ...state,
        filterCondition: newFilterCondition,
        page: 0,
      }))
    }
    hideFilterElement(dataKey)
  }

  return (
    <div className="rts-table-container scroll">
      <div className="container-orderbank gant-chart-table">
        <Row className="mr-0">
          <InfiniteScroll
            next={() =>
              setBryntumTable(state => ({
                ...state,
                page: state.page + 1,
              }))
            }
            hasMore={
              props.ganttChartTableData.length < props.totalRow_ganttChart
            }
            loader={
              <h5 className={props.totalRow_ganttChart > 10 ? '' : 'd-none'}>
                Loading...
              </h5>
            }
            dataLength={props.ganttChartTableData.length}
            height={360}
          >
            <Col lg={12} className="pr-1">
              <Droppable key="gantt-chart" droppableId="gantt-chart">
                {(provided, snapshot) => {
                  return (
                    <div
                      className="rts-gantt-chart"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {snapshot.isDraggingOver && (
                        <div className="on-dragging" />
                      )}

                      <BryntumSchedulerPro
                        {...chartConfig}
                        ref={chartRef}
                        resources={props.ganttChartTableData}
                      />

                      {popupShown ? (
                        <BryntumPopup
                          text="Popup text"
                          closePopup={hideEditor}
                          eventRecord={eventRecord}
                          eventStore={eventStore}
                          resourceStore={resourceStore}
                        />
                      ) : null}
                    </div>
                  )
                }}
              </Droppable>
            </Col>
          </InfiniteScroll>
        </Row>
        {props.ganttChartTableFilter &&
          filterList.map(e => (
            <ChartColumnFilter
              key={e.key}
              isGantt={true}
              filterKey={e.key}
              filterData={props.ganttChartTableFilter[e.key] ?? []}
              type={e.type}
              onApply={onApplyFilter}
              onReset={onResetFilter}
              onResetAll={handleResetAll}
            />
          ))}
      </div>
      {(dropdownSelectedItem?.type === EventContextList.SHIPMENT ||
        dropdownSelectedItem?.type === EventContextList.CANCEL_SHIPMENT ||
        dropdownSelectedItem?.type === EventContextList.SEND_ORDER) && (
        <ConfirmDNStatusModal
          isOpen={modal}
          onSend={sendRequestsHandler}
          onCancel={toggle}
          headerContent={dropdownSelectedItem?.header || ''}
          bodyContent={`Are you sure you want to ${
            dropdownSelectedItem?.body || ''
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
          data={dropdownSelectedItem.startDate}
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
      {dropdownSelectedItem?.type === EventContextList.DELETE_SHIPMENT && (
        <OrderBankSapAlertModal
          open={modal}
          istoggle={toggle}
          shipmentClicked={dropdownSelectedItem?.itemSelectedId}
          onSend={sendRequestsHandler}
        />
      )}
      <OrderBankRoadTankerModal
        isOpen={roadTankerModalShow}
        toggle={toggleRoadTanker}
        selectedVehicleID={selectedVehicleID}
        region={props.region}
        terminal={props.terminal}
        shiftDate={props.dateConfig.date_from}
        refreshTable={refreshGanttChartTable}
      />
      {/* validate gantt event 5 */}
      <AlertOverruleModal
      // alertType={alertOverruleShow}
      // onCancel={() => {
      // setAlertOverruleShow(false)
      // refreshGanttChartTable()
      // }}
      // alertMessage={ganttEventValidation?.message}
      // onSend={updateOBEventHandler}
      />
    </div>
  )
}

const mapStateToProps = ({ orderBank }) => {
  return {
    ganttChartState: orderBank.ganttChart,
    ganttChartOrderDrag: orderBank.ganttChartOrderDrag,
    ganttChartTableData: orderBank.ganttChartTableData,
    totalRow_ganttChart: orderBank.totalRow_ganttChart,
    ganttChartTableFilter: orderBank.ganttChartTableFilter,
    ganttEventValidation: orderBank.ganttEventValidation,
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
    getShipmentOfOderBankGanttChart: params =>
      dispatch(getShipmentOfOderBankGanttChart(params)),
    // updateOBEvent: params => dispatch(updateOBEvent(params)),
    // getGanttEventValidation: params =>
    //   dispatch(getGanttEventValidation(params)),
    onRemoveEvent: params => dispatch(removeEvent(params)),
    onSelectVehicle: params => dispatch(selectVehicleShipment(params)),
    // dragOrderBankToGanttChart: payload =>
    //   dispatch(dragOrderBankToGanttChart(payload)),
    updateShipment: params => dispatch(updateShipment(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BryntumChartTable)
