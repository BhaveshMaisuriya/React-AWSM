import React, { useEffect, useRef, useState } from "react"
import AWSMDropdown from "../Dropdown"
import "./dropdownInput.scss"

const DropdownInput = ({
  value,
  items,
  title,
  onChange,
  onAddItem,
  acceptDuplicate = false,
  RowComponent = null,
  disabled,
}) => {
  const [inputMode, setInputMode] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const onInputValueChange = event => {
    setInputValue(event.target.value)
  }

  const onInputModeChange = () => {
    if (disabled) {
      return
    }
    setInputMode(!inputMode)
  }

  const onAddNewItem = () => {
    if (inputValue) {
      if (items.includes(inputValue) && !acceptDuplicate) {
        return
      }
      onAddItem(inputValue)
      setInputValue("")
      setInputMode(!inputMode)
    } else {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (inputMode) {
      inputRef.current.focus()
    }
  }, [inputMode])

  return (
    <div className="awsm-dropdown-input w-100">
      <div className="d-flex justify-content-between">
        <div className="input-header mb-2">{title}</div>
        {inputMode ? (
          <div
            onClick={onAddNewItem}
            className={`awsm-label-add ${inputValue ? "" : "disabled"}`}
          >
            Done
          </div>
        ) : (
          !disabled && (
            <div onClick={onInputModeChange} className="awsm-label-add">
              +Add
            </div>
          )
        )}
      </div>
      <div className={!inputMode ? "d-none" : "d-block position-relative"}>
        <input
          onChange={onInputValueChange}
          value={inputValue}
          className="awsm-input w-100"
          ref={inputRef}
        />
        <span className="position-absolute awsm-input-right-content">{`+${items.length}`}</span>
      </div>
      <div className={inputMode ? "d-none" : "d-block"}>
        <AWSMDropdown
          disabled={disabled}
          value={value}
          onChange={onChange}
          items={items}
          RowComponent={RowComponent}
        />
      </div>
    </div>
  )
}

export default DropdownInput
