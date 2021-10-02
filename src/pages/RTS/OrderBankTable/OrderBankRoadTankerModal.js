import React, { useState } from "react"
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col,} from "reactstrap"
import CloseButton from "../../../components/Common/CloseButton"
import ExitConfirmation from "../../../components/Common/ExitConfirmation"
import AWSMDropdown from "../../../components/Common/Dropdown"
import { isEqual } from "lodash"
import { isScheduler } from "../../../helpers/auth_helper"
import { connect } from "react-redux"

const OrderBankRoadTankerModal = ({ isOpen, toggle, selectedVehicleID, orderBankRTDetails }) => {

  const [currentOrderBankRTDetails, setOrderBankRTDetails] = useState(orderBankRTDetails)
  const [isConfirm, setIsConfirm] = useState(false)

  const handleClose = () => {
    if (isScheduler) {
      toggle()
    } else {
      setIsConfirm(true)
    }
  }

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    toggle()
  }

  const handleExitConfirmation = () => {
    return !isEqual(currentOrderBankRTDetails, props.OBRoadTankerDetails) ? (
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
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>REGION & TERMINAL</label>
            <Row>
              <Col className="col-md-5">
                <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
              </Col>
              <Col className="col-md-7" style={{ paddingLeft: "0px"}}>
                <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ margin: "1px 0 1em 0" }} />
        <Row>
          <Col className="col-md-4 form-group">
            <label>UTILIZATION RATE (%)</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>SHIFT</label>
            <AWSMDropdown
              value={null}
              items={['']}
              onChange={value => {}}
              disabled={!isScheduler}
              className="form-control awsm-input"
              placeholder={"Select"}
            />
          </Col>
          <Col className="col-md-4 form-group">
            <label>STATUS</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>CAPACITY</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>RT CODE</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>PRODUCT</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>NAME</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>CUST TYPE</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>PLUMP</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>HOURS</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>NO. OF COMPARTMENT</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-4 form-group">
            <label>MAX. WEIGHT</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 form-group">
            <label>CHARTERER TYPE</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled/>
          </Col>
          <Col className="col-md-8 form-group">
            <label>REMARKS</label>
            <input className="form-control awsm-input" type="text" defaultValue="Lorem Ipsum" disabled={!isScheduler}/>
          </Col>
        </Row>
      </ModalBody>
      {isScheduler && !isConfirm && <ModalFooter>
          <button onClick={handleClose} className="btn-sec">
            Cancel
          </button>
          <Button disabled={true} type="submit" color="primary" onClick={()=>{}}>
            Update
          </Button>
        </ModalFooter>}
    </Modal>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  orderBankRTDetails: orderBank.orderBankRTDetails,
})

const mapDispatchToProps = dispatch => ({

})

export default connect( mapStateToProps, mapDispatchToProps)(OrderBankRoadTankerModal)