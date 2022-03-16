import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import './dropdown.scss'
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { ReactSVG } from 'react-svg'
import ArrowDropDownIcon from 'assets/images/AWSM-Dropdown.svg'

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
  error = false,
  onChange,
  disabled = false,
  RowComponent = null,
  flip = false,
  placeholder = 'Select',
  hasNone = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const itemsRef = React.createRef()
  itemsRef.current = []
  /**
   * Close dropdown then call to onChange event
   * @param item
   * @param index
   */
  const onValueChange = (item, index) => {
    setDropdownOpen(false)
    if (onChange) {
      onChange(hasNone && index === 0 ? null : item)
    }
  }
  // here using ref to scroll the selected item into view
  useEffect(() => {
    if (dropdownOpen && itemsRef.current && itemsRef.current.length > 0) {
      const indexSelectedRef = itemsRef.current.findIndex(ref =>
        ref?.classList.contains('bg-primary-green')
      )
      const element = itemsRef.current?.[indexSelectedRef]
      if (indexSelectedRef !== -1 && element) {
        element.parentNode.scrollTop =
          element.offsetTop - element.parentNode.offsetTop
      }
    }
  }, [dropdownOpen])

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        data-toggle="dropdown"
        tag="div"
        aria-expanded={dropdownOpen}
        disabled={disabled}
      >
        <div
          className={`d-flex align-items-center awsm-select-toggle ${
            error === true ? 'border-danger' : ''
          } p-2 position-relative ${disabled ? 'disabled' : ''}`}
        >
          <div>{!value || value === 'None' ? placeholder : value}</div>
          {!disabled && (
            <ReactSVG src={ArrowDropDownIcon} className="awsm-dropdown-arrow" />
          )}
        </div>
      </DropdownToggle>

      <DropdownMenu className="awsm-select-menu w-100" flip={flip}>
        {items &&
          (hasNone ? ['None'].concat(items) : items).map((item, index) =>
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
                onClick={() => onValueChange(item, index)}
                // highlight selected item here
                className={`awsm-select-item ${
                  (item === value || (!value && item === 'None')) &&
                  'bg-primary-green text-white'
                }`}
                ref={ref => itemsRef.current.push(ref)}
              >
                {item || '-'}
              </div>
            )
          )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default AWSMDropdown
