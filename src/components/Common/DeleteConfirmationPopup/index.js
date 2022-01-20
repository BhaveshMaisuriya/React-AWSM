import React from "react"
import CloseButton from "../../../components/Common/CloseButton"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

const DeleteConfirmationPopup = ({ open, istoggle, deleteFunction }) => {
  const onClickProceed = () => {
    deleteFunction()
    istoggle()
  }
  return (
    <Modal isOpen={open} toggle={istoggle} centered={true} id="auditLog-modal" > 
      <ModalHeader close={<CloseButton handleClose={istoggle}></CloseButton>} >Delete Shipment Confirmation</ModalHeader>
      <ModalBody>
        <p>
          This action cannot be undone.<br />
          Are you sure want to proceed with the shipment deletion?<br />
          This shipment will be deleted in both RTS and SAP.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          className="btn-dan"
          onClick={istoggle}
        >
          Cancel
        </Button>
        <Button className="btn-danger" onClick={onClickProceed}>
          Proceed
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteConfirmationPopup