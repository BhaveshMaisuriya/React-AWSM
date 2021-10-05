import React, { useEffect, useMemo, useState } from "react"
import { format, addMonths, addDays, startOfWeek } from "date-fns"
import DayPicker from "react-day-picker"
import "react-day-picker/lib/style.css"
import "./day-picker.scss"
import CheckBox from "@material-ui/core/Checkbox"
import Popover from "@material-ui/core/Popover"
import AWSM_Calendar from "../../../assets/images/AWSM-Calendar.svg"
import { ReactSVG } from "react-svg"
import { isValidDate } from "../../../pages/DQM/Common/helper"

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const DISPLAY_DATE_FORMAT = "do MMM yyyy"
const SAVE_DATE_FORMAT = "yyyy-MM-dd"

const dateObjectTemplate = {
  id: null,
  type: "",
  time_from: null,
  time_to: null,
  days: [],
  date_from: null,
  date_to: null,
}

const DateRangePicker = ({
  defaultValue,
  defaultMonth = new Date(),
  disabled = false,
  onChange = () => {},
  onBlur = ()=>{},
  types = ["single", "range", "every", "daily"],
  startDate = new Date(),
  endDate = null,
  placeholder = "Select date",
  disablePreviousDayBeforeSelect = false,
  error = false,
  validateTime = false
}) => {
  const [value, setValue] = useState(defaultValue || dateObjectTemplate)
  const [month, setMonth] = useState(defaultMonth)

  const getDay = days => {
    if (!days || !days.length > 0) {
      return []
    }
    return days
      .map(day => day.trim())
      .map(day => WEEK_DAYS.findIndex(weekDay => day.startsWith(weekDay)))
      .filter(day => day > -1)
  }

  useEffect(() => {
    setValue(defaultValue || dateObjectTemplate)
  }, [defaultValue])

  const selectedWeekDays = useMemo(() => {
    return getDay(value.days)
  }, [value])

  const isRange = useMemo(() => {
    return value.type === "range"
  }, [value])

  const modifiers = useMemo(() => {
    const outRange = { before: startDate, after: endDate }
    if (value.type === "every") {
      return {
        every: { daysOfWeek: getDay(value.days) },
        outRange: outRange,
      }
    } else if (value.type === "range") {
      if (!value.date_to && !value.date_from) {
        return {
          outRange: outRange,
        }
      }
      const dateTo = value.date_to
        ? new Date(value.date_to)
        : new Date(value.date_from)
      const dateFrom = new Date(value.date_from)
      const range = {
        from: dateFrom,
        to: dateTo,
      }
      return [dateTo, dateFrom, range, outRange]
    } else if (value.type === "daily") {
      return {
        every: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
        outRange: outRange,
      }
    } else if (value.type === "single") {
      return value.date_from
        ? [new Date(value.date_from), null, null, outRange]
        : [null, null, null, outRange]
    } else {
      return { outRange: outRange }
    }
  }, [selectedWeekDays, defaultValue, value, startDate, endDate])

  const labelValue = useMemo(() => {
    if (!value || typeof value !== "object") {
      return ""
    }
    if (value.type === "every") {
      if (value.days.length === 7) {
        return "Every day"
      }
      return value.days && value.days.length > 0 ? `Every ${value.days.join(", ")}` : ""
    } else if (value.type === "range") {
      return `From ${
        value.date_from
          ? format(new Date(value.date_from), DISPLAY_DATE_FORMAT)
          : "Select date"
      } to ${
        !value.date_to
          ? "select another date"
          : format(new Date(value.date_to), DISPLAY_DATE_FORMAT)
      }`
    } else if (value.type === "single") {
      return value.date_from
        ? format(new Date(value.date_from), DISPLAY_DATE_FORMAT)
        : ""
    } else if (value.type === "daily") {
      return "Every day"
    }
  }, [value])

  const onWeekSelectDay = day => {
    if (!types.includes("every")) {
      return
    }
    const newSelectedDays = [...selectedWeekDays]
    const index = newSelectedDays.indexOf(day)
    if (index >= 0) {
      newSelectedDays.splice(index, 1)
    } else {
      newSelectedDays.push(day)
    }
    setValue({
      ...value,
      type: newSelectedDays.length > 0 ? "every" : null,
      days: newSelectedDays.length > 0 ? newSelectedDays
        .sort()
        .map(day => format(addDays(startOfWeek(Date.now()), day), "cccc")) : [],
      date_from: null,
      date_to: null,
    })
  }

  const onDayClick = day => {
    if (
      (!types.includes("range") && !types.includes("single")) ||
      (startDate && format(day, "yyyyMMdd") < format(startDate, "yyyyMMdd")) ||
      (endDate && format(day, "yyyyMMdd") > format(endDate, "yyyyMMdd"))
    ) {
      return
    }
    const newValue = { ...value }
    if (newValue.type === "range") {
      newValue.days = []
      if (newValue.date_to && value.date_from) {
        newValue.date_from = format(day, SAVE_DATE_FORMAT)
        newValue.date_to = null
      } else if (newValue.date_from) {
        newValue.date_to = format(day, SAVE_DATE_FORMAT)
      } else {
        newValue.date_from = format(day, SAVE_DATE_FORMAT)
      }
    } else {
      newValue.type = "single"
      newValue.date_from = format(day, SAVE_DATE_FORMAT)
      newValue.date_to = null
    }
    newValue.days = []
    setValue(newValue)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setValue(defaultValue || dateObjectTemplate)
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "date-range-picker" : undefined

  const weekdayElement = ({ weekday }) => {
    return (
      <div
        onClick={() => onWeekSelectDay(weekday)}
        className={`DayPicker-Weekday ${
          selectedWeekDays.includes(weekday) && value.type === "every"
            ? "select"
            : ""
        }`}
        role="columnheader"
      >
        <div title={WEEK_DAYS[weekday]}>{WEEK_DAYS[weekday]}</div>
      </div>
    )
  }

  const captionElement = ({ date }) => {
    return (
      <div className="DayPicker-caption">
        <div className="d-flex justify-content-between align-items-center pb-4 pt-2">
          <div onClick={() => setMonth(addMonths(month, -1))}>
            <svg
              className="DayPicker-icon prev"
              aria-hidden="true"
              focusable="false"
              data-icon="chevron-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </div>
          <label className="px-2">{format(date, "MMMM-yyyy")}</label>
          <div onClick={() => setMonth(addMonths(month, 1))}>
            <svg
              className="DayPicker-icon"
              aria-hidden="true"
              focusable="false"
              data-icon="chevron-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  const navbarElement = () => {
    return null
  }

  const onClear = () => {
    const newValue = {
      ...defaultValue,
      type: "",
      days: [],
      date_from: null,
      date_to: null,
    }
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
    if(onBlur){
      onBlur()
    }
  }

  const onApply = () => {
    if (onChange) {
      onChange(value)
    }

    if(onBlur && !value.type){
      onBlur()
    }
    setAnchorEl(null)
  }
  
  const dateError = useMemo(() => {
    if (validateTime && value && (value.time_from || value.time_to) &&!isValidDate(value)) {
      return "Please select date"
    }
    return false
  }, [value])
  

  return (
    <div className="awsm-date-range-picker">
      <button
        disabled={disabled}
        type="button"
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        onBlur={onBlur}
        className={`d-flex justify-content-between align-items-center py-2 w-100 calendar-label ${
          (error || dateError) && !disabled && "border-danger"
        } ${disabled ? "disabled" : ""}`}
      >
        <div className="date-picker-label">{!disabled && !labelValue ? placeholder : labelValue}</div>
        {!disabled && (
          <ReactSVG className="date-picker-icon" src={AWSM_Calendar} />
        )}
        {dateError && !disabled && <div className="calendar-error">
          {dateError}
        </div>}
      </button>
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
        className="date-range-popover"
      >
        <div className="awsm-date-range-picker">
          <DayPicker
            modifiers={modifiers}
            month={month}
            weekdayElement={weekdayElement}
            captionElement={captionElement}
            onDayClick={onDayClick}
            navbarElement={navbarElement}
            disabledDays={disablePreviousDayBeforeSelect && [{before: startDate}]}
          />
          <div className="d-flex justify-content-between align-items-center mb-2">
            {types.includes("range") ? (
              <div className="d-flex align-items-center">
                <CheckBox
                  checked={isRange}
                  onChange={() =>
                    setValue({
                      ...value,
                      type: !isRange ? "range" : "single",
                      days: [],
                      date_from: null,
                      date_to: null,
                    })
                  }
                />
                <label>Start and End date</label>
              </div>
            ) : (
              <div />
            )}
            <div className="d-flex pr-3">
              <button
                className="btn btn-outline-primary mr-2 btn-date-range"
                onClick={onClear}
              >
                Clear
              </button>
              <button
                className="btn btn-primary btn-date-range"
                onClick={onApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  )
}
export default DateRangePicker
