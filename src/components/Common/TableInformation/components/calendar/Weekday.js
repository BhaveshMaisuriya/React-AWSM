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
}) {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)

  useEffect(() => {
    const arrSelected = daynames.map(dayname => {
      const arr = getArrayDays(calendarMonth, dayname)
      return arr
    })

    setSelectedMulti(arrSelected.flat())
  }, [daynames.length])

  const onSelectDayName = day => {
    const newDaynames = [...daynames]
    const index = newDaynames.indexOf(day)
    if (index >= 0) {
      newDaynames.splice(index, 1)
    } else {
      newDaynames.push(day)
    }
    setDaynames(newDaynames)
  }

  return (
    <div
      className={className}
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
