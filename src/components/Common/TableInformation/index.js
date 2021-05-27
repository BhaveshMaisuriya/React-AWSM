import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import {
  Button,
  Col,
  Field,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import classnames from "classnames"
//Import Scrollbar
import SimpleBar from "simplebar-react"
import TabAddress from "./tabAddress"
import TabDelivery from "./tabDelivery"
import TabQuota from "./tabQuota"
import TabStorage from "./tabStorage"
import TabStatus from "./tabStatus"
// import TabDelivery from "./tabDelivery"
import { withRouter } from "react-router-dom"
import TabContact from "./tabContact"
import AWSMAlert from "../AWSMAlert"

import "./style.scss"

const styles = {
  topContainer: {
    marginLeft: "20px",
    marginRight: "30px",
  },
  navContainer: {
    paddingTop: "35px",
  },
  buttonCancel: {
    boxSizing: "border-box",
    height: "42px",
    width: "122px",
    border: "1px solid #CBEFED",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
    color: "#00A19C",
    marginRight: "8px",
  },
  buttonUpdate: {
    boxSizing: "border-box",
    height: "42px",
    width: "122px",
    border: "1px solid #CBEFED",
    borderRadius: "4px",
    backgroundColor: "#00A19C",
    color: "#FFFFFF",
  },
  field: {
    backgroundColor: "#EEEEEE !important",
  },
}

class TableInformation extends Component {
  constructor(props) {
    super(props)
    this.getStorageData = this.getStorageData.bind(this)
    this.state = {
      activeTab: "1",
      modal: true,
      event: {},
      alert: false,
      userRole: {
        scheduler: false,
      },
      storageData: 0,
    }
  }

  // toggle UserRuler for testing permission function

  // toggleUserRuler = () => {
  //   this.setState({
  //     userRole: {
  //       scheduler: !this.state.userRole.scheduler,
  //     },
  //   })
  // }
  /**
   * Toggle tab once click
   */
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }
  /**
   *
   * Call update API when user click update button
   */
  handleUpdate = e => {
    e.preventDefault()
    console.log("Update success")
    this.setState({
      alert: true,
    })
  }

  render() {
    const { classes, closeModal, data, dataList } = this.props
    const { modal } = this.state
    const { location } = this.props
    const { scheduler } = this.state.userRole
    const path = location.pathname

    return (
      <ModalBody>
        <AvForm>
          <div className={classes.topContainer}>
            <Row>
              <Col className="col-6">
                <AvField
                  name="ship_to_party"
                  type="text"
                  label="SHIP TO (PARTY)"
                  value={data.ship_to_party}
                  className={classes.field}
                  disabled
                />
              </Col>
              <Col className="col-6">
                <AvField
                  name="ship_to_company_name"
                  type="text"
                  label="SHIP TO (COMPANY NAME)"
                  value={data.ship_to_company_name}
                  className={classes.field}
                  disabled
                ></AvField>
              </Col>
              <Col className="col-6">
                <AvField
                  name="status_in_sap"
                  type="text"
                  label="STATUS IN SAP"
                  value={data.status_in_sap}
                  className={classes.field}
                  disabled
                ></AvField>
              </Col>
              <Col className="col-12">
                <AvField
                  name="remarks"
                  type="text"
                  label={data.remarks}
                  value="Shaziman only"
                  disabled={scheduler}
                  className={`${scheduler ? classes.field : undefined}`}
                ></AvField>
              </Col>
            </Row>
            <Nav pills justified>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1",
                  })}
                  onClick={() => {
                    this.toggleTab("1")
                  }}
                >
                  <i className="bx bx-chat font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Address</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2",
                  })}
                  onClick={() => {
                    this.toggleTab("2")
                  }}
                >
                  <i className="bx bx-group font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Delivery</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3",
                  })}
                  onClick={() => {
                    this.toggleTab("3")
                  }}
                >
                  <i className="bx bx-book-content font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Status</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "4",
                  })}
                  onClick={() => {
                    this.toggleTab("4")
                  }}
                >
                  <i className="bx bx-chat font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Contact</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "5",
                  })}
                  onClick={() => {
                    this.toggleTab("5")
                  }}
                >
                  <i className="bx bx-group font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Storage</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "6",
                  })}
                  onClick={() => {
                    this.toggleTab("6")
                  }}
                >
                  <i className="bx bx-book-content font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Quota</span>
                </NavLink>
              </NavItem>
            </Nav>
            {/*Tab Address*/}
            <TabContent activeTab={this.state.activeTab} className="py-4">
              <TabPane tabId="1">
                <SimpleBar
                  style={{
                    height: "350px",
                    width: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <TabAddress dataList={dataList} scheduler={scheduler} />
                </SimpleBar>
              </TabPane>

              <TabPane tabId="3">
                <div>
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <TabStatus scheduler={scheduler} />
                  </SimpleBar>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <SimpleBar
                  style={{
                    height: "350px",
                    width: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <TabDelivery scheduler={scheduler} />
                </SimpleBar>
              </TabPane>
              <TabPane tabId="4">
                <SimpleBar
                  style={{
                    height: "350px",
                    width: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <TabContact scheduler={scheduler} />
                </SimpleBar>
              </TabPane>
              <TabPane tabId="5">
                <SimpleBar
                  style={{
                    height: "350px",
                    width: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <TabStorage scheduler={scheduler} />
                </SimpleBar>
              </TabPane>
              <TabPane tabId="6">
                <SimpleBar
                  style={{
                    height: "350px",
                    width: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <TabQuota scheduler={scheduler} />
                </SimpleBar>
              </TabPane>
            </TabContent>
          </div>
          {/*Update and Cancel button*/}
          <Row>
            <Col>
              <div className="text-right">
                <button
                  type="button"
                  className={classes.buttonCancel}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${scheduler ? "btn btn-secondary" : null} ${
                    classes.buttonUpdate
                  }`}
                  onClick={this.handleUpdate}
                  disabled={scheduler}
                >
                  Update
                </button>
              </div>
            </Col>
            <AWSMAlert
              status="success"
              message="Update success!"
              openAlert={this.state.alert}
              closeAlert={() => this.setState({ alert: false })}
            />
          </Row>
        </AvForm>
      </ModalBody>
    )
  }
}
TableInformation.propType = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  dataList: PropTypes.array.isRequired,
  //address: PropTypes.array,
}
export default withStyles(styles)(withRouter(TableInformation))
