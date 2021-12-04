import React, { Fragment, useState } from "react"
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from "reactstrap"
import { connect } from "react-redux"
import LinearWithValueLabel from "components/Common/Loader/LinearWithValueLabel"

function OrderBankRunAutoModal(props) {
  const [displayRun, setDisplayRun] = useState(false)

  function toggle() {
    props.istoggle('success', 'Orders have been succesfully Auto-scheduled');
  }

  function CloseModal() {
    props.CloseModal()
  }

  function RunModal() {
    setDisplayRun(!displayRun)
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
          <h3>Run Auto-Schedule</h3>
        </ModalHeader>
        <ModalBody>
          {!displayRun ? (
            <Fragment>
              <p>
                This action cannot be undone. Are you sure you want to Run
                Auto-Schedule for all remaining KVDT orders on 11th Feb 2021?
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
                  Run
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
            <p>
              Please wait until Auto-Scheduling is complete.
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

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBankRunAutoModal)