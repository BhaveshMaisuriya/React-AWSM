import React from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ConfirmDNStatusModal = ({ isOpen, onSend, onCancel,headerContent,bodyContent,styleColor = 'success' }) => {
    return (
      <Modal isOpen={isOpen} className='deleteModal'>
        <ModalHeader toggle={onCancel}>
            {headerContent}
        </ModalHeader>
        <ModalBody className="pl-4">
          <h6>{bodyContent}</h6>
          <div className="d-flex align-items-center justify-content-end">
            <button onClick={onCancel} className={`btn btn-outline-${styleColor} mr-2`}>Cancel</button>
            <button onClick={onSend} className={`btn btn-${styleColor}`}>Proceed</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }

export default ConfirmDNStatusModal;