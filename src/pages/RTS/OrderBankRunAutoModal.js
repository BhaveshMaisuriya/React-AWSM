import React, { Fragment, useState } from "react"
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap"
import { connect } from "react-redux"
import LinearWithValueLabel from "components/Common/Loader/LinearWithValueLabel"
import {
  runAutoSchedule
} from "store/orderBank/actions"

import {format} from 'date-fns'

const DISPLAY_DATE_FORMAT = "do MMM yyyy"

function OrderBankRunAutoModal(props) {
  const [displayRun, setDisplayRun] = useState(false)

  function toggle() {
    props.istoggle('success', 'Orders have been succesfully Auto-scheduled');
  }

  function CloseModal() {
    props.CloseModal()
  }

  async function RunModal() {
    const { runAutoSchedule, shift_date, region } = props
    await runAutoSchedule( {
      region: region,
      delivery_date: shift_date?.date_from
    })
    setDisplayRun(!displayRun)
  }

  return (
    <Fragment>
      <Modal
        isOpen={props.open}
        id="runauto-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={CloseModal}>
          <h3>Run Auto-Schedule</h3>
        </ModalHeader>
        <ModalBody>
          {!displayRun ? (
            <Fragment>
              <p>
                This action cannot be undone. Are you sure you want to Run
                Auto-Schedule for all remaining {props?.region} orders on {format(new Date(props?.shift_date?.date_from), DISPLAY_DATE_FORMAT)}
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

const mapDispatchToProps = dispatch => ({
  runAutoSchedule: payload => dispatch(runAutoSchedule(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBankRunAutoModal)