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
  DropdownItem,
  Dropdown, DropdownMenu, DropdownToggle, Button
} from "reactstrap"
import "./style.scss"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import eyeIcon from "../../assets/images/auditlog-eye.svg"
import awsmLogo from "../../assets/images/AWSM-logo-order-bank.png"
import NewOrderModal from "./addOrderBankModal"
import DateRangePicker from "../../components/Common/DateRangePicker"
import AWSMDropdown from "../../components/Common/Dropdown"
import OrderBankTable from './OrderBankTable'
import REGION_TERMINAL from "../../common/data/regionAndTerminal"
import customiseTableIcon from "../../assets/images/AWSM-Customise-Table.svg"
import { Link } from "react-router-dom"
import CustomizeTableModal from "../../common/CustomizeTable"
import { tableColumns, tableMapping } from "./OrderBankTable/tableMapping"
import { format } from "date-fns";
import { getRTSOrderBankTableData } from "../../store/orderBank/actions"

function OrderBank({ getRTSOrderBankTableData, orderBankTableData }) {
  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [searchFields, setSearchFields] = useState(tableColumns);
  const [region, setRegion] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const [shiftDate, setShiftDate] = useState({
    type: "single",
    days: [format(Date.now(), "yyyy-MM-dd")],
  })

  const toggle = () => setOpen(!dropdownOpen)
  const terminalList = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region]);

  let orderBankSettings = [
    {'value': 'newOrder', 'label': 'Add New Order', 'icon' : customiseTableIcon },
    {'value': 'customizeCol', 'label': 'Customize Column', 'icon' : customiseTableIcon },
    {'value': 'RefreshDN', 'label': 'Refresh Blocked DN', 'icon' : customiseTableIcon },
    {'value': 'CrossTerminal', 'label': 'Cross Terminal', 'icon' : customiseTableIcon },
    {'value': 'SendDN', 'label': 'Send Multiple for DN', 'icon' : customiseTableIcon },
];

const onSettingClick = (val) => {
  if(val === 'newOrder'){
    setShowNewOrder(true);
  } else if (val === 'customizeCol'){
    setShowCustomize(true);
  }
}
const onCloseCustomize = () => {
  setShowCustomize(false);
}

const onCloseNewOrder = () => {
  setShowNewOrder(false);
}

useEffect(() => {
  getRTSOrderBankTableData({region, terminal, shiftDate});
}, [region, terminal, shiftDate])

const onTableColumnsChange = columns => {
  setSearchFields(columns);
  // getCustomerData();
}

  return (
    <React.Fragment>
      <div className="order-bank-page-content">
        <div className="container-fluid">
          <Card className="order_bank_main">
            <CardBody>
              <Row>
                <Col lg={3} md={3} sm={12}>
                  <div className='h-100'>
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
                  <div className='d-flex align-item-right '>                    
                    <Link to="#" className='border-before'><img src={awsmLogo} height='25px' width='80px' className='ml-3' /></Link>
                    <Link to="#" className='border-before'><i className="bx bx-fullscreen ml-3"></i> Fullscreen</Link>
                    <Link to="#" className='border-before'><img src={eyeIcon} alt="info" className='ml-3' /> View Audit Log</Link>
                    <span className='bl-1-grey-half plr-15'><Button color={'primary'}>Run Auto Schedule</Button></span>
                    <span className='bl-1-grey-half plr-15'><Button disabled >Send Bulk Shipment</Button></span>
                  </div>
                </Col>
              </Row>

              <div>
                <TabContent activeTab={activeTab} className="pt-4">
                  <TabPane tabId="1">
                    <div class="gantt_chart_main">
                      <div className="gantt_chart_first"></div>
                      <hr />
                      <div className="gantt_chart_second">
                        <Row>
                          <Col lg={9} className='order-bank-bar'>
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
                          <Col lg={3} className='order-bank-bar'>
                            <span className="m-0 order-bank-label">
                              141 orders, 3.2m ASR, 1.2m SMP, 1m Comm. Total
                              5.4m
                            </span>
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
                                {orderBankSettings.map((option, index) => (
                                  <div
                                    className="d-flex align-items-center p-2 awsm-option-button-content-item order-setting-options"
                                    onClick={() => onSettingClick(option.value)}
                                  >
                                    {option.icon && <img src={option.icon} />}
                                    <div className="pl-2" key={index}>
                                      {option.label}
                                    </div>
                                  </div>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </Col>
                      </Row>
                      <OrderBankTable dataSource={orderBankTableData || []}/>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="shipment_main"/>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
            <NewOrderModal
              open={showNewOrder}
              onCancel={onCloseNewOrder}
            />
            <CustomizeTableModal
              open={showCustomize}
              onCancel={onCloseCustomize}
              tableName='Order Bank'
              onChange={onTableColumnsChange}
              open={showCustomize}
              closeDialog={onCloseCustomize}
              availableMetric={tableMapping}
              defaultMetric={searchFields}
            />
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  getRTSOrderBankTableData: params => dispatch(getRTSOrderBankTableData(params))
})

const mapStateToProps = ({ orderBank }) => ({
  orderBankTableData: orderBank.orderBankTableData,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBank)