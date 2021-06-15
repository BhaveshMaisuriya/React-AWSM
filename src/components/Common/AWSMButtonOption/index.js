import React, { useState } from "react"
import { EllipsisIcon } from "../../../common/CustomizeTable/icons"
import "./index.scss"
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap"
import { ReactSVG } from "react-svg"

const AWSMButtonOption = ({
  options = [],
  optionClick,
  disabled,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const onItemClick = option => {
    if (optionClick) {
      optionClick(option)
    }
    setDropdownOpen(false)
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        data-toggle="dropdown"
        tag="div"
        aria-expanded={dropdownOpen}
        disabled={disabled}
      >
        <button
          className={`awsm-option-button-label ${disabled ? "disabled" : ""}`}
        >
          <EllipsisIcon />
        </button>
      </DropdownToggle>
      <DropdownMenu right className="awsm-option-button-content">
        {options.map((option, index) => (
          <div
            className="d-flex align-items-center p-2 awsm-option-button-content-item"
            onClick={() => onItemClick(option)}
          >
            {option.icon && <ReactSVG src={option.icon} />}
            <div className="pl-2" key={index}>
              {option.label}
            </div>
          </div>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
export default AWSMButtonOption
