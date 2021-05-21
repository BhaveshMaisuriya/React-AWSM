import React, { useState, useMemo } from "react"
import { Calendar } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { Popover } from "@material-ui/core"
import "./datePicker.scss"
import CALENDAR_ICON from "../../../assets/images/calendar-alt-regular.svg"
import { ReactSVG } from "react-svg"
import moment from "moment"

const DatePicker = ({ disabled, format = "Do MMM YYYY", value, onChange }) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date())
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const id = Date.now().toString()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const label = useMemo(() => {
    return moment(date).format(format)
  }, [date])

  const onDateChange = (date) => {
    setDate(date)
    if (onChange) {
      onChange(date)
    }
    handleClose()
  }


  return (
    <div className="awsm-date-picker-container">
      <button type="button" disabled={disabled} aria-describedby={id} color="primary" onClick={handleClick}
              className="date-picker-button">
        <div className="pl-2">{label}</div>
        <ReactSVG className="date-picker-icon" src={CALENDAR_ICON} />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <div className="awsm-date-picker">
          <Calendar
            showMonthAndYearPickers={false}
            date={date}
            onChange={onDateChange}
            weekdayDisplayFormat="EEEEEE"
          />
        </div>
      </Popover>
    </div>
  )
}

export default DatePicker
