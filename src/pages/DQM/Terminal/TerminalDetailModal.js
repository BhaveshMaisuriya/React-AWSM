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
import { isEqual } from "lodash"
import CloseButton from "../../../components/Common/CloseButton"
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
import { runValidation } from "../Common/helper"

class TerminalDetailModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      modal: true,
      event: {},
      updateDictionary: {},
      isConfirm: false,
      dataSource: props.currentTerminal,
      isValidated: false,
      forceBlur: {
        statusTab: {
          inactive_date_range_1: false,
        },
      },
    }
    this.errors = {
      statusTab: [],
      contactTab: [],
    }
  }

  componentDidMount() {
    const { fetchTableInformation, data } = this.props
    fetchTableInformation(data.code)
  }

  componentDidUpdate(prevProps, prevStates) {
    const { dataSource } = this.state
    if (!isEqual(prevStates.dataSource, dataSource)) {     
      this.validate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.currentTerminal, this.props.currentTerminal)) {
      this.setState({ dataSource: nextProps.currentTerminal })
    }
    if (nextProps.isFetchDataAfterChange) {
      this.props.onCancel()
      nextProps.refreshMainTable()
    }
  }

  async handleUpdate() {
    const { errors } = this
      if (Object.values(errors).some(errorList => errorList.length > 0)) {
        const errorTabs = Object.keys(errors)
        errorTabs.forEach(tab => {
          this.errors[tab].forEach(({ field }) => {
            if (
              this.state.forceBlur?.[tab]?.[field] !== undefined ||
              this.state.forceBlur?.[tab]?.[field] != null
            ) {
              this.setState({
                forceBlur: {
                  [tab]: {
                    [field]: true,
                  },
                },
              })
            }
          })
        })
        return
      }

      const { code } = this.props.data
      const { dataSource } = this.state
      if(dataSource?.contact?.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(dataSource?.contact?.email)){
        this.setState({ isValidated: false })
        return
      } 
      if(dataSource?.contact?.superintendant?.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(dataSource?.contact?.superintendant?.email)){
        this.setState({ isValidated: false })
        return
      }
    await this.props.onUpdateTableInformation({
      ship_to_party: code,
      body: dataSource,
    })
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }
  onFieldChange = (key, value) => {
    const newData = { ...this.state.dataSource }
    newData[key] = value
    this.setState({ dataSource: newData })
  }

  onConfirmCancel = () => {
    this.setState({ isConfirm: false })
  }

  onConfirmExit = () => {
    this.setState({ isConfirm: false })
    if (this.props.onCancel()) {
      this.props.onCancel()
    }
  }

  validate() {
    const { dataSource } = this.state
    const { status, storage } = dataSource
    let exceedValues = []
    if (
      storage?.loading_bay_no > 100 ||
      storage?.loading_time > 1440 ||
      storage?.turnaround_time > 1440
    ) {
      exceedValues.push(1)
    }
    for (let i = 1; i < 50; i++) {
      if (storage?.[`product_${i}`]) {
        if (
          storage?.[`product_${i}`]?.flow_rate > 10000 ||
          storage?.[`product_${i}`]?.volume_capping_volume > 10000000 ||
          storage?.[`product_${i}`]?.volume_capping_volume_2 > 10000000
        ) {
          exceedValues.push(1)
        }
      } else {
        break
      }
    }

    if (status?.status_awsm === "Temp Inactive") {
      if (!status?.inactive_date_range_1?.type) {
        exceedValues.push(1)
      }
      if (
        status?.inactive_date_range_1?.type === "single" &&
        status?.inactive_date_range_1?.days?.length === 0
      ) {
        exceedValues.push(1)
      }
      if (
        status?.inactive_date_range_1?.type === "range" &&
        (!status?.inactive_date_range_1?.date_from ||
          !status?.inactive_date_range_1?.date_to)
      ) {
        exceedValues.push(1)
      }
    }
    if (exceedValues.length > 0) {
      this.setState({ isValidated: true })
    } else {
      this.setState({ isValidated: false })
    }
  }

  handleExitConfirmation = () => {
    if (!isEqual(this.state.dataSource, this.props.currentTerminal))
      return (
        <ExitConfirmation
          onExit={this.onConfirmExit}
          onCancel={this.onConfirmCancel}
        />
      )
    else this.onConfirmExit()
  }
  handleErrors = ({ tab, error, field }, pushError) => {
    if (this.errors?.[tab] && pushError) {
      const newErrors = { ...this.errors }
      newErrors[tab].push({ error, field })
      this.errors = newErrors
    }
    if (this.errors?.[tab] && !pushError) {
      const newErrors = { ...this.errors }
      newErrors[tab] = this.errors[tab].filter(
        error => error.error !== error && error.field !== field
      )
      this.errors = newErrors
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
      <Modal
        isOpen={visible}
        className="commercial-customer-modal terminal-detail-modal modal-lg"
      >
        <ModalHeader
          close={
            <CloseButton
              handleClose={() => this.setState({ isConfirm: true })}
            />
          }
        >
          <div className="header-title">Terminal Code: {data.code}</div>
          <div className="header-subtitle">
            Last Updated By: Nur Izzati on 3rd March 2021
          </div>
        </ModalHeader>
        <>
          {currentTerminal ? (
            <>
              <ModalBody>
                {this.state.isConfirm ? this.handleExitConfirmation() : ""}
                <Fragment>
                  <div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label>TERMINAL NAME</label>
                        <input
                          placeholder={
                            !isDisabledField && "Type something here..."
                          }
                          className="form-control awsm-input"
                          type="text"
                          defaultValue={currentTerminal.name}
                          disabled={true}
                          onChange={e =>
                            this.onFieldChange("name", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-6 form-group"></div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label> REMARKS</label>
                        <input
                          placeholder={
                            !isDisabledField && "Type something here..."
                          }
                          className="form-control awsm-input"
                          type="text"
                          defaultValue={currentTerminal.remarks}
                          disabled={isDisabledField}
                          onChange={e =>
                            this.onFieldChange("remarks", e.target.value)
                          }
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
                        <AddressTab
                          data={currentTerminal?.address}
                          onChange={value =>
                            this.onFieldChange("address", value)
                          }
                        />
                      </SimpleBar>
                    </TabPane>
                    <TabPane tabId="2" style={{ marginRight: "-25px" }}>
                      <SimpleBar
                        style={{
                          height: "350px",
                          width: "100%",
                          overflowX: "hidden",
                          paddingRight: "25px",
                        }}
                      >
                        <StorageTab
                          data={currentTerminal?.storage}
                          onChange={value =>
                            this.onFieldChange("storage", value)
                          }
                        />
                      </SimpleBar>
                    </TabPane>
                    <TabPane tabId="3" style={{ marginRight: "-25px" }}>
                      <SimpleBar
                        style={{
                          height: "350px",
                          width: "100%",
                          overflowX: "hidden",
                          paddingRight: "25px",
                          paddingBottom: "5px",
                        }}
                      >
                        <StatusTab
                          data={currentTerminal?.status}
                          onChange={value =>
                            this.onFieldChange("status", value)
                          }
                          handleErrors={this.handleErrors}
                          forceBlur={this.state.forceBlur.statusTab}
                        />
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
                        <ContactTab
                          data={currentTerminal?.contact}
                          onChange={value =>
                            this.onFieldChange("contact", value)
                          }
                        />
                      </SimpleBar>
                    </TabPane>
                  </TabContent>
                </Fragment>
              </ModalBody>
              {!isDisabledField && !this.state.isConfirm ? (
                <ModalFooter className="pr-4">
                  <button
                    className="btn-sec"
                    onClick={() => this.setState({ isConfirm: true })}
                  >
                    Cancel
                  </button>
                  <Button
                    disabled={this.state.isValidated}
                    onClick={this.handleUpdate.bind(this)}
                    color="primary"
                  >
                    Update
                  </Button>
                </ModalFooter>
              ) : null}
            </>
          ) : null}
        </>
      </Modal>
    )
  }
}

const mapStateToProps = ({ terminal }) => ({
  currentTerminal: terminal.currentTerminal,
  error: terminal.error,
  isFetchDataAfterChange: terminal.isFetchDataAfterChange,
})

const mapDispatchToProps = dispatch => ({
  fetchTableInformation: params => dispatch(getTableInformation(params)),
  onUpdateTableInformation: params => dispatch(updateTableInformation(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TerminalDetailModal)
