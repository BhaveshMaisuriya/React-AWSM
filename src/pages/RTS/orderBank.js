import React, { Component, useState } from "react"
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
  Dropdown, DropdownMenu, DropdownToggle 
} from "reactstrap"
import "./style.scss"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import awsmLogo from "../../assets/images/AWSM-logo-order-bank.png"
import NewOrderModal from "./addOrderBankModal"
import DateRangePicker from "../../components/Common/DateRangePicker"
import AWSMDropdown from "../../components/Common/Dropdown"

function OrderBank() {
  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const toggle = () => setOpen(!dropdownOpen)

  let orderBankSettings = [
    {'value': 'newOrder', 'label': 'Add New Order', 'icon' : '' },
    {'value': 'customizeCol', 'label': 'Customize Column', 'icon' : '' },
    {'value': 'RefreshDN', 'label': 'Refresh Blocked DN', 'icon' : '' },
    {'value': 'CrossTerminal', 'label': 'Cross Terminal', 'icon' : '' },
    {'value': 'SendDN', 'label': 'Send Multiple for DN', 'icon' : '' },
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
                          <Col lg={8} className='order-bank-bar'>
                            <h4 className="m-0 order-bank-label">Order Bank</h4>
                            <div className="order-bank-shift-date">
                              <DateRangePicker types={["single", "range"]} startDate={null}/>
                            </div>
                            <p className="order-bank-region-label">REGION & TERMINAL</p>
                            <div className="order-bank-region">
                              <AWSMDropdown items={["Central"]}/>
                            </div>
                            <div className="order-bank-region ml-2">
                              <AWSMDropdown items={["KVDT"]}/>
                            </div>
                          </Col>
                          <Col lg={4} className='d-flex align-item-center'>
                            <span className="right_setting_text">
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
                                    className="d-flex align-items-center p-2 awsm-option-button-content-item"
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
