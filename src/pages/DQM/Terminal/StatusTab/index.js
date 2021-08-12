import { AvForm, AvField } from "availity-reactstrap-validation"
import DateRangePicker from "components/Common/DateRangePicker"
import SimplePopover from "components/Common/TableInformation/components/SimplePopOver"
import React, { useState, useEffect } from "react"
import AWSMDropdown from "../../../../components/Common/Dropdown"
import TimePicker from "../../../../components/Common/TableInformation/components/TimePicker"
import { isScheduler } from "../../../../helpers/auth_helper"
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { ReactSVG } from "react-svg"
import ArrowDropDownIcon from "../../../../assets/images/AWSM-Dropdown.svg"
import styles from "./StatusTab.module.css"

const STATUS_IN_AWSM = ["Active", "Temporary Inactive", "Permanently Inactive"]
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
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`)

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
      if(!newData[fl[0]]){
        newData[fl[0]] = {}
      }
      newData[fl[0]][fl[1]] = value
    } else {
      newData[field] = value
    }
    setData(newData)
  }

  const onchangeOperationHandler = event => {
    const index = openTime1.findIndex(e => e.name === event.name)
    if (index < 0) {
      return
    }
    const newDays = [...openTime1]
    newDays[index].checked = !newDays[index].checked
    setOpenTime1(() => newDays)
    setData({
      ...data,
      terminal_operating_days_1: {
        ...data.terminal_operating_days_1,
        days: openTime1
          .filter(i => i.checked)
          .map(i => i.name)
          .join(","),
      },
    })
  }

  const actualOpenTime1 = openTime1.filter(item => {
    return item.checked === true
  })
  function renderDateRangeError(){
    if(data?.status_awsm ==="Temporary Inactive"){
      if(data?.inactive_date_range_1?.type==="range"){
        return null
      }
      return <p style={{color: 'red'}}>Please fill in Temporary Inactive Date range</p>
    }
  }
  return (
    <div className="dqm-status-container">
      <div className="form-row">
        <div className="col-12 col-sm-6">
          <label>STATUS IN AWSM</label>
          <AWSMDropdown
            value={data?.status_awsm || "Select"}
            items={STATUS_IN_AWSM}
            onChange={value => onchangeHandler("status_awsm", value)}
            disabled={scheduler}
            className="form-control"
            placeholder="Select status"
          />
        </div>
        <div className="col-12 col-sm-6">
          <label>INACTIVE DATE RANGE</label>
          <DateRangePicker
            range={true}
            onChange={value => onchangeHandler("inactive_date_range_1", value)}
            defaultValue={data?.inactive_date_range_1}
            disabled={scheduler}
            placeholder={"Select date"}
          />
          {renderDateRangeError()}
        </div>
      </div>
      <div className="form-row mt-3">
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
                  data?.terminal_operating_days_1 &&
                  data?.terminal_operating_days_1.days.length !== 0
                    ? actualOpenTime1.map(i => i.name)
                    : "Select day(s)"
                }
                className={`${styles.field} ${
                  scheduler ? styles.disabled : ""
                }`}
                style={{ height: "40px", cursor: "pointer" }}
              />
              <div className={styles.arrow}>
                <ReactSVG src={ArrowDropDownIcon} />
              </div>
            </AvForm>
          </SimplePopover>
        </div>
        <div className="col-12 col-sm-3 terminal-input">
          <label>OPERATION HOURS (FROM)</label>
          <TimePicker
            value={data?.terminal_operating_days_1?.time_from}
            onChange={value =>
              onchangeHandler("terminal_operating_days_1.time_from", value)
            }
            items={timeData}
            disabled={scheduler}
            placeholder="Select time"
          />
        </div>
        <div className="col-12 col-sm-3 terminal-input">
          <label>OPERATION HOURS (TO)</label>
          <TimePicker
            value={data?.terminal_operating_days_1?.time_to}
            onChange={value =>
              onchangeHandler("terminal_operating_days_1.time_to", value)
            }
            items={timeData}
            disabled={scheduler}
            placeholder="Select time"

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
              defaultValue={data?.no_delivery_interval_1}
              disabled={scheduler}
              placeholder={"Select Date"}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 1</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_1.time_from", value)
              }
              value={data?.no_delivery_interval_1?.time_from}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 1</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_1.time_to", value)
              }
              value={data?.no_delivery_interval_1?.time_to}
              disabled={scheduler}
              placeholder="Select time"

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
              defaultValue={data?.no_delivery_interval_2}
              disabled={scheduler}
              placeholder={"Select Date"}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 2</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_2.time_from", value)
              }
              value={data?.no_delivery_interval_2?.time_from}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 2</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_2.time_to", value)
              }
              value={data?.no_delivery_interval_2?.time_to}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-6">
            <label>DATE 3</label>
            <DateRangePicker
              range={true}
              onChange={value =>
                onchangeHandler("no_delivery_interval_3", value)
              }
              defaultValue={data?.no_delivery_interval_3}
              disabled={scheduler}
              placeholder={"Select Date"}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 3</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_3.time_from", value)
              }
              value={data?.no_delivery_interval_3?.time_from}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 3</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_3.time_to", value)
              }
              value={data?.no_delivery_interval_3?.time_to}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-6">
            <label>DATE 4</label>
            <DateRangePicker
              range={true}
              onChange={value =>
                onchangeHandler("no_delivery_interval_4", value)
              }
              defaultValue={data?.no_delivery_interval_4}
              disabled={scheduler}
              placeholder={"Select Date"}
            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 4</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_4.time_from", value)
              }
              value={data?.no_delivery_interval_4?.time_from}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 4</label>
            <TimePicker
              items={timeData}
              onChange={value =>
                onchangeHandler("no_delivery_interval_4.time_to", value)
              }
              value={data?.no_delivery_interval_4?.time_to}
              disabled={scheduler}
              placeholder="Select time"

            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabStatus
