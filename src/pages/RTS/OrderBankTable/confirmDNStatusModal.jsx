import React from 'react'
import CloseButton from 'components/Common/CloseButton'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

const ConfirmDNStatusModal = ({
  isOpen,
  onSend,
  onCancel,
  headerContent,
  bodyContent,
  styleColor = 'success',
}) => {
  return (
    <Modal isOpen={isOpen} style={{ top: '30%', maxWidth: '530px' }}>
      <ModalHeader close={<CloseButton handleClose={onCancel} />}>
        {headerContent}
      </ModalHeader>
      <ModalBody>{bodyContent}</ModalBody>
      {(onCancel || onSend) && (
        <ModalFooter>
          {onCancel && (
            <button
              className={`btn btn-outline-${styleColor} mr-2`}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          {onSend && (
            <Button className={`btn btn-${styleColor}`} onClick={onSend}>
              Proceed
            </Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  )
}

export default ConfirmDNStatusModal
