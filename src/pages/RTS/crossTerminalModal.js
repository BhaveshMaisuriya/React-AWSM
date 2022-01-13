import React, { useEffect, useMemo, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import REGION_TERMINAL, { TERMINAL_CODE_MAPPING } from "../../common/data/regionAndTerminal"
import AWSMDropdown from "../../components/Common/Dropdown"
import ExitConfirmation from "../../components/Common/ExitConfirmation"

function CrossTerminalModal(props) {
  const { open, onCancel, onSave } = props

  const [region, setRegion] = useState(props.region)
  const [terminal, setTerminal] = useState(REGION_TERMINAL[0].terminal[0])
  const [isConfirm, setIsConfirm] = useState(false)
  const [regionList, setRegionList] = useState([])

  const terminalList = useMemo(() => {
    const currentRegion = REGION_TERMINAL.find(e => e.region === region)
    return currentRegion ? currentRegion.terminal : []
  }, [region])

  const onCancelClick = () => {
    if(region !== props.region || terminal !== "KVDT"){
      setIsConfirm(true)
    }else{
      onCancel()
    }
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    setRegion(props.region)
    setTerminal(REGION_TERMINAL[0].terminal[0])
    if (onCancel) {
      onCancel()
    }
  }

  const onConfirmCancel = () => {
      setIsConfirm(false)
  }

  const onSaveClick = () => {
    onSave(region, TERMINAL_CODE_MAPPING[terminal])
    setRegion(props.defaultRegion !== undefined ? props.defaultRegion : props.region)
    setTerminal(props.defaultTerminal !== undefined ? props.defaultTerminal : REGION_TERMINAL[0].terminal[0])
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
    setTerminal(REGION_TERMINAL.find(item => item.region === value).terminal[0])
    // const currentRegion = REGION_TERMINAL.find(e => e.region === value);
    //   setTerminalList(currentRegion ? currentRegion.terminal : []);
  }

  return (
    <Modal  id="crossterminal-modal" isOpen={open} className="deleteModal">
      <ModalHeader  toggle={onCancelClick}>Cross Terminal</ModalHeader>
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
                  items={regionList.splice(6) && regionList}
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
            <div className="d-flex align-items-center justify-content-end pt-12">
              <button onClick={onCancelClick} className="btn btn-outline-primary mr-2">
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