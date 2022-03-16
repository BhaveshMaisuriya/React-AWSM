import React, { useState, useMemo, useEffect } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Popover } from '@material-ui/core'
import DayPicker from 'react-day-picker'
import './datePicker.scss'
import AWSM_Calendar from 'assets/images/AWSM-Calendar.svg'
import { ReactSVG } from 'react-svg'
import moment from 'moment'
import { addMonths, format as dateFnsFormat } from 'date-fns'

const DatePicker = ({
  disabled,
  format = 'Do MMM YYYY',
  value,
  onChange,
  startDate = null,
  endDate = null,
  placeholder = 'Select date',
  defaultValue = null,
}) => {
  const [date, setDate] = useState(value ? new Date(value) : null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [month, setMonth] = useState(date ?? new Date())
  const open = Boolean(anchorEl)
  const id = Date.now().toString()

  useEffect(() => {
    setDate(value ? new Date(value) : null)
  }, [value])

  const handleClick = event => {
    setMonth(date ?? new Date())
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const label = useMemo(() => {
    return date ? moment(date).format(format) : ''
  }, [date])

  const applyDate = () => {
    if (onChange) {
      onChange(date)
    }
    handleClose()
  }

  const onClear = () => {
    setDate(defaultValue ?? null)
    setAnchorEl(null)
    if (onChange) {
      onChange(defaultValue ?? null)
    }
  }

  const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const weekdayElement = ({ weekday }) => {
    return (
      <div className="DayPicker-Weekday">
        <div>{WEEK_DAYS[weekday]}</div>
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
          <label className="px-2">{dateFnsFormat(date, 'MMMM-yyyy')}</label>
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

  const modifiers = useMemo(() => {
    const outRange = { before: startDate, after: endDate }
    return {
      outRange,
    }
  }, [])

  const DATE_FORMAT = 'yyyyMMdd'
  const onDayClick = date => {
    if (
      startDate &&
      dateFnsFormat(date, DATE_FORMAT) < dateFnsFormat(startDate, DATE_FORMAT)
    ) {
      return
    }
    if (
      endDate &&
      dateFnsFormat(date, DATE_FORMAT) > dateFnsFormat(endDate, DATE_FORMAT)
    ) {
      return
    }
    setDate(date)
  }

  return (
    <div className="awsm-date-picker-container">
      <button
        type="button"
        disabled={disabled}
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        className={`d-flex justify-content-between date-picker-button p-2 ${
          disabled ? 'disabled' : ''
        }`}
      >
        <div className="date-picker-label">
          {!label && !disabled ? placeholder : label}
        </div>
        {!disabled && (
          <ReactSVG className="date-picker-icon" src={AWSM_Calendar} />
        )}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className="awsm-date-picker">
          <DayPicker
            selectedDays={date}
            onDayClick={onDayClick}
            captionElement={captionElement}
            weekdayElement={weekdayElement}
            navbarElement={() => null}
            month={month}
            modifiers={modifiers}
          />
        </div>

        <div className="d-flex pr-3 justify-content-end align-items-center mb-2">
          <button
            className="btn btn-outline-primary mr-2 btn-date-range"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            className="btn btn-primary btn-date-range"
            onClick={applyDate}
          >
            Apply
          </button>
        </div>
      </Popover>
    </div>
  )
}

export default DatePicker
