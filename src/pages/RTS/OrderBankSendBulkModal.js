import React, { Fragment, useState } from "react"
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from "reactstrap"
import { connect } from "react-redux"
import LinearWithValueLabel from "components/Common/Loader/LinearWithValueLabel"

function OrderBankSendBulkModal(props) {
  const [displayBulk, setDisplayBulk] = useState(false)

  function toggle() {
    props.istoggle('error', 'Send Bulk Shipment unsuccessful. Please try again.');
  }

  function CloseModal() {
    props.CloseModal()
  }

  function RunModal() {
    setDisplayBulk(!displayBulk)
  }

  return (
    <Fragment>
      <Modal
        isOpen={props.open}
        toggle={toggle}
        id="runauto-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={toggle}>
          <h3>Send Bulk Shipment</h3>
        </ModalHeader>
        <ModalBody>
          {!displayBulk ? (
            <Fragment>
              <p>
                Are you sure you want to send KVDT Scheduling on 11th Feb 2021 for Bulk Shipment?
              </p>
              <div className="mt-3 mb-2 text-right">
                <Button
                  color="primary"
                  outline
                  className="mr-2 p-1025"
                  onClick={CloseModal}
                >
                  Cancel
                </Button>
                <Button color="primary" className="p-1035" onClick={RunModal}>
                  Send
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
            <p>
              Please wait until Bulk Shipment is complete.
            </p>
            <div className="mt-3 mb-2 text-right">
              <LinearWithValueLabel toggle={toggle} />
            </div>
          </Fragment>
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = ({ orderBank }) => ({
    auditsCom: orderBank.auditsCom,
  })
  
  const mapDispatchToProps = dispatch => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrderBankSendBulkModal)