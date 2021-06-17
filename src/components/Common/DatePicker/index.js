import React, { useState, useMemo } from "react"
import { Calendar } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { Popover } from "@material-ui/core"
import "./datePicker.scss"
import CALENDAR_ICON from "../../../assets/images/calendar-alt-regular.svg"
import { ReactSVG } from "react-svg"
import moment from "moment"
import { Button } from "reactstrap"

const DatePicker = ({
  disabled,
  format = "Do MMM YYYY",
  value,
  onChange,
  showButtons,
  isTypeFor,
}) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date())
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dateButton, setDateButton] = useState(value ? new Date(value) : new Date())
  const open = Boolean(anchorEl)
  const id = Date.now().toString()

  const minDate = isTypeFor === "sales" ? new Date(moment().subtract(30, 'days')) : '';
  const maxDate = isTypeFor === "sales" ? new Date() : '';

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const label = useMemo(() => {
    return moment(date).format(format)
  }, [date])

  const onDateChange = date => {
    setDate(date)
    if (onChange) {
      onChange(date)
    }
    isTypeFor !== "sales" && handleClose()
  }

  const onDateChangeButton = (date) => {
    setDate(date);
  }

  const applyDate = () => {
    if (onChange) {
      onChange(date)
    }
    setDateButton(date);
    handleClose()
  }

  const handleCancel = () => {
    setDate(dateButton)
    handleClose();
  }

  return (
    <div className="awsm-date-picker-container">
      <button
        type="button"
        disabled={disabled}
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        className={`date-picker-button ${disabled ? "disabled" : ""}`}
      >
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
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="awsm-date-picker">
         {isTypeFor === "sales" ?
          <Calendar
            showMonthAndYearPickers={false}
            date={date}
            onChange={onDateChangeButton}
            weekdayDisplayFormat="EEEEEE"
            minDate={minDate}
            maxDate={maxDate}
          /> : 
          <Calendar
            showMonthAndYearPickers={false}
            date={date}
            onChange={onDateChange}
            weekdayDisplayFormat="EEEEEE"
          />
        }
        </div>
        {showButtons && (
          <div className="apply_buttons">            
            <Button color={"danger"} onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button color={"primary"} onClick={() => applyDate()}>
              Apply
            </Button>
          </div>
        )}
      </Popover>
    </div>
  )
}

export default DatePicker
