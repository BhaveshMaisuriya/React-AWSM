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
  Row,
  Col,
} from "reactstrap"

//Components
import AWSMInput from "../../../components/Common/Input"
import TabAddress from "../../../components/Common/TableInformation/tabAddress"
import TabStatus from "../../../components/Common/TableInformation/tabStatus"
import TabDelivery from "../../../components/Common/TableInformation/tabDelivery"
import TabContact from "../../../components/Common/TableInformation/tabContact"
import TabStorage from "../../../components/Common/TableInformation/tabStorage"
import TabQuota from "../../../components/Common/TableInformation/tabQuota"
import ExitConfirmation from "../../../components/Common/ExitConfirmation"

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
import { isEqual } from "lodash"
import { runValidation } from "../Common/helper"
import CloseButton from "../../../components/Common/CloseButton"

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
    updateSuccess,
    refreshMainTable,
    updateAlert,
  } = props
  const [currentCommercialDetail, setCurrentCommercialDetail] = useState(
    props.currentCommercialDetail
  )
  const [activeTab, setActiveTab] = useState("1")
  const scheduler = isScheduler()
  // const scheduler = false
  // const [alert, setAlert] = useState(false)
  // const [alertStatus, setAlertStatus] = useState("")
  const [isConfirm, setIsConfirm] = useState(false)

  useEffect(() => {
    // setAlertStatus(updateAlert)
    if (updateSuccess && refreshMainTable) {
      refreshMainTable()
      // setAlert(true)
    }
    // if (updateSuccess === false) setAlert(true)
  }, [updateSuccess])

  const handleUpdate = async e => {
    e.preventDefault()
    if (runValidation(currentCommercialDetail)) {
      updateCommercialTableInformation(currentCommercialDetail)
      onCancel()
    }
  }

  const handleClose = () => {
    if (scheduler) {
      onCancel()
    } else {
      setIsConfirm(true)
    }
  }

  useEffect(() => {
    if (data && visible) {
      getCommercialTableInformation(data)
      setActiveTab("1")
    } else if (!visible) {
      resetCommercialTableInformation()
    }
    return () => {
      resetCommercialTableInformation()
    }
  }, [data, visible])

  useEffect(() => {
    setCurrentCommercialDetail(props.currentCommercialDetail)
  }, [props.currentCommercialDetail])

  function onFieldValueChange(fieldName, value) {
    const newCommercialDetail = { ...currentCommercialDetail }
    newCommercialDetail[fieldName] = value
    setCurrentCommercialDetail(newCommercialDetail)
  }

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    if (onCancel) {
      onCancel()
    }
  }

  const handleExitConfirmation = () => {
    return !isEqual(currentCommercialDetail, props.currentCommercialDetail) ? (
      <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
    ) : (
      onConfirmExit()
    )
  }

  // const handleAlert = () => {
  //   return (
  //     <AWSMAlert
  //       status={alertStatus}
  //       openAlert={alert}
  //       closeAlert={() => setAlert(false)}
  //     />
  //   )
  // }

  if (!data) {
    return null
  }

  return (
    <>
      {/* {handleAlert()} */}
      <Modal isOpen={visible} className="commercial-customer-modal modal-lg">
        {currentCommercialDetail ? (
          <div>
            <ModalHeader close={<CloseButton handleClose={handleClose} />}>
              <span className="modal-title">
                Ship To Party: {currentCommercialDetail.ship_to_party}
              </span>
              <span className="last-updated-sub-title">
                Last Updated By: Nur Izzati on 3rd March 2021
              </span>
            </ModalHeader>
            <ModalBody className="position-relative">
              {isConfirm && handleExitConfirmation()}
              <Row>
                <Col className="col-6">
                    <label>SHIP TO (COMPANY NAME)</label>
                    <AWSMInput
                      disabled
                      defaultValue={currentCommercialDetail.ship_to_company}
                    />
                    </Col>
                 <Col className="col-6">
                    <label>STATUS IN SAP</label>
                    <AWSMInput
                      disabled
                      defaultValue={currentCommercialDetail.status_sap}
                    />
                </Col>
                <Col className="col-12 bg-lightgreen">
                  <label className="mt-3">REMARKS</label>
                  <AWSMInput
                    defaultValue={currentCommercialDetail.remarks}
                    onChange={value => onFieldValueChange("remarks", value)}
                    disabled={scheduler}                    
                  />
                </Col>
              </Row>
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
            {!scheduler && !isConfirm && (
              <ModalFooter>
                <button onClick={handleClose} className="btn-sec">
                  Cancel
                </button>
                <Button type="submit" color="primary" onClick={handleUpdate}>
                  Update
                </Button>
              </ModalFooter>
            )}
          </div>
        ) : currentCommercialError ? (
          <div>{currentCommercialError.message}</div>
        ) : (
          <Skeleton variant="rect" width={800} height={300} />
        )}
      </Modal>
    </>
  )
}

const mapStateToProps = ({ commercialCustomer }) => ({
  currentCommercialDetail: commercialCustomer.currentCommercialDetail,
  currentCommercialError: commercialCustomer.error,
  updateSuccess: commercialCustomer.updateSuccess,
  // updateAlert: commercialCustomer.updateAlert,
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
