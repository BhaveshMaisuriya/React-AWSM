import React, { Component, useMemo, useState } from "react"
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
  Dropdown, DropdownMenu, DropdownToggle
} from "reactstrap"
import "./style.scss"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import awsmLogo from "../../assets/images/AWSM-logo-order-bank.png"
import NewOrderModal from "./addOrderBankModal"
import DateRangePicker from "../../components/Common/DateRangePicker"
import AWSMDropdown from "../../components/Common/Dropdown"
import OrderBankTable from './OrderBankTable'
import customiseTableIcon from "../../assets/images/AWSM-Customise-Table.svg"

const REGION_TERMINAL = [
  {
    region: "Central",
    terminal: ["KVDT"]
  },
  {
    region: "Eastern",
    terminal: ["Kerteh", "Kuantan"]
  },
  {
    region: "Nothern",
    terminal: ["Langkawi", "Lumut", "Prai"]
  },
  {
    region: "Southern",
    terminal: ["Melaka", "Pasir Gudang"]
  },
  {
    region: "Sabah",
    terminal: ["Labuan", "Sanadakan", "Sepanggar Bay", "Tawau JV"]
  },
  {
    region: "Sarawak",
    terminal: ["Bintulu Jv", "Miri", "Senari IOT", "Tg Manis CODT"]
  },
  {
    region: "Special Product",
    terminal: ["Melaka", "Prai", "Kerteh", "Sepanggar Bay", "Labuan", "Sandakan", " Bintulu JV", "Senari IOT"]
  }
]

function OrderBank() {
  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [region, setRegion] = useState(null)
  const [terminal, setTerminal] = useState(null)
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
  }
}

const onCloseNewOrder = () => {
  setShowNewOrder(false);
}

  return (
    <React.Fragment>
      <div className="order-bank-page-content">
        <div className="container-fluid">
          <Card className="order_bank_main">
            <CardBody>
              <Row>
                <Col lg={3} md={3} sm={12}>
                  <div>
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
                  <img src={awsmLogo} />
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
                              <DateRangePicker types={["single", "range"]} startDate={null}/>
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
                      <OrderBankTable/>
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
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OrderBank
