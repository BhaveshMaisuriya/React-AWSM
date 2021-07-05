import React, { useState, useEffect } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap"
import "./index.scss"

const OrderBankActionModal = ({open, title, subTitle, onClose, type, onSubmit}) => {
  const onSubmitClick = () => {
    if (onSubmit) {
      onSubmit()
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal isOpen={open} className="order-bank-action-modal">
      <ModalHeader toggle={onClose}>
        {title}
      </ModalHeader>
      <ModalBody>
        {subTitle}
      </ModalBody>
      <ModalFooter className="d-flex align-items-center justify-content-end">
        <button className="btn btn-outline-primary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={onSubmitClick}>{type === "RefreshDN" ? "Refresh" : "Send"}</button>
      </ModalFooter>
    </Modal>
  )
}

export default OrderBankActionModal
