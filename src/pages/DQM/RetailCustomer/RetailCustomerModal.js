import React, { useEffect, useState } from "react"
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
import CloseButton from "../../../components/Common/CloseButton"
//CSS
import "./RetailCustomerModal.scss"
import { Skeleton } from "@material-ui/core"
import {
  getTableInformation,
  resetRetailTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import AWSMAlert from "../../../components/Common/AWSMAlert"
import closeIcon from "../../../assets/images/AWSM-Cancel-Icon.svg"
import { isScheduler } from "../../../helpers/auth_helper"
import ExitConfirmation from "../../../components/Common/ExitConfirmation"
import { runValidation } from "../Common/helper"

const RetailCustomerModal = props => {
  const {
    data,
    dataList,
    onCancel,
    visible,
    getTableInformation,
    currentRetailError,
    resetRetailTableInformation,
    updateTableInformation,
    updateSuccess,
    refreshMainTable,
  } = props
  const [currentRetailDetail, setCurrentRetailDetail] = useState(
    props.currentRetailDetail
  )
  const [activeTab, setActiveTab] = useState("1")
  const scheduler = isScheduler()
  const [alert, setAlert] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)

  useEffect(() => {
    if (updateSuccess && refreshMainTable) {
      refreshMainTable()
    }
  }, [updateSuccess])

  const handleUpdate = e => {
    e.preventDefault()
    if (runValidation(currentRetailDetail)) {
      updateTableInformation(currentRetailDetail)
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

  useEffect(async () => {
    if (data && visible) {
      await getTableInformation(data)
      setActiveTab("1")
    } else if (!visible) {
      resetRetailTableInformation()
    }
    return () => {
      resetRetailTableInformation()
    }
  }, [data, visible])

  useEffect(() => {
    setCurrentRetailDetail(props.currentRetailDetail)
  }, [props.currentRetailDetail])

  function onFieldValueChange(fieldName, value) {
    const newRetailDetail = { ...currentRetailDetail }
    newRetailDetail[fieldName] = value
    setCurrentRetailDetail(newRetailDetail)
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

  if (!data) {
    return null
  }

  return (
    <Modal isOpen={visible} className="retail-customer-modal modal-lg">
      {currentRetailDetail ? (
        <div>
          <ModalHeader close={<CloseButton handleClose={handleClose} />}>
            <span className="modal-title">
              Ship To Party: {currentRetailDetail.ship_to_party}
            </span>
            <span className="last-updated-sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
          </ModalHeader>
          <ModalBody>
            {isConfirm && (
              <ExitConfirmation
                onExit={onConfirmExit}
                onCancel={onConfirmCancel}
              />
            )}
            <>
              <div className="d-flex justify-content-between">
                <div className="w-50 mr-4">
                  <label>SHIP TO (COMPANY NAME)</label>
                  <AWSMInput
                    disabled
                    defaultValue={currentRetailDetail.ship_to_company}
                  />
                </div>
                <div className="w-50 ml-4">
                  <label>STATUS IN SAP</label>
                  <AWSMInput
                    disabled
                    defaultValue={currentRetailDetail.status_sap}
                  />
                </div>
              </div>
              <label className="mt-3">REMARKS</label>
              <AWSMInput
                defaultValue={currentRetailDetail.remarks}
                onChange={value => onFieldValueChange("remarks", value)}
                disabled={scheduler}
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
                      data={currentRetailDetail}
                      onChange={onFieldValueChange}
                    />
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="simple-bar">
                    <TabStatus
                      scheduler={scheduler}
                      data={currentRetailDetail}
                      onChange={onFieldValueChange}
                    />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="simple-bar">
                    <TabDelivery
                      scheduler={scheduler}
                      data={currentRetailDetail}
                      onChange={onFieldValueChange}
                    />
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="simple-bar">
                    <TabContact
                      scheduler={scheduler}
                      data={currentRetailDetail}
                      onChange={onFieldValueChange}
                    />
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <div className="simple-bar">
                    <TabStorage
                      scheduler={scheduler}
                      data={currentRetailDetail}
                      onChange={onFieldValueChange}
                    />
                  </div>
                </TabPane>
                <TabPane tabId="6">
                  <div className="simple-bar">
                    <TabQuota
                      scheduler={scheduler}
                      data={currentRetailDetail}
                      onChange={onFieldValueChange}
                    />
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </div>
      ) : currentRetailError ? (
        <div>{currentRetailError.message}</div>
      ) : (
        <Skeleton variant="rect" width={800} height={300} />
      )}
      {!isConfirm && (
        <ModalFooter>
          <button onClick={handleClose} className="btn-sec">
            Cancel
          </button>
          {!scheduler && (
            <Button type="submit" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
          <AWSMAlert
            status="success"
            message="Update success!"
            openAlert={alert}
            closeAlert={() => setAlert(false)}
          />
        </ModalFooter>
      )}
    </Modal>
  )
}

const mapStateToProps = ({ retailCustomer }) => ({
  currentRetailDetail: retailCustomer.currentRetailDetail,
  currentRetailError: retailCustomer.error,
  updateSuccess: retailCustomer.updateSuccess,
})

const mapDispatchToProps = dispatch => ({
  getTableInformation: params => dispatch(getTableInformation(params)),
  updateTableInformation: data => dispatch(updateTableInformation(data)),
  resetRetailTableInformation: () => dispatch(resetRetailTableInformation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RetailCustomerModal)
