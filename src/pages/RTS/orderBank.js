import React, { Component, useMemo, useState, useEffect } from "react"
import { connect } from "react-redux"
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
} from "reactstrap"
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
import { Link } from "react-router-dom"
import CustomizeTableModal from "../../common/CustomizeTable"
import { tableColumns, tableMapping } from "./OrderBankTable/tableMapping"
import { format } from "date-fns"
import {
  getRTSOrderBankTableData,
  sendOrderBankDN,
  refreshOderBankDN,
} from "../../store/orderBank/actions"
import OrderBankActionModal from "./OrderBankActionModal"
import CrossTerminalModal from "./crossTerminalModal"
import GanttChartTable from "./OrderBankTable/GanttChartTable"

const GanttChartBottom = [
  {
    title: "RT Availability",
    color: "light-sky",
  },
  {
    title: "Scheduled",
    color: "dark-sky",
  },
  {
    title: "Pending Shipment",
    color: "lavendar",
  },
  {
    title: "Shipment Created",
    color: "blue",
  },
  {
    title: "Cancellation",
    color: "grey",
  },
  {
    title: "Blocked DN",
    color: "light-red",
  },
  {
    title: "Soft Overrule",
    color: "yellow",
  },
]

function OrderBank({
  getRTSOrderBankTableData,
  orderBankTableData,
  sendOrderBankDN,
  refreshOderBankDN,
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
  ]

  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)
  const [crossTerminal, setCrossTerminal] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [searchFields, setSearchFields] = useState(tableColumns)
  const [region, setRegion] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const [refreshDNModal, setRefreshDNModal] = useState(false)
  const [sendDNModal, setSendDNModal] = useState(false)
  const [shiftDate, setShiftDate] = useState({
    type: "single",
    days: [format(Date.now(), "yyyy-MM-dd")],
  })
  const [orderBankSetting, setOrderBankSetting] = useState(orderBankSettings)

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
    }
  }
  const onCloseCustomize = () => {
    setShowCustomize(false)
  }

  const onCloseCrossTerminal = () => {
    setCrossTerminal(false)
  }

  const onCloseNewOrder = () => {
    setShowNewOrder(false)
  }

const enabledCross = (val) => {  
  if(val !== 0){
    let temp = [...orderBankSetting];
    temp.map(function(item, index) {      
      if((item.value === 'CrossTerminal') || (item.value === 'SendDN')){
        item.disabled = false;        
      }
    })
    setOrderBankSetting(temp);
  } else {
    let temp = [...orderBankSetting]
    temp.map(function(item, index) {      
      if((item.value === 'CrossTerminal') || (item.value === 'SendDN')){
        item.disabled = true;
      }
    })
    setOrderBankSetting(temp)
  }
}

  useEffect(() => {
    getRTSOrderBankTableData({ region, terminal, shiftDate })
  }, [region, terminal, shiftDate])

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

  return (
    <React.Fragment>
      <div className="order-bank-page-content">
        <div className="container-fluid">
          <Card className="order_bank_main">
            <CardBody>
              <Row>
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
                    <Link to="#" className="border-before">
                      <img
                        src={awsmLogo}
                        height="25px"
                        width="80px"
                        className="ml-3"
                      />
                    </Link>
                    <Link to="#" className="border-before">
                      <i className="bx bx-fullscreen ml-3"></i> Fullscreen
                    </Link>
                    <Link to="#" className="border-before">
                      <img src={eyeIcon} alt="info" className="ml-3" /> View
                      Audit Log
                    </Link>
                    <span className="bl-1-grey-half plr-15">
                      <Button color={"primary"}>Run Auto Schedule</Button>
                    </span>
                    <span className="bl-1-grey-half plr-15">
                      <Button disabled>Send Bulk Shipment</Button>
                    </span>
                  </div>
                </Col>
              </Row>

              <div>
                <TabContent activeTab={activeTab} className="pt-1">
                  <TabPane tabId="1">
                    <div class="gantt_chart_main">
                      <div className="gantt_chart_first">
                      <Row className='remove_border'>
                          <Col lg={6} className='order-bank-bar'>
                            <div className="order-bank-shift-date">
                              <div>DATE</div>
                              <DateRangePicker
                                types={["single", "range"]}
                                startDate={null}
                                defaultValue={shiftDate}
                                onChange={value => setShiftDate(value)}
                              />
                            </div>
                            <p className="order-bank-region-label">REGION & TERMINAL</p>
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
                              <AWSMDropdown value={terminal} onChange={value => setTerminal(value)} items={terminalList}/>
                            </div>
                          </Col>
                          <Col lg={6} className='order-bank-bar right'>                           
                            <img src={customiseTableIcon} className="ml-2" />
                            <div className='radio_option m-0 order-bank-label'>
                              <input
                                type="radio"
                                id="radioPriority"
                                name="radioWidth"
                                value="BackLog"
                                checked={false}
                                className="mr-1 ml-1"
                                // onChange={this.changeLayoutWidth}
                              />
                              <span className="mr-1">High Priority</span>
                              <input
                                type="radio"
                                id="radiorequest"
                                name="radioWidth"
                                value="BackLog"
                                className='mr-1'
                                checked={false}
                                // onChange={this.changeLayoutWidth}
                              />
                              <span className='mr-1'>Special Request</span> 
                              <input
                                type="radio"
                                id="radioFuture"
                                name="radioWidth"
                                value="BackLog"
                                checked={false}
                                className='mr-1'
                                // onChange={this.changeLayoutWidth}
                              />
                              <span className='mr-1'>Future</span>
                              <input
                                type="radio"
                                id="radioBackLog"
                                name="radioWidth"
                                value="BackLog"
                                checked={false}
                                className='mr-1 ml-2'
                                // onChange={this.changeLayoutWidth}
                              />
                              <span className='mr-1'>BackLog</span>
                            </div>
                            <span className="m-0 order-bank-label">
                              141 DNs, 3 shipments, 3 special request, 5 high priority
                            </span>
                          </Col>
                        </Row>
                        <GanttChartTable />
                        <div className="square_border mb-2 mt-2">
                          {GanttChartBottom.map((item, index) => {
                            return (
                              <div className="d-flex align-items-center mr-2">
                                <div
                                  className={`square ${item.color} mr-1 ml-2`}
                                ></div>
                                {item.title}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <hr />
                      <div className="gantt_chart_second">
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
                          </Col>
                          <Col lg={3} className="order-bank-bar right">
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
                                className="awsm-option-button-content"
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
                          dataSource={orderBankTableData || []}
                          enabledCross={enabledCross}
                        />
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="shipment_main" />
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
            <NewOrderModal open={showNewOrder} onCancel={onCloseNewOrder} />
            <CrossTerminalModal
              open={crossTerminal}
              onCancel={onCloseCrossTerminal}
              onSave={onCloseCrossTerminal}
            />
            <CustomizeTableModal
              open={showCustomize}
              onCancel={onCloseCustomize}
              tableName="Order Bank"
              onChange={onTableColumnsChange}
              open={showCustomize}
              closeDialog={onCloseCustomize}
              availableMetric={tableMapping}
              defaultMetric={searchFields}
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
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  getRTSOrderBankTableData: params =>
    dispatch(getRTSOrderBankTableData(params)),
  refreshOderBankDN: params => dispatch(refreshOderBankDN(params)),
  sendOrderBankDN: params => dispatch(sendOrderBankDN(params)),
})

const mapStateToProps = ({ orderBank }) => ({
  orderBankTableData: orderBank.orderBankTableData,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBank)