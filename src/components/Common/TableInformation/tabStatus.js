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

const TabStatus = ({ scheduler, props }) => {
  const [timeTo, setTimeTo] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [closeTimeTo, setCloseTimeTo] = useState("")
  const [closeTimeFrom, setCloseTimeFrom] = useState("")
  const [statusInAWSM, setStatusInAWSM] = useState("")
  const [salesAndInventory, setSalesAndInventory] = useState("")
  const [statusValue, setStatusValue] = useState({'closeTimeFrom': closeTimeFrom, 'timeFrom': timeFrom, 'closeTimeTo': closeTimeTo, 'timeTo': timeTo, });
  const pathName = window.location.pathname;

  function UpdateStatusValue(val, type){
    let newStatusValue = {...statusValue};
    if(type === 'closeTimeFrom'){
      newStatusValue.closeTimeFrom = val;
      setCloseTimeFrom(val);
    } else if(type === 'timeFrom'){
      newStatusValue.timeFrom = val;
      setTimeFrom(val);
    } else if(type === 'closeTimeTo'){
      newStatusValue.closeTimeTo = val;
      setCloseTimeTo(val);
    } else {
      newStatusValue.timeTo = val;
      setTimeTo(val);      
    }
    setStatusValue(newStatusValue);
    props.getStatusValue(newStatusValue);
  }

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
      <div>
        <h6 className="mt-3">CLOSE PERIOD</h6>
        <div className="row">
          <div className="col-3">
            <div className="input-header">CLOSE (FROM) {(statusInAWSM === 'Temporarily Closed') && <span className="required_highlight">*</span>}</div>
            <PopOverCalendar 
              disabled={(statusInAWSM === 'Temporarily Closed') ? scheduler : true} 
              onSelect={value => UpdateStatusValue(value, 'closeTimeFrom')}
            />
          </div>
          <div className="col-3">
            <div className="input-header">TIME {(statusInAWSM === 'Temporarily Closed') && <span className="required_highlight">*</span>}</div>
            <AWSMDropdown
              items={timeData}
              value={timeFrom}
              onChange={value => UpdateStatusValue(value, 'timeFrom')} 
              disabled={(statusInAWSM === 'Temporarily Closed') ? scheduler : true}
              required
            />
          </div>
          <div className="col-3">
            <div className="input-header">CLOSE (TO) {(statusInAWSM === 'Temporarily Closed') && <span className="required_highlight">*</span>}</div>
            <PopOverCalendar 
              disabled={(statusInAWSM === 'Temporarily Closed') ? scheduler : true} 
              onChange={value => UpdateStatusValue(value, 'closeTimeTo')}
            />
          </div>
          <div className="col-3">
            <div className="input-header">TIME {(statusInAWSM === 'Temporarily Closed') && <span className="required_highlight">*</span>}</div>
            <AWSMDropdown
              items={timeData}
              value={timeTo}
              onChange={value => UpdateStatusValue(value, 'timeTo')} 
              disabled={(statusInAWSM === 'Temporarily Closed') ? scheduler : true}
              required
            />
          </div>
        </div>
      </div>
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
