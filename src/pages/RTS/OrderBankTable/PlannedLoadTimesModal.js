import AWSMInputNumber from "components/Common/InputNumber";
import React from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const PlannedLoadTimesModal = ({ isOpen, onSend, onCancel }) => {
   
    return (
      <Modal isOpen={isOpen} className='deleteModal'>
        <ModalHeader toggle={onCancel}>
            Planned Load Time
        </ModalHeader>
        <ModalBody className="pl-4 terminal-relay">
            <p>Please enter the correct planned load time for this shipment</p>
            <div className="mb-2 terminal-relay">PLANNED LOAD TIME</div>
            <div className="d-flex mb-4 terminal-relay">
                <div className="order-bank-region w-100">
                    <AWSMInputNumber
                    />
                </div>
            </div>
          <div className="d-flex align-items-center justify-content-end">
            <button onClick={onCancel} className={`btn btn-outline-success mr-2`}>Cancel</button>
            <button onClick={onSend} className={`btn btn-success`}>Update</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }

export default PlannedLoadTimesModal;