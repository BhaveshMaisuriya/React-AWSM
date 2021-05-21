import React, { useState } from "react"
import AWSMDropdown from "../../../../components/Common/Dropdown"
import PopOverCalendar from "../../../../components/Common/TableInformation/components/PopOverCalendar"
import TimePicker from "../../../../components/Common/TableInformation/components/TimePicker"
import { isScheduler } from "../../../../helpers/auth_helper"

const STATUS_IN_AWSM = ["Active", "Delete"]
const OPERATING_DAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}

const TabStatus = () => {
  const [statusInAWSM, setStatusInAWSM] = useState("")
  const [terminalOperatingDay, setTerminalOperatingDay] = useState("")
  const scheduler = isScheduler()

  return (
    <div className="dqm-status-container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <label>STATUS IN AWSM</label>
          <AWSMDropdown
            value={statusInAWSM}
            items={STATUS_IN_AWSM}
            onChange={value => setStatusInAWSM(value)}
            disabled={scheduler}
            className="form-control"
          />
        </div>
        <div className="col-12 col-sm-6">
          <label>DATE RANGE</label>
          <PopOverCalendar range={true} disabled={scheduler} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-sm-6">
          <label>TERMINAL OPERATING DAY</label>
          <AWSMDropdown
            value={terminalOperatingDay}
            items={OPERATING_DAY}
            onChange={value => setTerminalOperatingDay(value)}
            disabled={scheduler}
            className="form-control"
          />
        </div>
        <div className="col-12 col-sm-3">
          <label>OPERATION HOURS (FROM)</label>
          <TimePicker items={timeData} disabled={scheduler} />
        </div>
        <div className="col-12 col-sm-3">
          <label>OPERATION HOURS (TO)</label>
          <TimePicker items={timeData} disabled={scheduler} />
        </div>
      </div>
      <div className="mt-4">
        <h6>NO DELIVERY INTERNAL</h6>
        <div className="row mt-3">
          <div className="col-12 col-sm-6">
            <label>DATE 1</label>
            <PopOverCalendar disabled={scheduler} />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 1</label>
            <TimePicker items={timeData} disabled={scheduler} />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 1</label>
            <TimePicker items={timeData} disabled={scheduler} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-6">
            <label>DATE 2</label>
            <PopOverCalendar disabled={scheduler} />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (FROM) 2</label>
            <TimePicker items={timeData} disabled={scheduler} />
          </div>
          <div className="col-12 col-sm-3">
            <label>TIME (TO) 2</label>
            <TimePicker items={timeData} disabled={scheduler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabStatus
