import React, { useEffect, useMemo, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import REGION_TERMINAL, { TERMINAL_CODE_MAPPING } from "../../common/data/regionAndTerminal"
import AWSMDropdown from "../../components/Common/Dropdown"
import ExitConfirmation from "../../components/Common/ExitConfirmation"

function CrossTerminalModal(props) {
  const { open, onCancel, onSave } = props

  const [region, setRegion] = useState(props.region)
  const [terminal, setTerminal] = useState(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [regionList, setRegionList] = useState([])

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

  const onSaveClick = () => {
    onSave(region, TERMINAL_CODE_MAPPING[terminal])
    setRegion(props.defaultRegion)
    setTerminal(null)
  }

  useEffect(() => {
    let temp = [];
    REGION_TERMINAL.map((item, index) => {
      temp.push(item.region);
    })
    setRegionList(temp) 
  }, [REGION_TERMINAL])

  const regionChange = (value) => {
    setRegion(value);
    setTerminal('')
    // const currentRegion = REGION_TERMINAL.find(e => e.region === value);
    //   setTerminalList(currentRegion ? currentRegion.terminal : []);
  }

  return (
    <Modal  id="crossterminal-modal" isOpen={open} className="deleteModal">
      <ModalHeader  toggle={toggle}>Cross Terminal</ModalHeader>
      <ModalBody className="position-relative h-250 scroll pl-30">
        {isConfirm && <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />}
        {!isConfirm && (
          <>
            <p>
              {" "}
              Please select the required terminal. The order will be place under the selected
              terminal once you click Update.
            </p>
            <p className="order-bank-region-label">REGION & TERMINAL</p>
            <Row>
              <Col lg={6}>
                <AWSMDropdown
                  value={region}
                  onChange={value => regionChange(value)}
                  // disabled
                  items={regionList}
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
              <button onClick={() => setIsConfirm(true)} className="btn btn-outline-primary mr-2">
                Cancel
              </button>
              <button onClick={() => onSaveClick()} className="btn btn-primary">
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