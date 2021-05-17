import React, { useEffect, useState } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import "./basic.scss"
import Weekday from "./Weekday"
import Navbar from "./NavBar"
import $ from 'jquery'; 


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
  
  useEffect(()=>{
    function fetchData(){
      var selectedDates = getDatesBetweenDates(dateRange.from, dateRange.to);
      getDayOfWeek(selectedDates);
    };
    fetchData();
  }, [])

  function handleDayClick(day) {
    $(".DayPicker-Weekday").removeClass("active_day");
    const range = DateUtils.addDayToRange(day, dateRange);
    var selectedDates = getDatesBetweenDates(range.from, range.to);
    getDayOfWeek(selectedDates);
    setDateRange(range);
  }

  const getDatesBetweenDates = (startDate, endDate) => {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
      }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  function getDayOfWeek(dates) {
    let alldays = [];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var alltitle = document.getElementsByClassName("DayPicker-Weekday");
    dates.map((item, index)=>{
      var day_no = item.getDay();
      alldays.push(days[day_no]);
      for (var i = 0; i < alltitle.length; i++) {
          if(alltitle[i].getAttribute("title") === days[day_no]){
            $(alltitle[i]).addClass("active_day");
          } 
      }
    })
    return alldays
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
