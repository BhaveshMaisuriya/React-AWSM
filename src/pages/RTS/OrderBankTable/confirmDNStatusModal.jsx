import React from 'react'
import CloseButton from 'components/Common/CloseButton'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

const ConfirmDNStatusModal = ({
  isOpen,
  onSend,
  onCancel,
  onClose,
  headerContent,
  bodyContent,
  styleColor = 'success',
  requiresConfirmation,
}) => {
  return (
    <Modal isOpen={isOpen} style={{ top: '30%', maxWidth: '530px' }}>
      <ModalHeader close={<CloseButton handleClose={onClose} />}>
        {headerContent}
      </ModalHeader>
      <ModalBody>{bodyContent}</ModalBody>
      {requiresConfirmation && (
        <ModalFooter>
          <button
            className={`btn btn-outline-${styleColor} mr-2`}
            onClick={onCancel}
          >
            Cancel
          </button>
          <Button className={`btn btn-${styleColor}`} onClick={onSend}>
            Proceed
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}

export default ConfirmDNStatusModal
