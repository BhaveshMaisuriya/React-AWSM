import React, { useEffect, useState } from "react"
import "react-day-picker/lib/style.css"
import getArrayDays from "./monthArr"
import jQuery from 'jquery'; 

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
      getDayOfWeek(dayname, 'add');
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
      await getDayOfWeek(day, 'remove');
    } else {
      newDaynames.push(day);
      await getDayOfWeek(day, 'add');
    }
    setDaynames(newDaynames)
  }

  const getDayOfWeek = async(selectedday, val) => {
    var alltitle = document.getElementsByClassName("DayPicker-Weekday");
    for (var i = 0; i < alltitle.length; i++) {
      if(alltitle[i].getAttribute("title").toLowerCase() === selectedday.toLowerCase()){
        val === 'add' ? await jQuery(alltitle[i]).addClass("active_day") : await jQuery(alltitle[i]).removeClass("active_day");
      }
    }
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
