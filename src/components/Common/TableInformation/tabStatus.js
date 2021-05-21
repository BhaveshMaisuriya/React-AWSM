import React, { useState } from "react"
import "./tabStatus.scss"
import AWSMDropdown from "../Dropdown"
import DatePicker from "../../Common/DatePicker"
import { format } from "date-fns"

const STATUS_IN_AWSM = ["Active", "Temporarily Closed", "Inactive"]
const SALES_AND_INVENTORY = ["Sentinal", "ABC"]
const SALES_CATEGORY = ["Yes", "No"]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`);

const TabStatus = ({ scheduler, data, onChange }) => {
  const pathName = window.location.pathname
  const [statusData, setStatusData] = useState(data.status);

  const onFieldChange = (key, subKey, value) => {
    const newStatusData = {...statusData}
    if (subKey) {
      newStatusData[key][subKey] = value
    } else {
      newStatusData[key] = value;
    }
    setStatusData(newStatusData);
    if (onChange) {
      onChange("status", newStatusData)
    }
  }

  return (
    <div className="dqm-status-container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="input-header">STATUS IN AWSM</div>
          <AWSMDropdown
            items={STATUS_IN_AWSM}
            onChange={value => onFieldChange("status_awsm", null, value)}
            value="Active"
            disabled={scheduler}
          />
        </div>
        {pathName === "/commercial-customer" && (
          <div className="col-12 col-sm-6">
            <div className="input-header">SALES AND INVENTORY DATA SOURCE</div>
            <AWSMDropdown
              value={statusData.sales_inventory_data_source}
              onChange={value => onFieldChange("sales_inventory_data_source", null, value)}
              items={SALES_AND_INVENTORY}
              disabled={scheduler}
            />
            <button className="add">+Add</button>
          </div>
        )}
        {pathName === "/retail-customer" ? (
          <div className="col-12 col-sm-6">
            <div className="input-header">SALES AND INVENTORY DATA SOURCE</div>
            <AWSMDropdown
              value={statusData.sales_inventory_data_source}
              onChange={value =>
                onFieldChange("sales_inventory_data_source", null, value)
              }
              items={SALES_AND_INVENTORY}
              disabled={scheduler}
            />
          </div>
        ) : (
          <div className="col-6" />
        )}
      </div>
      <div>
        <h6 className="mt-3">CLOSE PERIOD</h6>
        <div className="row">
          <div className="col-3">
            <div className="input-header">CLOSE (FROM)</div>
            <DatePicker
              disabled={scheduler || statusData.status_awsm !== 'Inactive'}
              value={statusData.close_period.date_from}
              onChange={value =>
                onFieldChange(
                  "close_period",
                  "date_from",
                  format(value, "yyyy-MM-dd")
                )
              }
            />
          </div>
          <div className="col-3">
            <div className="input-header">TIME</div>
            <AWSMDropdown
              items={timeData}
              value={statusData.close_period.time_from}
              onChange={value =>
                onFieldChange("close_period", "time_from", value)
              }
              disabled={scheduler || statusData.status_awsm !== 'Inactive'}
              required
            />
          </div>
          <div className="col-3">
            <div className="input-header">CLOSE (TO)</div>
            <DatePicker
              disabled={scheduler || statusData.status_awsm !== 'Inactive'}
              value={statusData.close_period.date_to}
              onChange={value =>
                onFieldChange(
                  "close_period",
                  "date_to",
                  format(value, "yyyy-MM-dd")
                )
              }
            />
          </div>
          <div className="col-3">
            <div className="input-header">TIME</div>
            <AWSMDropdown
              items={timeData}
              value={statusData.close_period.time_to}
              onChange={value =>
                onFieldChange("close_period", "time_to", value)
              }
              disabled={scheduler || statusData.status_awsm !== 'Inactive'}
              required
            />
          </div>
        </div>
      </div>
      {pathName === "/commercial-customer" && (
        <div className="row">
          {/*<div className="col-12 col-sm-6">*/}
          {/*  <div className="input-header">SALES CATEGORY</div>*/}
          {/*  <AWSMDropdown*/}
          {/*    value={statusData.sale_category || ""}*/}
          {/*    items={SALES_CATEGORY}*/}
          {/*    onChange={value => onFieldChange("sale_category", null, value)}*/}
          {/*    disabled={scheduler}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div className="col-12 col-sm-6">*/}
          {/*  <div className="input-header">SALES AND INVENTORY DATA SOURCE</div>*/}
          {/*  <AWSMDropdown*/}
          {/*    value={statusData.sales_inventory_data_source || ""}*/}
          {/*    onChange={value => onFieldChange("sales_inventory_data_source", null, value)}*/}
          {/*    items={SALES_AND_INVENTORY}*/}
          {/*    disabled={scheduler}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  )
}

export default TabStatus
