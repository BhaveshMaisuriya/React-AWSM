import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Popover, Input } from "@material-ui/core"
import BasicConcepts from "./calendar/BasicConcepts"
import DateRangeIcon from "@material-ui/icons/DateRange"
import { format } from "date-fns"

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  flex: {
    display: "flex",
    justifyContent: "space between",
    border: "1px solid #d8d8d8",
    borderRadius: 4,
    padding: "0 5px",
    alignItems: "center",
    height: "40px",
  },
}))

export default function PopOverCalendar() {
  const [check, setCheck] = useState({
    checkedA: false,
  })
  const [isMulti, setIsMulti] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  })

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedDay, setSelectedDay] = useState(undefined)
  const [selectedRange, setSelectedRange] = useState([])
  const [selectedMulti, setSelectedMulti] = useState([])
  const [daynames, setDaynames] = useState([])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  let multiCheck
  if (daynames.length === 1) {
    multiCheck = `Repeat every ${daynames[0]}`
  }
  if (daynames.length === 2) {
    multiCheck = `Repeat every ${daynames[0]} and ${daynames[1]}`
  }
  if (daynames.length > 2 && daynames.length < 7) {
    multiCheck = `Repeat every ${daynames.map(i => i)}`
  }
  if (daynames.length === 7) {
    multiCheck = "Repeat everyday"
  }

  const dateRangeCheck =
    !dateRange.to && check.checkedA && dateRange.from
      ? `From ${format(dateRange.from, "do MMM yyyy")} to select another date`
      : dateRange.from && dateRange.to && check.checkedA
      ? `From ${format(dateRange.from, "do MMM yyyy")} to ${format(
          dateRange.to,
          "do MMM yyyy"
        )}`
      : selectedDay
      ? typeof selectedDay === "string"
        ? selectedDay
        : format(selectedDay, "do MMM yyyy")
      : ""

  return (
    <div>
      <div aria-describedby={id} onClick={handleClick} className="full-width">
        <div className={classes.flex}>
          <Input
            placeholder="Select day or date"
            fullWidth
            disableUnderline
            disabled
            value={multiCheck || dateRangeCheck}
          ></Input>
          <DateRangeIcon color="disabled" />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="mt-1 full-width"
      >
        <BasicConcepts
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          check={check}
          setCheck={setCheck}
          isMulti={isMulti}
          setIsMulti={setIsMulti}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          selectedMulti={selectedMulti}
          setSelectedMulti={setSelectedMulti}
          daynames={daynames}
          setDaynames={setDaynames}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </Popover>
    </div>
  )
}
