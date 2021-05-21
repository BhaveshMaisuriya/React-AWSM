import React, { useEffect, useState } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import "./basic.scss"
import Weekday from "./Weekday"
import Navbar from "./NavBar"
import { rangeRight } from "lodash"

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
  deliveryData,
  setDeliveryData,
  onChange,
  subKey,
}) {
  function handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, dateRange)
    setDateRange(range)
    setDeliveryData({
      ...deliveryData,
      [subKey]: {
        ...deliveryData[subKey],
        days: [],
        date_from: range.from,
        date_to: range.to,
        type: "range",
      },
    })
    onChange("delivery", {
      ...deliveryData,
      [subKey]: {
        ...deliveryData[subKey],
        date_from: range.from,
        date_to: range.to,
        days: [],
        type: "range",
      },
    })
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
