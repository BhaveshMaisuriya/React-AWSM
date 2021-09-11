import React, { Component, Fragment } from "react"
import {
  Button,
  Modal,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap"
import AvailabilityTab from "./AvailabilityTab"
import SpecificationTab from "./SpecificationTab"
import TrailerTab from "./TrailerTab"
import "./InformationModal.scss"
import { MODE } from "./constants"
import AWSMAlert from "../../../components/Common/AWSMAlert/index"
import { isScheduler } from "../../../helpers/auth_helper"
import CloseButton from "../../../components/Common/CloseButton"

import SimpleBar from "simplebar-react"
import {
  getRoadTankerDetail,
  updateRoadTankerDetail,
  resetCurrentRoadTankerData,
} from "../../../store/actions"
import { connect } from "react-redux"
import ExitConfirmation from "../../../components/Common/ExitConfirmation"
import { isEqual } from "lodash"

// Information Modal
class InformationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: "1",
      mode: MODE.VIEW_AND_AMEND,
      showAlert: false,
      userRole: {
        scheduler: isScheduler(),
      },
      updateSuccess: props?.isUpdateSuccess,
      data: props?.currentRoadTanker,
      isConfirm: false,
      alertMsg: "",
    }
  }

  componentWillUnmount() {
    this.props.onResetCurrentRoadTankerDetail()
  }

  componentDidMount() {
    const { onGetRoadTankerDetail, mode, data } = this.props
    let modalMode = mode ? mode : MODE.VIEW_AND_AMEND
    this.setState({ mode: modalMode })
    onGetRoadTankerDetail(data.vehicle)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdateSuccess) {
      this.onConfirmExit()
      this.props.refreshMainTable()
    }
    if (!isEqual(nextProps.currentRoadTanker, this.props.currentRoadTanker)) {
      this.setState({ data: nextProps.currentRoadTanker })
    }
  }

  onConfirmCancel = () => {
    this.setState({ isConfirm: false })
  }

  onConfirmExit = () => {
    this.setState({ isConfirm: false })
    this.props.onResetCurrentRoadTankerDetail()
    this.props.onCancel()
  }

  isEmptyDate = date => {
    if (date?.type === "single" && date?.days?.length === 0) {
      return true
    }
    if (
      date?.type === "range" &&
      date?.date_from === null &&
      date?.date_to === null
    ) {
      return true
    }
    if (date?.type === "") return true
    return false
  }
  render() {
    const { visible, currentRoadTanker, onUpdateRoadTankerDetail } = this.props
    const { activeTab, mode, showAlert, data } = this.state
    const { scheduler } = this.state.userRole

    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }

    const handleClose = () => {
      if (scheduler) {
        this.onConfirmExit()
      } else {
        this.setState({ isConfirm: true })
      }
    }

    const handleExitConfirmation = () => {
      if (!isEqual(this.state.data, this.props.currentRoadTanker))
        return (
          <ExitConfirmation
            onExit={this.onConfirmExit}
            onCancel={this.onConfirmCancel}
          />
        )
      else this.onConfirmExit()
    }

    const validateTerminal = () => {
      if (
        (data?.availability?.other_terminal_mobilization_2_name &&
          data?.availability?.other_terminal_mobilization_2_name !== "None" &&
          !data?.availability?.other_terminal_mobilization_2_date) ||
        (data?.availability?.other_terminal_mobilization_2_date &&
          !data?.availability?.other_terminal_mobilization_2_name) ||
        (data?.availability?.other_terminal_mobilization_1_name &&
          data?.availability?.other_terminal_mobilization_2_name !== "None" &&
          !data?.availability?.other_terminal_mobilization_1_date) ||
        (data?.availability?.other_terminal_mobilization_1_date &&
          !data?.availability?.other_terminal_mobilization_1_name)
      ) {
        toggleAlert("Need to put in both date and terminal name to save.")
        return false
      }

      if (
        data?.availability?.status_awsm === "Temporary Blocked" &&
        this.isEmptyDate(data?.availability?.block_date_range)
      ) {
        toggleAlert("Please fill in Temporary Blocked Date range")
        return false
      }

      return true
    }

    const handleUpdate = async e => {
      // e.preventDefault()
      if (validateTerminal()) {
        await onUpdateRoadTankerDetail({ vehicle_name: data.vehicle, data })
        // this.props.onCancel()
      }
    }

    const toggleAlert = ergMsg => {
      this.setState({
        showAlert: !showAlert,
        alertMsg: ergMsg,
      })
    }

    const onFieldValueChange = (fieldName, value) => {
      const newData = { ...data }
      newData[fieldName] = value
      this.setState({ data: newData })
    }
    const modalFooter = () => {
      const footer =
        !scheduler && !this.state.isConfirm ? (
          <ModalFooter>
            <button
              className="btn-sec"
              onClick={() => this.setState({ isConfirm: true })}
            >
              Cancel
            </button>
            {!scheduler && (
              <Button
                color="primary"
                type="submit"
                onClick={e => handleUpdate(e)}
              >
                Update
              </Button>
            )}{" "}
          </ModalFooter>
        ) : null
      return footer
    }

    return (
      <Modal isOpen={visible} className="table-information modal-lg">
        <ModalHeader close={<CloseButton handleClose={handleClose} />}>
          <span className="modal-title">
            {" "}
            Vehicle Id: {currentRoadTanker?.vehicle}
          </span>
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
        </ModalHeader>
        <AWSMAlert
          status="error"
          message={this.state.alertMsg}
          openAlert={showAlert}
          closeAlert={() => {
            toggleAlert()
          }}
        />
        <ModalBody>
          {this.state.isConfirm ? handleExitConfirmation() : ""}
          <Fragment>
            <div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>VEHICLE OWNER</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={data?.owner}
                    onChange={e => onFieldValueChange("owner", e.target.value)}
                    disabled={true}
                    // placeholder="Typing something here..."
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>RT STATUS IN SAP</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={data?.status_sap}
                    onChange={e =>
                      onFieldValueChange("status_sap", e.target.value)
                    }
                    // placeholder="Typing something here..."
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>MAX VOLUME</label>
                  <input
                    className="form-control awsm-input"
                    type="number"
                    defaultValue={data?.max_volume}
                    onChange={e =>
                      onFieldValueChange("max_volume", e.target.value)
                    }
                    // placeholder="Numeric only..."
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label> REMARKS</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={data?.remarks}
                    onChange={e =>
                      onFieldValueChange("remarks", e.target.value)
                    }
                    placeholder={!scheduler ? "Typing something here..." : ""}
                    disabled={
                      (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                    }
                  />
                </div>
              </div>
              <>
                <Nav pills justified>
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : null}
                      onClick={() => {
                        toggle("1")
                      }}
                    >
                      <span>Availability</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : null}
                      onClick={() => {
                        toggle("2")
                      }}
                    >
                      <span>Specification</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "3" ? "active" : null}
                      onClick={() => {
                        toggle("3")
                      }}
                    >
                      <span>Trailer</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="py-4">
                  <TabPane tabId="1" style={{ marginRight: "-25px" }}>
                    <SimpleBar className="simple-bar">
                      <AvailabilityTab
                        mode={mode}
                        scheduler={scheduler}
                        data={data?.availability}
                        defaultData={currentRoadTanker?.availability}
                        onChange={onFieldValueChange}
                        statusSap={data?.status_sap}
                      />
                      <hr style={{ margin: "2em 0" }} />
                    </SimpleBar>
                  </TabPane>
                  <TabPane tabId="2" style={{ marginRight: "-25px" }}>
                    <SimpleBar className="simple-bar">
                      <SpecificationTab
                        mode={mode}
                        scheduler={scheduler}
                        data={data?.specification}
                        onChange={onFieldValueChange}
                      />
                      <hr style={{ margin: "2em 0" }} />
                    </SimpleBar>
                  </TabPane>
                  <TabPane tabId="3" style={{ marginRight: "-25px" }}>
                    <SimpleBar className="simple-bar">
                      <TrailerTab
                        mode={mode}
                        scheduler={scheduler}
                        data={data?.trailer}
                        onChange={onFieldValueChange}
                      />
                      <hr style={{ margin: "2em 0" }} />
                    </SimpleBar>
                  </TabPane>
                </TabContent>
              </>
            </div>
          </Fragment>
        </ModalBody>
        {modalFooter()}
      </Modal>
    )
  }
}

const mapStateToProps = ({ roadTanker }) => ({
  currentRoadTanker: roadTanker.currentRoadTanker?.data,
  isUpdateSuccess: roadTanker.isUpdateSuccess,
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTankerDetail: params => dispatch(getRoadTankerDetail(params)),
  onUpdateRoadTankerDetail: params => dispatch(updateRoadTankerDetail(params)),
  onResetCurrentRoadTankerDetail: () => dispatch(resetCurrentRoadTankerData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(InformationModal)
