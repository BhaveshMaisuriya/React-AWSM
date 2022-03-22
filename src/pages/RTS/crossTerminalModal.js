import React, { useEffect, useMemo, useState } from 'react'
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import REGION_TERMINAL, {
  TERMINAL_CODE_MAPPING,
} from '../../common/data/regionAndTerminal'
import AWSMDropdown from 'components/Common/Dropdown'
import ExitConfirmation from 'components/Common/ExitConfirmation'
import CloseButton from 'components/Common/CloseButton'

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
    if (region !== props.region || terminal !== 'KVDT') {
      setIsConfirm(true)
    } else {
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
    setRegion(
      props.defaultRegion !== undefined ? props.defaultRegion : props.region
    )
    setTerminal(
      props.defaultTerminal !== undefined
        ? props.defaultTerminal
        : REGION_TERMINAL[0].terminal[0]
    )
  }

  useEffect(() => {
    let temp = []
    REGION_TERMINAL.map(item => {
      temp.push(item.region)
    })
    setRegionList(temp)
  }, [REGION_TERMINAL])

  const regionChange = value => {
    setRegion(value)
    setTerminal(REGION_TERMINAL.find(item => item.region === value).terminal[0])
    // const currentRegion = REGION_TERMINAL.find(e => e.region === value);
    //   setTerminalList(currentRegion ? currentRegion.terminal : []);
  }

  return (
    <Modal isOpen={open} className="rts-small-modal">
      <ModalHeader close={<CloseButton handleClose={onCancelClick} />}>
        Cross Terminal
      </ModalHeader>
      <ModalBody>
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        {!isConfirm && (
          <>
            Please select the required terminal. The order will be place under
            the selected terminal once you click Update. <br />
            <br />
            <h5 className="order-bank-region-label">REGION & TERMINAL</h5>
            <Row>
              <Col lg={6}>
                <AWSMDropdown
                  value={region}
                  onChange={value => regionChange(value)}
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
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onCancelClick}
          className="btn btn-outline-primary mr-2"
        >
          Cancel
        </button>
        <button onClick={() => onSaveClick()} className="btn btn-primary">
          Update
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CrossTerminalModal
