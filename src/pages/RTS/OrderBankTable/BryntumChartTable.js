import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { connect } from "react-redux"
import {
  Row,
  Col,
  Popover,
  PopoverBody,
} from "reactstrap"
import { createPopper } from "@popperjs/core"
import {
  ganttChartTableMapping,
} from "./tableMapping"
import "./index.scss"
import { BryntumSchedulerPro } from "@bryntum/schedulerpro-react"
import "@bryntum/schedulerpro/schedulerpro.classic-dark.css"
import "@bryntum/schedulerpro/schedulerpro.classic-light.css"
import "@bryntum/schedulerpro/schedulerpro.classic.css"
import "@bryntum/schedulerpro/schedulerpro.material.css"
import "@bryntum/schedulerpro/schedulerpro.stockholm.css"
import "../style.scss"
import { ReactSVG } from "react-svg"
import ArrowDropDownIcon from "../../../assets/images/AWSM-Caret-Down-Icon.svg"
import SearchIcon from "../../../assets/images/AWSM-search.svg"
import Checkbox from "@material-ui/core/Checkbox"
import selectAllIcon3 from "../../../assets/images/AWSM-Checkbox.svg"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import ConfirmDNStatusModal from "./confirmDNStatusModal"
import { processPaymentInGanttChart, cancelPaymentInGanttChart, sendOrderInGanttChart, getRTSOderBankGanttChart } from "../../../store/actions"
import { cloneDeep } from 'lodash'
import OrderBankShipmentModal from "./OrderBankShipmentModal"

const EventSchedulerStatus = {
  ARE_YET_CREATED_PAYMENT: 'not yet to be created',
  CREATED_PAYMENT: 'created'
}

const ShiftPopover = ({ record, onChange }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const toggle = () => setPopoverOpen(!popoverOpen)

  return (
    <div className="w-100">
      <button
        id={`chart-shift-cell-${record.id}`}
        type={"button"}
        onBlur={() => setPopoverOpen(false)}
      >
        <div>{record.shift}</div>
        <ReactSVG src={ArrowDropDownIcon} />
      </button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={`chart-shift-cell-${record.id}`}
        toggle={toggle}
      >
        <PopoverBody className="p-0">
          {record.shift_list.map(e => (
            <div className="shift-item" onClick={() => onChange(record.id, e)}>
              {e}
            </div>
          ))}
        </PopoverBody>
      </Popover>
    </div>
  )
}

const CustomIcon = () => {
  // untick checkbox icon
  return <img src={selectAllIcon3} alt="icon" />
}
const CustomIcon2 = () => {
  // ticked checkbox icon
  return <img src={selectAllIcon2} alt="icon" />
}
const CustomIcon3 = () => {
  // indeterminate icon
  return <img src={selectAllIcon} alt="icon" />
}

const ChartColumnFilter = ({
  filterData = [],
  filterKey,
  onApply,
  onReset,
  type,
}) => {

  const originalDataList = useMemo(() => {
    switch (type) {
      case "list": {
        return [...new Set([].concat(...filterData.map(e => e[`${filterKey}_list`])))]
      }
      default: {
        return filterData.map(e => e[filterKey])
      }
    }

  }, [filterData]);

  useEffect(() => {
    setData([...new Set(originalDataList)].map(e => ({
      text: e,
      checked: true,
      visible: true,
    })))
  }, [originalDataList])

  const [data, setData] = useState(
    [...new Set(originalDataList)].map(e => ({
      text: e,
      checked: true,
      visible: true,
    }))
  )

  const onItemChange = index => {
    const newData = [...data]
    if (newData[index]) {
      newData[index].checked = !newData[index].checked
    }
    setData(newData)
  }

  const isCheckAll = useMemo(() => {
    return data.length === data.filter(e => e.checked).length
  }, [data])

  const checkAllChange = () => {
    setData([...data].map(e => ({ ...e, checked: !isCheckAll })))
  }

  const onInputSearchChange = event => {
    const value = event.target.value.toString()
    setData(
      [...data].map(e => ({
        ...e,
        visible:
          !value ||
          e.text
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase()),
      }))
    )
  }

  const apply = () => {
    if (onApply) {
      onApply(
        data.filter(e => e.checked && e.visible).map(e => e.text),
        filterKey
      )
    }
  }

  const reset = () => {
    if (onReset) {
      onReset(filterKey)
    }
    setData([...data].map(e => ({ ...e, checked: true })))
  }

  return (
    <div
      className={`chart-column-filter hide`}
      id={`chart-tooltip-${filterKey}`}
    >
      <div className="chart-column-input-search">
        <input onChange={onInputSearchChange} />
        <ReactSVG src={SearchIcon} />
      </div>
      <div className="chart-column-filter-body">
        {data.map(
          (e, index) =>
            e.visible && (
              <div
                className={`chart-column-select-item ${e.checked ? "checked" : " "
                  }`}
              >
                <Checkbox
                  checked={e.checked}
                  onChange={() => onItemChange(index)}
                  icon={<CustomIcon />}
                  checkedIcon={<CustomIcon2 />}
                  style={{
                    height: "20px",
                    width: "5px",
                    marginLeft: "5px",
                    marginTop: "-1px",
                  }}
                />
                <label>{e.text}</label>
              </div>
            )
        )}
      </div>
      <div className="chart-column-footer">
        <div>
          <Checkbox
            checked={isCheckAll}
            onChange={checkAllChange}
            icon={<CustomIcon3 />}
            checkedIcon={<CustomIcon2 />}
            style={{
              height: "20px",
              width: "5px",
              marginLeft: "5px",
              marginTop: "-1px",
            }}
          />
          <label>Select All</label>
        </div>
        <div>
          <button className="btn btn-outline-primary" onClick={reset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={apply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

function BryntumChartTable(props) {
  // const [tableData, setTableData] = useState([])
  const tableData = useRef([])
  const setTableData = (newData) => {
    tableData.current = newData
  }
  const [modal, setModal] = useState(false);
  const [dropdownSelectedItem, setDropdownSelectedItem] = useState(null);
  const [filterCondition, setFilterCondition] = useState([])
  const [eventsData, setEventsData] = useState([])
  const [displayDblclick, setDisplayDblclick] = useState(false)
  const schedulerProRef = useRef()
  const firstRender = useRef(true)

  const [filterList, setFilterList] = useState(
    Object.keys(ganttChartTableMapping).map(e => ({
      key: e,
      type: ganttChartTableMapping[e].type,
    }))
  )
  useEffect(() => {
    const { getRTSOderBankGanttChart } = props
    getRTSOderBankGanttChart()
  }, [])

  useEffect(() => {
    setTableData(props.ganttChartData.table)
    setEventsData(props.ganttChartData.event)
  }, [props.ganttChartData])

  const toggle = () => setModal(!modal);

  const updateModalHandler = (type, eventRecord) => {
    let data = {};
    switch (type) {
      case 'shipment': {
        data.type = 'shipment'
        data.header = 'Create Shipment'
        data.body = 'proceed for Shipment Creation?'
        data.styleColor = 'success'
        break
      }
      case 'cancelShipment': {
        data.type = 'cancelShipment'
        data.header = 'Cancel Shipment Confirmation'
        data.body = 'proceed with this shipment cancellation?'
        data.styleColor = 'danger'
        data.record = eventRecord.data
        break
      }
      case 'sendOrder': {
        data.type = 'sendOrder'
        data.header = 'Send Order for DN'
        data.body = "send this shipment's order for DN?"
        data.styleColor = 'success'
        break
      }
      default: {
        data.header = ''
        data.body = ''
        break
      }
    }
    data.itemSelectedId = eventRecord.id
    toggle()
    setDropdownSelectedItem(data)
  }

  const changeColorOfEventHandler = (color, isPending = false, eventType = undefined) => {
    const newData = cloneDeep(eventsData)
    let itemSelected = newData.filter((v) => v.id == dropdownSelectedItem.itemSelectedId)
    itemSelected[0].eventColor = color
    itemSelected[0].isPending = isPending
    if (eventType) {
      itemSelected[0].eventType = eventType;

    }
    setEventsData(newData)
  }

  const sendRequestsHandler = () => {
    changeColorOfEventHandler('#9F79B7', true)
    switch (dropdownSelectedItem.type) {
      case 'shipment': {
        setTimeout(() => {
          props.processPaymentInGanttChart(null)
        }, 2000)
        break
      }
      case 'cancelShipment': {
        setTimeout(() => {
          props.processCancelPaymentInGanttChart(dropdownSelectedItem)
        }, 2000)
        break
      }
      case 'sendOrder': {
        props.processSendOrderInGanttChart(null)
        break
      }
      default: {
        data.header = ''
        data.body = ''
        break
      }
    }
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
      setTableData(updateData)
    }
  }

  const schedulerproConfig = {
    columns: [],
    autoHeight: true,
    rowHeight: 40,
    barMargin: 0,
    resourceMargin: 0,
    autoAdjustTimeAxis: false,
    fillTicks: true,
    listeners: {
      beforeEventEdit({ eventRecord, resourceRecord }) {
        displayDblClickModal(eventRecord, resourceRecord);
      }
    },
    eventRenderer: ({ eventRecord, renderData }) => {
      // customize content for event in here
      if (!eventRecord.data?.highlight) {
        renderData.cls.add("opacity-20")
      }
      if (eventRecord.data?.highlight) {
        renderData.cls.remove("opacity-20")
      }
      return `
        <div class="eventCustomize" id="eventEllipses" 
          onmouseover="document.getElementById('gethighlight').style.display = 'flex';" 
          onmouseout="document.getElementById('gethighlight').style.display = 'none';"
        >
          <div class=${renderData.width < 360 ? 'marquee' : ''}>
            <div class="white-bg brdr-radius">
              <p>1</p>
            </div>
            <div class="blue-bg brdr-radius">
              <p>M808</p>
            </div>
            <div class="white-text brdr-radius">
              <p>${renderData.resource.hours} hrs</p>
            </div>
            <div class="green-bg brdr-radius">
              <p>eta 09:00</p>
            </div>
            <div class="white-text brdr-radius">
              <p>${renderData.resource.hours} hrs</p>
            </div>
            <div class="green-bg brdr-radius">
              <p>eta 09:00</p>
            </div>
          </div>
        </div>
      `
    },
    features: {
      eventEdit: {
        editorConfig: {
          type: 'myCustomEditorType'
        }
      },
      eventTooltip: {
        disabled: true
      },
      eventCopyPaste: false,
      eventDrag: {
        constrainDragToResource: true,
        nonWorkingTime: true,
      },
      nonWorkingTime: true,
      resourceNonWorkingTime: true,
      timeRanges: {
        showCurrentTimeLine: false,
      },
    },
    startDate: "2021-07-23",
    resourceNonWorkingTimeFeature: true,
    nonWorkingTimeFeature: true,
    resourceTimeRangesFeature: true,
    maxTimeAxisUnit: "hour",
    eventMenuFeature: {
      // menuitem of event right click handler
      processItems({ eventRecord, items }) {
        if (eventRecord.data?.eventType === 'Cancellation') {
          items.sendOrderForDS = {
            hidden: true
          };
          items.plannedLoadTime = {
            hidden: true
          };
          items.terminalRelay = {
            hidden: true
          };
          items.createShipment = {
            hidden: true
          };
          items.cancel = {
            hidden: true
          };
          return;
        }
        if (eventRecord.data?.isPending) return false
        if (!eventRecord.data?.resourceOrder) {
          items.sendOrderForDS = {
            hidden: true
          };
        }
        if (!eventRecord.data?.eventType === 'Cancellation') {
          items.sendOrderForDS = {
            hidden: true
          };
        }
        if (eventRecord.data?.resourceOrder) {
          let check = eventRecord.data?.resourceOrder.filter(v => !v.DNNumber)
          items.sendOrderForDS = {
            ...items.sendOrderForDS,
            disabled: !!check.length
          };
        }
        if (eventRecord.data?.status === EventSchedulerStatus.CREATED_PAYMENT) {
          items.createShipment = {
            hidden: true
          };
          items.sendOrderForDS = {
            hidden: true
          };
          items.terminalRelay = {
            hidden: true
          };
        }
      },
      items: {
        editEvent: false,
        deleteEvent: false,
        sendOrderForDS: {
          text: 'Send OrderS For DS',
          onItem({ source, eventRecord }) {
            updateModalHandler('sendOrder', eventRecord)
          }
        },
        plannedLoadTime: {
          text: 'Planned Load Times',
          disabled: true,
          onItem({ source, eventRecord }) {
            updateModalHandler()
          }
        },
        terminalRelay: {
          text: 'Terminal Relay',
          disabled: true,
          onItem({ source, eventRecord }) {
            updateModalHandler()
          }
        },
        createShipment: {
          text: 'Create Shipment',
          onItem({ source, eventRecord }) {
            updateModalHandler('shipment', eventRecord)
          }
        },
        cancel: {
          text: 'Cancel',
          onItem({ source, eventRecord }) {
            updateModalHandler('cancelShipment', eventRecord)
          }
        },
      },

    },
    viewPreset: {
      base: "hourAndDay",
      id: "customHourAndDayPresent",
      headers: [
        {
          unit: "day",
          dateFormat: "dddd. do MMM YYYY",
        },
        {
          unit: "hour",
          dateFormat: "HH",
          increment: 1,
        },
      ],
    }
  }

  function displayDblClickModal(event, resource){
    if(event._data.eventType === "Blocked DN"){
      setDisplayDblclick(true);
    }
  }

  function toggleShipment(){
    setDisplayDblclick(!displayDblclick);
  }

  function onShiftDateChange(recordId, value) {
    const currentTableData = tableData.current
    const recordIndex = currentTableData.findIndex(e => e.id === recordId)
    if (recordIndex >= 0) {
      currentTableData[recordIndex] = { ...currentTableData[recordIndex], shift: value }
    }
    updateResourceRecords([...currentTableData], true)
  }

  for (const tableMap of Object.keys(ganttChartTableMapping)) {
    schedulerproConfig.columns.push({
      text: ganttChartTableMapping[tableMap].label,
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
          case "shift": {
            return (
              <div className="chart-shift-cell">
                <ShiftPopover record={record} onChange={onShiftDateChange} />
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
    })
  }

  useEffect(() => {
    let isMounted = true // prevent bryntum maximum render
    if (schedulerProRef.current && schedulerProRef.current.instance && isMounted && !firstRender.current) {
      const { instance: scheduler } = schedulerProRef.current
      const { ganttChartAllRadio } = props
      if (!ganttChartAllRadio) {
        setEventsData((prevEventsData) => {
          const newEventsData = prevEventsData.map((event) => {
            event.highlight = true
            return event
          })
          scheduler.eventStore.data = newEventsData
          return newEventsData
        })
      }
      if (ganttChartAllRadio) {
        setEventsData((prevEventsData) => {
          const newEventsData = prevEventsData.map((event) => {
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
    firstRender.current = false
    return () => isMounted = false
  }, [props.ganttChartAllRadio])

  useEffect(() => {
    if (props.isSendRequestProcess && dropdownSelectedItem?.itemSelectedId) {
      if (dropdownSelectedItem.type === 'cancelShipment') {
        changeColorOfEventHandler('#aeaeae', false, 'Cancellation');
      } else {
        changeColorOfEventHandler('#615E9B')
      }
    }
  }, [props.isSendRequestProcess])

  useEffect(() => {
    Object.keys(ganttChartTableMapping).forEach(e => {
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
          Object.keys(ganttChartTableMapping).forEach(f => {
            if (f !== e) {
              const hideEl = document.getElementById(`chart-tooltip-${f}`)
              hideEl.classList.add("hide")
            }
          })
        })
      }
    })
  }, [])

  const hideFilterElement = (dataKey) => {
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

  const onResetFilter = (dataKey) => {
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
  }, [filterCondition])

  return (
    <div className="rts-table-container scroll" id="scrollableDiv">
      <div
        className="container-orderbank gant-chart-table"
        style={{ maxWidth: "100%" }}
      >
        <Row style={{}} className="w-100">
          <Col lg={12}>
            <BryntumSchedulerPro
              {...schedulerproConfig}
              events={eventsData}
              resources={props.ganttChartData.table}
              syncDataOnLoad
              ref={schedulerProRef}
            // other props, event handlers, etc
            />
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
      <ConfirmDNStatusModal
        isOpen={modal}
        onSend={sendRequestsHandler}
        onCancel={toggle}
        headerContent={dropdownSelectedItem?.header || ''}
        bodyContent={`Are you sure you want to ${dropdownSelectedItem?.body || ''}`}
        styleColor={dropdownSelectedItem?.styleColor}
      />
      {displayDblclick &&
        <OrderBankShipmentModal open={displayDblclick} istoggle={toggleShipment} CloseModal={toggleShipment} />
      }
    </div>
  )
}

const mapStateToProps = ({ orderBank }) => {
  return {
    isSendRequestProcess: orderBank.isSendRequestProcess,
    ganttChartData: orderBank.ganttChart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processPaymentInGanttChart: (params) => dispatch(processPaymentInGanttChart(params)),
    processCancelPaymentInGanttChart: (params) => dispatch(cancelPaymentInGanttChart(params)),
    processSendOrderInGanttChart: (params) => dispatch(sendOrderInGanttChart(params)),
    getRTSOderBankGanttChart: (params) => dispatch(getRTSOderBankGanttChart(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BryntumChartTable)