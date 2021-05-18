import React, { useEffect, useState } from "react"
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
  applySelectedDate
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

  useEffect(()=>{
    function fetchData(){
      getDayOfWeek(new Date(selectedDay));
    };
    fetchData();
  }, [])

  const handleDayClick = (day, { selected }) => {
    $(".DayPicker-Weekday").removeClass("active_day");
    setDaynames([])
    if (selected) {
      setSelectedDay(undefined)
      return
    }
    getDayOfWeek(new Date(day));
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
      var day_no = date.getDay();
      alldays.push(days[day_no]);
      
      for (var i = 0; i < alltitle.length; i++) {
          if(alltitle[i].getAttribute("title") === days[day_no]){
            $(alltitle[i]).addClass("active_day");
          } 
      }
    return alldays
  }

  function clearSelectedDate (){
    $(".DayPicker-Weekday").removeClass("active_day");
    setDateRange({ from: undefined, to: undefined })
    setSelectedDay(undefined);
  }

  // function applySelectedDate(){
  //   applySelectedDate
  // }
  

  const handleDayName = event => {
    setCheck({ ...check, [event.target.name]: event.target.checked })
    setSelectedDay(undefined)
    setDaynames([])
    setDateRange({ from: undefined, to: undefined })
  }

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
            onClick={clearSelectedDate}
          >
            Clear
          </button>
          <button
            type="button"
            className={`buttonUpdate`}
            onClick={applySelectedDate}
          >
            Apply
          </button>
        </div>
      </div>
  </div>
  )
}
export default BasicConcepts
