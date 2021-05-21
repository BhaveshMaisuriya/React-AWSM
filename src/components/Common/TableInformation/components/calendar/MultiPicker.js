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
  onSelectDayName,
  selectedMulti,
  setSelectedMulti,
  calendarMonth,
  deliveryData,
  setDeliveryData,
  onChange,
  subKey,
}) {
  return (
    <div className="MultiExample">
      <DayPicker
        selectedDays={selectedMulti}
        month={selectedMulti[0]}
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
