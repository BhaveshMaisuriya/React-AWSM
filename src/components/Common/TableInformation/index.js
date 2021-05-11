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
import AWSMInput from "../Input"
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
    this.state = {
      activeTab: "1",
      modal: true,
      event: {},
    }
  }

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
  render() {
    const { classes, closeModal, data, dataList } = this.props
    console.log(data)
    console.log(dataList)
    const { modal } = this.state
    return (
      <ModalBody>
        <Form>
          <div className="dqm-tableinfo-container" id="dqm-tableinfo-container">
            <div className="row">
              <div className="col col-12 col-sm-6 col-lg-6">
                <div className="input-header mb-2">SHIP TO (PARTY)</div>
                <AWSMInput value={data.ship_to_party} disabled />
              </div>
              <div className="col col-12 col-sm-6 col-lg-6">
                <div className="input-header mb-2">SHIP TO (COMPANY NAME)</div>
                <AWSMInput value={data.ship_to_company_name} disabled />
              </div>
              <div className="col col-12 col-sm-6 col-lg-6">
                <div className="input-header mb-2">STATUS IN SAP</div>
                <AWSMInput value={data.status_in_sap} disabled />
              </div>
              <div className="col col-12 col-sm-6 col-lg-12">
                <div className="input-header mb-2">REMARKS</div>
                <AWSMInput value={data.remarks} />
              </div>
            </div>
            <div className={classes.navContainer}>
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
                    <TabAddress />
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="2">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <TabDelivery />
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="3">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <TabStatus />
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="4">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  ></SimpleBar>
                </TabPane>
                <TabPane tabId="5">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <TabStorage />
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
                    <TabQuota />
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
                  <button type="submit" className={classes.buttonUpdate}>
                    Update
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
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
export default withStyles(styles)(TableInformation)
