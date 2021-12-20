import React, { useMemo, useState, useEffect, useCallback } from "react"
import { connect, useSelector } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
  Popover,
  PopoverBody,
} from "reactstrap"
import AuditLog from "components/Common/AuditLog"
import "./style.scss"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, MenuItem } from "@material-ui/core"
import awsmLogo from "assets/images/AWSM-logo-order-bank.png"
import NewOrderModal from "./addOrderBankModal"
import DateRangePicker from "components/Common/DateRangePicker"
import AWSMDropdown from "components/Common/Dropdown"
import OrderBankTable from "./OrderBankTable"
import REGION_TERMINAL, { TERMINAL_CODE_MAPPING } from "common/data/regionAndTerminal"
import customiseTableIcon from "assets/images/AWSM-Customise-Table.svg"
import CustomizeTableModal from "components/Common/CustomizeTable"

import { FormControlLabel } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

import {
  GanttChartBottom,
  GanttChartBottomHover,
  GanttChartFilterButtons,
  orderBankSettings,
  orderBankStatus,
  deleteCheckOption,
} from "./helper.js"

import {
  ganttChartTableColumns,
  ganttChartTableDefaultColumns,
  ganttChartTableMapping,
  tableColumns,
  tableMapping,
} from "./OrderBankTable/tableMapping"
import { format } from "date-fns"
import {
  getRTSOrderBankTableData,
  sendOrderBankDN,
  refreshOderBankDN,
  getOrderBankAuditLog,
  dragOrderBankToGanttChart,
  getClearScheduling,
  getdeleteMultipleOrder,
  getCrossTerminal,
  getSendBulkShipment,
  getRunAutoScheduling,
  getRTSOderBankGanttChart,
  clearGanttData,
} from "store/orderBank/actions"
import OrderBankActionModal from "./OrderBankActionModal"
import CrossTerminalModal from "./crossTerminalModal"
import BryntumChartTable from "./OrderBankTable/BryntumChartTable"
import BryntumChartShipment from "./OrderBankTable/BryntumChartShipment"
import CustomRadioButton from "components/Common/CustomRadioButton"
import OrderBankRunAutoModal from "./OrderBankRunAutoModal"
import OrderBankSendBulkModal from "./OrderBankSendBulkModal"
import AWSMAlert from "components/Common/AWSMAlert"
import selectAllIcon2 from "assets/images/AWSM-Checked-box.svg"
import selectAllIcon3 from "assets/images/AWSM-Checkbox.svg"
import { bryntumSchedulerTableNameForCookie } from "./OrderBankTable/BryntumChartTable"
import { getCookieByKey } from "../DQM/Common/helper"
import { DragDropContext } from "react-beautiful-dnd"
import {
  AddOrderIcon,
  UploadIcon,
  CustomEyeIcon,
  DeleteOrderIcon,
  CustomizeTableIcon,
  CrossTerminalIcon,
  MultipleDNIcon,
} from "pages/DQM/Common/icon"

import { isNull } from "lodash"
import { removeKeywords } from "../DQM/Common/helper"
import ClearScheduling from "./clearScheduling"
import { transformObjectToStringSentenceRTS, filterObject } from "./../DQM/Common/helper"
const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />

import { ReactSVG } from "react-svg"
import UploadDMRModal from "./uploadDMRModal"
import DeleteMultipleModal from "./deleteMultiple"
// import { sendMessage } from "SocketService"

function OrderBank({
  getRTSOrderBankTableData,
  orderBankTableData,
  orderBankTableFilters,
  sendOrderBankDN,
  refreshOderBankDN,
  onGetOrderBankAuditLog,
  onGetClearScheduling,
  onGetSendBulkShipment,
  onGetRunAutoScheduling,
  onGetDeleteMultipleOrder,
  onGetCrossTerminal,
  dragOrderBankToGanttChart,
  // socketData,
  multipleorder,
  getRTSOderBankGanttChart,
  clearGanttData,
}) {
  const ganttChartEvents = useSelector(state => state.orderBank.ganttChart.event)
  const [orderSummary, setOrderSummary] = useState({
    DNs: 0,
    shipment: 0,
    backlog: 0,
    SR: 0,
    HP: 0,
  })
  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)
  const [crossTerminal, setCrossTerminal] = useState(false)
  const [showAddNotification, setShowAddNotification] = useState(false)
  const [notiMessage, setNotiMessage] = useState("")
  const [uploadDmr, setUploadDmr] = useState(false)
  const [deleteMultiple, setDeleteMultiple] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [payloadFilter, setPayloadFilter] = useState({})
  const [searchFields, setSearchFields] = useState(
    getCookieByKey("Order Bank") ? JSON.parse(getCookieByKey("Order Bank")) : tableColumns
  )
  const [region, setRegion] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const [regionBank, setRegionBank] = useState(REGION_TERMINAL[0].region)
  const [terminalBank, setTerminalBank] = useState(REGION_TERMINAL[0].terminal[0])
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
    date_from: format(Date.now(), "yyyy-MM-dd"),
  })
  const [orderBankSetting, setOrderBankSetting] = useState(orderBankSettings)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [snackStatus, setSnackStatus] = useState("")
  const [snackMessage, setSnackMessage] = useState("")
  const [showSnackAlert, setShowSnackAlert] = useState(false)
  const [showDeleteOption, setShowDeleteOption] = useState(false)
  const [clearScheduling, setClearScheduling] = useState(false)
  const [showAlertDMR, setShowAlertDMR] = useState(false)
  const [deleteCheck, setDeleteCheck] = useState(deleteCheckOption)
  const [checkedValue, setCheckedValue] = useState("Manual Scheduling")
  const [isCustomizeGanttModalOpen, setIsCustomizeGanttModalOpen] = useState(false)
  const [multipleDeleteIds, setMultipleDeleteIds] = useState(false)
  const [deleteMultipleStatus, setDeleteMultipleStatus] = useState("")
  const [showDeleteMultiple, setShowDeleteMultiple] = useState(false)
  const [bryntumCurrentColumns, setBryntumCurrentColumns] = useState(() => {
    if (!getCookieByKey(bryntumSchedulerTableNameForCookie)) return ganttChartTableDefaultColumns
    const cookieParseData = JSON.parse(getCookieByKey(bryntumSchedulerTableNameForCookie))
    if (cookieParseData.length < 4) return ganttChartTableDefaultColumns
    const columns = { vehicle: { ...ganttChartTableMapping["vehicle"] } }
    cookieParseData.forEach(col => {
      columns[col] = { ...ganttChartTableMapping[col] }
    })
    return columns
  })
  const [currentPage, setCurrentPage] = useState(0)
  const [filterQuery, setfilterQuery] = useState("")
  const filterOrderBank = useMemo(() => {
    return {
      terminal: TERMINAL_CODE_MAPPING[terminal],
      dn_status: status,
      shift_date: shiftDate,
    }
  }, [terminal, shiftDate, status])

  useEffect(() => {
    clearGanttData()
    setTimeout(() => {
      getRTSOderBankGanttChart({
        limit: 10,
        page: 0,
        search_fields: "*",
        q: "",
        sort_dir: "desc",
        sort_field: "vehicle",
        filter: {
          shift_date: shiftDate,
        },
      })
    }, 100)
  }, [shiftDate])

  useEffect(() => {
    const results = { DNs: 3, shipment: 2, backlog: 0, SR: 0, HP: 0 }
    if (ganttChartEvents) {
      ganttChartEvents.forEach(item => {
        if (item.eventFilter === "backlog") results.backlog++
        if (item.eventFilter === "request") results.SR++
        if (item.eventFilter === "high") results.HP++
      })
    }
    setOrderSummary(results)
  }, [ganttChartEvents])

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
    /*sendMessage(JSON.stringify({
      "action": "getOrderBank",
      "data": {
        "region": region,
        "terminal": terminal,
        "shift_date": {"type": "range", "date_from": "2020-09-24", "date_to": "2020-09-26"},
        "dn_status": status,
        "page": currentPage,
        "limit": 10,
      } 
    }))*/
    getRTSOrderBankTableData({
      limit: 10,
      page: currentPage,
      // search_fields: transformArrayToString(searchFields),
      search_fields: "*",
      q: transformObjectToStringSentenceRTS(filterQuery),
      sort_dir: "asc",
      sort_field: "vehicle",
      filter: filterOrderBank,
    })
    setPayloadFilter({
      filterOrderBank: filterOrderBank,
      currentPage: currentPage,
      filterQuery: filterQuery,
    })
  }, [filterOrderBank, currentPage, filterQuery])

  const toggle = () => setOpen(!dropdownOpen)

  const terminalList = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region])

  const terminalListBank = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminalBank : []
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

  const onGetShowAlert = () => {
    setShowAlertDMR(!showAlertDMR)
  }

  const onCloseDeleteMultiple = () => {
    setDeleteMultiple(false)
  }

  const onSaveDeleteMultiple = async () => {
    const payload = { order_banks: multipleDeleteIds }
    await onGetDeleteMultipleOrder(payload)
    setDeleteMultiple(false)
    let temp = [...orderBankSetting]
    temp.map(function (item) {
      if (item.value === "DeleteMultiple") {
        item.disabled = true
      }
    })
    setOrderBankSetting(temp)
  }

  useEffect(() => {
    if (multipleorder) {
      getRTSOrderBankTableData({
        limit: 10,
        page: payloadFilter.currentPage,
        // search_fields: transformArrayToString(searchFields),
        search_fields: "*",
        q: transformObjectToStringSentenceRTS(payloadFilter.filterQuery),
        sort_dir: "asc",
        sort_field: "vehicle",
        filter: payloadFilter.filterOrderBank,
      })
      setDeleteMultipleStatus(multipleorder.order_banks !== undefined ? "success" : "error")
      setShowDeleteMultiple(true)
    }
  }, [multipleorder])

  const onCloseCrossTerminal = () => {
    setCrossTerminal(false)
  }

  const onSaveCrossTerminal = async (region, terminal) => {
    const payload = { order_id: multipleDeleteIds, terminal: terminal }
    await onGetCrossTerminal(payload)
    setCrossTerminal(false)
  }

  const onCloseNewOrder = (type, val = "") => {
    setShowNewOrder(false)
    type === "add" && setShowAddNotification(true)
    val === "success" ? setNotiMessage("success") : setNotiMessage("error")
    getRTSOrderBankTableData({
      limit: 10,
      page: payloadFilter.currentPage,
      // search_fields: transformArrayToString(searchFields),
      search_fields: "*",
      q: transformObjectToStringSentenceRTS(payloadFilter.filterQuery),
      sort_dir: "asc",
      sort_field: "vehicle",
      filter: payloadFilter.filterOrderBank,
    })
  }

  const enabledCross = val => {
    if (val !== 0) {
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === "CrossTerminal" || item.value === "SendDN") {
          item.disabled = false
        }
      })
      setOrderBankSetting(temp)
    } else {
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === "CrossTerminal" || item.value === "SendDN") {
          item.disabled = true
        }
      })
      setOrderBankSetting(temp)
    }
  }

  const deleteEnable = val => {
    if (val.length > 0) {
      let ids = []
      val.map(item => {
        ids.push(item.id)
      })
      setMultipleDeleteIds(ids)
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === "DeleteMultiple") {
          item.disabled = false
        }
      })
      setOrderBankSetting(temp)
    } else {
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === "DeleteMultiple") {
          item.disabled = true
        }
      })
      setOrderBankSetting(temp)
    }
  }

  const onTableColumnsChange = columns => {
    setSearchFields(columns)
    // getCustomerData();
  }

  const onSendOrderBankDN = () => {
    sendOrderBankDN(orderBankTableData.filter(e => e.isChecked).map(e => e.id))
  }

  const onRefreshOrderBankDN = () => {
    refreshOderBankDN(orderBankTableData.filter(e => e.isChecked))
  }

  const changeGanttChartOption = async (e, val) => {
    let temp = { ...ganttChartAllRadio }
    Object.keys(temp).map(function (keyName) {
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
    setShowSnackAlert(true)
    setSnackMessage(message)
    setSnackStatus(status)
  }

  const CloseAutoModal = () => {
    setDisplayAutoModal(false)
  }

  const istoggleBulk = (status, message) => {
    setDisplayBulkModal(!displayBulkModal)
    setShowSnackAlert(true)
    setSnackMessage(message)
    setSnackStatus(status)
  }

  const CloseBulkModal = () => {
    setDisplayBulkModal(false)
  }

  const toggleClear = () => {
    setClearScheduling(!clearScheduling)
  }

  const showConfirmAlert = () => {
    setClearScheduling(!clearScheduling)
    setShowClearAlert(true)
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
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
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
  const changeGanttChartAllRadio = useCallback(
    event => {
      const target = event.target
      const value = target.value
      if (value === ganttChartAllRadio && target.checked) {
        target.checked = false
        return setGanttChartAllRadio("")
      }
      target.checked = true
      return setGanttChartAllRadio(value)
    },
    [ganttChartAllRadio]
  )

  const toggleCustomizeModal = () => {
    setIsCustomizeGanttModalOpen(prevState => !prevState)
  }
  const onChangeBryntumSchedulerColumns = newColumnsList => {
    if (newColumnsList) {
      setBryntumCurrentColumns(prevCols => {
        const columns = { vehicle: { ...ganttChartTableMapping["vehicle"] } }
        newColumnsList.forEach(col => {
          columns[col] = { ...ganttChartTableMapping[col] }
        })
        if (JSON.stringify(columns) === JSON.stringify(prevCols)) {
          return prevCols
        }
        return { ...columns }
      })
    }
  }

  const onDragEnd = ({ destination }) => {
    if (destination) {
      dragOrderBankToGanttChart()
    }
  }

  const toggleDownload = () => {
    setShowDeleteOption(!showDeleteOption)
  }

  const ConfirmClearModal = async () => {
    setShowDeleteOption(!showDeleteOption)
    setClearScheduling(true)
    const payload = {}
    await onGetClearScheduling(payload)
  }

  const getCheckedDownloadVal = index => {
    const temp = [...deleteCheck]
    let temp1 = []
    temp[index].checked = !temp[index].checked
    temp.map(item => {
      if (item.checked === true) {
        temp1.push(item.title)
      }
    })
    var temp2 = temp1.join().split(",")
    var temp3 = temp2.length > 0 ? temp2[0] + " & " + temp2[1] : temp2
    setCheckedValue(temp3)
    setDeleteCheck(temp)
  }

  const onClickSendBulkShipment = async () => {
    setDisplayBulkModal(!displayBulkModal)
    const payload = {}
    await onGetSendBulkShipment(payload)
  }

  const onClickRunAutoScheduling = async () => {
    setDisplayAutoModal(!displayAutoModal)
    const payload = {}
    await onGetRunAutoScheduling(payload)
  }

  const onChangeCurrentPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const changeFiltersHandler = (qValue, type) => {
    if (type === "insert")
      setfilterQuery(prevFilters => {
        return { ...prevFilters, ...qValue }
      })
    else if (type === "remove")
      setfilterQuery(prevFilters => {
        return { ...filterObject(prevFilters, qValue) }
      })
    setCurrentPage(0)
  }

  useEffect(() => {
    const isItemSelected = !!orderBankTableData?.find(e => e.isChecked)
    const newSettings = [...orderBankSetting]
    const sendDN = newSettings?.find(e => e.value === "SendDN")
    if (sendDN) {
      sendDN.disabled = !isItemSelected
    }
    setOrderBankSetting(newSettings)
  }, [orderBankTableData])

  //Object literal checking icon type
  const getIcon = type => {
    var icons = {
      customiseAddIcon: <AddOrderIcon />,
      customiseTableBankIcon: <CustomizeTableIcon />,
      customiseUploadIcon: <UploadIcon />,
      customiseCrossTerminalIcon: <CrossTerminalIcon />,
      customiseMultipleDNIcon: <MultipleDNIcon />,
      customiseMultipleDeleteOrderIcon: <DeleteOrderIcon />,
    }
    return icons[type]
  }

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="order-bank-page-content">
          <div className="container-fluid">
            <Card className="order_bank_main d-block">
              <CardBody className="pb-3 px-4">
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
                  <Col lg={9} md={9} sm={12} className="top_right_section mt-1">
                    <div className="d-flex align-item-right ">
                      <a className="border-before">
                        <img src={awsmLogo} height="25px" width="80px" className="ml-3" />
                      </a>
                      <a className="border-before" onClick={onFullScreen}>
                        <i className="bx bx-fullscreen ml-3" /> Fullscreen
                      </a>
                      <a className="border-before " onClick={istoggle}>
                        <span className="ml-3">
                          <CustomEyeIcon />
                          View Audit Log
                        </span>
                      </a>
                      <span className="bl-1-grey-half plr-15">
                        <Button color={"primary"} onClick={() => onClickRunAutoScheduling()}>
                          Run Auto Schedule
                        </Button>
                      </span>
                      <span className="bl-1-grey-half plr-15">
                        <Button color={"primary"} onClick={() => onClickSendBulkShipment()}>
                          Send Bulk Shipment
                        </Button>
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className="remove_border pb-0 mt-3">
                  <Col lg={5} md={12} className="order-bank-bar pr-0">
                    <div className="order-bank-shift-date">
                      <div>DATE</div>
                      <DateRangePicker
                        types={["single"]}
                        startDate={null}
                        defaultValue={shiftDate}
                        onChange={value => {
                          setShiftDate({
                            ...shiftDate,
                            type: value?.type,
                            date_from: value?.date_from,
                            date_to: value?.date_to,
                          })
                          setCurrentPage(0)
                        }}
                      />
                    </div>
                    <p className="order-bank-region-label">REGION & TERMINAL</p>
                    <div className="order-bank-region">
                      <AWSMDropdown
                        value={region}
                        onChange={value => {
                          setRegion(value)
                          setTerminal(
                            REGION_TERMINAL.find(item => item.region === value).terminal[0]
                          )
                          setCurrentPage(0)
                        }}
                        items={REGION_TERMINAL.map(e => e.region)}
                      />
                    </div>
                    <div className="order-bank-region ml-2">
                      <AWSMDropdown
                        value={terminal}
                        onChange={value => {
                          setTerminal(value)
                          setCurrentPage(0)
                        }}
                        items={terminalList}
                      />
                    </div>
                  </Col>
                  <Col className="order-bank-bar right pl-0">
                    <IconButton
                      aria-label="delete"
                      onClick={toggleCustomizeModal}
                      className="delete_btn"
                    >
                      <img src={customiseTableIcon} alt="" />
                    </IconButton>
                    <button
                      id="ClearScheduling"
                      className="btn btn-outline-primary excel-btn-container scheduling-btn"
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
                      <PopoverBody className="clear-scheduling">
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
                                    label={isNull(row.title) ? "-" : removeKeywords(row.title)}
                                  />
                                </div>
                              )
                            })}
                          <div id="myMm" style={{ height: "1mm" }} />
                          <div className="pdf-wid">
                            <button
                              className="btn btn-primary btn-sm excel-btn-container pdf-btn"
                              onClick={ConfirmClearModal}
                            >
                              {" "}
                              Clear{" "}
                            </button>
                          </div>
                        </>
                      </PopoverBody>
                    </Popover>
                    {activeTab === "1" && (
                      <div className="d-flex align-items-center justify-content-between radio_option m-0 order-bank-label">
                        {GanttChartFilterButtons &&
                          GanttChartFilterButtons.length > 0 &&
                          GanttChartFilterButtons.map((button, index) => {
                            const { value, label } = button
                            return (
                              <CustomRadioButton
                                key={`${index}-${value}`}
                                label={label}
                                value={value}
                                checked={ganttChartAllRadio === value}
                                name="radio-bryntum-scheduler"
                                onClick={changeGanttChartAllRadio}
                              />
                            )
                          })}
                      </div>
                    )}
                    <span className="m-0 order-bank-label">
                      {`${orderSummary.DNs} DNs, ${orderSummary.shipment} shipments, ${orderSummary.backlog} backlog, ${orderSummary.SR} SR, ${orderSummary.HP} HP`}
                    </span>
                  </Col>
                </Row>
                <div>
                  <TabContent activeTab={activeTab} className="pt-2">
                    <TabPane tabId="1">
                      <div className="gantt_chart_main">
                        <div className="gantt_chart_first pb-3">
                          <BryntumChartTable
                            currentTab={activeTab}
                            ganttChartAllRadio={ganttChartAllRadio}
                            bryntumCurrentColumns={bryntumCurrentColumns}
                            dateConfig={shiftDate}
                            region={region}
                            terminal={terminal}
                          />
                          <div className="square_border">
                            {GanttChartBottom.map(item => {
                              return (
                                <div className="d-flex align-items-center mr-2">
                                  <div className={`square ${item.color} mr-1 ml-2`}>
                                    {item.icon && (
                                      <ReactSVG src={item.icon} className="icon-in-square" />
                                    )}
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
                        <div className="gantt_chart_first pb-3">
                          <BryntumChartShipment
                            currentTab={activeTab}
                            ganttChartAllRadio={ganttChartAllRadio}
                            bryntumCurrentColumns={bryntumCurrentColumns}
                            dateConfig={shiftDate}
                            region={region}
                            terminal={terminal}
                          />
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
              <div className="gantt_chart_second px-4">
                <Row className="remove_border">
                  <Col lg={9} className="order-bank-bar">
                    <h4 className="m-0 order-bank-label">Order Bank</h4>
                    <div className="order-bank-shift-date">
                      <div>DATE</div>
                      <DateRangePicker
                        types={["single", "range"]}
                        startDate={null}
                        defaultValue={shiftDate}
                        onChange={value => {
                          setShiftDate({
                            ...shiftDate,
                            type: value?.type,
                            date_from: value?.date_from,
                            date_to: value?.date_to,
                          })
                          setCurrentPage(0)
                        }}
                      />
                    </div>
                    <p className="order-bank-region-label">REGION & TERMINAL</p>
                    <div className="order-bank-region">
                      <AWSMDropdown
                        value={regionBank}
                        onChange={value => {
                          setRegionBank(value)
                          setTerminalBank(
                            REGION_TERMINAL.find(item => item.region === value).terminal[0]
                          )
                          setCurrentPage(0)
                        }}
                        items={REGION_TERMINAL.map(e => e.region)}
                      />
                    </div>
                    <div className="order-bank-region ml-2">
                      <AWSMDropdown
                        value={terminalBank}
                        onChange={value => {
                          setTerminalBank(value)
                          setCurrentPage(0)
                        }}
                        items={terminalListBank}
                      />
                    </div>
                    <p className="order-bank-region-label">STATUS</p>
                    <div className="order-bank-region">
                      <AWSMDropdown
                        value={status}
                        onChange={value => {
                          setStatusDropdown(value)
                          setCurrentPage(0)
                        }}
                        items={orderBankStatus.map(e => e.label)}
                      />
                    </div>
                  </Col>
                  <Col lg={3} className="order-bank-bar right" id="order-bank-main">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle data-toggle="dropdown" tag="div" aria-expanded={dropdownOpen}>
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
                              className="awsm-option-button-content-item-rts"
                              disabled={option.disabled}
                              onClick={() => onSettingClick(option.value)}
                            >
                              {getIcon(option.icon)}
                              <div className="pl-2" disabled key={index}>
                                {option.label}
                              </div>
                            </MenuItem>
                          )
                        })}
                      </DropdownMenu>
                    </Dropdown>
                    <span className="m-0 order-bank-label">
                      141 orders, 3.2m ASR, 1.2m SMP, 1m Comm. Total 5.4m
                    </span>
                  </Col>
                </Row>
                <OrderBankTable
                  tableColumns={searchFields}
                  dataSource={orderBankTableData || []}
                  headerFilters={orderBankTableFilters}
                  filterApplyHandler={changeFiltersHandler}
                  enabledCross={enabledCross}
                  deleteEnable={deleteEnable}
                  currentPage={currentPage}
                  onChangeCurrentPage={onChangeCurrentPage}
                  onChangeFilters={onChangeCurrentPage}
                  payloadFilter={payloadFilter}
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
                region={region}
                onCancel={onCloseCrossTerminal}
                onSave={onSaveCrossTerminal}
              />
              <UploadDMRModal
                open={uploadDmr}
                region={region}
                onCancel={onCloseUploadDMR}
                onSave={onCloseUploadDMR}
                alertShow={onGetShowAlert}
              />
              <DeleteMultipleModal
                open={deleteMultiple}
                onCancel={onCloseDeleteMultiple}
                onSave={onSaveDeleteMultiple}
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
                  terminal={terminal}
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
                  status="success"
                  message="All scheduling has been successfully cleared"
                  openAlert={showClearAlert}
                  closeAlert={() => setShowClearAlert(false)}
                />
              )}
              {showAlertDMR && (
                <AWSMAlert
                  status="success"
                  message="DMR File Uploaded!"
                  openAlert={showAlertDMR}
                  closeAlert={() => setShowAlertDMR(false)}
                />
              )}
              {showAddNotification && (
                <AWSMAlert
                  status={notiMessage}
                  message={
                    notiMessage === "success"
                      ? "New Order has successfully been added in Order Bank"
                      : "Order has not been added"
                  }
                  openAlert={showAddNotification}
                  closeAlert={() => setShowAddNotification(false)}
                />
              )}
              {showDeleteMultiple && (
                <AWSMAlert
                  status={deleteMultipleStatus}
                  message={
                    deleteMultipleStatus === "success"
                      ? "Orders deleted Successfully"
                      : "Orders has not been deleted"
                  }
                  openAlert={showDeleteMultiple}
                  closeAlert={() => setShowDeleteMultiple(false)}
                />
              )}
            </Card>
          </div>
        </div>
        {clearScheduling === true && (
          <ClearScheduling
            clearScheduling={clearScheduling}
            checkedValue={checkedValue}
            toggle={toggleClear}
            showConfirmAlert={showConfirmAlert}
          />
        )}
      </DragDropContext>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  getRTSOrderBankTableData: params => dispatch(getRTSOrderBankTableData(params)),
  refreshOderBankDN: params => dispatch(refreshOderBankDN(params)),
  sendOrderBankDN: params => dispatch(sendOrderBankDN(params)),
  onGetOrderBankAuditLog: payload => dispatch(getOrderBankAuditLog(payload)),
  dragOrderBankToGanttChart: () => dispatch(dragOrderBankToGanttChart()),
  onGetClearScheduling: payload => dispatch(getClearScheduling(payload)),
  onGetSendBulkShipment: payload => dispatch(getSendBulkShipment(payload)),
  onGetRunAutoScheduling: payload => dispatch(getRunAutoScheduling(payload)),
  onGetDeleteMultipleOrder: payload => dispatch(getdeleteMultipleOrder(payload)),
  onGetCrossTerminal: payload => dispatch(getCrossTerminal(payload)),
  getRTSOderBankGanttChart: params => dispatch(getRTSOderBankGanttChart(params)),
  clearGanttData: () => dispatch(clearGanttData()),
})

const mapStateToProps = ({ orderBank }) => ({
  orderBankTableData: orderBank.orderBankTableData,
  orderBankTableFilters: orderBank.orderBankTableFilters,
  auditsCom: orderBank.auditsCom,
  socketData: orderBank.socketData,
  crossTerminalDetails: orderBank.crossTerminalDetails,
  multipleorder: orderBank.multipleorder,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBank)
