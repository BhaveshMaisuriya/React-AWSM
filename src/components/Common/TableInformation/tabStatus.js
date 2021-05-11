import React, { useState } from "react"
import "./tabStatus.scss"
import AWSMDropdown from "../Dropdown"
import DatePicker from "../../Common/DatePicker"

const STATUS_IN_AWSM = ["Active", "Delete"]
const SALES_AND_INVENTORY = ["Sentinal", "ABC"]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}


const TabStatus = () => {
  const [timeTo, setTimeTo] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [statusInAWSM, setStatusInAWSM] = useState("")
  const [salesAndInventory, setSalesAndInventory] = useState("")

  return (
    <div className="dqm-status-container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="input-header">STATUS IN AWSM</div>
          <AWSMDropdown value={statusInAWSM} items={STATUS_IN_AWSM} onChange={(value) => setStatusInAWSM(value)} />
        </div>
        <div className="col-12 col-sm-6">
          <div className="input-header">SALES AND INVENTORY DATA SOURCE</div>
          <AWSMDropdown value={salesAndInventory} onChange={(value) => setSalesAndInventory(value)}
                        items={SALES_AND_INVENTORY} />
        </div>
      </div>
      <div>
        <h6>CLOSE PERIOD</h6>
        <div className="row">
          <div className="col-3">
            <div className="input-header">CLOSE (FROM)</div>
            <DatePicker />
          </div>
          <div className="col-3">
            <div className="input-header">TIME</div>
            <AWSMDropdown items={timeData} value={timeFrom} onChange={value => setTimeFrom(value)} />
          </div>
          <div className="col-3">
            <div className="input-header">CLOSE (TO)</div>
            <DatePicker />
          </div>
          <div className="col-3">
            <div className="input-header">TIME</div>
            <AWSMDropdown items={timeData} value={timeTo} onChange={value => setTimeTo(value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabStatus