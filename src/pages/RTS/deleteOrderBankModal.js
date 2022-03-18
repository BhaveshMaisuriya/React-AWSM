import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import CloseButton from 'components/Common/CloseButton'

const DeleteOrderBankConfirmation = ({ isOpen, onDelete, onCancel }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader close={<CloseButton handleClose={onCancel} />}>
        Delete Confirmation
      </ModalHeader>
      <ModalBody>
        <h6>
          This action cannot be undone. Are you sure you want to delete this
          Order?
        </h6>
        <div className="d-flex align-items-center justify-content-end">
          <button onClick={onCancel} className="btn btn-dan mr-2">
            Cancel
          </button>
          <button onClick={onDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default DeleteOrderBankConfirmation
