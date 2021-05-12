import React from "react"
import DayPicker from "react-day-picker"
import "./basic.scss"

import "react-day-picker/lib/style.css"
import Weekday from "./Weekday"
import Navbar from "./NavBar"

const SinglePicker = ({
  daynames,
  setDaynames,
  setStartDayOfMonth,
  onSelectDayName,
  selectedMulti,
  setSelectedMulti,
  calendarMonth,
  selectedDay,
  handleDayClick,
  selected,
  setSelected,
}) => {
  return (
    <div className="SingleExample">
      <DayPicker
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        className="hello"
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
        disabledDays={[
          {
            before: new Date(),
          },
        ]}
      />
    </div>
  )
}
export default SinglePicker
