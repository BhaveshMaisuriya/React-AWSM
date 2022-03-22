import REGION_TERMINAL from 'common/data/regionAndTerminal'
import AWSMDropdown from 'components/Common/Dropdown'
import React, { useState, useMemo, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import CloseButton from 'components/Common/CloseButton'

const TerminalRelayModal = ({ isOpen, onSend, onCancel }) => {
  const [region, setRegion] = useState(REGION_TERMINAL[0].region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const terminalList = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region])

  useEffect(() => {
    setTerminal(terminalList && terminalList.length ? terminalList[0] : [])
  }, [region])
  return (
    <Modal isOpen={isOpen} className="rts-small-modal">
      <ModalHeader close={<CloseButton handleClose={onCancel} />}>
        Terminal Relay
      </ModalHeader>
      <ModalBody>
        <p>
          Please select the required terminal if you wish to perform terminal
          relay on this shipment
        </p>
        <div className="mb-2">REGION & TERMINAL</div>
        <div className="d-flex mb-4">
          <div className="order-bank-region w-100">
            <AWSMDropdown
              value={region}
              onChange={value => {
                setRegion(value)
                setTerminal(null)
              }}
              items={REGION_TERMINAL.map(e => e.region)}
            />
          </div>
          <div className="order-bank-region ml-2 w-100">
            <AWSMDropdown
              value={terminal}
              onChange={value => setTerminal(value)}
              items={terminalList}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={onCancel} className={`btn btn-outline-success mr-2`}>
          Cancel
        </button>
        <button onClick={onSend} className={`btn btn-success`}>
          Update
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default TerminalRelayModal
