import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import "./VarianceControl.scss"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import ExitConfirmation from "../../../../components/Common/ExitConfirmation"
import {
  getSalesAndInventoryVarianceControl,
  updateSaleAndInventoryVarianceControlSuccess,
  updateSalesAndInventoryVarianceControl,
} from "../../../../store/salesAndInventory/actions"
import AWSMEditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import { ReactSVG } from "react-svg"
import { format } from "date-fns"
import CloseButton from "../../../../components/Common/CloseButton"
import { isScheduler } from "../../../../helpers/auth_helper"

const headers = [
  { label: "STATION TANK STATUS", value: "station_tank_status" },
  { label: "VARIANCE VALUE (L)", value: "variance_value" },
  { label: "VARIANCE PERCENTAGE (%)", value: "variance_percentage" },
]

const VarianceInput = ({ value, disabled, onChange }) => {
  const inputRef = useRef(null)
  const [isFocus, setIsFocus] = useState(false)
  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus()
    }
  }, [isFocus])

  const onEditButtonClick = () => {
    setIsFocus(true)
  }

  const onFocus = () => {
    setIsFocus(true)
  }

  const onBlur = () => {
    setIsFocus(false)
  }

  const onValueChange = event => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  const onPress = event => {
    if (event.key === "Enter") {
      inputRef.current.blur()
    }
    const theEvent = event || window.event
    let key = theEvent.keyCode || theEvent.which
    key = String.fromCharCode(key)
    const regex = /[0-9]|\./
    if (!regex.test(key)) {
      theEvent.returnValue = false
      if (theEvent.preventDefault) theEvent.preventDefault()
    }
  }

  return (
    <div
      className={`variance-input ${isFocus ? "focus" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <input
        value={value}
        disabled={disabled || !isFocus}
        type="number"
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onValueChange}
        onKeyPress={onPress}
      />
      <button
        className="button-edit"
        disabled={disabled}
        onClick={onEditButtonClick}
      >
        <ReactSVG src={AWSMEditIcon} />
      </button>
    </div>
  )
}

const VarianceTable = ({
  headers = [],
  items = [],
  scheduler,
  onChange,
  rowKey = "id",
}) => {
  const onValueChange = (index, key, value) => {
    const newItems = [...items]
    newItems[index][key] = value
    if (onChange) {
      onChange(newItems)
    }
  }
  return (
    <table className="w-100 variance-table">
      <thead>
        <tr>
          {headers.map(({ label, key }) => {
            return <th key={key}>{label}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item, row) => {
          return (
            <tr key={item[rowKey]}>
              {headers.map((header, col) => (
                <td key={header.value}>
                  {col === 0 ? (
                    <div className="pl-3">{item[header.value] || ""}</div>
                  ) : (
                    <VarianceInput
                      disabled={scheduler}
                      value={item[header.value] || ""}
                      onChange={value =>
                        onValueChange(row, header.value, value)
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const VarianceControl = ({
  open,
  closeDialog,
  onChange,
  selectedDate,
  getSalesAndInventoryVarianceControl,
  varianceControlData,
  updateSalesAndInventoryVarianceControl,
}) => {
  const scheduler = isScheduler()
  const currentDate = format(new Date(), "yyyy-MM-dd")
  const isHistoricalDate = selectedDate !== currentDate
  const [unmodifiedStatus, setUnmodifiedStatus] = useState(true)
  const [data, setData] = useState({
    ...varianceControlData,
    date: selectedDate,
  })
  const [isConfirm, setIsConfirm] = useState(false)

  useEffect(() => {
    if (varianceControlData){
      setData({ ...varianceControlData, date: selectedDate })
    }
  }, [varianceControlData])

  useEffect(() => {
    /*Call Api when the modal is opened */
    if (open) {
      /* Wait for real API */
      // getSalesAndInventoryVarianceControl(selectedDate)
    }
  }, [open])

  const handleCancel = () => {
    setIsConfirm(false)
  }

  const handleExit = () => {
    setUnmodifiedStatus(true)
    setIsConfirm(false)
    if (closeDialog) {
      closeDialog()
    }
  }

  const onUpdate = () => {
    if (onChange) {
      onChange()
    }
    updateSalesAndInventoryVarianceControl(data)
    handleExit()
  }

  const onModifyData = newValue => {
    setData(newValue)
    setUnmodifiedStatus(false)
  }

  const showExitConfirmation = () => {
    return !unmodifiedStatus ? (
      <ExitConfirmation onExit={handleExit} onCancel={handleCancel} />
    ) : (
      handleExit()
    )
  }

  return (
    <Modal isOpen={open} className="variance-control-modal">
      <div className="variance-control-container">
        <ModalHeader
          close={<CloseButton handleClose={() => setIsConfirm(true)} />}
        >
          <h3>Variance Control</h3>
        </ModalHeader>
        <ModalBody className="variance-control-content position-relative">
          {isConfirm && showExitConfirmation()}
          <div className="w-100">
            <div>
              <div className="px-2">
                <label className="variance-table-label">Sales Variance</label>
                {data && (
                  <VarianceTable
                    items={data.sales}
                    headers={headers}
                    scheduler={scheduler || isHistoricalDate}
                    rowKey="station_tank_status"
                    onChange={value => onModifyData({ ...data, sales: value })}
                  />
                )}
              </div>
              <div className="px-2">
                <label className="variance-table-label">
                  Inventory Variance
                </label>
                {data && (
                  <VarianceTable
                    items={data.inventory}
                    headers={headers}
                    scheduler={scheduler || isHistoricalDate}
                    rowKey="station_tank_status"
                    onChange={value =>
                      onModifyData({ ...data, inventory: value })
                    }
                  />
                )}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end mt-4 mb-4 px-4">
              {!isConfirm && !scheduler && !isHistoricalDate && (
                <>
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={() => setIsConfirm(true)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary ml-4 px-4"
                    onClick={onUpdate}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ saleAndInventory }) => ({
  varianceControlData: saleAndInventory.varianceControlData,
  varianceControlError: saleAndInventory.varianceControlError,
})

const mapDispatchToProps = dispatch => ({
  getSalesAndInventoryVarianceControl: date =>
    dispatch(getSalesAndInventoryVarianceControl(date)),
  updateSalesAndInventoryVarianceControl: data =>
    /* Wait for real api*/
    // dispatch(updateSalesAndInventoryVarianceControl(data)),
    /* Test dispatch to be able to see the change in variance control modal*/
    dispatch(updateSaleAndInventoryVarianceControlSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VarianceControl)
