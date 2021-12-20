import React, {useState} from "react"
import "./input.scss"

/**
 * Input control
 * @param disabled
 * @param onChange
 * @param placeholder
 * @param item
 * @param maxLength
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */

const AWSMInput = ({disabled, onChange, placeholder = "Type something here...", value, type="text", defaultValue , maxLength}) => {

  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  /**
   * Call to onChange event
   * @param event
   */
  const onValueChange = (event) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  const numberInputValidator = type => {
    if (type === "number") {
      return event => symbolsArr.includes(event.key) && event.preventDefault()
    }
  }
  
  return (
    <input type={type}
           value={value}
           maxLength={maxLength}
           onKeyDown={numberInputValidator(type)}
           defaultValue={defaultValue}
           placeholder={disabled ? "" : placeholder}
           disabled={disabled}
           onChange={onValueChange}
           className={`awsm-input w-100 ${disabled ? "disabled" : ""}`} />
  )
}

export default AWSMInput
