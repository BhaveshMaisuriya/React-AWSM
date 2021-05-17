import React, { useState } from "react"
import "./tabStatus.scss"
import AWSMDropdown from "../Dropdown"
import DatePicker from "../../Common/DatePicker"
import PopOverCalendar from "./components/PopOverCalendar"

const STATUS_IN_AWSM = ["Active", "Temporarily Closed", "Inactive"]
const SALES_AND_INVENTORY = ["Sentinal", "ABC"]
const SALES_CATEGORY = ["Yes", "No"]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`);

const TabStatus = ({ scheduler }) => {
  const [timeTo, setTimeTo] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [statusInAWSM, setStatusInAWSM] = useState("")
  const [salesAndInventory, setSalesAndInventory] = useState("")
  const [salesCategory, setSalesCategory] = useState("")
  const pathName = window.location.pathname

  return (
    <div className="dqm-status-container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="input-header">STATUS IN AWSM</div>
          <AWSMDropdown
            value={statusInAWSM}
            items={STATUS_IN_AWSM}
            selected='Active'
            onChange={value => setStatusInAWSM(value)}
            disabled={scheduler}
          />
        </div>
        {pathName === "/commercial-customer" && (
        <div className="col-12 col-sm-6">
          <div className="input-header">SALES AND INVENTORY DATA SOURCE</div>
          <AWSMDropdown
            value={salesAndInventory}
            onChange={value => setSalesAndInventory(value)}
            items={SALES_AND_INVENTORY}
            disabled={scheduler}
          />
          <button className='add'>+Add</button>
        </div>
        )}
        {pathName === "/retail-customer" ? (
          <div className="col-12 col-sm-6">
            <div className="input-header">SALES AND INVENTORY DATA SOURCE</div>
            <AWSMDropdown
              value={salesAndInventory}
              onChange={value => setSalesAndInventory(value)}
              items={SALES_AND_INVENTORY}
              disabled={scheduler}
            />
          </div>
        ) : (
          <div className="col-6"></div>
        )}
      </div>


      {(statusInAWSM !== 'Inactive') &&
            <div>
              <h6 className="mt-3">CLOSE PERIOD</h6>
              <div className="row">
                <div className="col-3">
                  <div className="input-header">CLOSE (FROM)</div>
                  {/* <DatePicker disabled={scheduler} required /> */}
                  <PopOverCalendar disabled={scheduler} />
                </div>
                <div className="col-3">
                  <div className="input-header">TIME</div>
                  <AWSMDropdown
                    items={timeData}
                    value={timeFrom}
                    onChange={value => setTimeFrom(value)}
                    disabled={scheduler}
                    required
                  />
                </div>
                <div className="col-3">
                  <div className="input-header">CLOSE (TO)</div>
                  {/* <DatePicker disabled={scheduler} required /> */}
                  <PopOverCalendar disabled={scheduler} />
                </div>
                <div className="col-3">
                  <div className="input-header">TIME</div>
                  <AWSMDropdown
                    items={timeData}
                    value={timeTo}
                    onChange={value => setTimeTo(value)}
                    disabled={scheduler}
                    required
                  />
                </div>
              </div>
            </div>
      }


      {pathName === "/commercial-customer" && (
        <div className="row">
          {/* <div className="col-12 col-sm-6">
            <div className="input-header">SALES CATEGORY</div>
            <AWSMDropdown
              value={salesCategory}
              items={SALES_CATEGORY}
              onChange={value => setSalesCategory(value)}
              disabled={scheduler}
            />
          </div> */}
        </div>
      )}
    </div>
  )
}

export default TabStatus
