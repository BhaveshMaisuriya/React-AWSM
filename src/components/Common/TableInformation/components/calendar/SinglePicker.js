import React, { useEffect } from "react"
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
  setSelectedDay,
  deliveryData,
  setDeliveryData,
  onChange,
  subKey,
}) => {
  const handleDayClick = (day, { selected }) => {
    setDaynames([])
    if (selected) {
      setSelectedDay(undefined)
      return
    }

    setSelectedDay(day)
    setDeliveryData({
      ...deliveryData,
      [subKey]: {
        ...deliveryData[subKey],
        days: [day],
        date_from: "",
        date_to: "",
        type: "single",
      },
    })
    onChange("delivery", {
      ...deliveryData,
      [subKey]: {
        ...deliveryData[subKey],
        days: [day],
        date_from: "",
        date_to: "",
        type: "single",
      },
    })
  }
  return (
    <div className="SingleExample">
      <DayPicker
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        weekdayElement={
          <Weekday
            daynames={daynames}
            setDaynames={setDaynames}
            onSelectDayName={onSelectDayName}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            calendarMonth={calendarMonth}
            deliveryData={deliveryData}
            setDeliveryData={setDeliveryData}
            onChange={onChange}
            subKey={subKey}
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
