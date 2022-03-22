import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import CloseButton from 'components/Common/CloseButton'

const DeleteOrderBankConfirmation = ({ isOpen, onDelete, onCancel }) => {
  return (
    <Modal isOpen={isOpen} className="rts-small-modal">
      <ModalHeader close={<CloseButton handleClose={onCancel} />}>
        Delete Confirmation
      </ModalHeader>
      <ModalBody>
        This action cannot be undone. Are you sure you want to delete this
        Order?
      </ModalBody>
      <ModalFooter>
        <button onClick={onCancel} className="btn btn-outline-danger mr-2">
          Cancel
        </button>
        <button onClick={onDelete} className="btn btn-danger">
          Delete
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteOrderBankConfirmation
