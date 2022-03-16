import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import './timePicker.scss'
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { ReactSVG } from 'react-svg'
import ArrowDropDownIcon from 'assets/images/AWSM-Dropdown.svg'
/**
 *
 * @param items
 * @param onChange
 * @param disabled
 * @param defaultEmpty
 * @param value
 * @param placeholder
 * @param flip
 * @returns {JSX.Element}
 * @constructor
 */

const AWSMDropdown = ({
  items,
  onChange,
  disabled = false,
  defaultEmpty = true,
  value,
  flip = false,
  //   defaultValue,
  hasNone = false,
  error = null,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [itemSelected, setValue] = useState(
    !value ? 'Select time' : items ? value : ''
  )
  const itemsRef = React.createRef()
  itemsRef.current = []

  const onValueChange = (item, index) => {
    setValue(item)
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
        caret
        data-toggle="dropdown"
        tag="div"
        aria-expanded={dropdownOpen}
        disabled={disabled}
      >
        <div
          className={`awsm-select-toggle p-2 position-relative  ${
            disabled ? 'disabled' : ''
          } ${!disabled && error ? 'border-danger' : ''}`}
        >
          <div>
            {value && value !== 'None'
              ? value.toString().substring(0, 5)
              : disabled
              ? ''
              : 'Select time'}
          </div>
          {!disabled && (
            <ReactSVG src={ArrowDropDownIcon} className="awsm-dropdown-arrow" />
          )}
          {!disabled && error && <div className="time-error">{error}</div>}
        </div>
      </DropdownToggle>
      <DropdownMenu className="awsm-select-menu w-100" flip={flip}>
        {items &&
          (hasNone ? ['None'].concat(items) : items).map((item, index) => (
            <div
              ref={ref => itemsRef.current.push(ref)}
              key={index}
              onClick={() => onValueChange(item, index)}
              // highlight selected item here
              className={`awsm-select-item 
              ${
                (itemSelected === item ||
                  value?.toString().substring(0, 5) === item ||
                  (!value && item === 'None')) &&
                'bg-primary-green text-white'
              }`}
            >
              {item}
            </div>
          ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default AWSMDropdown
