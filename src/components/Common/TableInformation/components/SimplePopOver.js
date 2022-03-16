import React from 'react'
import Popover from '@material-ui/core/Popover'
import { FormControlLabel } from '@material-ui/core'
import './simplePopOver.scss'
import AWSMCheckBox from 'common/CheckBox'

export default function SimplePopover({
  handleChange,
  data,
  children,
  disabled,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    if (disabled) {
      return
    }
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
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
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {data.map((item, index) => {
          return (
            <FormControlLabel
              key={`${item}${index}`}
              control={
                <AWSMCheckBox
                  checked={item.checked}
                  onChange={() => handleChange(item)}
                  name={item.name}
                />
              }
              label={item.name || '-'}
              className={`${
                item.checked
                  ? 'MuiFormControlLabel-checked justify-content-start align-items-center'
                  : 'justify-content-start align-items-center'
              }`}
            />
          )
        })}
      </Popover>
    </div>
  )
}
