import React, { Component } from "react"
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
} from "reactstrap"
import AvailabilityTab from "./AvailabilityTab"
import SpecificationTab from "./SpecificationTab"
import TrailerTab from "./TrailerTab"
import "./InformationModal.scss"
import { MODE } from "./constants"
import { tableInformationModalDummyData as data } from "./tableMapping"
import AWSMAlert from "../../../components/Common/AWSMAlert/index"

import {
  getRoadTanker,
  getRoadTankerAuditLog,
  getRoadTankerFilter,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { connect } from "react-redux"

// Information Modal
class InformationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: "1",
      mode: MODE.VIEW_AND_AMEND,
      showAlert: true,
      userRole: {
        scheduler: false,
      },
      updateSuccess: false,
      data: data,
    }
  }

  componentDidMount() {
    const { mode } = this.props ? this.props : MODE.VIEW_AND_AMEND
    this.setState({ mode: mode })
  }

  render() {
    const {
      // onGetRoadTanker,
      // onGetRoadTankerAuditLog,
      // onGetRoadTankerFilter,
      // onGetTableInformation,
      onUpdateTableInformation,
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
      onUpdateTableInformation(data)
      this.setState({ updateSuccess: true })
    }

    const toggleAlert = () => {
      this.setState({ showAlert: !showAlert })
    }
    const onFieldValueChange = (fieldName, value) => {
      const newData = { ...data }
      newData[fieldName] = value
      this.setState({ data: newData })
    }
    console.log(this.state.data)
    const { onCancle, visible } = this.props
    const modalFooter = () => {
      const footer =
        mode === MODE.VIEW_AND_AMEND ? (
          <ModalFooter>
            <button className="btn-sec" onClick={() => onCancle()}>
              Cancel
            </button>
            <Button
              color="primary"
              type="submit"
              onClick={e => handleUpdate(e)}
            >
              Update
            </Button>{" "}
            <AWSMAlert
              status="success"
              message="Update Success !"
              openAlert={this.state.updateSuccess}
              closeAlert={() => {
                this.setState({ updateSuccess: false })
              }}
            />
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
        <div className="modal-header">
          <h5 className="modal-title">
            VEHICLE ID: {data.vehical_id}
            <span className="sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
          </h5>

          <button type="button" onClick={() => onCancle()} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {
          //alert()
        }
        <AWSMAlert
          status="success"
          message=" New RT Restriction Added"
          openAlert={showAlert}
          closeAlert={() => {
            toggleAlert()
          }}
        />
        <ModalBody>
          <div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label> VEHICAL OWNER</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={data.vehical_owner}
                  disabled={true}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>STATUS IN SAP</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={data.status_in_sap}
                  disabled={true}
                />
              </div>
            </div>
            <div className="row">  
              <div className="col-md-6 form-group">
                <label>RT CAPACITY</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={data.rt_capacity}
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
                  defaultValue={data.remarks}
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
                    data={data.availability}
                    onChange={onFieldValueChange}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <SpecificationTab
                    mode={mode}
                    scheduler={scheduler}
                    data={data.specification}
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
                    data={data.trailer}
                    onChange={onFieldValueChange}
                  />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </ModalBody>
        {modalFooter()}
      </Modal>
    )
  }
}

const mapStateToProps = ({ roadTanker }) => ({
  // roadTanker: roadTanker.roadTanker,
  // auditsRoadTanker: roadTanker.auditsRoadTanker,
  // filterRoadTanker: roadTanker.filterRoadTanker,
  // address: retailCustomer.address,
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTanker: params => dispatch(getRoadTanker(params)),
  onGetRoadTankerAuditLog: payload => dispatch(getRoadTankerAuditLog(payload)),
  onGetRoadTankerFilter: payload => dispatch(getRoadTankerFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InformationModal)
