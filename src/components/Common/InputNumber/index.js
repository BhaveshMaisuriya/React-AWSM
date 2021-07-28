import React from "react"
import "./inputNumber.scss"

/**
 * Input control
 * @param disabled
 * @param onChange
 * @param placeholder
 * @param value
 * @param type
 * @param defaultValue
 * @returns {JSX.Element}
 * @constructor
 */
const AWSMInputNumber = ({
  disabled,
  onChange,
  placeholder,
  value,
  type = "number",
  defaultValue,
  renderExceedError,
  max,
}) => {
  /**
   * Prevent enter key "e" and "-"
   * @param event
   */
  const numberInputValidator = event => {
    const theEvent = event || window.event
    let key = theEvent.keyCode || theEvent.which
    key = String.fromCharCode(key)
    const regex = /[0-9]|\./
    if (!regex.test(key) || parseInt(event.target.value + key) > max) {
      theEvent.returnValue = false
      if (theEvent.preventDefault) theEvent.preventDefault()
    }
  }

  /**
   * Call to onChange event
   * @param event
   */
  const onValueChange = event => {
    if (onChange) {
      onChange(Number(event.target.value))
    }
  }
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onValueChange}
      onKeyPress={numberInputValidator}
      defaultValue={defaultValue}
      className={`awsm-input w-100 ${disabled ? "disabled" : ""} ${
        renderExceedError ? "error error-invalid" : ""
      }`}
    />
  )
}

export default AWSMInputNumber
