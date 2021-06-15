import React, { Fragment, PureComponent } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap"

import { isScheduler } from "../../../helpers/auth_helper"
import {
  getTableInformation,
  updateTableInformation,
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
class TerminalDetailModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      modal: true,
      event: {},
      updateDictionary: {},
      isConfirm: false,
      data:props.currentTerminal
    }
  }

  componentDidMount() {
    const { fetchTableInformation, data } = this.props
    fetchTableInformation(data.code)
  }

  handleUpdate(event) {
    if (Object.keys(this.state.updateDictionary).length > 0) {
      const { ship_to_party } = this.props.data
      this.props.onUpdateTableInformation({
        ship_to_party,
        body: this.state.updateDictionary,
      })
    } else {
      const { code } = this.props.data
      const { data } = this.state
      this.props.onUpdateTableInformation({
        ship_to_party:code,
        body: data,
      })
      // this.props.onCancel()
    }
  }
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }
  onFieldChange = (key, value) => {
    const newData = {...this.state.data}
    newData[key] = value;
    this.setState({data:newData})
    console.log(newData);
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
      <Modal isOpen={visible} toggle={() =>  this.setState({isConfirm: true })} className="table-information modal-lg">
        <ModalHeader toggle={() =>  this.setState({isConfirm: true })}>
          <div className="header-content">
          <div
            style={{
              height: "26px",
              color: "#000000",
              fontFamily: "Museo Sans",
              letterSpacing: "0",
              lineHeight: "26px",
            }}
          >
            TERMINAL CODE: {data.code}
            <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
          </div>
          </div>
        </ModalHeader>
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
                      <label>TERMINAL CODE</label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={currentTerminal.code}
                        disabled={true}
                        onChange={(e) => this.onFieldChange("code", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>TERMINAL NAME</label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={currentTerminal.name}
                        disabled={true}
                        onChange={(e) => this.onFieldChange("name", e.target.value)}
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
                    <AddressTab data={currentTerminal?.address} onChange={(value) => this.onFieldChange("address", value)}/>
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
                    <StorageTab data={currentTerminal?.storage} onChange={(value) => this.onFieldChange("storage", value)}/>
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
                    <StatusTab data={currentTerminal?.status} onChange={(value) => this.onFieldChange("status", value)}/>
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
                    <ContactTab data={currentTerminal?.contact} onChange={(value) => this.onFieldChange("contact", value)}/>
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
  fetchTableInformation: params => dispatch(getTableInformation(params)),
  onUpdateTableInformation: params => dispatch(updateTableInformation(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TerminalDetailModal)
