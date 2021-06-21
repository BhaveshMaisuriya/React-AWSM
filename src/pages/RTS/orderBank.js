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
  DropdownToggle,
  DropdownMenu,
} from "reactstrap"
import "./style.scss"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Menu, MenuItem } from "@material-ui/core"

function OrderBank() {
  const [activeTab, setActiveTab] = useState("1")
  const [dropdownOpen, setOpen] = useState(false)

  const toggle = () => setOpen(!dropdownOpen)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Card>
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
                <Col lg={9} md={9} sm={12}></Col>
              </Row>

              <div>
                <TabContent activeTab={activeTab} className="pt-4">
                  <TabPane tabId="1">
                    <div class="gantt_chart_main">
                      <div className="gantt_chart_first"></div>
                      <hr />
                      <div className="gantt_chart_second">
                        <div className="d-flex">
                          <div className="gantt_chart_left">
                            <h3>Order Bank</h3>
                          </div>
                          <div className="gantt_chart_right">
                            <span className="right_setting_text">
                              141 orders, 3.2m ASR, 1.2m SMP, 1m Comm. Total
                              5.4m
                            </span>
                            {/* <ButtonDropdown
                              isOpen={dropdownOpen}
                              toggle={toggle}
                            >
                              <DropdownToggle caret> */}
                                <IconButton
                                  color="primary"
                                  aria-label="Setting"
                                  component="span"
                                  className="setting_icon"
                                  fontSize="large"
                                  style={{ color: "rgba(0,0,0,0.5)" }}
                                  aria-haspopup="true"
                                //   onClick={settingClick}
                                > 
                                <MoreVertIcon />
                               </IconButton>
                              {/* </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem className="awsm-select-menu w-100">
                                  Add New Order
                                </DropdownItem>
                                <DropdownItem className="awsm-select-menu w-100">
                                  Customize Column
                                </DropdownItem>
                                <DropdownItem className="awsm-select-menu w-100">
                                  Refresh Blocked DN
                                </DropdownItem>
                                <DropdownItem disabled>
                                  Cross Terminal
                                </DropdownItem>
                                <DropdownItem disabled>
                                  Send Multiple for DN
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div class="shipment_main"></div>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OrderBank
