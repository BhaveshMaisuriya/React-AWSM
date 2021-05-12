import React from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import "./basic.scss"
import Weekday from "./Weekday"
import Navbar from "./NavBar"

export default function RangePicker({
  dateRange,
  setDateRange,
  daynames,
  setDaynames,
  setStartDayOfMonth,
  onSelectDayName,
  selectedMulti,
  setSelectedMulti,
  calendarMonth,
  selected,
  setSelected,
}) {
  function handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, dateRange)
    setDateRange(range)
  }
  const { from, to } = dateRange
  const modifiers = { start: from, end: to }

  return (
    <div className="RangeExample">
      <DayPicker
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        onDayClick={handleDayClick}
        weekdayElement={
          <Weekday
            daynames={daynames}
            setDaynames={setDaynames}
            onSelectDayName={onSelectDayName}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            calendarMonth={calendarMonth}
          />
        }
        navbarElement={<Navbar setStartDayOfMonth={setStartDayOfMonth} />}
        fromMonth={new Date()}
        disabledDays={[
          {
            before: new Date(),
          },
        ]}
      />
    </div>
  )
}
