import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import CloseButton from 'components/Common/CloseButton'

function DeleteMultipleModal(props) {
  const { open, onCancel, onSave } = props

  const toggle = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <Modal isOpen={open} className="rts-small-modal">
      <ModalHeader close={<CloseButton handleClose={toggle} />}>
        Delete Multiple Order Confirmation
      </ModalHeader>
      <ModalBody>
        This action cannot be undone. Are you sure you want to delete these
        Orders?
      </ModalBody>
      <ModalFooter>
        <button onClick={toggle} className="btn btn-outline-danger mr-2">
          Cancel
        </button>
        <button onClick={onSave} className="btn btn-danger">
          Delete
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteMultipleModal
