import React, { useState } from "react"
import { Dropdown, DropdownMenu, DropdownToggle,Input } from "reactstrap"
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { ReactSVG } from "react-svg"
import ArrowDropDownIcon from "../../../../assets/images/AWSM-Dropdown.svg"

/**
 * Dropdown menu
 * @param items
 * @param defaultValue
 * @param onChange
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
const AWSMDropdown = ({
  items,
  value,
  onChange,
  disabled = false,
  RowComponent = null,
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
    if (onChange && item !== null) {
      onChange(item)
    }
  }


  const onChangeInput = (e) =>{
      let value = e.target.value
      let newData = items.filter((v)=>v?.code.includes(value))
      setData(newData)
  }

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
          }`}
        >
          <Input defaultValue={value} className="addl-value" onChange={onChangeInput.bind(this)}></Input>
          <ReactSVG src={ArrowDropDownIcon} className="awsm-dropdown-arrow" />
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

export default AWSMDropdown
