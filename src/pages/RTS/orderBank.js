import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { connect, useSelector } from 'react-redux'
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
} from 'reactstrap'
import AuditLog from 'components/Common/AuditLog'
import './style.scss'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton, MenuItem, FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
// import { CustomEyeIcon } from "pages/DQM/Common/icon"
import awsmLogo from 'assets/images/AWSM-logo-order-bank.png'
import NewOrderModal from './addOrderBankModal'
import DateRangePicker from 'components/Common/DateRangePicker'
import AWSMDropdown from 'components/Common/Dropdown'
import OrderBankTable from './OrderBankTable'
import REGION_TERMINAL, { TERMINAL_CODE_MAPPING } from 'common/data/regionAndTerminal'
//custom icons import
import customiseTableIcon from 'assets/images/AWSM-Customise-Table.svg'

import CustomizeTableModal from 'components/Common/CustomizeTable'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import {
  GanttChartBottom,
  GanttChartBottomHover,
  GanttChartFilterButtons,
  orderBankSettings,
  orderBankStatus,
  deleteCheckOption,
} from './helper.js'

import {
  ganttChartTableColumns,
  ganttChartTableDefaultColumns,
  ganttChartTableMapping,
  tableColumns,
  tableMapping,
} from './OrderBankTable/tableMapping'
import { format, addDays } from 'date-fns'
import { isEqual, isNull } from 'lodash'
import {
  getRTSOrderBankTableData,
  sendOrderBankDN,
  sendMultipleOrderBankDN,
  // clearScheduling,
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
  clearRTSOrderBankTableData,
  getOBTotalUnschedule,
} from 'store/orderBank/actions'
import OrderBankActionModal from './OrderBankActionModal'
import CrossTerminalModal from './crossTerminalModal'
import BryntumChartTable, { bryntumSchedulerTableNameForCookie } from './OrderBankTable/BryntumChartTable'
import BryntumChartShipment from './OrderBankTable/BryntumChartShipment'
import CustomRadioButton from 'components/Common/CustomRadioButton'
import OrderBankRunAutoModal from './OrderBankRunAutoModal'
import OrderBankSendBulkModal from './OrderBankSendBulkModal'
import AWSMAlert from 'components/Common/AWSMAlert'
import selectAllIcon2 from 'assets/images/AWSM-Checked-box.svg'
import selectAllIcon3 from 'assets/images/AWSM-Checkbox.svg'
import { getCookieByKey } from '../DQM/Common/helper'
import { DragDropContext } from 'react-beautiful-dnd'
import {
  AddOrderIcon,
  UploadIcon,
  CustomEyeIcon,
  DeleteOrderIcon,
  CustomizeTableIcon,
  CrossTerminalIcon,
  MultipleDNIcon,
} from 'pages/DQM/Common/icon'
import OrderBankSummary from './orderBankSummary'
import ClearScheduling from './clearScheduling'
import {
  transformObjectToStringSentence,
  filterObject,
  removeKeywords,
} from './../DQM/Common/helper'
const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />

import { ReactSVG } from 'react-svg'
import UploadDMRModal from './uploadDMRModal'
import DeleteMultipleModal from './deleteMultiple'
// import { sendMessage } from "SocketService"

function OrderBank({
  getRTSOrderBankTableData,
  orderBankTableData,
  orderBankTableFilters,
  sendOrderBankDN,
  sendMultipleOrderBankDN,
  // clearScheduling,
  refreshOderBankDN,
  onGetOrderBankAuditLog,
  onGetClearScheduling,
  onGetSendBulkShipment,
  onGetRunAutoScheduling,
  onGetDeleteMultipleOrder,
  onGetCrossTerminal,
  dragOrderBankToGanttChart,
  orderBankTableSummary,
  multipleorder,
  getRTSOderBankGanttChart,
  clearGanttData,
  onGetTotalOBUnschedule,
  totalOrderUnschedule,
  totalRow,
  sendMultipleDn,
}) {
  const defaultDate = format(addDays(Date.now(), 1), 'yyyy-MM-dd')
  const ganttChartEvents = useSelector(state => state.orderBank.ganttChart.event)
  const [orderSummary, setOrderSummary] = useState({
    DNs: 0,
    shipment: 0,
    backlog: 0,
    SR: 0,
    HP: 0,
  })
  const [activeTab, setActiveTab] = useState('1')
  const [dropdownOpen, setOpen] = useState(false)
  const [crossTerminal, setCrossTerminal] = useState(false)
  const [showAddNotification, setShowAddNotification] = useState(false)
  const [showSendMultiNotification, setShowSendMultiNotification] = useState(false)  
  const [SendMultipleMessage, setSendMultipleMessage] = useState('')    
  const [allResponseMultipleDN, setAllResponseMultipleDN] = useState(null)    
  const [multipleDelete, setMultipleDelete] = useState('')
  const [notiMessage, setNotiMessage] = useState('')
  const [uploadDmr, setUploadDmr] = useState(false)
  const [deleteMultiple, setDeleteMultiple] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [payloadFilter, setPayloadFilter] = useState({
    filterOrderBank: {},
    currentPage: 0,
    filterQuery: '',
  })
  const [searchFields, setSearchFields] = useState(
    getCookieByKey('Order Bank') ? JSON.parse(getCookieByKey('Order Bank')) : tableColumns
  )
  const [region, setRegionGantt] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminalGantt] = useState(REGION_TERMINAL[0].terminal[0])
  const [regionTable, setRegionTable] = useState(REGION_TERMINAL[0].region)
  const [terminalTable, setTerminalTable] = useState(REGION_TERMINAL[0].terminal[0])
  const [refreshDNModal, setRefreshDNModal] = useState(false)
  const [displayAutoModal, setDisplayAutoModal] = useState(false)
  const [showClearAlert, setShowClearAlert] = useState(false)
  const [displayBulkModal, setDisplayBulkModal] = useState(false)
  const [ganttChartAllRadio, setGanttChartAllRadio] = useState('')
  const [sendDNModal, setSendDNModal] = useState(false)
  const [status, setStatusDropdown] = useState('Unscheduled')
  const [shiftDateGantt, setShiftDateGantt] = useState({
    type: 'single',
    date_from: defaultDate,
  })
  const [shiftDateTable, setShiftDateTable] = useState({
    type: 'single',
    date_from: defaultDate,
  })
  const [orderBankSetting, setOrderBankSetting] = useState(orderBankSettings)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [showTableError, setShowTableError] = useState(false)
  const [snackStatus, setSnackStatus] = useState('')
  const [snackMessage, setSnackMessage] = useState('')
  const [showSnackAlert, setShowSnackAlert] = useState(false)
  const [showDeleteOption, setShowDeleteOption] = useState(false)
  const [clearScheduling, setClearScheduling] = useState(false)
  const [showAlertDMR, setShowAlertDMR] = useState(false)
  const [showAlertCrossTerminal, setShowAlertCrossTerminal] = useState(false)
  const [deleteCheck, setDeleteCheck] = useState(deleteCheckOption)
  const [checkedValue, setCheckedValue] = useState('Manual Scheduling')
  const [isCustomizeGanttModalOpen, setIsCustomizeGanttModalOpen] = useState(false)
  const [multipleDeleteIds, setMultipleDeleteIds] = useState(false)
  const [deleteMultipleStatus, setDeleteMultipleStatus] = useState('')
  const [showDeleteMultiple, setShowDeleteMultiple] = useState(false)
  const [fieldToSort, setFieldToSort] = useState('retail_storage_relation.retail')
  const [fieldSortDirection, setFieldSortDirection] = useState('desc')
  const [bryntumCurrentColumns, setBryntumCurrentColumns] = useState(() => {
    if (!getCookieByKey(bryntumSchedulerTableNameForCookie)) return ganttChartTableDefaultColumns
    const cookieParseData = JSON.parse(getCookieByKey(bryntumSchedulerTableNameForCookie))
    if (cookieParseData.length < 4) return ganttChartTableDefaultColumns
    const columns = { vehicle: { ...ganttChartTableMapping['vehicle'] } }
    cookieParseData.forEach(col => {
      columns[col] = { ...ganttChartTableMapping[col] }
    })
    return columns
  })
  const [reloadData, setReloadData] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [filterQuery, setfilterQuery] = useState('')
  const filterOrderBank = useMemo(() => {
    return {
      terminal: TERMINAL_CODE_MAPPING[terminalTable],
      scheduled_status: status,
      shift_date: shiftDateTable,
    }
  }, [terminalTable, shiftDateTable, status])

  const [bryntumTable, setBryntumTable] = useState({
    currentPage: 0,
    payload: {
      limit: 10,
      page: 0,
      search_fields: '*',
      q: '',
      sort_dir: 'asc',
      sort_field: 'vehicle',
      filter: {
        shift_date: shiftDateGantt,
        terminal: TERMINAL_CODE_MAPPING[terminal],
      },
    },
  })

  const populateBryntumTable = (
    { page = 0, sortField = 'vehicle', sortDirection = 'asc', filterCondition = [] },
    trigger = false
  ) => {
    let q = transformObjectToStringSentence(filterCondition)
    // if (filterCondition.length > 0) {
    //   q = filterCondition
    //     .filter(v => v.data.length > 0)
    //     .map(e => {
    //       return `(${e.data.map(k => `${e.key}=='${k == '-' ? '' : k}'`).join('||')})`
    //     })
    //     .join('&&')
    // }

    setBryntumTable(state => {
      const payload = {
        ...state.payload,
        page,
        q,
        sort_dir: sortDirection,
        sort_field: sortField,
      }

      if (trigger) getRTSOderBankGanttChart(payload)

      return { payload, currentPage: page }
    })
  }

  useEffect(
    () =>
      getRTSOderBankGanttChart({
        ...bryntumTable.payload,
        filter: {
          shift_date: shiftDateGantt,
          terminal: TERMINAL_CODE_MAPPING[terminal],
        },
      }),
    [bryntumTable]
  )

  useEffect(() => {
    const asyncFunction = async () => {
      await clearGanttData()

      setBryntumTable({
        payload: {
          ...bryntumTable.payload,
          page: 0,
          filter: {
            shift_date: shiftDateGantt,
            terminal: TERMINAL_CODE_MAPPING[terminal],
          },
        },
        currentPage: 0,
      })

      if (terminal === terminalTable && isShiftDateCorrect(shiftDateGantt?.date_from)) {
        onGetTotalOBUnschedule({
          shift_date: shiftDateGantt?.date_from,
        })
      }
    }

    asyncFunction()
  }, [shiftDateGantt, terminal])

  useEffect(() => {
    const results = { DNs: 3, shipment: 2, backlog: 0, SR: 0, HP: 0 }
    if (ganttChartEvents) {
      ganttChartEvents.forEach(item => {
        if (item.eventFilter === 'backlog') results.backlog++
        if (item.eventFilter === 'request') results.SR++
        if (item.eventFilter === 'high') results.HP++
      })
    }
    setOrderSummary(results)
  }, [ganttChartEvents])

  useEffect(() => {
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: 'desc',
      sort_field: 'created',
      q: 'commercial_customer',
    }
    onGetOrderBankAuditLog(payload)
    // alert

    setShowDeleteMultiple(false)
    setShowAddNotification(false)
    setShowAlertDMR(false)
    setShowAlertCrossTerminal(false)
    setShowClearAlert(false)
    setShowSnackAlert(false)
    setShowSendMultiNotification(false);
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
      search_fields: '*',
      q: transformObjectToStringSentence(filterQuery),
      sort_dir: fieldSortDirection,
      sort_field: fieldToSort,
      filter: filterOrderBank,
    })
    setPayloadFilter({
      filterOrderBank: filterOrderBank,
      currentPage: currentPage,
      filterQuery: filterQuery,
    })
    setReloadData(false)
  }, [filterOrderBank, currentPage, filterQuery])

  useEffect(() => {
    clearRTSOrderBankTableData()
    setTimeout(() => {
      getRTSOrderBankTableData({
        limit: 10 * (currentPage + 1),
        page: 0,
        search_fields: '*',
        q: transformObjectToStringSentence(filterQuery),
        sort_dir: fieldSortDirection,
        sort_field: fieldToSort,
        filter: filterOrderBank,
      })
    }, 100)
  }, [fieldSortDirection, fieldToSort])

  const fieldSortDirectionHandler = direction => {
    setFieldSortDirection(direction)
  }

  const fieldToSortHandler = fieldName => {
    setFieldToSort(fieldName)
  }

  const toggle = () => setOpen(!dropdownOpen)

  const terminalListGantt = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region])

  const terminalListTable = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === regionTable)
    return currentRegion ? currentRegion.terminal : []
  }, [regionTable])

  const onSettingClick = val => {
    if (val === 'newOrder') {
      setShowNewOrder(true)
    } else if (val === 'customizeCol') {
      setShowCustomize(true)
    } else if (val === 'RefreshDN') {
      setRefreshDNModal(true)
    } else if (val === 'SendDN') {
      setSendDNModal(true)
    } else if (val === 'CrossTerminal') {
      setCrossTerminal(true)
    } else if (val === 'uploadDmr') {
      setUploadDmr(true)
    } else if (val === 'DeleteMultiple') {
      setDeleteMultiple(true)
    }
  }
  const onCloseCustomize = () => {
    setShowCustomize(false)
  }

  const onCloseUploadDMR = () => {
    setUploadDmr(false)
  }

  const reloadUploadDMR = async () => {
    setUploadDmr(false)
    setReloadData(true)
    setShowAlertDMR(true)
    await getRTSOrderBankTableData({
      limit: 10,
      page: payloadFilter.currentPage,
      search_fields: '*',
      q:
        payloadFilter?.filterQuery !== null || payloadFilter?.filterQuery !== undefined
          ? transformObjectToStringSentence(payloadFilter?.filterQuery)
          : '',
      sort_dir: 'asc',
      sort_field: 'vehicle',
      filter: payloadFilter.filterOrderBank,
    })
    setReloadData(false)
  }

  const onGetShowAlert = () => {
    setShowAlertDMR(!showAlertDMR)
  }

  const onCloseDeleteMultiple = () => {
    setDeleteMultiple(false)
  }

  const onSaveDeleteMultiple = async () => {
    setReloadData(true)
    const payload = { order_banks: multipleDeleteIds }
    await onGetDeleteMultipleOrder(payload)
    setDeleteMultiple(false)
    let temp = [...orderBankSetting]
    temp.map(function (item) {
      if (item.value === 'DeleteMultiple') {
        item.disabled = true
      }
    })
    setOrderBankSetting(temp)
  }

  const onChangeGanttChartDate = value => {
    setShiftDateGantt(state => {
      // make sure new values are actually new
      if (value && !isEqual(state, value)) {
        return { type: value.type, date_from: value.date_from }
      }

      // if not -> deny the state changes
      return state
    })
    setCurrentPage(0)
  }

  const reloadRTSOrderBankData = async () => {
    setReloadData(true)
    await getRTSOrderBankTableData({
      limit: 10,
      page: payloadFilter.currentPage,
      search_fields: '*',
      q:
        payloadFilter?.filterQuery !== null || payloadFilter?.filterQuery !== undefined
          ? transformObjectToStringSentence(payloadFilter?.filterQuery)
          : '',
      sort_dir: 'desc',
      sort_field: 'vehicle',
      filter: payloadFilter.filterOrderBank,
    })
    setReloadData(false)
  }

  const isShiftDateCorrect = date => {
    const diff = moment.duration(moment().startOf('day').diff(moment(date, 'YYYY-MM-DD'))).asDays()
    return diff >= -2 && diff <= 0
  }

  useEffect(() => {
    if (multipleorder) {
      reloadRTSOrderBankData()
      setMultipleDelete(multipleorder.order_banks)
      setDeleteMultipleStatus(multipleorder.order_banks !== undefined ? 'success' : 'error')
      multipleorder.order_banks !== multipleDelete && multipleDelete === ''
        ? setShowDeleteMultiple(true)
        : setShowDeleteMultiple(false)
    }
  }, [multipleorder])

  const onCloseCrossTerminal = () => {
    setCrossTerminal(false)
  }

  const onSaveCrossTerminal = async (region, terminal) => {
    const payload = { order_id: multipleDeleteIds, terminal: terminal }
    await onGetCrossTerminal(payload)
    setShowAlertCrossTerminal(true)
    setCrossTerminal(false)
    reloadRTSOrderBankData()
  }

  const onCloseNewOrder = async (type, val = '') => { //sendMultipleDn
    setShowNewOrder(false)
    setReloadData(true)
    type === 'add' && setShowAddNotification(true)
    val === 'success' ? setNotiMessage('success') : setNotiMessage('error')
    reloadRTSOrderBankData()
    setReloadData(false)
  }

  const enabledCross = val => {
    if (val !== 0) {
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === 'CrossTerminal' || item.value === 'SendDN') {
          item.disabled = false
        }
      })
      setOrderBankSetting(temp)
    } else {
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === 'CrossTerminal' || item.value === 'SendDN') {
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
        if (item.value === 'DeleteMultiple') {
          item.disabled = false
        }
      })
      setOrderBankSetting(temp)
    } else {
      let temp = [...orderBankSetting]
      temp.map(function (item) {
        if (item.value === 'DeleteMultiple') {
          item.disabled = true
        }
      })
      setOrderBankSetting(temp)
    }
  }

  const onTableColumnsChange = columns => {
    setSearchFields(columns)
  }

  const onSendOrderBankDN = () => {
    // setReloadData(true);
    // sendOrderBankDN(orderBankTableData.filter(e => e.isChecked).map(e => e.id))    
    sendMultipleOrderBankDN(orderBankTableData.filter(e => e.isChecked).map(e => e.id))    
  }

  useEffect(() => {
    if(sendMultipleDn !== allResponseMultipleDN){
      setShowSendMultiNotification(true)
      setAllResponseMultipleDN(sendMultipleDn);
      setSendMultipleMessage(sendMultipleDn);
      setTimeout(function () { reloadRTSOrderBankData() }, 2000);
    }
  }, [sendMultipleDn])
 

  const onRefreshOrderBankDN = () => {
    refreshOderBankDN(orderBankTableData.filter(e => e.isChecked))
  }

  const istoggle = () => {
    setShowAuditModal(!showAuditModal)
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
    // clearScheduling();
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
        return setGanttChartAllRadio('')
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
        const columns = { vehicle: { ...ganttChartTableMapping['vehicle'] } }
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
    var temp2 = temp1.join().split(',')
    var temp3 = temp2.length > 1 === true ? temp2[0] + ' & ' + temp2[1] : temp2[0]
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
    let tempVol = {volume: []};
    qValue?.volume?.map((item, index)=>{
      tempVol.volume.push(item.toString());
    })
    let temp = qValue?.volume ? tempVol : qValue;
    if (type === 'insert')
      setfilterQuery(prevFilters => {
        return { ...prevFilters, ...temp }
      })
    else if (type === 'remove')
      setfilterQuery(prevFilters => {
        return { ...filterObject(prevFilters, temp) }
      })
    setCurrentPage(0)
  }

  useEffect(() => {
    orderBankTableData === null && setShowTableError(true)
    let checkedData = [];
    orderBankTableData!== null && orderBankTableData.map((item, index) => {
      if (item.isChecked === true) {
        checkedData.push(item)
      }
    })
    const newSettings = [...orderBankSetting]
    const sendDN = newSettings?.find(e => e.value === 'SendDN')
    if (sendDN) {
      let checkDN = checkedData.filter(v => (v.dn_no === null || v.dn_no === '') && v.dn_status !== "Pending");
      sendDN.disabled = (checkDN?.length > 0 && checkedData.length === checkDN?.length) ? false : true; //! 
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
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => setActiveTab('1')}
                          >
                            <span className="d-none d-sm-block">Gantt Chart</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => setActiveTab('2')}
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
                        <Button
                          color={'primary'}
                          disabled={
                            terminal === terminalTable &&
                            isShiftDateCorrect(shiftDateGantt.date_from) &&
                            totalOrderUnschedule > 0
                              ? false
                              : true
                          }
                          onClick={() => onClickRunAutoScheduling()}
                        >
                          Run Auto Schedule
                        </Button>
                      </span>
                      <span className="bl-1-grey-half plr-15">
                        <Button color={'primary'} onClick={() => onClickSendBulkShipment()}>
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
                        types={['single']}
                        startDate={null}
                        defaultValue={shiftDateGantt}
                        defaultDate={defaultDate}
                        onChange={onChangeGanttChartDate}
                      />
                    </div>
                    <p className="order-bank-region-label">REGION & TERMINAL</p>
                    <div className="order-bank-region">
                      <AWSMDropdown
                        value={region}
                        onChange={value => {
                          setRegionGantt(value)
                          setTerminalGantt(
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
                          setTerminalGantt(value)
                          setCurrentPage(0)
                        }}
                        items={terminalListGantt}
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
                      style={{ width: 'auto' }}
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
                                    row.checked ? 'item-checked' : ''
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
                                          height: '20px',
                                          width: '5px',
                                          marginLeft: '16px',
                                          marginTop: '8px',
                                        }}
                                      />
                                    }
                                    label={isNull(row.title) ? '-' : removeKeywords(row.title)}
                                  />
                                </div>
                              )
                            })}
                          <div id="myMm" style={{ height: '1mm' }} />
                          <div className="pdf-wid">
                            <button
                              className="btn btn-primary btn-sm excel-btn-container pdf-btn"
                              onClick={ConfirmClearModal}
                              disabled={checkedValue === '' ? true : false}
                            >
                              {' '}
                              Clear{' '}
                            </button>
                          </div>
                        </>
                      </PopoverBody>
                    </Popover>
                    {activeTab === '1' && (
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
                            dateConfig={shiftDateGantt}
                            region={region}
                            terminal={terminal}
                            clearGanttData={clearGanttData}
                            onFilterChange={(params, trigger) =>
                              populateBryntumTable({ ...params }, trigger)
                            }
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
                            dateConfig={shiftDateGantt}
                            region={region}
                            terminal={terminal}
                            clearGanttData={clearGanttData}
                            onFilterChange={params => populateBryntumTable({ ...params })}
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
                        types={['single', 'range']}
                        startDate={null}
                        defaultValue={shiftDateTable}
                        defaultDate={defaultDate}
                        onChange={value => {
                          setShiftDateTable({
                            ...shiftDateTable,
                            type: value?.type,
                            date_from: value?.date_from,
                            date_to: value?.date_to,
                          })
                          setReloadData(true)
                          setCurrentPage(0)
                        }}
                      />
                    </div>
                    <p className="order-bank-region-label">REGION & TERMINAL</p>
                    <div className="order-bank-region">
                      <AWSMDropdown
                        value={regionTable}
                        onChange={value => {
                          setRegionTable(value)
                          setReloadData(true)
                          setTerminalTable(
                            REGION_TERMINAL.find(item => item.region === value).terminal[0]
                          )
                          setCurrentPage(0)
                        }}
                        items={REGION_TERMINAL.map(e => e.region)}
                      />
                    </div>
                    <div className="order-bank-region ml-2">
                      <AWSMDropdown
                        value={terminalTable}
                        onChange={value => {
                          setTerminalTable(value)
                          setCurrentPage(0)
                          setReloadData(true)
                        }}
                        items={terminalListTable}
                      />
                    </div>
                    <p className="order-bank-region-label">STATUS</p>
                    <div className="order-bank-region">
                      <AWSMDropdown
                        value={status === '' ? 'All' : status}
                        onChange={value => {
                          setStatusDropdown(value == 'All' ? '' : value)
                          setCurrentPage(0)
                          setReloadData(true)
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
                          style={{ color: 'rgba(0,0,0,0.5)' }}
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
                              disabled={
                                option.label === 'Add New Order' && status === 'Scheduled'
                                  ? true
                                  : option.disabled
                              }
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
                      <OrderBankSummary data={orderBankTableSummary} totalOrders={totalRow} />
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
                  orderregion={regionTable}
                  orderterminal={terminalTable}
                  fieldSortDirectionHandler={fieldSortDirectionHandler}
                  fieldToSortHandler={fieldToSortHandler}
                  reloadData={reloadData}
                  activeTab={activeTab}
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
                region={regionTable}
                onCancel={onCloseCrossTerminal}
                onSave={onSaveCrossTerminal}
              />
              <UploadDMRModal
                open={uploadDmr}
                region={regionTable}
                onCancel={onCloseUploadDMR}
                onSave={reloadUploadDMR}
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
                  terminal={TERMINAL_CODE_MAPPING[terminalTable]}
                  region={region}
                  shift_date={shiftDateGantt}
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
              {showAlertCrossTerminal && (
                <AWSMAlert
                  status="success"
                  message="An order has been successfully updated"
                  openAlert={showAlertCrossTerminal}
                  closeAlert={() => setShowAlertCrossTerminal(false)}
                />
              )}
              {showAlertDMR && (
                <AWSMAlert
                  status="success"
                  message="Data has successfully been updated via CSV file"
                  openAlert={showAlertDMR}
                  closeAlert={() => setShowAlertDMR(false)}
                />
              )}
              {showSendMultiNotification === true && (
                <AWSMAlert
                  status={SendMultipleMessage}
                  message={
                    SendMultipleMessage === 'success'
                      ? 'Orders have been successfully sent for DN creation'
                      : 'Send DN failed!'
                  }
                  openAlert={showSendMultiNotification}
                  closeAlert={() => setShowSendMultiNotification(false)}
                />
              )}

              {showAddNotification && (
                <AWSMAlert
                  status={notiMessage}
                  message={
                    notiMessage === 'success'
                      ? 'New Order has successfully been added in Order Bank'
                      : 'Order has not been added'
                  }
                  openAlert={showAddNotification}
                  closeAlert={() => setShowAddNotification(false)}
                />
              )}
              {showDeleteMultiple && (
                <AWSMAlert
                  status={deleteMultipleStatus}
                  message={
                    deleteMultipleStatus === 'success'
                      ? 'Selected Orders have been successfully Deleted'
                      : 'Selected Orders have not been Deleted'
                  }
                  openAlert={showDeleteMultiple}
                  closeAlert={() => setShowDeleteMultiple(false)}
                />
              )}
              {showTableError && (
                <AWSMAlert
                  status="error"
                  message="Something went wrong!"
                  openAlert={showTableError}
                  closeAlert={() => setShowTableError(false)}
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
  sendMultipleOrderBankDN: params => dispatch(sendMultipleOrderBankDN(params)),  
  // clearScheduling: params => dispatch(clearScheduling()),  
  onGetOrderBankAuditLog: payload => dispatch(getOrderBankAuditLog(payload)),
  dragOrderBankToGanttChart: () => dispatch(dragOrderBankToGanttChart()),
  onGetClearScheduling: payload => dispatch(getClearScheduling(payload)),
  onGetSendBulkShipment: payload => dispatch(getSendBulkShipment(payload)),
  onGetRunAutoScheduling: payload => dispatch(getRunAutoScheduling(payload)),
  onGetDeleteMultipleOrder: payload => dispatch(getdeleteMultipleOrder(payload)),
  onGetCrossTerminal: payload => dispatch(getCrossTerminal(payload)),
  getRTSOderBankGanttChart: params => dispatch(getRTSOderBankGanttChart(params)),
  clearGanttData: () => dispatch(clearGanttData()),
  clearRTSOrderBankTableData: () => dispatch(clearRTSOrderBankTableData()),
  onGetTotalOBUnschedule: params => dispatch(getOBTotalUnschedule(params)),
})

const mapStateToProps = ({ orderBank }) => ({
  orderBankTableData: orderBank.orderBankTableData,
  orderBankTableFilters: orderBank.orderBankTableFilters,
  orderBankTableSummary: orderBank.orderBankTableSummary,
  totalRow: orderBank.totalRow,
  auditsCom: orderBank.auditsCom,
  socketData: orderBank.socketData,
  multipleorder: orderBank.multipleorder,
  totalOrderUnschedule: orderBank.totalOrderUnschedule,
  sendMultipleDn: orderBank.sendMultipleDn
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBank)