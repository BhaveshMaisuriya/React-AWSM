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
import { tableInformationModalDummyData as data2 } from "./tableMapping"
import AWSMAlert from "../../../components/Common/AWSMAlert/index"

import {
  getRoadTankerDetail,
  updateRoadTankerDetail,
  resetCurrentRoadTankerData
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
        scheduler: false,
      },
      updateSuccess: props.isUpdateSuccess,
      data: props.currentRoadTanker,
      isConfirm: false,
    }
  }

  componentWillUnmount(){
    this.props.onResetCurrentRoadTankerDetail()
  }

  componentDidMount() {
    const { mode } = this.props
    let modalMode = mode ? mode : MODE.VIEW_AND_AMEND
    this.setState({ mode: modalMode })
    const { onGetRoadTankerDetail, data } = this.props
    onGetRoadTankerDetail(data.vehicle)
  }

  componentWillReceiveProps(nextProps){
    if(!isEqual(nextProps.currentRoadTanker,this.props.currentRoadTanker)){
      this.setState({data:nextProps.currentRoadTanker})
    }
  }

  onConfirmCancel = () => {
    this.setState({ isConfirm: false });
  }

  onConfirmExit = () => {
    this.setState({ isConfirm: false });
    if (this.props.onCancel()) {
      this.props.onCancel()
    }
  }

  render() {
    const { visible,
      currentRoadTanker,
      onCancel,
      onUpdateRoadTankerDetail
    } = this.props
    const { activeTab, mode, showAlert, data } = this.state
    const { scheduler } = this.state.userRole

    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }

    const handleUpdate = e => {
      e.preventDefault()
      onUpdateRoadTankerDetail({ vehicle_name:data.vehicle,data})
      this.onConfirmExit()
    }

    const toggleAlert = () => {
      this.setState({ showAlert: !showAlert })
    }

    const onFieldValueChange = (fieldName, value) => {
      const newData = { ...data }
      newData[fieldName] = value
      this.setState({ data: newData })
    }
    const modalFooter = () => {
      const footer =
        mode === MODE.VIEW_AND_AMEND ? (
          <ModalFooter>
            <button className="btn-sec" onClick={() => this.setState({ isConfirm: true })}>
              Cancel
            </button>
            <Button
              color="primary"
              type="submit"
              onClick={e => handleUpdate(e)}
            >
              Update
            </Button>{" "}
            {/* <AWSMAlert
              status="success"
              message="Update Success !"
              openAlert={this.state.updateSuccess}
              closeAlert={() => {
                this.setState({ updateSuccess: false })
              }}
            /> */}
          </ModalFooter>
        ) : null
      return footer
    }

    return (
      <Modal
        isOpen={visible}
        className="table-information modal-lg"
        contentClassName="modalTIContainer"
      >
        <ModalHeader toggle={() => this.setState({ isConfirm: true })}>
          <h5 className="modal-title">
            VEHICLE ID: {currentRoadTanker?.vehicle}
            <span className="sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
          </h5>
        </ModalHeader>
        <AWSMAlert
          status="success"
          message=" New RT Restriction Added"
          openAlert={showAlert}
          closeAlert={() => {
            toggleAlert()
          }}
        />
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
                  <label> VEHICAL ID</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data?.vehicle}
                    onChange={e => onFieldValueChange("vehicle",e.target.value)}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>VEHICAL OWNER</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data?.owner}
                    onChange={e => onFieldValueChange("owner",e.target.value)}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>RT STATUS IN SAP</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data?.status_sap}
                    onChange={e => onFieldValueChange("status_sap",e.target.value)}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>MAX VOLUME</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data?.max_volume}
                    onChange={e => onFieldValueChange("max_volume",e.target.value)}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label> REMARKS</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data?.remarks}
                    onChange={e => onFieldValueChange("remarks",e.target.value)}
                    disabled={
                      (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                    }
                  />
                </div>
              </div>
              <div>
                <Nav tabs>
                  <NavItem
                    className={activeTab === "1" ? "active" : null}
                    onClick={() => {
                      toggle("1")
                    }}
                  >
                    <NavLink>
                      <span>Availability</span>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className={activeTab === "2" ? "active" : null}
                    onClick={() => {
                      toggle("2")
                    }}
                  >
                    <NavLink>
                      <span>Specification</span>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className={activeTab === "3" ? "active" : null}
                    onClick={() => {
                      toggle("3")
                    }}
                  >
                    <NavLink>
                      <span>Trailer</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <AvailabilityTab
                      mode={mode}
                      scheduler={scheduler}
                      data={data?.availability}
                      onChange={onFieldValueChange}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <SpecificationTab
                      mode={mode}
                      scheduler={scheduler}
                      data={data?.specification}
                      toggle={() => {
                        toggleAlert()
                      }}
                      onChange={onFieldValueChange}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <TrailerTab
                      mode={mode}
                      scheduler={scheduler}
                      data={data?.trailer}
                      onChange={onFieldValueChange}
                    />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Fragment>
          {modalFooter()}
        </ModalBody>

      </Modal>
    )
  }
}

const mapStateToProps = ({ roadTanker }) => ({
  currentRoadTanker: roadTanker.currentRoadTanker?.data,
  isUpdateSuccess:  roadTanker.currentRoadTanker?.isUpdateSuccess,
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTankerDetail: params => dispatch(getRoadTankerDetail(params)),
  onUpdateRoadTankerDetail: params =>dispatch(updateRoadTankerDetail(params)),
  onResetCurrentRoadTankerDetail: () => dispatch(resetCurrentRoadTankerData())
})

export default connect(mapStateToProps, mapDispatchToProps)(InformationModal)