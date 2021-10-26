import React, { useMemo, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"

function DeleteMultipleModal(props) {
  const { open, onCancel, onSave } = props

  const toggle = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <Modal isOpen={open} className="">
      <ModalHeader toggle={toggle}>Delete Multiple Order Confirmation</ModalHeader>
      <ModalBody className="position-relative scroll pl-30">
        <p>This action cannot be undone. Are you sure you want to delete these Orders?</p>
        <div className="d-flex align-items-center justify-content-end">
          <button
            onClick={toggle}
            className="btn btn-outline-danger mr-2"
          >
            Cancel
          </button>
          <button onClick={onSave} className="btn btn-danger">
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default DeleteMultipleModal
