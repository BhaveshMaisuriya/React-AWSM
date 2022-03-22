import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import CloseButton from 'components/Common/CloseButton'
import './index.scss'

const OrderBankActionModal = ({
  open,
  title,
  subTitle,
  onClose,
  type,
  onSubmit,
}) => {
  const onSubmitClick = () => {
    if (onSubmit) {
      onSubmit()
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal isOpen={open} className="rts-small-modal">
      <ModalHeader close={<CloseButton handleClose={onClose} />}>
        {title}
      </ModalHeader>
      <ModalBody>{subTitle}</ModalBody>
      <ModalFooter>
        <button className="btn btn-outline-primary mr-2" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={onSubmitClick}>
          {type === 'RefreshDN' ? 'Refresh' : 'Send'}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default OrderBankActionModal
