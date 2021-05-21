import React, { useEffect, useState } from "react"
import "react-day-picker/lib/style.css"
import getArrayDays from "./monthArr"

export default function Weekday({
  weekday,
  className,
  localeUtils,
  locale,
  setDaynames,
  daynames,
  setSelectedMulti,
  calendarMonth,
  deliveryData,
  setDeliveryData,
  onChange,
  subKey,
}) {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)

  useEffect(() => {
    const arrSelected = daynames.map(dayname => {
      const arr = getArrayDays(calendarMonth, dayname)
      return arr
    })
    setSelectedMulti(arrSelected.flat())
  }, [daynames.length])

  const onSelectDayName = async(day) => {
    const newDaynames = [...daynames];
    const index = newDaynames.indexOf(day)
    if (index >= 0) {
      newDaynames.splice(index, 1)
    } else {
      newDaynames.push(day);
    }
    setDaynames(newDaynames)
    setDeliveryData({
      ...deliveryData,
      [subKey]: {
        ...deliveryData[subKey],
        days: newDaynames,
        date_from: "",
        date_to: "",
        type: "every",
      },
    })
    onChange("delivery", {
      ...deliveryData,
      [subKey]: {
        ...deliveryData[subKey],
        days: newDaynames,
        date_from: "",
        date_to: "",
        type: "every",
      },
    })
  }

  return (
    <div
      className={`${className} ${daynames.indexOf(weekdayName) !== -1 ? 'active_day' : ''}`}
      title={weekdayName}
      style={{ cursor: "pointer" }}
      onClick={() => {
        onSelectDayName(weekdayName)
      }}
    >
      <abbr>{weekdayName.slice(0, 2)}</abbr>
    </div>
  )
}