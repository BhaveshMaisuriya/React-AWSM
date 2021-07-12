import React from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ConfirmDNStatusModal = ({ isOpen, onSend, onCancel }) => {
    return (
      <Modal isOpen={isOpen} className='deleteModal'>
        <ModalHeader toggle={onCancel}>
            Send for DN
        </ModalHeader>
        <ModalBody className="pl-4">
          <h6>Are you sure you want to send this order for DN Creation?</h6>
          <div className="d-flex align-items-center justify-content-end">
            <button onClick={onCancel} className="btn btn-outline-success mr-2">Cancel</button>
            <button onClick={onSend} className="btn btn-success">Send</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }

export default ConfirmDNStatusModal;