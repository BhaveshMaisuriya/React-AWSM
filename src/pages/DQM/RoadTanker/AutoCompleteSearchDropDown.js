import React, { useState } from "react"
import { Dropdown, DropdownMenu, DropdownToggle, Input } from "reactstrap"
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { ReactSVG } from "react-svg"
import ArrowDropDownIcon from "../../../assets/images/AWSM-Dropdown.svg"
import { isScheduler } from "helpers/auth_helper"
import searchIcon from "../../../assets/images/AWSM-search.svg"

/**
 * Dropdown menu
 * @param items
 * @param defaultValue
 * @param onChange
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
const AutoCompleteSearchDropDown = ({
  items,
  value,
  onChange,
  disabled = false,
  RowComponent = null,
  placeholder,
  error = false
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [data, setData] = useState(items)

  /**
   * Close dropdown then call to onChange event
   * @param item
   */
  const onValueChange = item => {
    setDropdownOpen(false)
    // setData(item)
    if (onChange && item !== null) {
      onChange(item)
    }
  }

  const onChangeInput = e => {
    let value = e.target.value
    let newData = items.filter(v => v?.code.includes(value))
    setData(newData)
  }
  const isDisabledField = isScheduler()
  const isDisableValue = isDisabledField.toString()
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        data-toggle="dropdown"
        tag="div"
        // aria-expanded={dropdownOpen}
        disabled={disabled}
      >
        <div
          className={`awsm-select-toggle p-2 position-relative ${
            disabled ? "disabled" : ""
          } ${error ? "border-danger" : ""}`}
        >
          <Input
            defaultValue={value && value !== -1 ? value : ''}
            value={data.code}
            className={
              isDisableValue === "true" ? "addl-value" : "addl-value-storage"
            }
            placeholder={placeholder}
            onChange={onChangeInput.bind(this)}
          ></Input>
          {searchIcon ? <ReactSVG src={searchIcon} className="awsm-dropdown-arrow" /> : <ReactSVG src={ArrowDropDownIcon} className="awsm-dropdown-arrow" />}
        </div>
      </DropdownToggle>
      <DropdownMenu className="awsm-select-menu w-100">
        {data &&
          data.map((item, index) =>
            RowComponent ? (
              <RowComponent
                key={index}
                onChange={() => onChange(item)}
                item={item}
                index={index}
              />
            ) : (
              <div
                key={index}
                onClick={() => onValueChange(item)}
                className="awsm-select-item"
              >
                {item?.code || "-"}
              </div>
            )
          )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default AutoCompleteSearchDropDown