import React from 'react'
import CloseButton from 'components/Common/CloseButton'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

const ConfirmDNStatusModal = ({
  isOpen,
  onSend,
  onCancel,
  onClose = {}, //use this prop instead of onCancel if there's no confirmation required
  headerContent,
  bodyContent,
  styleColor = 'success',
  requiresConfirmation = true, //setting to false will remove the Cancel and Proceed button
}) => {
  return (
    <Modal isOpen={isOpen} style={{ maxWidth: '530px' }}>
      <ModalHeader
        close={
          <CloseButton
            handleClose={requiresConfirmation ? onCancel : onClose}
          />
        }
      >
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
