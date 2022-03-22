import React, { useState, useEffect, Fragment } from 'react'
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import CloseButton from 'components/Common/CloseButton'

function ClearScheduling(props) {
  const { clearScheduling, toggle, checkedValue } = props

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(clearScheduling)
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    if (open === true) {
      const timer = setInterval(() => {
        setProgress(prevProgress =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        )
      }, 500)
      return () => {
        clearInterval(timer)
      }
    }
  }, [open])

  useEffect(() => {
    if (progress === 100) {
      onToggleConfirm()
      props.showConfirmAlert()
      props.toggle()
    }
  }, [progress])

  const onClear = () => {
    setOpenModal(false)
    setProgress(10)
    onToggleConfirm()
    // props.toggle();
  }

  const onToggleConfirm = () => {
    setOpen(!open)
  }

  return (
    <Fragment>
      <Modal isOpen={openModal} className="rts-small-modal">
        <ModalHeader close={<CloseButton handleClose={toggle} />}>
          Cancel Shipment Confirmation
        </ModalHeader>
        <ModalBody>
          Are you sure you want to proceed with this shipment cancellation?
          <br />
          All order under this shipment will be drop back to Unscheduled list in
          Order Bank
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-danger" onClick={toggle}>
            Cancel
          </button>
          <button className="btn btn-danger ml-2" onClick={onClear}>
            Proceed
          </button>
        </ModalFooter>
      </Modal>

      {/* progress */}
      <Modal isOpen={open} className="rts-small-modal">
        <ModalHeader close={<CloseButton handleClose={props.toggle} />}>
          Clear {checkedValue}
        </ModalHeader>
        <ModalBody>
          <div className={checkedValue.length >= 35 ? 'yellowbar' : ''}>
            <p>Please wait until action is complete.</p>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            </Box>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ClearScheduling
