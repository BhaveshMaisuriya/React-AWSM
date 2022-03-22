import AWSMInput from 'components/Common/Input'
import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import AlertIcon from 'assets/images/AWSM_Alert-Pop-up.svg'
import CloseButton from 'components/Common/CloseButton'

const OverruleModal = ({
  isOpen,
  onProcess,
  onCancel,
  isSoftOverrule,
  overruleMessage,
}) => {
  const softMessage =
    'Your order assignment does not fulfill the requirement below:'
  const hardMessage =
    'This action is not allowed. Your order assignment does not fulfill the requirement below:'
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader close={<CloseButton handleClose={onCancel} />}>
        <img src={AlertIcon} />
        &nbsp;{isSoftOverrule ? 'Soft' : 'Hard'} Overrule Alert!
      </ModalHeader>
      <ModalBody>
        <p>{isSoftOverrule ? softMessage : hardMessage}</p>
        <div className="d-flex mb-4">
          <div className="order-bank-region w-100">
            <AWSMInput placeholder={overruleMessage} />
          </div>
        </div>
        {isSoftOverrule ? (
          <>
            <div>Are you sure you want to proceed?</div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                onClick={onCancel}
                className={`btn btn-outline-danger mr-2`}
              >
                Cancel
              </button>
              <button onClick={onProcess} className={`btn btn-danger`}>
                Process
              </button>
            </div>
          </>
        ) : (
          'Please re-check your order and re-assign.'
        )}
      </ModalBody>
    </Modal>
  )
}

export default OverruleModal
