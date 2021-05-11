import React, { useState } from "react"
import { FormControlLabel, Checkbox } from "@material-ui/core"
import "./basic.scss"
import { lastDayOfMonth, eachDayOfInterval, format } from "date-fns"

import "react-day-picker/lib/style.css"
import RangePicker from "./RangePicker"
import MultiPicker from "./MultiPicker"
import SinglePicker from "./SinglePicker"

const BasicConcepts = ({
  selectedDay,
  setSelectedDay,
  check,
  setCheck,
  setIsMulti,
  dateRange,
  setDateRange,
  setSelectedMulti,
  selectedMulti,
  daynames,
  setDaynames,
  onSelectDayName,
}) => {
  // get calendar month
  const [startDayOfMonth, setStartDayOfMonth] = useState(
    new Date(format(new Date(), "MMM yyyy"))
  )

  const endDayOfMonth = lastDayOfMonth(startDayOfMonth)

  const calendarMonth = eachDayOfInterval({
    start: startDayOfMonth,
    end: endDayOfMonth,
  })
  const handleDayClick = (day, { selected }) => {
    setDaynames([])
    if (selected) {
      setSelectedDay(undefined)
      return
    }
    setSelectedDay(day)
  }
  const handleDayName = event => {
    setCheck({ ...check, [event.target.name]: event.target.checked })
    setSelectedDay(undefined)
    setDaynames([])
    setDateRange({ from: undefined, to: undefined })
  }

  return (
    <div
      className="m-3 d-flex flex-column awsm-ultra-calendar"
      style={{ position: "relative" }}
    >
      <div
        className="d-flex "
        style={{
          position: "absolute",
          top: "3rem",
          left: "1rem",
          background: "#fff",
          zIndex: 11,
          fontSize: "1.2rem",
          display: "table-row",
        }}
      ></div>
      {check.checkedA ? (
        <div>
          <RangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            daynames={daynames}
            setDaynames={setDaynames}
            setStartDayOfMonth={setStartDayOfMonth}
            setIsMulti={setIsMulti}
            onSelectDayName={onSelectDayName}
            setSelectedMulti={setSelectedMulti}
            selectedMulti={selectedMulti}
            calendarMonth={calendarMonth}
          />
        </div>
      ) : daynames.length > 0 ? (
        <MultiPicker
          daynames={daynames}
          setDaynames={setDaynames}
          setStartDayOfMonth={setStartDayOfMonth}
          setIsMulti={setIsMulti}
          onSelectDayName={onSelectDayName}
          selectedMulti={selectedMulti}
          setSelectedMulti={setSelectedMulti}
          calendarMonth={calendarMonth}
          startDayOfMonth={startDayOfMonth}
        />
      ) : (
        <div>
          <SinglePicker
            daynames={daynames}
            setDaynames={setDaynames}
            setStartDayOfMonth={setStartDayOfMonth}
            setIsMulti={setIsMulti}
            onSelectDayName={onSelectDayName}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            calendarMonth={calendarMonth}
            selectedDay={selectedDay}
            handleDayClick={handleDayClick}
          />
        </div>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={check.checkedA}
            onChange={handleDayName}
            name="checkedA"
          />
        }
        label="Start and End day"
      />
    </div>
  )
}
export default BasicConcepts
