import React, { useState, useEffect } from "react"
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from "reactstrap"
import CloseButton from "components/Common/CloseButton"
import ExitConfirmation from "components/Common/ExitConfirmation"
import AWSMDropdown from "components/Common/Dropdown"
import { isEqual } from "lodash"
import { isScheduler } from "helpers/auth_helper"
import { getOBRTDetails, updateOBRTDetails } from "store/actions"
import { connect } from "react-redux"

const OrderBankRoadTankerModal = ({
  isOpen,
  toggle,
  selectedVehicleID,
  orderBankRTDetails,
  getOBRTDetails,
  updateOBRTDetails,
  terminal = "",
  region = "",
  shiftDate = "",
  refreshTable,
}) => {
  const [currentOrderBankRTDetails, setOrderBankRTDetails] = useState()
  const [isConfirm, setIsConfirm] = useState(false)
  const onFieldValueChange = (fieldName, value) => {
    const newData = { ...currentOrderBankRTDetails }
    newData[fieldName] = value
    setOrderBankRTDetails(newData)
  }

  useEffect(() => {
    if (isOpen) getOBRTDetails(selectedVehicleID)
    else setOrderBankRTDetails(null)
  }, [isOpen])

  useEffect(() => {
    setOrderBankRTDetails(orderBankRTDetails)
  }, [orderBankRTDetails])

  const handleClose = () => {
    if (!isScheduler) {
      toggle()
    } else {
      setIsConfirm(true)
    }
  }

  const handleUpdate = () => {
    updateOBRTDetails(currentOrderBankRTDetails)
    refreshTable()
    toggle()
  }

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    toggle()
  }

  const handleExitConfirmation = () => {
    return !isEqual(currentOrderBankRTDetails, orderBankRTDetails) ? (
      <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
    ) : (
      onConfirmExit()
    )
  }

  return (
    <Modal isOpen={isOpen} className="modal-xl commercial-customer-modal">
      <ModalHeader close={<CloseButton handleClose={handleClose} />}>
        <div className="header-title">Vehicle: {selectedVehicleID}</div>
      </ModalHeader>
      <ModalBody>
        {isConfirm && handleExitConfirmation()}
        <Row>
          <Col className="col-md-4 form-group">
            <label>SHIFT DATE</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={shiftDate}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>REGION & TERMINAL</label>
            <Row>
              <Col className="col-md-5">
                <input
                  className="form-control awsm-input"
                  type="text"
                  defaultValue={region}
                  disabled
                />
              </Col>
              <Col className="col-md-7" style={{ paddingLeft: "0px" }}>
                <input
                  className="form-control awsm-input"
                  type="text"
                  defaultValue={terminal}
                  disabled
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ margin: "1px 0 1em 0" }} />
        <Row>
          <Col className="col-md-4 form-group">
            <label>UTILIZATION RATE (%)</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.utilization_rate}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>SHIFT</label>
            <AWSMDropdown
              value={currentOrderBankRTDetails?.shift_type}
              items={["Double", "OH"]}
              onChange={e => onFieldValueChange("shift_type", e)}
              disabled={!isScheduler}
              className="form-control awsm-input"
              placeholder={"Select"}
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>STATUS</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.status_sap}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>CAPACITY</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.capacity}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>RT CODE</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.restriction_code}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>PRODUCT</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.product_type_sap}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>NAME</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.owner}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>CUST TYPE</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.customer_type}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>PUMP</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.pump_type}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>HOURS</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.daily_available_hours}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>NO. OF COMPARTMENT</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.compartment_no}
              disabled
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>MAX. WEIGHT</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.max_weight}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>CHARTERER TYPE</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.chattering_type}
              disabled
            />
          </Col>
          <Col className="col-md-8 form-group">
            <label>REMARKS</label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={currentOrderBankRTDetails?.remarks}
              onChange={e => onFieldValueChange("remarks", e.target.value)}
              disabled={!isScheduler}
            />
          </Col>
        </Row>
      </ModalBody>
      {isScheduler && !isConfirm && (
        <ModalFooter>
          <button onClick={handleClose} className="btn-sec">
            Cancel
          </button>
          <Button
            type="submit"
            color="primary"
            onClick={handleUpdate}
            disabled={isEqual(currentOrderBankRTDetails, orderBankRTDetails)}
          >
            Update
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  orderBankRTDetails: orderBank.orderBankRTDetails,
})

const mapDispatchToProps = dispatch => ({
  getOBRTDetails: params => dispatch(getOBRTDetails(params)),
  updateOBRTDetails: params => dispatch(updateOBRTDetails(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBankRoadTankerModal)
