import React, { Component, useMemo, useState, useEffect, useCallback } from "react"
import { connect,useSelector } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  ButtonDropdown,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
  Popover,
  PopoverBody,
} from "reactstrap"
import AuditLog from "components/Common/AuditLog";
import "./style.scss"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import eyeIcon from "../../assets/images/auditlog-eye.svg"
import awsmLogo from "../../assets/images/AWSM-logo-order-bank.png"
import NewOrderModal from "./addOrderBankModal"
import DateRangePicker from "../../components/Common/DateRangePicker"
import AWSMDropdown from "../../components/Common/Dropdown"
import OrderBankTable from "./OrderBankTable"
import REGION_TERMINAL from "../../common/data/regionAndTerminal"
import customiseTableIcon from "../../assets/images/AWSM-Customise-Table.svg"
import CustomizeTableModal from "../../common/CustomizeTable"

import { FormControlLabel } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

import GanttChartBottom from "./helper.js"


import {
  ganttChartTableColumns, ganttChartTableDefaultColumns,
  ganttChartTableMapping,
  tableColumns,
  tableMapping
} from "./OrderBankTable/tableMapping"
import { format } from "date-fns"
import {
  getRTSOrderBankTableData,
  sendOrderBankDN,
  refreshOderBankDN,
  getOrderBankAuditLog,
  dragOrderBankToGanttChart,
} from "../../store/orderBank/actions"
import OrderBankActionModal from "./OrderBankActionModal"
import CrossTerminalModal from "./crossTerminalModal"
import BryntumChartTable from "./OrderBankTable/BryntumChartTable"
import BryntumChartShipment from "./OrderBankTable/BryntumChartShipment"
import CustomRadioButton from "components/Common/CustomRadioButton"
import OrderBankRunAutoModal from "./OrderBankRunAutoModal"
import OrderBankSendBulkModal from "./OrderBankSendBulkModal"
import AWSMAlert from "../../components/Common/AWSMAlert"
import selectAllIcon2 from "../../assets/images/AWSM-Checked-box.svg"
import selectAllIcon3 from "../../assets/images/AWSM-Checkbox.svg"
import {bryntumSchedulerTableNameForCookie} from "./OrderBankTable/BryntumChartTable"
import { getCookieByKey } from "../DQM/Common/helper"
import { DragDropContext} from "react-beautiful-dnd"

import { isNull } from "lodash"
import { removeKeywords } from "../DQM/Common/helper"
import ClearScheduling from "./clearScheduling";

const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />

import { ReactSVG } from "react-svg";
import UploadDMRModal from "./uploadDMRModal";
import DeleteMultipleModal from "./deleteMultiple";

const GanttChartBottomHover = [
  {
    title: "Terminal",
    color: "blue",
  },
  {
    title: "Station retail",
    color: "light-sky",
  },
  {
    title: "station commercial",
    color: "green",
  },
]

const GanttChartFilterButtons = [
  {
    label: "Backlog",
    value: "backlog",
  },
  {
    label: "Future",
    value: "future",
  },
  {
    label: "Special Request",
    value: "request",
  },
  {
    label: "High Priority",
    value: "high",
  },
]

function OrderBank({
  getRTSOrderBankTableData,
  orderBankTableData,
  sendOrderBankDN,
  refreshOderBankDN,
  onGetOrderBankAuditLog,
  dragOrderBankToGanttChart,
}) {
  let orderBankSettings = [
    {
      disabled: false,
      value: "newOrder",
      label: "Add New Order",
      icon: customiseTableIcon,
    },
    {
      disabled: false,
      value: "uploadDmr",
      label: "Upload DMR",
      icon: customiseTableIcon,
    },
    {
      disabled: false,
      value: "customizeCol",
      label: "Customize Column",
      icon: customiseTableIcon,
    },
    // {disabled: false, 'value': 'RefreshDN', 'label': 'Refresh Blocked DN', 'icon' : customiseTableIcon },
    {
      disabled: true,
      value: "CrossTerminal",
      label: "Cross Terminal",
      icon: customiseTableIcon,
    },
    {
      disabled: true,
      value: "SendDN",
      label: "Send Multiple for DN",
      icon: customiseTableIcon,
    },
    {
      disabled: false,
      value: "DeleteMultiple",
      label: "Delete Multiple Order",
      icon: customiseTableIcon,
    },
  ]
  let orderBankStatus = [
    {
      value: "unscheduled",
      label: "Unscheduled",
    },
    {
      value: "scheduled",
      label: "Scheduled",
    },
    {
      value: "all",
      label: "All",
    },
  ]
  let deleteCheckOption = [
    {
      id: 0,
      title: 'Manual Scheduling',
      checked: true,
    },
    {
      id: 1,
      title: 'Auto Scheduling',
      checked: false,
    },
  ]
  const ganttChartEvents = useSelector(state => state.orderBank.ganttChart.event)
  const [orderSummary, setOrderSummary] = useState({DNs : 0,shipment : 0,backlog : 0,SR : 0,HP : 0})
  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)
  const [crossTerminal, setCrossTerminal] = useState(false)
  const [uploadDmr, setUploadDmr] = useState(false)  
  const [deleteMultiple, setDeleteMultiple] = useState(false)    
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [searchFields, setSearchFields] = useState(getCookieByKey("Order Bank")
  ? JSON.parse(getCookieByKey("Order Bank"))
  : tableColumns,)
  const [region, setRegion] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const [refreshDNModal, setRefreshDNModal] = useState(false)
  const [displayAutoModal, setDisplayAutoModal] = useState(false)
  const [showClearAlert, setShowClearAlert] = useState(false)  
  const [displayBulkModal, setDisplayBulkModal] = useState(false)
  const [ganttChartAllRadio, setGanttChartAllRadio] = useState("")
  // {high:false, request: false, future: false, backlog: false}
  const [sendDNModal, setSendDNModal] = useState(false)
  const [status, setStatusDropdown] = useState("Unscheduled")
  const [shiftDate, setShiftDate] = useState({
    type: "single",
    days: [format(Date.now(), "yyyy-MM-dd")],
  })
  const [orderBankSetting, setOrderBankSetting] = useState(orderBankSettings)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [snackStatus, setSnackStatus] = useState('')
  const [snackMessage, setSnackMessage] = useState('')
  const [showSnackAlert, setShowSnackAlert] = useState(false)
  const [showDeleteOption, setShowDeleteOption] = useState(false)
  const [clearScheduling, setClearScheduling] = useState(false)  
  const [deleteCheck, setDeleteCheck] = useState(deleteCheckOption)
  const [checkedValue, setCheckedValue] = useState('Manual Scheduling')
  const [isCustomizeGanttModalOpen,setIsCustomizeGanttModalOpen] = useState(false)
  const [bryntumCurrentColumns,setBryntumCurrentColumns] = useState(()=>{
    if (!getCookieByKey(bryntumSchedulerTableNameForCookie)) return ganttChartTableDefaultColumns
    const cookieParseData = JSON.parse(getCookieByKey(bryntumSchedulerTableNameForCookie))
    if (cookieParseData.length < 4) return ganttChartTableDefaultColumns
    const columns = {vehicle:{...ganttChartTableMapping["vehicle"]}}
    cookieParseData.forEach((col)=>{
      columns[col] = {...ganttChartTableMapping[col]}
    })
    return columns
  })
  useEffect(()=>{
    const results = {DNs : 3,shipment : 2,backlog : 0,SR : 0,HP : 0};
    if(ganttChartEvents){
      ganttChartEvents.forEach(item => {
        if(item.eventFilter === "backlog") results.backlog++;
        if(item.eventFilter === "request") results.SR ++;
        if(item.eventFilter === "high") results.HP ++;
      })
    }
    setOrderSummary(results)
  },[ganttChartEvents])
  const toggle = () => setOpen(!dropdownOpen)
  const terminalList = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region])

  const onSettingClick = val => {
    if (val === "newOrder") {
      setShowNewOrder(true)
    } else if (val === "customizeCol") {
      setShowCustomize(true)
    } else if (val === "RefreshDN") {
      setRefreshDNModal(true)
    } else if (val === "SendDN") {
      setSendDNModal(true)
    } else if (val === "CrossTerminal") {
      setCrossTerminal(true)
    } else if (val === "uploadDmr") {
      setUploadDmr(true)
    } else if (val === "DeleteMultiple") {
      setDeleteMultiple(true)
    }
  }
  const onCloseCustomize = () => {
    setShowCustomize(false)
  }

  const onCloseUploadDMR = () => {
    setUploadDmr(false)
  }

  const onCloseDeleteMultiple = () => {
    setDeleteMultiple(false)
  }  

  const onCloseCrossTerminal = () => {
    setCrossTerminal(false)
  }

  const onCloseNewOrder = () => {
    setShowNewOrder(false)
  }

  const enabledCross = val => {
    if (val !== 0) {
      let temp = [...orderBankSetting]
      temp.map(function (item, index) {
        if (item.value === "CrossTerminal" || item.value === "SendDN" || item.value === 'DeleteMultiple') {
          item.disabled = false
        }
      })
      setOrderBankSetting(temp)
    } else {
      let temp = [...orderBankSetting]
      temp.map(function (item, index) {
        if (item.value === "CrossTerminal" || item.value === "SendDN" || item.value === 'DeleteMultiple') {
          item.disabled = true
        }
      })
      setOrderBankSetting(temp)
    }
  }
  useEffect(() => {
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "commercial_customer",
    }
    onGetOrderBankAuditLog(payload)
  }, [])

  useEffect(() => {
    getRTSOrderBankTableData({ region, terminal, shiftDate, status })
  }, [region, terminal, shiftDate, status])

  const onTableColumnsChange = columns => {
    setSearchFields(columns)
    // getCustomerData();
  }

  const onSendOrderBankDN = () => {
    sendOrderBankDN(orderBankTableData.filter(e => e.isChecked))
  }

  const onRefreshOrderBankDN = () => {
    refreshOderBankDN(orderBankTableData.filter(e => e.isChecked))
  }

  const changeGanttChartOption = async (e, val) => {
    let temp = { ...ganttChartAllRadio }
    Object.keys(temp).map(function (keyName, keyIndex) {
      temp[keyName] = keyName === val ? e.target.checked : false
    })
    await setGanttChartAllRadio(temp)
  }

  const istoggle = () => {
    setShowAuditModal(!showAuditModal)
  }

  const CloseModal = () => {
    setShowAuditModal(false)
  }

  const istoggleAuto = (status, message) => {
    setDisplayAutoModal(!displayAutoModal)
    setShowSnackAlert(true);
    setSnackMessage(message);
    setSnackStatus(status);
  }

  const CloseAutoModal = () => {
    setDisplayAutoModal(false)
  }

  const istoggleBulk = (status, message) => {
    setDisplayBulkModal(!displayBulkModal)
    setShowSnackAlert(true);
    setSnackMessage(message);
    setSnackStatus(status);
  }

  const CloseBulkModal = () => {
    setDisplayBulkModal(false)
  }

  const toggleClear = () => {
    setClearScheduling(!clearScheduling);
  }

  const showConfirmAlert = () => {
    setClearScheduling(!clearScheduling);
    setShowClearAlert(true);
  }

  const onFullScreen = () => {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }
  const changeGanttChartAllRadio = useCallback(event => {
    const target = event.target
    const value = target.value
    if (value === ganttChartAllRadio && target.checked) {
      target.checked = false
      return setGanttChartAllRadio("")
    }
    target.checked = true
    return setGanttChartAllRadio(value)
  },[ganttChartAllRadio])

  const toggleCustomizeModal = ()=> {
    setIsCustomizeGanttModalOpen((prevState)=> !prevState)
  }
  const onChangeBryntumSchedulerColumns = (newColumnsList) =>{
    if(newColumnsList){
      setBryntumCurrentColumns((prevCols)=>{
        const columns = {vehicle: {...ganttChartTableMapping["vehicle"]}}
        newColumnsList.forEach((col)=>{
          columns[col] = {...ganttChartTableMapping[col]}
        })
        if(JSON.stringify(columns) === JSON.stringify(prevCols)) {
          return prevCols
        }
        return {...columns}
      })
    }
  }

  const onDragEnd = ({ destination }) => {
     if (destination) {
       dragOrderBankToGanttChart()
     }
  }

  const toggleDownload = () => {
    setShowDeleteOption(!showDeleteOption);
  }

  const ConfirmClearModal = () => {
    setShowDeleteOption(!showDeleteOption);
    setClearScheduling(true);
  }

  const getCheckedDownloadVal = (index) => {
    const temp = [...deleteCheck];
    let temp1 = [];
    temp[index].checked = !temp[index].checked
    temp.map((item, index) => {
      if(item.checked === true){
        temp1.push(item.title);
      }
    })
    var temp2 = temp1.join().split(',');
    var temp3 = temp2.length > 0 ? temp2[0] + ' & ' + temp2[1] : temp2;
    setCheckedValue(temp3);
    setDeleteCheck(temp);
  }

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="order-bank-page-content">
        <div className="container-fluid">
          <Card className="order_bank_main d-block">
            <CardBody>
              <Row className="border_btm">
                <Col lg={3} md={3} sm={12}>
                  <div className="h-100">
                    <Nav pills justified>
                      <NavItem>
                        <NavLink
                          className={activeTab === "1" ? "active" : ""}
                          onClick={() => setActiveTab("1")}
                        >
                          <span className="d-none d-sm-block">Gantt Chart</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "2" ? "active" : ""}
                          onClick={() => setActiveTab("2")}
                        >
                          <span className="d-none d-sm-block">Shipment</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Col>
                <Col lg={9} md={9} sm={12} className="top_right_section">
                  <div className="d-flex align-item-right ">
                    <a className="border-before">
                      <img
                        src={awsmLogo}
                        height="25px"
                        width="80px"
                        className="ml-3"
                      />
                    </a>
                    <a className="border-before" onClick={onFullScreen}>
                      <i className="bx bx-fullscreen ml-3"/> Fullscreen
                    </a>
                    <a className="border-before" onClick={istoggle}>
                      <img src={eyeIcon} alt="info" className="ml-3" /> View
                      Audit Log
                    </a>
                    <span className="bl-1-grey-half plr-15">
                      <Button
                        color={"primary"}
                        onClick={() => setDisplayAutoModal(!displayAutoModal)}
                      >
                        Run Auto Schedule
                      </Button>
                    </span>
                    <span className="bl-1-grey-half plr-15">
                      <Button
                        color={"primary"}
                        onClick={() => setDisplayBulkModal(!displayBulkModal)}
                      >
                        Send Bulk Shipment
                      </Button>
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="remove_border pb-0 mt-3">
                <Col lg={6} className="order-bank-bar pr-0">
                  <div className="order-bank-shift-date">
                    <div>DATE</div>
                    <DateRangePicker
                      types={["single"]}
                      startDate={null}
                      defaultValue={shiftDate}
                      onChange={value => setShiftDate(value)}
                    />
                  </div>
                  <p className="order-bank-region-label">
                    REGION & TERMINAL
                  </p>
                  <div className="order-bank-region">
                    <AWSMDropdown
                      value={region}
                      onChange={value => {
                        setRegion(value)
                        setTerminal(null)
                      }}
                      items={REGION_TERMINAL.map(e => e.region)}
                    />
                  </div>
                  <div className="order-bank-region ml-2">
                    <AWSMDropdown
                      value={terminal}
                      onChange={value => setTerminal(value)}
                      items={terminalList}
                    />
                  </div>
                </Col>

                <Col className='order-bank-bar right pl-0'>
                  <IconButton
                    aria-label="delete"
                    onClick={toggleCustomizeModal}
                    className='delete_btn'
                  >
                    <img src={customiseTableIcon} alt="" />
                  </IconButton>


                          <button
                            id="ClearScheduling"
                            className="btn btn-outline-primary excel-btn-container pdf-btn"
                          >
                            <div className="excel-download-btn">
                              <span className="download-button-message">
                                Clear Scheduling
                                <ArrowDropDownIcon />
                              </span> 
                            </div>
                          </button>
                          <Popover
                            target="ClearScheduling"
                            placement="bottom"
                            isOpen={showDeleteOption}
                            trigger="legacy"
                            style={{ width: "auto" }}
                            toggle={toggleDownload}
                          >
                            <PopoverBody className="sla-rbd-download">
                              <>
                                {deleteCheck.length > 0 &&
                                  deleteCheck.map((row, index) => {
                                    return (
                                      <div
                                        key={row.title}
                                        className={`d-flex align-items-center ${
                                          row.checked ? "item-checked" : ""
                                        }`}
                                      >
                                        <FormControlLabel
                                          key={`${row.title}`}
                                          value={`${row.title}`}
                                          onChange={() => getCheckedDownloadVal(index)}
                                          checked={row.checked}
                                          className="checkmark"
                                          control={
                                            <Checkbox
                                              icon={<UntickIcon />}
                                              checkedIcon={<CheckedIcon />}
                                              style={{
                                                height: "20px",
                                                width: "5px",
                                                marginLeft: "16px",
                                                marginTop: "8px",
                                              }}
                                            />
                                          }
                                          label={
                                            isNull(row.title)
                                              ? "-"
                                              : removeKeywords(row.title)
                                          }
                                        />
                                      </div>
                                    )
                                  })}
                                <div id="myMm" style={{ height: "1mm" }} />
                                <div className="pdf-wid">
                                  <button
                                    className="btn btn-primary excel-btn-container pdf-btn"
                                    onClick={ConfirmClearModal}
                                  > Clear </button>
                                </div>
                              </>
                            </PopoverBody>
                          </Popover>


                  {
                    activeTab === "1"  && <div className='d-flex align-items-center justify-content-between radio_option m-0 order-bank-label'>
                      {
                        GanttChartFilterButtons && GanttChartFilterButtons.length > 0 &&
                        GanttChartFilterButtons.map((button,index)=>{
                          const {value,label} = button;
                          return <CustomRadioButton key={`${index}-${value}`}
                                                    label={label} value={value}
                                                    checked={ganttChartAllRadio === value}
                                                    name="radio-bryntum-scheduler"
                                                    onClick={changeGanttChartAllRadio}/>
                        })
                      }
                    </div>
                  }
                  <span className="m-0 order-bank-label">
                    {`${orderSummary.DNs} DNs, ${orderSummary.shipment} shipments, ${orderSummary.backlog} backlog, ${orderSummary.SR} SR, ${orderSummary.HP} HP`}
                    </span>
                </Col>
               
              </Row>
              <div>
                <TabContent activeTab={activeTab} className="pt-2">
                  <TabPane tabId="1">
                    <div className="gantt_chart_main">
                      <div className="gantt_chart_first pb-4">
                        <BryntumChartTable
                          currentTab={activeTab}
                          ganttChartAllRadio={ganttChartAllRadio}
                          bryntumCurrentColumns={bryntumCurrentColumns}
                        />
                        <div className="square_border">
                          {GanttChartBottom.map((item, index) => {
                            return (
                              <div className="d-flex align-items-center mr-2">
                                <div className={`square ${item.color} mr-1 ml-2`} >
                                  {item.icon && <ReactSVG src={item.icon} className="icon-in-square"/>}
                                  </div>
                                {item.title}
                              </div>
                            )
                          })}
                          <div id="gethighlight" className="hover_display">
                            {GanttChartBottomHover.map((item, index) => {
                              return (
                                <div className="d-flex align-items-center mr-2" key={index}>
                                  <div className={`square ${item.color} mr-1 ml-2`} />
                                  {item.title}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="shipment_main">
                      <div className="gantt_chart_first pb-4">
                        <BryntumChartShipment
                          currentTab={activeTab}
                          ganttChartAllRadio={ganttChartAllRadio}
                          bryntumCurrentColumns={bryntumCurrentColumns}
                        />
                        {
                          activeTab === "1" && (
                            <div className="square_border">
                              {GanttChartBottom.map((item, index) => {
                                return (
                                  <div className="d-flex align-items-center mr-2" key={index}>
                                    <div className={`square ${item.color} mr-1 ml-2`} />
                                    {item.title}
                                  </div>
                                )
                              })}
                              <div id="gethighlight" className="hover_display">
                                {GanttChartBottomHover.map((item, index) => {
                                  return (
                                    <div className="d-flex align-items-center mr-2" key={index}>
                                      <div className={`square ${item.color} mr-1 ml-2`} />
                                      {item.title}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
            <div className="gantt_chart_second pt-2 px-4">
              <Row className="remove_border">
                <Col lg={9} className="order-bank-bar">
                  <h4 className="m-0 order-bank-label">Order Bank</h4>
                  <div className="order-bank-shift-date">
                    <div>DATE</div>
                    <DateRangePicker
                      types={["single", "range"]}
                      startDate={null}
                      defaultValue={shiftDate}
                      onChange={value => setShiftDate(value)}
                    />
                  </div>
                  <p className="order-bank-region-label">
                    REGION & TERMINAL
                  </p>
                  <div className="order-bank-region">
                    <AWSMDropdown
                      value={region}
                      onChange={value => {
                        setRegion(value)
                        setTerminal(null)
                      }}
                      items={REGION_TERMINAL.map(e => e.region)}
                    />
                  </div>
                  <div className="order-bank-region ml-2">
                    <AWSMDropdown
                      value={terminal}
                      onChange={value => setTerminal(value)}
                      items={terminalList}
                    />
                  </div>
                  <p className="order-bank-region-label">STATUS</p>
                  <div className="order-bank-region">
                    <AWSMDropdown
                      value={status}
                      onChange={value => setStatusDropdown(value)}
                      items={orderBankStatus.map(e => e.label)}
                    />
                  </div>
                </Col>
                

                <Col lg={3} className="order-bank-bar right" id="order-bank-main">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      data-toggle="dropdown"
                      tag="div"
                      aria-expanded={dropdownOpen}
                    >
                      <IconButton
                        color="primary"
                        aria-label="Setting"
                        component="span"
                        className="setting_icon"
                        fontSize="large"
                        style={{ color: "rgba(0,0,0,0.5)" }}
                        aria-haspopup="true"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </DropdownToggle>
                    <DropdownMenu
                      right
                      className="awsm-option-button-content order-bank-transform"
                    >
                      {orderBankSetting.map((option, index) => {
                        return (
                          <MenuItem
                            disabled={option.disabled}
                            onClick={() =>
                              onSettingClick(option.value)
                            }
                          >
                            {option.icon && <img src={option.icon} />}
                            <div
                              className="pl-2"
                              disabled
                              key={index}
                            >
                              {option.label}
                            </div>
                          </MenuItem>
                        )
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  <span className="m-0 order-bank-label">
                              141 orders, 3.2m ASR, 1.2m SMP, 1m Comm. Total
                              5.4m
                            </span>
                </Col>
              </Row>
              <OrderBankTable
                tableColumns={searchFields}
                dataSource={orderBankTableData || []}
                enabledCross={enabledCross}
              />
            </div>
            <NewOrderModal open={showNewOrder} onCancel={onCloseNewOrder} />
            <CustomizeTableModal
              open={isCustomizeGanttModalOpen}
              closeDialog={toggleCustomizeModal}
              tableName={bryntumSchedulerTableNameForCookie}
              availableMetric={ganttChartTableMapping}
              initialMetric={ganttChartTableColumns}
              defaultMetric={ganttChartTableColumns}
              maxMetrics={ganttChartTableColumns.length}
              onChange={onChangeBryntumSchedulerColumns}
            />
            <CrossTerminalModal
              open={crossTerminal}
              onCancel={onCloseCrossTerminal}
              onSave={onCloseCrossTerminal}
            />
            <UploadDMRModal
              open={uploadDmr}
              onCancel={onCloseUploadDMR}
              onSave={onCloseUploadDMR}
            />     
            <DeleteMultipleModal
              open={deleteMultiple}
              onCancel={onCloseDeleteMultiple}
              onSave={onCloseDeleteMultiple}
            />                        
            <CustomizeTableModal
              open={showCustomize}
              onCancel={onCloseCustomize}
              tableName="Order Bank"
              onChange={onTableColumnsChange}
              open={showCustomize}
              closeDialog={onCloseCustomize}
              availableMetric={tableMapping}
              initialMetric={searchFields}
              defaultMetric={tableColumns}
            />
            <OrderBankActionModal
              open={sendDNModal}
              title="Send Multiple for DN"
              subTitle="This action cannot be undone, are you sure you want to send this multiple orders for DN Creation? "
              onClose={() => setSendDNModal(false)}
              onSubmit={onSendOrderBankDN}
              type="SendDN"
            />
            <OrderBankActionModal
              open={refreshDNModal}
              title="Refresh Blocked DN"
              subTitle="This action cannot be undone, are you sure you want to refresh all Blocked DN? "
              onClose={() => setRefreshDNModal(false)}
              onSubmit={onRefreshOrderBankDN}
              type="RefreshDN"
            />
            {showAuditModal && (
              <AuditLog
                rowsAudit={6}
                subModule="order-bank"
                isOpen={showAuditModal}
                toggle={istoggle}
              />
            )}
            {displayAutoModal && (
              <OrderBankRunAutoModal
                open={displayAutoModal}
                istoggle={istoggleAuto}
                CloseModal={CloseAutoModal}
              />
            )}
            {displayBulkModal && (
              <OrderBankSendBulkModal
                open={displayBulkModal}
                istoggle={istoggleBulk}
                CloseModal={CloseBulkModal}
              />
            )}
            {showSnackAlert && (
              <AWSMAlert
                status={snackStatus}
                message={snackMessage}
                openAlert={showSnackAlert}
                closeAlert={() => setShowSnackAlert(false)}
              />
            )}
            {showClearAlert && (
              <AWSMAlert
                status='success'
                message='All scheduling has been successfully cleared'
                openAlert={showClearAlert}
                closeAlert={() => setShowClearAlert(false)}
              />
            )}            
          </Card>
        </div>
      </div>
      {clearScheduling === true && 
        <ClearScheduling clearScheduling={clearScheduling} checkedValue={checkedValue} toggle={toggleClear} showConfirmAlert={showConfirmAlert} />
      }
      </DragDropContext>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  getRTSOrderBankTableData: params =>
    dispatch(getRTSOrderBankTableData(params)),
  refreshOderBankDN: params => dispatch(refreshOderBankDN(params)),
  sendOrderBankDN: params => dispatch(sendOrderBankDN(params)),
  onGetOrderBankAuditLog: payload => dispatch(getOrderBankAuditLog(payload)),
  dragOrderBankToGanttChart: () => dispatch(dragOrderBankToGanttChart())
})

const mapStateToProps = ({ orderBank }) => ({
  orderBankTableData: orderBank.orderBankTableData,
  auditsCom: orderBank.auditsCom,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBank)