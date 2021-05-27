import React, { useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, Input } from "reactstrap"
import "./timePicker.scss"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
/**
 *
 * @param items
 * @param onChange
 * @param disabled
 * @param defaultEmpty
 * @returns {JSX.Element}
 * @constructor
 */
const AWSMDropdown = ({
  items,
  onChange,
  disabled = false,
  defaultEmpty = true,
  //   defaultValue,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [value, setValue] = useState(
    defaultEmpty ? "Select time" : items && items[0] ? items[0] : ""
    // defaultValue
  )
  const onValueChange = item => {
    setValue(item)
    setDropdownOpen(false)
    if (onChange) {
      onChange(item)
    }
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        caret
        data-toggle="dropdown"
        tag="div"
        aria-expanded={dropdownOpen}
        className={`awsm-select-toggle p-2 ${disabled ? "disabled" : ""}`}
        disabled={disabled}
      >
        {value}
      </DropdownToggle>
      <DropdownMenu className="awsm-select-menu w-100">
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              onClick={() => onValueChange(item)}
              className="awsm-select-item"
            >
              {item}
            </div>
          ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default AWSMDropdown