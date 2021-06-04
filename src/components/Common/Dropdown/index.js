import React, { useState } from "react"
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap"
import "./dropdown.scss"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

/**
 * Dropdown menu
 * @param items
 * @param defaultValue
 * @param onChange
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
const AWSMDropdown = ({ items, value, onChange, disabled = false, RowComponent = null}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  /**
   * Close dropdown then call to onChange event
   * @param item
   */
  const onValueChange = (item) => {
    setDropdownOpen(false)
    if (onChange) {
      onChange(item)
    }
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        data-toggle="dropdown"
        tag="div"
        aria-expanded={dropdownOpen}
        disabled={disabled}
      >
        <div className={`awsm-select-toggle p-2 position-relative ${disabled ? "disabled" : ""}`}>
          <div>{value}</div>
          <ArrowDropDownIcon className="awsm-dropdown-arrow"/>
        </div>
      </DropdownToggle>
      <DropdownMenu className="awsm-select-menu w-100">
        {items &&
          items.map((item, index) =>
            RowComponent ? (
              <RowComponent key={index} onChange={() => onChange(item)} item={item} index={index}/>
            ) : (
              <div
                key={index}
                onClick={() => onValueChange(item)}
                className="awsm-select-item"
              >
                {item || "-"}
              </div>
            )
          )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default AWSMDropdown
