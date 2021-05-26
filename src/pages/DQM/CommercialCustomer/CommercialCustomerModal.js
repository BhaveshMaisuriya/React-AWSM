import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap"

//Components
import AWSMInput from "../../../components/Common/Input"
import TabAddress from "../../../components/Common/TableInformation/tabAddress"
import TabStatus from "../../../components/Common/TableInformation/tabStatus"
import TabDelivery from "../../../components/Common/TableInformation/tabDelivery"
import TabContact from "../../../components/Common/TableInformation/tabContact"
import TabStorage from "../../../components/Common/TableInformation/tabStorage"
import TabQuota from "../../../components/Common/TableInformation/tabQuota"

//CSS
import "./CommercialCustomerModal.scss"
import { Skeleton } from "@material-ui/core"
import {
  getCommercialTableInformation,
  resetCommercialTableInformation,
  updateCommercialTableInformation,
} from "../../../store/commercialCustomer/actions"
import AWSMAlert from "../../../components/Common/AWSMAlert"
import { isScheduler } from "../../../helpers/auth_helper"

const CommercialCustomerModal = props => {
  const {
    data,
    dataList,
    onCancel,
    visible,
    getCommercialTableInformation,
    currentCommercialError,
    resetCommercialTableInformation,
    updateCommercialTableInformation,
  } = props
  const [currentCommercialDetail, setCurrentCommercialDetail] = useState(
    props.currentCommercialDetail
  )
  const [activeTab, setActiveTab] = useState("1")
  const scheduler = isScheduler()
  const [alert, setAlert] = useState(false)
  const [displayConfirmationBox, setDisplayConfirmationBox] = useState(false)

  const handleUpdate = e => {
    e.preventDefault()
    updateCommercialTableInformation(currentCommercialDetail)
    onCancel()
    setAlert(true)
  }

  useEffect(() => {
    getCommercialTableInformation(data)
    return () => {
      resetCommercialTableInformation()
    }
  }, [])

  useEffect(() => {
    setCurrentCommercialDetail(props.currentCommercialDetail)
  }, [props.currentCommercialDetail])

  function onFieldValueChange(fieldName, value) {
    const newCommercialDetail = { ...currentCommercialDetail }
    newCommercialDetail[fieldName] = value
    setCurrentCommercialDetail(newCommercialDetail)
  }

  console.log(currentCommercialDetail)

  return (
    <Modal isOpen={visible} toggle={() => setDisplayConfirmationBox(!displayConfirmationBox)} className="commercial-customer-modal modal-lg">
      <ModalHeader toggle={() => setDisplayConfirmationBox(!displayConfirmationBox)}>
      <h3>
        <span>Table Information 
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
        </span>
      </h3>
      </ModalHeader>
      <div>
        {displayConfirmationBox ?
          <div className="Confirmation-box">
            <div>
              <h3>Exit Confirmation</h3>
              <p>Are you sure you want to exit without update? <br />You will lose all the changes made.</p>
              <button className="btn btn-outline-danger" onClick={() => setDisplayConfirmationBox(!displayConfirmationBox)}>Cancel</button>
              <button className="btn btn-danger" onClick={onCancel}>Exit</button>
            </div>
          </div>
        : 
          <Fragment>
            {currentCommercialDetail ? (
              <ModalBody>
                <>
                  <div className="d-flex justify-content-between">
                    <div className="w-50 mr-4">
                      <label>SHIP TO PARTY</label>
                      <AWSMInput
                        disabled
                        defaultValue={currentCommercialDetail.ship_to_party}
                      />
                    </div>
                    <div className="w-50 ml-4">
                      <label>SHIP TO (COMPANY NAME)</label>
                      <AWSMInput
                        disabled
                        defaultValue={currentCommercialDetail.ship_to_company}
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-3">
                    <div className="w-50 mr-4">
                      <label>STATUS IN SAP</label>
                      <AWSMInput
                        disabled
                        defaultValue={currentCommercialDetail.station_status_sap}
                      />
                    </div>
                    <div className="w-50 ml-4" />
                  </div>
                  <label className="mt-3">REMARKS</label>
                  <AWSMInput
                    defaultValue={currentCommercialDetail.remarks}
                    onChange={value => onFieldValueChange("remarks", value)}
                  />
                </>
                <div className="mt-4">
                  <Nav pills justified>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => setActiveTab("1")}
                      >
                        <span className="d-none d-sm-block">Address</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => setActiveTab("2")}
                      >
                        <span className="d-none d-sm-block">Delivery</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => setActiveTab("3")}
                      >
                        <span className="d-none d-sm-block">Status</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "4" ? "active" : ""}
                        onClick={() => setActiveTab("4")}
                      >
                        <span className="d-none d-sm-block">Contact</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "5" ? "active" : ""}
                        onClick={() => setActiveTab("5")}
                      >
                        <span className="d-none d-sm-block">Storage</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "6" ? "active" : ""}
                        onClick={() => {
                          setActiveTab("6")
                        }}
                      >
                        <span className="d-none d-sm-block">Quota</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <div>
                  <TabContent activeTab={activeTab} className="py-4">
                    <TabPane tabId="1">
                      <div className="simple-bar">
                        <TabAddress
                          dataList={dataList}
                          scheduler={scheduler}
                          data={currentCommercialDetail}
                          onChange={onFieldValueChange}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="simple-bar">
                        <TabStatus
                          scheduler={scheduler}
                          data={currentCommercialDetail}
                          onChange={onFieldValueChange}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="simple-bar">
                        <TabDelivery
                          scheduler={scheduler}
                          data={currentCommercialDetail}
                          onChange={onFieldValueChange}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <div className="simple-bar">
                        <TabContact
                          scheduler={scheduler}
                          data={currentCommercialDetail}
                          onChange={onFieldValueChange}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="5">
                      <div className="simple-bar">
                        <TabStorage
                          scheduler={scheduler}
                          data={currentCommercialDetail}
                          onChange={onFieldValueChange}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="6">
                      <div className="simple-bar">
                        <TabQuota
                          scheduler={scheduler}
                          data={currentCommercialDetail}
                          onChange={onFieldValueChange}
                        />
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </ModalBody>
            ) : currentCommercialError ? (
              <div>{currentCommercialError.message}</div>
            ) : (
              <Skeleton variant="rect" width={800} height={300} />
            )}
          </Fragment>
        }
      </div>
      <ModalFooter>
        <button onClick={() => setDisplayConfirmationBox(!displayConfirmationBox)} className="btn-sec">
          Cancel
        </button>
        <Button type="submit" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <AWSMAlert
          status="success"
          message="Update success!"
          openAlert={alert}
          closeAlert={() => setAlert(false)}
        />
      </ModalFooter>
    </Modal>
  )
}

const mapStateToProps = ({ commercialCustomer }) => ({
  currentCommercialDetail: commercialCustomer.currentCommercialDetail,
  currentCommercialError: commercialCustomer.error,
})

const mapDispatchToProps = dispatch => ({
  getCommercialTableInformation: params =>
    dispatch(getCommercialTableInformation(params)),
  updateCommercialTableInformation: data =>
    dispatch(updateCommercialTableInformation(data)),
  resetCommercialTableInformation: () =>
    dispatch(resetCommercialTableInformation()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommercialCustomerModal)
