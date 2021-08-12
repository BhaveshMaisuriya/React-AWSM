import React, { useState } from "react"
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap"
import "./dropdown.scss"
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { ReactSVG } from "react-svg"
import ArrowDropDownIcon from "../../../assets/images/AWSM-Dropdown.svg"

/**
 * Dropdown menu
 * @param items
 * @param defaultValue
 * @param onChange
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
const DropDownValue = ({
  items,
  value,
  onChange,
  optionValue,
  disabled = false,
  RowComponent = null,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  /**
   * Close dropdown then call to onChange event
   * @param item
   */
  const onValueChange = item => {
    setDropdownOpen(false)
    if (onChange) {
      onChange(item)
    }
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={age}
      onChange={handleChange}
      label="Age"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
  )
}

export default DropDownValue
