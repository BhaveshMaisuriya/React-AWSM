import React from "react"
import Popover from "@material-ui/core/Popover"
import { FormControlLabel, Checkbox } from "@material-ui/core"
import "./simplePopOver.scss"

export default function SimplePopover({ handleChange, data, children }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  return (
    <div>
      <div aria-describedby={id} onClick={handleClick}>
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorReference={anchorEl}
      >
        {data.map(item => {
          return (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={handleChange}
                  name={item.name}
                />
              }
              label={item.name}
              className={`${item.checked ? "MuiFormControlLabel-checked" : ""}`}
            />
          )
        })}
      </Popover>
    </div>
  )
}
