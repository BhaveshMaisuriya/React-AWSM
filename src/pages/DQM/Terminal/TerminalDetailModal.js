import React, { Fragment, PureComponent } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap"

import { isScheduler } from "../../../helpers/auth_helper"
import {
  getTableInformation,
  updateTableInformation,
  getTerminalTableInformation,
} from "../../../store/terminal/actions"
import AddressTab from "./AddressTab"
import ContactTab from "./ContactTab"
import StatusTab from "./StatusTab"
import StorageTab from "./StorageTab"
import "./TerminalDetailModal.scss"
import classnames from "classnames"
import SimpleBar from "simplebar-react"

import {
  Col,
  Field,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import ExitConfirmation from "../../../components/Common/ExitConfirmation"
const tempData = {
  code: "12345",
  name: "TERMINAL 1",
  remarks: "remark",
  address:{
    id: 1,
    city: "Kuala Kangsar",
    state: "Perak",
    country: "MYS",
    postcode: 33000,
    latitude: 4.76007,
    longitude: 100.926712,
    region_name: "North 2",
    region_group: "Northern",
    address_1: "LOT 3311, JALAN SULTAN ISKANDAR SHAH KUALA KANGSAR 33000 PERAK",
    address_2: "JLN SULTAN ISKANDAR SHAH",
    address_3: ""
  },
  storage: {
    loading_bay_no: 100,
    max_volume_threshold: 10,
    loading_time: 100,
    turnaround_time: 100,
    product_1: {
      id: 1,
      status_awsm: "active",
      flow_rate: 100,
      volume_capping_date_range: {
        id: 1,
        type: "every",
        time_from: "00:00:00",
        time_to: "23:59:00",
        days: [
          "Monday",
          "Tuesday"
        ],
        date_from: null,
        date_to: null
      },
      volume_capping_date_range_2: {
        id: 2,
        type: "daily",
        time_from: "00:00:00",
        time_to: "23:59:00",
        days: "",
        date_from: null,
        date_to: null
      },
      volume_capping_volume: 100,
      volume_capping_remarks: "remark 1",
      volume_capping_volume_2: 100,
      volume_capping_remarks_2: "remark 2",
      terminal: "12345",
      name: "FOC - PETRONAS SPRINTA F900 10W-40 1L X 6B",
      code: "10000001"
    }
  },
  status: {
    status_awsm: "active",
    inactive_date_range_1: {
      id: 1,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from:  "2020-06-10",
      date_to: "2020-07-10",
      days: [
        "Monday",
        "Tuesday"
      ]
    },
    terminal_operating_days_1: {
      id: 2,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from: null,
      date_to: null,
      days: [
        "Monday",
        "Tuesday",
        "Thursday"
      ]
    },
    terminal_operation_hours_1: {
      id: 3,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from: null,
      date_to: null,
      days: [
        "Monday",
        "Tuesday"
      ]
    },
    no_delivery_interval_1: {
      id: 4,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from:  "2020-06-10",
      date_to: "2020-07-10",
      days: [
        "Monday",
        "Tuesday"
      ]
    },
    no_delivery_interval_2: {
      id: 5,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from:  "2020-06-10",
      date_to: "2020-07-10",
      days: [
        "Monday",
        "Tuesday"
      ]
    },
    no_delivery_interval_3: {
      id: 6,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from: null,
      date_to: null,
      days: [
        "Monday",
        "Tuesday"
      ]
    },
    no_delivery_interval_4: {
      id: 7,
      type: "range",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from: null,
      date_to: null,
      days: [
        "Monday",
        "Tuesday"
      ]
    }
  },
  contact: {
    supervisor: {
      id: 5,
      name: "NOR AZAM BIN. ABD KARIM - STATION MANAGER",
      number: "012-3937708",
      email: "AZAM.KARIM@KOPETRO.COM.MY",
      position: null
    },
    superintendant: {
      id: 6,
      name: "PN  ASNIDA BT ASKAR ALI",
      number: "013-5805799",
      email: "PSKK1@YAHOO.COM",
      position: null
    }
  }
}
class TerminalDetailModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      modal: true,
      event: {},
      updateDictionary: {},
      isConfirm: false,
    }
  }

  componentDidMount() {
    const { getTerminalTableInformation, data } = this.props
    getTerminalTableInformation(data)
  }

  handleUpdate(event) {
    if (Object.keys(this.state.updateDictionary).length > 0) {
      const { ship_to_party } = this.props.data
      this.props.onUpdateTableInformation({
        ship_to_party,
        body: this.state.updateDictionary,
      })
    } else this.props.onCancel()
  }
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }
  onFieldChange = (key, value) => {
    const newData = {...this.props.data}
    newData[key] = value;
  }

  onConfirmCancel = () => {
    this.setState({isConfirm: false });
  }

  onConfirmExit = () => {
    this.setState({isConfirm: false });
      if (this.props.onCancel()) {
        this.props.onCancel()
      }
  }

  render() {
    const { activeTab } = this.state
    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }
    const { onCancel, visible, currentTerminal, data } = this.props
    const isDisabledField = isScheduler()
    return (
      <Modal isOpen={visible} className="table-information modal-lg">
        <ModalHeader toggle={this.toggleTI}>
          <span
            style={{
              height: "26px",
              color: "#000000",
              fontFamily: "Museo Sans",
              letterSpacing: "0",
              lineHeight: "26px",
            }}
          >
            TERMINAL CODE: {data.ship_to_party}
          </span>
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
        </ModalHeader>
        {this.state.isConfirm && (
          <ExitConfirmation
            onExit={this.onConfirmExit}
            onCancel={this.onConfirmCancel}
          />
        )}
        <>
          {currentTerminal ? (
            <ModalBody>
              {this.state.isConfirm && (
                <ExitConfirmation
                  onExit={this.onConfirmExit}
                  onCancel={this.onConfirmCancel}
                />
              )}
              <Fragment>
                <div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label>TERMINAL NAME</label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={currentTerminal.product_name}
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label> REMARKS</label>
                      <input
                        placeholder="Type something here..."
                        className="form-control"
                        type="text"
                        defaultValue={currentTerminal.remarks}
                        disabled={isDisabledField}
                        onChange={ev => {
                          this.setState({
                            updateDictionary: {
                              ...this.state.updateDictionary,
                              ...{ remarks: ev.target.value },
                            },
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
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
                      {/* <i className="bx bx-chat font-size-20 d-sm-none" /> */}
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
                      {/* <i className="bx bx-group font-size-20 d-sm-none" /> */}
                      <span className="d-none d-sm-block">Storage</span>
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
                      {/* <i className="bx bx-book-content font-size-20 d-sm-none" /> */}
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
                      {/* <i className="bx bx-chat font-size-20 d-sm-none" /> */}
                      <span className="d-none d-sm-block">Contact</span>
                    </NavLink>
                  </NavItem>
                  <NavItem />
                  <NavItem />
                  <NavItem />
                  <NavItem />
                </Nav>

                {/* tab content */}
                <TabContent activeTab={this.state.activeTab} className="py-4">
                <TabPane tabId="1">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <AddressTab data={tempData.address} onChange={(value) => this.onFieldChange("address", value)}/>
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
                    <StorageTab data={tempData.storage} onChange={(value) => this.onFieldChange("storage", value)}/>
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
                    <StatusTab data={tempData.status} onChange={(value) => this.onFieldChange("status", value)}/>
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
                    <ContactTab data={tempData.contact} onChange={(value) => this.onFieldChange("contact", value)}/>
                  </SimpleBar>
                </TabPane>
              </TabContent>
              </Fragment>
              <ModalFooter>
                <button className="btn-sec" onClick={() =>  this.setState({isConfirm: true })}>
                  Cancel
                </button>
                {!isDisabledField && currentTerminal ? (
                  <Button onClick={this.handleUpdate.bind(this)} color="primary">
                    Update
                  </Button>
                ) : null}
              </ModalFooter>
            </ModalBody>
          ) : null}
        </>
      </Modal>
    )
  }
}

const mapStateToProps = ({ terminal }) => ({
  currentTerminal: terminal.currentTerminal,
  error: terminal.error,
})

const mapDispatchToProps = dispatch => ({
  getTerminalTableInformation: params => dispatch(getTerminalTableInformation(params)),
  onUpdateTableInformation: params => dispatch(updateTableInformation(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TerminalDetailModal)