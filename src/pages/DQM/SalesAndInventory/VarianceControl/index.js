import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import "./VarianceControl.scss"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import ExitConfirmation from "../../../../components/Common/ExitConfirmation"
import {
  getSalesAndInventoryVarianceControl,
  updateSaleAndInventoryVarianceControlSuccess,
  updateSalesAndInventoryVarianceControl
} from "../../../../store/salesAndInventory/actions"
import AWSMEditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import { ReactSVG } from "react-svg"
import { format } from "date-fns"
import CloseButton from "../../../../components/Common/CloseButton"
import { isScheduler } from "../../../../helpers/auth_helper"
import { formatUpdateVarianceControlUploadData } from "./format-update-data.helper"

const headers = [
  { label: "STATION TANK STATUS", value: "station_tank_status" },
  { label: "THRESHOLD VALUE (L)", value: "variance_value" },
  { label: "THRESHOLD (%)", value: "variance_percentage" }
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
                         rowKey = "id"
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
                           updateSalesAndInventoryVarianceControl
                         }) => {
  const scheduler = isScheduler()
  const currentDate = format(new Date(), "yyyy-MM-dd")
  const isHistoricalDate = selectedDate !== currentDate
  const [unmodifiedStatus, setUnmodifiedStatus] = useState(true)
  const [data, setData] = useState({
    ...varianceControlData,
    date: selectedDate
  })
  const [isConfirm, setIsConfirm] = useState(false)

  useEffect(() => {
    if (varianceControlData) {
      setData({ ...varianceControlData, date: selectedDate })
    }else{
      setData(null)
    }
  }, [varianceControlData])

  useEffect(() => {
    /*Call Api when the modal is opened */
    if (open) {
      /* Wait for real API */
      const queryDate = selectedDate ? selectedDate : currentDate
      getSalesAndInventoryVarianceControl(queryDate)
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
    const { date,updated_at, updated_by,...uploadData } = data
    const formattedData = formatUpdateVarianceControlUploadData(uploadData)

    if (formattedData) {
      updateSalesAndInventoryVarianceControl(formattedData)
    }
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
  const updatedInformation = React.useMemo(()=>(
    `Last Updated By: ${data.updated_by ? data?.updated_by?.toString()?.split("@")[0] : "Unknown"}
    ${data.updated_at ? `on ${format(new Date(data?.updated_at),"do LLL yyyy")}` : ""}`
  ),[data?.updated_at, data?.updated_by]);

  return (
    <Modal isOpen={open} className="variance-control-modal">
      <div className="variance-control-container">
        <ModalHeader
          close={<CloseButton handleClose={() => setIsConfirm(true)} />}
        >
          <span className="modal-title">Threshold Control</span> 
          <span className="last-updated-sub-title">
             {updatedInformation}
            </span>
        </ModalHeader>
        <ModalBody className="variance-control-content position-relative">
          {isConfirm && showExitConfirmation()}
          <div className="w-100">
            <div>
              <div className="px-2 custom-padding">
                <label className="variance-table-label">SALES THRESHOLD</label>
                {data ? (
                  <VarianceTable
                    items={data.sales}
                    headers={headers}
                    scheduler={scheduler || isHistoricalDate}
                    rowKey="station_tank_status"
                    onChange={value => onModifyData({ ...data, sales: value })}
                  />
                ) : <div>On {selectedDate && format(new Date(selectedDate),"do LLL yyyy")}, there is no data for Sales</div>}
              </div>
              <div className="px-2">
                <label className="variance-table-label">
                  INVENTORY THRESHOLD
                </label>
                {data? (
                  <VarianceTable
                    items={data.inventory}
                    headers={headers}
                    scheduler={scheduler || isHistoricalDate}
                    rowKey="station_tank_status"
                    onChange={value =>
                      onModifyData({ ...data, inventory: value })
                    }
                  />
                ) : <div>On {selectedDate && format(new Date(selectedDate),"do LLL yyyy")}, there is no data for Inventory</div>}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end mt-4 mb-4 px-2">
              {!isConfirm && !scheduler && !isHistoricalDate && (
                <>
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={() => setIsConfirm(true)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary ml-2 px-4"
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
  varianceControlError: saleAndInventory.varianceControlError
})

const mapDispatchToProps = dispatch => ({
  getSalesAndInventoryVarianceControl: date =>
    dispatch(getSalesAndInventoryVarianceControl(date)),
  updateSalesAndInventoryVarianceControl: data =>
    /* Wait for real api*/
    dispatch(updateSalesAndInventoryVarianceControl(data))
  /* Test dispatch to be able to see the change in variance control modal*/
  // dispatch(updateSaleAndInventoryVarianceControlSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VarianceControl)