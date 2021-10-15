import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  maxChar = 20,
  placeholder="Select"
}) => {
  const [inputMode, setInputMode] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const onInputValueChange = event => {
    setInputValue(event.target.value)
  }

  const onInputModeChange = event => {
    event.stopPropagation()
    if (disabled) {
      return
    }
    setInputMode(true)
  }

  const onAddNewItem = event => {
    event.stopPropagation()
    event.preventDefault()
    if (inputValue && isValid) {
      if (items.includes(inputValue) && !acceptDuplicate) {
        setInputMode(false)
        return
      }
      onAddItem(inputValue)
      setInputValue("")
      setInputMode(false)
    } else {
      inputRef.current.focus()
    }
  }

  const onOutsideClick = useCallback(() => {
    setInputValue("")
    setInputMode(false)
  }, [])

  useEffect(() => {
    if (inputMode) {
      document.addEventListener("mousedown", onOutsideClick)
    } else {
      document.removeEventListener("mousedown", onOutsideClick)
    }
  }, [inputMode])

  useEffect(() => {
    if (inputMode) {
      inputRef.current.focus()
    }
  }, [inputMode])

  const remainChars = useMemo(() => {
    return maxChar - inputValue.length
  }, [inputValue])

  const isValid = useMemo(() => {
    return inputValue && remainChars >= 0
  }, [remainChars])

  return (
    <div className="awsm-dropdown-input w-100">
      <div className="d-flex justify-content-between">
        <label>{title}</label>
        {inputMode ? (
          <div
            onMouseDown={onAddNewItem}
            className={`awsm-label-add ${
              inputValue && isValid ? "" : "disabled"
            }`}
          >
            Done
          </div>
        ) : (
          !disabled && (
            <div onMouseDown={onInputModeChange} className="awsm-label-add">
              +Add
            </div>
          )
        )}
      </div>
      <div className={!inputMode ? "d-none" : "d-block position-relative"}>
        <input
          onChange={onInputValueChange}
          value={inputValue}
          className={`awsm-input w-100 ${(inputValue && !isValid) ? "out-range " : ""}`}
          ref={inputRef}
          onMouseDown={e => e.stopPropagation()}
        />
        <span
          className={`position-absolute awsm-input-right-content ${
            !isValid ? "out-range " : ""
          }`}
        >{`${remainChars >= 0 ? "+" : ""}${remainChars}`}</span>
      </div>
      <div className={inputMode ? "d-none" : "d-block"}>
        <AWSMDropdown
          disabled={disabled}
          value={value}
          onChange={onChange}
          items={items}
          RowComponent={RowComponent}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default DropdownInput
