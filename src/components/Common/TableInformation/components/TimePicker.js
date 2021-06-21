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
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
const AWSMDropdown = ({
  items,
  onChange,
  disabled = false,
  defaultEmpty = true,
  value,
  //   defaultValue,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [itemSelected, setValue] = useState(
    !value ? "Select time" : items ? value : ''
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
        disabled={disabled}
      >
        <div className={`awsm-select-toggle p-2 position-relative ${disabled ? "disabled" : ""}`}>
          <div>{value ? value.toString().substring(0,5) : "Select time"}</div>
          <ArrowDropDownIcon className="awsm-dropdown-arrow"/>
        </div>
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
