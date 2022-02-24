import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { createPopper } from '@popperjs/core'
import { ganttChartTableMapping } from './tableMapping'
import './index.scss'
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react'
import '@bryntum/schedulerpro/schedulerpro.classic-dark.css'
import '@bryntum/schedulerpro/schedulerpro.classic-light.css'
import '@bryntum/schedulerpro/schedulerpro.classic.css'
import '@bryntum/schedulerpro/schedulerpro.material.css'
import '@bryntum/schedulerpro/schedulerpro.stockholm.css'
import '../style.scss'
import './BryntumChartTable.scss'
import BryntumPopup from './BryntumPopup'
import RedAlertIcon from './../../../assets/images/AWSM-Red-Alert.svg'
import YellowAlertIcon from './../../../assets/images/AWSM-Soft-Overrule.svg'
import ConfirmDNStatusModal from './confirmDNStatusModal'
import TerminalRelayModal from './TerminalRelayModal'
import {
  processPaymentInGanttChart,
  cancelPaymentInGanttChart,
  sendOrderInGanttChart,
  getShipmentOfOderBankGanttChart,
  removeEvent,
  updateOBEvent,
  getGanttEventValidation,
  selectVehicleShipment,
  dragOrderBankToGanttChart,
  updateShipment,
} from '../../../store/actions'
import ChartColumnFilter from './ChartColumnFilter'
import ShiftPopover from './ShiftPopover'
import { Droppable } from 'react-beautiful-dnd'
import OrderBankShipmentModal from './OrderBankShipmentModal'
import OrderBankSapAlertModal from './OrderBankSapAlertModal'
import OrderBankRoadTankerModal from './OrderBankRoadTankerModal'
import PlannedLoadTimesModal from './PlannedLoadTimesModal'
import AlertOverruleModal from './AlertOverruleModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import { format, parse } from 'date-fns'
import moment from 'moment'
import { EVENT_COLOR, TIME_FORMAT_SHORT } from 'store/orderBank/factory'

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
    updateOBEvent,
    onSelectVehicle,
    dropOderSuccess,
    ganttEventValidation,
    onFilterChange,
    dragOrderBankToGanttChart,
    dateConfig,
    terminal,
    ganttChartOrderDrag,
    ganttChartEventData,
    isDragging,
  } = props
  const tableData = useRef([])

  const TIME_FORMAT = 'HH:mm:ss'
  const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm'

  const colsRef = useRef(bryntumCurrentColumns)
  const [modal, setModal] = useState(false)
  const [dropdownSelectedItem, setDropdownSelectedItem] = useState(null)
  const [eventsData, setEventsData] = useState([])
  const [shipmentDblclick, setShipmentDblclick] = useState(false)
  const [roadTankerModalShow, setRoadTankerModal] = useState(false)
  const [selectedVehicleID, setSelectedVehicleID] = useState(null)
  const [alertOverruleShow, setAlertOverruleShow] = useState(null)
  const schedulerProRef = useRef()
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
    () => setBryntumTable({ ...bryntumTable, page: 0 }),
    [dateConfig, terminal]
  )

  useEffect(() => {
    schedulerProRef.current.instance.store.listeners = {
      sort(e) {
        const { ascending, field } = e.sorters[0]
        const opt = {
          sortDirection: ascending ? 'asc' : 'desc',
          sortField: field,
        }

        setBryntumTable(state => {
          if (
            opt.sortField === state.sortField &&
            opt.sortDirection === state.sortDirection
          )
            return state

          return { ...state, ...opt, page: 0 }
        })
      },
    }

    const { eventStore, resourceStore } = schedulerProRef.current.instance
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
      setBryntumTable(bryntumTable)
    }, 1000)
  }

  useEffect(() => {
    if (dropOderSuccess && ganttChartOrderDrag.length > 0) {
      ganttChartOrderDrag.forEach(order => {
        if (
          !ganttChartEventData.find(
            item => item.resourceId == order.vehicle && item.it == order.id
          )
        ) {
          const { eventStore } = schedulerProRef.current.instance
          const event = {
            id: order?.id,
            resourceId: order?.vehicle,
            startDate: format(
              parse('00:00:00', TIME_FORMAT, new Date(order.shift_date)),
              DATE_TIME_FORMAT
            ),
            endDate: format(
              parse('23:59:59', TIME_FORMAT, new Date(order.shift_date)),
              DATE_TIME_FORMAT
            ),
            eventType: order?.scheduled_status,
            eventColor: EVENT_COLOR[order?.scheduled_status],
            draggable: true,
          }
          eventStore.add(event)
        }
      })
    }
  }, [dropOderSuccess, ganttChartOrderDrag])

  useEffect(() => {
    if (!dropOderSuccess) {
      onFilterChange({}, true) // leave argument empty so they will be set to default
    }
  }, [isDragging])

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

  useEffect(() => {
    // validate gantt event 3
    if (ganttEventValidation) {
      if (ganttEventValidation?.alert === 'soft') setAlertOverruleShow('soft')
      else if (ganttEventValidation?.alert === 'hard')
        setAlertOverruleShow('hard')
      else updateOBEventHandler()
    }
  }, [ganttEventValidation])

  // validate gantt event 4
  const updateOBEventHandler = async () => {
    await updateOBEvent(dropdownSelectedItem)
  }

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
    const scheduler = schedulerProRef.current.instance

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
        // $val now is format HH:mm:ss
        const planned_load_time = dateConfig.date_from + 'T' + val
        props.updateShipment({
          id: dropdownSelectedItem.record.id,
          data: { planned_load_time },
        })
      }
    }

    scheduler.eventStore.data = props.ganttChartEventData
    scheduler.renderRows()

    toggle()
  }

  const updateResourceRecords = (updateData, preventClear = false) => {
    const scheduler = schedulerProRef.current?.instance
    if (scheduler) {
      if (preventClear) {
        scheduler.resourceStore.data = updateData
      } else {
        scheduler.resourceStore.removeAll()
        if (!scheduler.eventStore.data) {
          scheduler.eventStore.data = eventsData
        }
        updateData.forEach(e => {
          scheduler.resourceStore.add(e)
        })
      }
      tableData.current = updateData
    }
  }

  const schedulerproConfig = {
    columns: [],
    autoHeight: true,
    autoLoad: true,
    autoSync: true,
    autoCommit: true,
    rowHeight: 30,
    barMargin: 0,
    resourceMargin: 0,
    autoAdjustTimeAxis: false,
    fillTicks: true,
    scheduleMenuFeature: false,
    createEventOnDblClick: false,
    eventRenderer: ({ eventRecord, renderData }) => {
      const { eventType, isBackground, hasSoftRestriction, time } =
        eventRecord.data
      // customize content for event in here
      // if (!eventRecord.data?.highlight) {
      //   renderData.cls.add("opacity-20")
      // }
      // if (eventRecord.data?.highlight) {
      //   renderData.cls.remove("opacity-20")
      // }
      if (isBackground) {
        return '<div></div>'
      }

      return `
        <div
          onmouseover="document.getElementById('gethighlight').style.display = 'flex';" 
          onmouseout="document.getElementById('gethighlight').style.display = 'none';"
        >
          ${
            eventType === 'SAP Alert'
              ? `<img src=${RedAlertIcon} class="icon-alignment" alt="alerticon"/>`
              : ''
          } 
          
          ${hasSoftRestriction ? `<img src=${YellowAlertIcon} />` : ''} 

          <div class="eventCustomize ${
            renderData.width < 360 ? 'marquee' : ''
          }" >
            <div class="white-bg brdr-radius">
              <p>${eventRecord?._data?.id ? eventRecord._data.id : 1}</p>
            </div>
            <div class="blue-bg brdr-radius">
              <p>${
                renderData.resource._data?.order_banks[0]?.terminal
                  ? renderData.resource._data.order_banks[0].terminal
                  : 'M808'
              }</p>
            </div>
            <div class="white-text brdr-radius">
              <p>${time.start.format(TIME_FORMAT_SHORT)} hrs</p>
            </div>
            <div class="green-bg brdr-radius">
              <p>eta ${
                renderData.resource._data?.order_banks[0]?.eta?.substring(0, 5)
                  ? renderData.resource._data.order_banks[0].eta.substring(0, 5)
                  : '00:00'
              }</p>
            </div>
            <div class="white-text brdr-radius">
              <p>${time.end.format(TIME_FORMAT_SHORT)} hrs</p>
            </div>
          </div>
        </div>
      `
    },
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
        // constrainDragToResource: true,
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
    startDate: dateConfig.date_from ?? format(Date.now(), 'yyyy-MM-dd'),
    resourceNonWorkingTimeFeature: true,
    nonWorkingTimeFeature: true,
    resourceTimeRangesFeature: true,
    maxTimeAxisUnit: 'hour',
    eventMenuFeature: {
      // menuitem of event right click handler
      processItems({ eventRecord, items }) {
        if (eventRecord.data.isBackground) return false

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
    viewPreset: {
      base: 'hourAndDay',
      id: 'customHourAndDayPresent',
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
            const { from, to } = props.terminalOperatingTime

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
      beforeEventDropFinalize: async ({ context }) => {
        context.async = true

        // validate gantt event 1
        await dragOrderBankToGanttChart({
          vehicle: context?.newResource?._data?.vehicle,
          shift_date: format(
            context?.startDate ? context?.startDate : new Date(),
            'yyyy-MM-dd'
          ),
          order_banks: [context?.draggedRecords?.[0]?._data?.id],
        })
        context.finalize(true)
      },
      afterEventDrop: async payload => {
        const { eventRecord } = payload.context
        // validate gantt event 2
        updateModalHandler(EventContextList.UPDATE_SHIPMENT, eventRecord)
      },
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
          case 'status': {
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
    schedulerproConfig.columns.push(generateColumnsObj(tableMap))
  }

  useEffect(() => {
    let isMounted = true // prevent bryntum maximum render
    if (
      schedulerProRef.current &&
      schedulerProRef.current.instance &&
      isMounted &&
      !firstRender.current
    ) {
      const { instance: scheduler } = schedulerProRef.current
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
    if (schedulerProRef.current && !firstRender.current) {
      const { instance: scheduler } = schedulerProRef.current
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

  // useEffect(() => {
  // if (props.isSendRequestProcess && dropdownSelectedItem?.itemSelectedId) {
  //   if (dropdownSelectedItem.type === EventContextList.CANCEL_SHIPMENT) {
  //     removeShipmentHandler()
  //   } else {
  //     changeColorOfEventHandler('#615E9B')
  //   }
  // }
  // }, [props.isSendRequestProcess])

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
              setBryntumTable(state => ({ ...state, page: state.page + 1 }))
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
                        {...schedulerproConfig}
                        events={props.ganttChartEventData}
                        autoSync
                        resources={props.ganttChartTableData}
                        syncDataOnLoad
                        ref={schedulerProRef}
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
        alertType={alertOverruleShow}
        onCancel={() => {
          setAlertOverruleShow(false)
          refreshGanttChartTable()
        }}
        alertMessage={ganttEventValidation?.message}
        onSend={updateOBEventHandler}
      />
    </div>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  isSendRequestProcess: orderBank.isSendRequestProcess,
  ganttChartData: orderBank.ganttChart,
  terminalOperatingTime: orderBank.ganttChart.terminal.operatingTime,
  ganttChartOrderDrag: orderBank.ganttChartOrderDrag,
  ganttChartTableData: orderBank.ganttChartTableData,
  totalRow_ganttChart: orderBank.totalRow_ganttChart,
  ganttChartTableFilter: orderBank.ganttChartTableFilter,
  ganttChartEventData: orderBank.ganttChartEventData,
  dropOderSuccess: orderBank.dropOderSuccess,
  isDragging: orderBank.isDragging,
  ganttEventValidation: orderBank.ganttEventValidation,
})

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
    updateOBEvent: params => dispatch(updateOBEvent(params)),
    getGanttEventValidation: params =>
      dispatch(getGanttEventValidation(params)),
    onRemoveEvent: params => dispatch(removeEvent(params)),
    onSelectVehicle: params => dispatch(selectVehicleShipment(params)),
    dragOrderBankToGanttChart: payload =>
      dispatch(dragOrderBankToGanttChart(payload)),
    updateShipment: params => dispatch(updateShipment(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BryntumChartTable)
