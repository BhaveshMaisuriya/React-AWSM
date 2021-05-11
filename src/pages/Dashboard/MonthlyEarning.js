import React, { Component } from "react"

import { Row, Col, Card, Dropdown, DropdownMenu, DropdownToggle, DropdownItem,
   CardBody, CardText, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import { Link } from "react-router-dom"
import classnames from "classnames"
import ApexRadial from "./ApexRadial"

class MonthlyEarning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {" "}
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Sales & Inventory Submission by Station</CardTitle>
            <div className="mb-2">

        <Col lg="6" style={{paddingLeft: '0px'}}>
        <Dropdown className=""
                        isOpen={this.state.btnprimary1}
                        toggle={() =>
                          this.setState({
                            btnprimary1: !this.state.btnprimary1,
                          })
                        }
                      >
                        <DropdownToggle
                          tag="button"
                          className="btn btn-primary"
                        >
                          Central Region <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem>All Regions</DropdownItem>
                          <DropdownItem>Northern</DropdownItem>
                          <DropdownItem>Southern</DropdownItem>
                          <DropdownItem>Eastern</DropdownItem>
                          <DropdownItem>Central</DropdownItem>
                          <DropdownItem>Borneo</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>{" "}
            {/* <Nav pills className="navtab-bg nav-justified">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: this.state.activeTab === 0,
                          })}
                          onClick={() => {
                            this.toggle(0)
                          }}
                        >
                          All
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: this.state.activeTab === 1,
                          })}
                          onClick={() => {
                            this.toggle(1)
                          }}
                        >
                          Inventory
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: this.state.activeTab === 2,
                          })}
                          onClick={() => {
                            this.toggle(2)
                          }}
                        >
                          Sale
                        </NavLink>
                      </NavItem>
                   </Nav> */}
                   </Col>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0} className="pt-3">
                        <Row>
                          <Col sm="12">
                            <CardText>
                              Combined Data Submission by Retail Stations
                            </CardText>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="2">
                            <p className="text-muted">Yesterday</p>
                            {/* <h3>34,252</h3> */}
                            <p className="text-muted">
                              <span className="mr-2">
                                {" "}
                                101/112 <i className="mdi mdi-gas-station"></i>{" "}
                              </span>{" "}
                            </p>
                            <div className="mt-4">
                              <Link
                                to=""
                                className="waves-effect waves-light"
                              >
                                View More <i className="mdi mdi-arrow-right ml-1"></i>
                              </Link>
                            </div>
                          </Col>
                          <Col sm="10">
                            <div className="mt-4 mt-sm-0">
                              <Row>
                              <Col sm="2"></Col>
                              <Col sm="3">
                              <ApexRadial text="% Submitted" perc={90}/>
                              </Col>
                              <Col sm="3">
                              <ApexRadial text="Data Accuracy by Station" perc={95}/>
                              </Col>
                              <Col sm="3">
                              <ApexRadial text="Manual Override by DQM" perc={5}/>
                              </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
       
                      </TabPane>
                      <TabPane tabId={1} className="pt-3">
                          <Row>
                          <Col sm="12">
                            <CardText>Inventory Data Submission by Retail Stations</CardText>
                          </Col>
                          </Row>
                          <Row>
                          <Col sm="2">
                            <p className="text-muted">Yesterday</p>
                            {/* <h3>34,252</h3> */}
                            <p className="text-muted">
                              <span className="mr-2">
                                {" "}
                                101/112 <i className="mdi mdi-gas-station"></i>{" "}
                              </span>{" "}
                            </p>
                            <div className="mt-4">
                              <Link
                                to=""
                                className="waves-effect waves-light"
                              >
                                View More <i className="mdi mdi-arrow-right ml-1"></i>
                              </Link>
                            </div>
                          </Col>
                          <Col sm="10">
                            <div className="mt-4 mt-sm-0">
                              <Row>
                              <Col sm="2"></Col>
                              <Col sm="3">
                              <ApexRadial text="Data Availability" perc={90}/>
                              </Col>
                              <Col sm="3">
                              <ApexRadial text="Data Quality" perc={95}/>
                              </Col>
                              <Col sm="3">
                              <ApexRadial text="Manual Update" perc={5}/>
                              </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId={2} className="pt-3">
                        <Row>
                          <Col sm="12">
                            <CardText>Sales Data Submission by Retail Stations</CardText>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="2">
                            <p className="text-muted">Yesterday</p>
                            {/* <h3>34,252</h3> */}
                            <p className="text-muted">
                              <span className="mr-2">
                                {" "}
                                101/112 <i className="mdi mdi-gas-station"></i>{" "}
                              </span>{" "}
                            </p>
                            <div className="mt-4">
                              <Link
                                to=""
                                className="waves-effect waves-light"
                              >
                                View More <i className="mdi mdi-arrow-right ml-1"></i>
                              </Link>
                            </div>
                          </Col>
                          <Col sm="10">
                            <div className="mt-4 mt-sm-0">
                              <Row>
                              <Col sm="2"></Col>
                              <Col sm="3">
                              <ApexRadial text="Data Availability" perc={90}/>
                              </Col>
                              <Col sm="3">
                              <ApexRadial text="Data Quality" perc={95}/>
                              </Col>
                              <Col sm="3">
                              <ApexRadial text="Manual Update" perc={5}/>
                              </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                  
                      </TabPane>
                    </TabContent>
                

            </div>
           </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default MonthlyEarning
