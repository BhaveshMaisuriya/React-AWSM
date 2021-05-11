import React from "react"
import "./input.scss"

/**
 * Input control
 * @param disabled
 * @param onChange
 * @param placeholder
 * @param item
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
const AWSMInput = ({disabled, onChange, placeholder, value, type="text"}) => {

  /**
   * Call to onChange event
   * @param event
   */
  const onValueChange = (event) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }
  return (
    <input type={type}
           value={value}
           placeholder={placeholder}
           disabled={disabled}
           onChange={onValueChange}
           className={`awsm-input w-100 ${disabled ? "disabled" : ""}`} />
  )
}

export default AWSMInput