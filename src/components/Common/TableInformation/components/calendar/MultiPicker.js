import React from "react"
import DayPicker from "react-day-picker"
import "react-day-picker/lib/style.css"
import "./basic.scss"
import Weekday from "./Weekday"
import Navbar from "./NavBar"

export default function MultiPicker({
  daynames,
  setDaynames,
  setStartDayOfMonth,
  setIsMulti,
  onSelectDayName,
  selectedMulti,
  setSelectedMulti,
  calendarMonth,
  startDayOfMonth,
}) {
  return (
    <div>
      <DayPicker
        selectedDays={selectedMulti}
        month={startDayOfMonth}
        weekdayElement={
          <Weekday
            daynames={daynames}
            setDaynames={setDaynames}
            setIsMulti={setIsMulti}
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
