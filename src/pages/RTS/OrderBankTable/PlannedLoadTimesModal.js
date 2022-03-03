import React, { useState } from 'react'
import moment from 'moment'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import AWSMInput from 'components/Common/Input'

const PlannedLoadTimesModal = ({ isOpen, onSend, onCancel, data }) => {
  const [form, setForm] = useState({
    // data (barEvent.startDate) if available 'yyyy-MM-dd HH:mm'
    input: data ? data.split(' ')[1] : '00:00',
    error: null,
    isSubmitBlocked: false,
  })

  const format = 'HH:mm'
  const onChange = val => {
    const m = moment(val, format, true)
    if (!m.isValid()) {
      setForm({
        input: val,
        error: `Invalid time format, must be ${format}`,
        isSubmitBlocked: true,
      })
      return
    }

    setForm({
      input: val,
      error: null,
      isSubmitBlocked: false,
    })
  }

  const submit = () => {
    setForm({
      ...form,
      error: null,
    })
    // the api requires format HH:mm:ss
    onSend(form.input + ':00')
  }

  return (
    <Modal isOpen={isOpen} className="deleteModal">
      <ModalHeader toggle={onCancel}>Planned Load Time</ModalHeader>
      <ModalBody className="pl-4 terminal-relay">
        <p>Please enter the correct planned load time for this shipment</p>
        <div className="mb-2 terminal-relay">PLANNED LOAD TIME (00:00)</div>
        <div className="d-flex mb-4 terminal-relay">
          <div className="order-bank-region w-100">
            <AWSMInput
              onChange={val => onChange(val)}
              value={form.input}
              placeholder={format}
              maxLength={format.length}
            />
            <span className="text-danger">{form.error}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button onClick={onCancel} className="btn btn-outline-success mr-2">
            Cancel
          </button>
          <button
            className="btn btn-success"
            disabled={form.isSubmitBlocked}
            onClick={submit}
          >
            Update
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default PlannedLoadTimesModal
