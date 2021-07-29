import React, { useEffect, useMemo, useRef, useState } from "react"
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
  ganttChartTableData,
  ganttChartTableEvents,
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
import { processPaymentInGanttChart } from "../../../store/actions"

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
}) => {

  const originalDataList = useMemo(() => {
    return filterData.map(e => e[filterKey])
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
      onApply({ filterKey })
    }
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
      {data.map(
        (e, index) =>
          e.visible && (
            <div
              className={`chart-column-select-item ${
                e.checked ? "checked" : " "
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
          <button className="btn btn-outline-primary" onClick={onReset}>
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
  const [tableData, setTableData] = useState(ganttChartTableData)
  const [modal, setModal] = useState(false);
  const [dropdownSelectedItem, setDropdownSelectedItem] =  useState(null);
  const toggle = () => setModal(!modal);
  const schedulerProRef = useRef()
  const [filterList, setFilterList] = useState(
    Object.keys(ganttChartTableMapping).map(e => ({
      key: e,
      isOpen: false,
    }))
  )

  const updateModalHandler = (type) =>{
    let data = {};
    switch(type){
        case 'shipment':{
            data.header = 'Create Shipment'
            data.body = 'Shipment Creation'
            break
        }
        default:{
            data.header = ''
            data.body = ''
            break
        }
    }
    toggle()
    setDropdownSelectedItem(data)
}

const sendRequestsHandler = () =>{
    toggle()
    props.processPaymentInGanttChart('abc')
}

  const schedulerproConfig = {
    columns: [],
    events: ganttChartTableEvents,
    autoHeight: true,
    rowHeight: 40,
    barMargin: 0,
    resourceMargin: 0,
    autoAdjustTimeAxis: false,
    fillTicks: true,
    eventRenderer:({ eventRecord, renderData  }) => {
      // customize content for event in here marquee
      return `
      <div class="eventCustomize marquee" onmouseover="document.getElementById('gethighlight').style.display = 'flex';" onmouseout="document.getElementById('gethighlight').style.display = 'none';">
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
      </div>
      `
    },
    features: {
      eventTooltip:{
        disabled : true
      },
      eventCopyPaste : false,
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
    // viewPreset: "hourAndDay",
    nonWorkingTimeFeature: true,
    resourceTimeRangesFeature: true,
    maxTimeAxisUnit: "hour",
    eventMenuFeature: {
        items: {
        editEvent : false,
        deleteEvent : false,
          cancel:{
            text: 'Cancel',
            onItem({ source, eventRecord }) {
              updateModalHandler()
            }
          },
          sendOrderForDS:{
            text: 'Send OrderS For DS',
            onItem({ source, eventRecord }) {
              updateModalHandler()
            }
          },
          createShipment:{
            text: 'Create Shipment',
            onItem({ source, eventRecord }) {
              updateModalHandler('shipment')
            }
          },
          terminalRelay:{
            text: 'Terminal Relay',
            onItem({ source, eventRecord }) {
              updateModalHandler()
            }
          },
          plannedLoadTime:{
            text: 'Planned Load Time',
            onItem({ source, eventRecord }) {
              updateModalHandler()
            }
          },
        }
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



  const onShiftDateChange = (recordId, value) => {
    const scheduler = schedulerProRef.current.instance
    const recordIndex = tableData.findIndex(e => e.id === recordId)
    if (recordIndex >= 0) {
      tableData[recordIndex] = { ...tableData[recordIndex], shift: value }
    }
    scheduler.resourceStore.data = [...tableData]
    setTableData([...tableData])
  }

  for (const tableMap of Object.keys(ganttChartTableMapping)) {
    schedulerproConfig.columns.push({
      text: ganttChartTableMapping[tableMap].label,
      field: tableMap,
      width: "auto",
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
                        <title>AWSM Calendar</title>
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

  const hover = document.getElementsByClassName(`b-sch-event`);//eventCustomize
  const bottom_target = document.getElementsByClassName(`hover_display`);
 
  if (hover) {
    hover.onmouseover = function() {
      console.log("here", hover);
      bottom_target.style.display = 'flex';
    }
    
    hover.onmouseout = function() {
      bottom_target.style.display = 'none';
    }    
    // hover.addEventListener("mouseenter", event => {      
      // hover.style.display = 'flex';
      // bottom_target.setAttribute("style", "display:flex;");
    // })
    // hover.addEventListener("mouseleave", event => {
    //   console.log("here1", hover);
    //   bottom_target.setAttribute("style", "display:none;");
    // })
  }

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
              resources={tableData}
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
              filterData={tableData}
            />
          )
        })}
      </div>
      <ConfirmDNStatusModal
        isOpen={modal}
        onSend={sendRequestsHandler}
        onCancel={toggle}
        headerContent={dropdownSelectedItem?.header || ''}
        bodyContent={`Are you sure you want to proceed for ${dropdownSelectedItem?.body || ''}`}/>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => {
    return {
        processPaymentInGanttChart: (params) => dispatch(processPaymentInGanttChart(params))
    }
}

export default  connect(null, mapDispatchToProps)(BryntumChartTable)
