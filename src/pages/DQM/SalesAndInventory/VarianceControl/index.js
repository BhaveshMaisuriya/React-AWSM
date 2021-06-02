import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import "./VarianceControl.scss"
import { XIcon } from "../../../../common/CustomizeTable/icons"
import { Modal, ModalBody } from "reactstrap"
import ExitConfirmation from "../../../../components/Common/ExitConfirmation"
import { getSalesAndInventoryVarianceControl, updateSalesAndInventoryVarianceControl } from "../../../../store/salesAndInventory/actions"
import AWSMEditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import { ReactSVG } from "react-svg"

const headers = [
  { label: "STATION TANK STATUS", value: "station_tank_status" },
  { label: "VARIANCE VALUE(L)", value: "variance_value" },
  { label: "VARIANCE PERCENTAGE(%)", value: "variance_percentage" },
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
    if(event.key === 'Enter'){
      inputRef.current.blur();
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
        <ReactSVG src={AWSMEditIcon}/>
      </button>
    </div>
  )
}

const VarianceTable = ({ headers = [], items = [], scheduler, onChange, rowKey="id" }) => {
  const onValueChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    if (onChange) {
      onChange(newItems);
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
                      onChange={(value) => onValueChange(row, header.value, value)}
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

const VarianceControl = ({ open, scheduler, closeDialog, onChange, getSalesAndInventoryVarianceControl, varianceControlData }) => {
  const [data, setData] = useState(varianceControlData);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    setData(varianceControlData)
  }, [varianceControlData])

  useEffect(() => {
    if (open) {
      getSalesAndInventoryVarianceControl()
    }
  }, [open])

  useEffect(() => {
    console.log({ data })
  }, [data])

  const showConfirm = () => {
    if (scheduler && closeDialog) {
      return closeDialog()
    }
    setIsConfirm(true);
  }

  const onCancel = () => {
    setIsConfirm(false)
  }

  const onExit = () => {
    setIsConfirm(false)
    if (closeDialog) {
      closeDialog()
    }
  }

  const onUpdate = () => {
    if (onChange) {
      onChange()
    }
    if (closeDialog) {
      closeDialog()
    }
  }
  return (
    <Modal isOpen={open} className="variance-control-modal">
      <div className="variance-control-container">
        <div className="d-flex align-items-center justify-content-between px-4 pt-4 pb-2">
          <h3 className="variance-label">Variance Control</h3>
          <div className="d-flex align-items-center">
            <div className="mr-3 variance-last-update">
              Last Updated: Nur Izzati on 17 Mar 2021
            </div>
            <button className="variance-close-button" onClick={showConfirm}>
              <XIcon />
            </button>
          </div>
        </div>
        <ModalBody className="variance-control-content position-relative">
          {isConfirm && (
            <ExitConfirmation onExit={onExit} onCancel={onCancel}/>
          )}
          <div className="w-100">
            <div>
              <div className="px-2">
                <label className="variance-table-label">Sales Variance</label>
                {data && (
                  <VarianceTable
                    items={data.sales}
                    headers={headers}
                    scheduler={scheduler}
                    rowKey="station_tank_status"
                    onChange={value => setData({ ...data, sales: value })}
                  />
                )}
              </div>
              <div className="px-2">
                <label className="variance-table-label">
                  Inventory Variance
                </label>
                {data && <VarianceTable
                    items={data.inventory}
                    headers={headers}
                    scheduler={scheduler}
                    rowKey="station_tank_status"
                    onChange={value => setData({ ...data, inventory: value })}
                  />}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end mt-4 mb-4 px-4">
              {!scheduler && (
                <>
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={showConfirm}
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

const mapStateToProps = ({saleAndInventory}) => ({
  varianceControlData: saleAndInventory.varianceControlData,
  varianceControlError: saleAndInventory.varianceControlError,
})

const mapDispatchToProps = dispatch => ({
  getSalesAndInventoryVarianceControl: () => dispatch(getSalesAndInventoryVarianceControl()),
  updateSalesAndInventoryVarianceControl: data => dispatch(updateSalesAndInventoryVarianceControl(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VarianceControl)
