import React, { useMemo, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import REGION_TERMINAL from "../../common/data/regionAndTerminal"
import AWSMDropdown from "../../components/Common/Dropdown"
import ExitConfirmation from "../../components/Common/ExitConfirmation"

function CrossTerminalModal(props) {
  const { open, onCancel, onSave } = props

  const [region, setRegion] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const [isConfirm, setIsConfirm] = useState(false)
  const terminalList = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region])

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    if (onCancel) {
      onCancel()
    }
  }

  const toggle = () => {
    setIsConfirm(true)
  }

  return (
    <Modal isOpen={open} className="deleteModal">
      <ModalHeader toggle={toggle}>Cross Terminal</ModalHeader>
      <ModalBody className="position-relative h-250 scroll pl-30">
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        {!isConfirm && (
          <>
            <p>
              {" "}
              Please select the required terminal. The order will be place under
              the selected terminal once you click Update.
            </p>
            <p className="order-bank-region-label">REGION & TERMINAL</p>
            <Row>
              <Col lg={6}>
                <AWSMDropdown
                  value={region}
                  onChange={value => {
                    setRegion(value)
                    setTerminal(null)
                  }}
                  disabled
                  items={REGION_TERMINAL.map(e => e.region)}
                />
              </Col>
              <Col lg={6}>
                <AWSMDropdown
                  value={terminal}
                  onChange={value => setTerminal(value)}
                  items={terminalList}
                />
              </Col>
            </Row>
            <div className="d-flex align-items-center justify-content-end pt-5">
              <button
                onClick={() => setIsConfirm(true)}
                className="btn btn-outline-primary mr-2"
              >
                Cancel
              </button>
              <button onClick={onSave} className="btn btn-primary">
                Update
              </button>
            </div>
          </>
        )}
      </ModalBody>
    </Modal>
  )
}

export default CrossTerminalModal
