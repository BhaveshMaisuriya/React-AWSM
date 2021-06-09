import { AvForm, AvField } from "availity-reactstrap-validation"
import DateRangePicker from "components/Common/DateRangePicker"
import SimplePopover from "components/Common/TableInformation/components/SimplePopOver"
import React, { useState, useEffect } from "react"
import AWSMDropdown from "../../../../components/Common/Dropdown"
import TimePicker from "../../../../components/Common/TableInformation/components/TimePicker"
import { isScheduler } from "../../../../helpers/auth_helper"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import styles from "./StatusTab.module.css"

const STATUS_IN_AWSM = ["Active", "Delete"]
const ACTUAL_OPEN_TIME = [
  { name: "Monday", checked: false },
  { name: "Tuesday", checked: false },
  { name: "Wednesday", checked: false },
  { name: "Thursday", checked: false },
  { name: "Friday", checked: false },
  { name: "Saturday", checked: false },
  { name: "Sunday", checked: false },
]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30:00`)
}
timeData.push(`23:59:00`)

const TabStatus = props => {
  const [data, setData] = useState(props.data)
  const [openTime1, setOpenTime1] = useState(
    JSON.parse(JSON.stringify(ACTUAL_OPEN_TIME))
  )
  const scheduler = isScheduler()

  useEffect(() => {
    props.onChange(data)
  }, [data])

  useEffect(() => {
    if (
      data &&
      data?.terminal_operating_days_1 &&
      data?.terminal_operating_days_1?.days.length !== 0
    ) {
      for (let item of data?.terminal_operating_days_1?.days) {
        for (let j = 0; j < openTime1.length; j++) {
          if (openTime1[j].name == item) {
            openTime1[j].checked = true
          }
        }
      }
    }
  }, [])

  const onchangeHandler = (field, value) => {
    const fl = field.split(".")
    let newData = { ...data }
    if (fl.length >= 2) {
      switch (fl[0]) {
        case "terminal_operating_days_1":
          newData["terminal_operating_days_1"][fl[1]] = value
          break
        case "no_delivery_interval_1":
          newData["no_delivery_interval_1"][fl[1]] = value
          break
        case "no_delivery_interval_2":
          newData["no_delivery_interval_2"][fl[1]] = value
          break
        default:
          break
      }
    } else {
      newData[field] = value
    }
    setData(newData)
  }

  const onchangeOperationHandler = event => {
    const index = openTime1.findIndex(item => item.name === event.target.name)
    const newDays = [...openTime1]
    newDays[index].checked = event.target.checked
    setOpenTime1(() => newDays)
    setData({
      ...data,
      terminal_operating_days_1: {
        ...data.terminal_operating_days_1,
        days: openTime1.filter(i => i.checked === true).map(i => i.name),
      },
    })
  }

  const actualOpenTime1 = openTime1.filter(item => {
    return item.checked === true
  })

  return (
    <div className="dqm-status-container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <label>STATUS IN AWSM</label>
          <AWSMDropdown
            value={data.status_awsm}
            items={STATUS_IN_AWSM}
            onChange={value => onchangeHandler("status_awsm", value)}
            disabled={scheduler}
            className="form-control"
          />
        </div>
        <div className="col-12 col-sm-6">
          <label>DATE RANGE</label>
          <DateRangePicker
            range={true}
            onChange={value => onchangeHandler("inactive_date_range_1", value)}
            defaultValue={data.inactive_date_range_1}
            disabled={scheduler}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-sm-6">
          <SimplePopover
            handleChange={onchangeOperationHandler}
            data={openTime1}
            disabled={scheduler}
          >
            <AvForm>
              <AvField
                name="days1"
                type="text"
                label="TERMINAL OPERATING DAY"
                value={
                  data.terminal_operating_days_1 &&
                  data.terminal_operating_days_1.days.length !== 0
                    ? actualOpenTime1.map(i => i.name)
                    : "Select day(s)"
                }
                className={`${styles.field} ${
                  scheduler ? styles.disabled : ""
                }`}
                style={{ height: "40px", marginTop: "-4px", cursor: "pointer" }}
              />
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </AvForm>
          </SimplePopover>
        </div>
        <div className="col-12 col-sm-3">
          <label>OPERATION HOURS (FROM)</label>
          <TimePicker
            value={data.terminal_operating_days_1.time_from}
            onChange={value =>
              onchangeHandler("terminal_operating_days_1.time_from", value)
            }
            items={timeData}
            disabled={scheduler}
          />
        </div>
        <div className="col-12 col-sm-3">
          <label>OPERATION HOURS (TO)</label>
          <TimePicker
            value={data.terminal_operating_days_1.time_to}
            onChange={value =>
              onchangeHandler("terminal_operating_days_1.time_to", value)
            }
            items={timeData}
            disabled={scheduler}
          />
        </div>
      </div>
      <div className="mt-4">
        <h6>NO DELIVERY INTERNAL</h6>
        <div className="row mt-3">
          <div className="col-12 col-sm-6">
            <label>DATE 1</label>
            <DateRangePicker
              range={true}
              onChange={value =>
                onchangeHandler("no_delivery_interval_1", value)
              }
              defaultValue={data.no_delivery_interval_1}
              disabled={scheduler}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 1</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_1.time_from", value)
              }
              value={data.no_delivery_interval_1.time_from}
              disabled={scheduler}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 1</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_1.time_to", value)
              }
              value={data.no_delivery_interval_1.time_to}
              disabled={scheduler}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-6">
            <label>DATE 2</label>
            <DateRangePicker
              range={true}
              onChange={value =>
                onchangeHandler("no_delivery_interval_2", value)
              }
              defaultValue={data.no_delivery_interval_2}
              disabled={scheduler}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 2</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_2.time_from", value)
              }
              value={data.no_delivery_interval_2.time_from}
              disabled={scheduler}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 2</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("data.no_delivery_interval_2.time_to", value)
              }
              value={data.no_delivery_interval_2.time_to}
              disabled={scheduler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabStatus
