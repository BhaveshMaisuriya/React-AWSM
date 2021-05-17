import React, { useState } from "react"
import { FormControlLabel, Checkbox } from "@material-ui/core"
import "./basic.scss"
import { lastDayOfMonth, eachDayOfInterval, format } from "date-fns"

import "react-day-picker/lib/style.css"
import RangePicker from "./RangePicker"
import MultiPicker from "./MultiPicker"
import SinglePicker from "./SinglePicker"
import $ from 'jquery'; 

const BasicConcepts = ({
  selectedDay,
  setSelectedDay,
  check,
  setCheck,
  dateRange,
  setDateRange,
  setSelectedMulti,
  selectedMulti,
  daynames,
  setDaynames,
  onSelectDayName,
}) => {
  // get calendar month
  const [startDayOfMonth, setStartDayOfMonth] = useState(
    new Date(format(new Date(), "MMM yyyy"))
  )

  const endDayOfMonth = lastDayOfMonth(startDayOfMonth)

  const calendarMonth = eachDayOfInterval({
    start: startDayOfMonth,
    end: endDayOfMonth,
  })

  const handleDayClick = (day, { selected }) => {
    $(".DayPicker-Weekday").removeClass("active_day");
    setDaynames([])
    if (selected) {
      setSelectedDay(undefined)
      return
    }
    let selectedDays = getDayOfWeek(new Date(day));
    console.log("day::", day, selectedDays);
    setSelectedDay(day)
  }

  function getDayOfWeek(date) {
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
    // dates.map((item, index)=>{
      var day_no = date.getDay();
      alldays.push(days[day_no]);
      
      for (var i = 0; i < alltitle.length; i++) {
          console.log("fromday::12", days[day_no], alltitle[i].getAttribute("title"));
          if(alltitle[i].getAttribute("title") === days[day_no]){
            console.log("fromday::2", alltitle[i].getAttribute("title"));
            $(alltitle[i]).addClass("active_day");
          } 
      }
    // })
    return alldays
  }
  

  const handleDayName = event => {
    setCheck({ ...check, [event.target.name]: event.target.checked })
    setSelectedDay(undefined)
    setDaynames([])
    setDateRange({ from: undefined, to: undefined })
    
  }




  // console.log("dateRange::123", dateRange,daynames, check.checkedA)
  return (
    <div
      className="m-3 d-flex flex-column awsm-ultra-calendar"
      style={{ position: "relative" }}
    >
      <div
        className="d-flex "
        style={{
          position: "absolute",
          top: "3rem",
          left: "1rem",
          background: "#fff",
          zIndex: 11,
          fontSize: "1.2rem",
          display: "table-row",
          height: 40,
        }}
      ></div>
      {check.checkedA ? (
        <div>
          <RangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            daynames={daynames}
            setDaynames={setDaynames}
            setStartDayOfMonth={setStartDayOfMonth}
            onSelectDayName={onSelectDayName}
            setSelectedMulti={setSelectedMulti}
            selectedMulti={selectedMulti}
            calendarMonth={calendarMonth}
          />
        </div>
      ) : daynames.length > 0 ? (
        <MultiPicker
          daynames={daynames}
          setDaynames={setDaynames}
          setStartDayOfMonth={setStartDayOfMonth}
          onSelectDayName={onSelectDayName}
          selectedMulti={selectedMulti}
          setSelectedMulti={setSelectedMulti}
          calendarMonth={calendarMonth}
        />
      ) : (
        <div>
          <SinglePicker
            daynames={daynames}
            setDaynames={setDaynames}
            setStartDayOfMonth={setStartDayOfMonth}
            onSelectDayName={onSelectDayName}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            calendarMonth={calendarMonth}
            selectedDay={selectedDay}
            handleDayClick={handleDayClick}
          />
        </div>
      )}
      <div className="footerButton">
        <FormControlLabel
          control={
            <Checkbox
              checked={check.checkedA}
              onChange={handleDayName}
              name="checkedA"
            />
          }
          label="Start and End day"
        />

        <div className="text-right">
          <button
            type="button"
            className={`buttonCancel`}
          >
            Clear
          </button>
          <button
            type="button"
            className={`buttonUpdate`}
          >
            Apply
          </button>
        </div>
      </div>
  </div>
  )
}
export default BasicConcepts
