import React, { useMemo, useState } from "react"
import { Col, Row } from "reactstrap"
import "./tabStatus.scss"
import AWSMDropdown from "../Dropdown"
import DatePicker from "../../Common/DatePicker"
import { format } from "date-fns"
import DropdownInput from "../DropdownInput"

const STATUS_IN_AWSM = ["Active", "Temporarily Closed", "Inactive"]

const timeData = []
timeData.push(`None`)
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`)

const TabStatus = ({ scheduler, data, onChange }) => {
  if (!data.status) {
    return null
  }
  const pathName = window.location.pathname
  const [statusData, setStatusData] = useState(data.status)

  const onFieldChange = (key, subKey, value) => {
    const newStatusData = { ...statusData }
    if (subKey) {
      if (key === "close_period" && !newStatusData[key]) {
        newStatusData[key] = {
          id: null,
          type: "range",
          days: "",
          date_from: null,
          date_to: null,
          time_from: null,
          time_to: null,
        }
      }
      newStatusData[key][subKey] = value
      if (
        key === "close_period" &&
        (subKey === "time_from" || subKey === "time_to") &&
        value === "None"
      ) {
        newStatusData["close_period"][subKey] = null
      }
    } else {
      newStatusData[key] = value
    }
    setStatusData(newStatusData)
    if (onChange) {
      onChange("status", newStatusData)
    }
  }

  const onAddDataSource = value => {
    const newDataSourceItems =
      statusData.sales_inventory_data_source_items || []
    newDataSourceItems.push(value)
    onFieldChange("sales_inventory_data_source_items", null, newDataSourceItems)
  }

  // const errorMessage = useMemo(() => {
  //   if (statusData.status_awsm === "Temporarily Closed") {
  //     if (!statusData.close_period || !(statusData.close_period.date_from && statusData.close_period.date_to && statusData.close_period.time_from && statusData.close_period.time_to)) {
  //       return "Close period is required!"
  //     }
  //   }
  //   return null
  // }, [statusData])

  return (
    <div className="dqm-status-container">
      <Row className="row">
        <Col className="col-12 col-sm-6">
          <label>STATUS IN AWSM</label>
          <AWSMDropdown
            items={STATUS_IN_AWSM}
            onChange={value => onFieldChange("status_awsm", null, value)}
            value={statusData.status_awsm}
            disabled={scheduler}
          />
        </Col>
        {pathName === "/commercial-customer" && (
          <Col className="col-12 col-sm-6">
            <DropdownInput
              title="SALES AND INVENTORY DATA SOURCE"
              value={statusData.sales_inventory_data_source}
              onChange={value =>
                onFieldChange("sales_inventory_data_source", null, value)
              }
              disabled={scheduler}
              items={statusData.sales_inventory_data_source_items || []}
              onAddItem={onAddDataSource}
            />
          </Col>
        )}
        {pathName === "/retail-customer" ? (
          <Col className="col-12 col-sm-6">
            <DropdownInput
              title="SALES AND INVENTORY DATA SOURCE"
              value={statusData.sales_inventory_data_source}
              onChange={value =>
                onFieldChange("sales_inventory_data_source", null, value)
              }
              disabled={scheduler}
              items={statusData.sales_inventory_data_source_items || []}
              onAddItem={onAddDataSource}
            />
          </Col>
        ) : (
          <Col className="col-6" />
        )}
      </Row>
      <div className="marginTop30 marginBottom16">
        <label>
          <strong>CLOSE PERIOD</strong>
        </label>
      </div>
      <Row className="row">
        <Col className="col-3">
          <label>CLOSE (FROM)</label>
          <DatePicker
            disabled={scheduler || statusData.status_awsm === "Inactive"}
            value={
              statusData.close_period
                ? statusData.close_period.date_from || ""
                : ""
            }
            onChange={value =>
              onFieldChange(
                "close_period",
                "date_from",
                format(value, "yyyy-MM-dd")
              )
            }
          />
        </Col>
        <Col className="col-3">
          <label>TIME</label>
          <AWSMDropdown
            items={timeData}
            optionValue={true}
            value={
              statusData.close_period
                ? statusData.close_period.time_from
                    ?.toString()
                    .substring(0, 5) || "None"
                : ""
            }
            onChange={value =>
              onFieldChange("close_period", "time_from", value)
            }
            disabled={scheduler || statusData.status_awsm === "Inactive"}
            required
          />
        </Col>
        <Col className="col-3">
          <label>CLOSE (TO)</label>
          <DatePicker
            disabled={scheduler || statusData.status_awsm === "Inactive"}
            value={
              statusData.close_period
                ? statusData.close_period.date_to || ""
                : ""
            }
            onChange={value =>
              onFieldChange(
                "close_period",
                "date_to",
                format(value, "yyyy-MM-dd")
              )
            }
          />
        </Col>
        <Col className="col-3">
          <label>TIME</label>
          <AWSMDropdown
            items={timeData}
            value={
              statusData.close_period
                ? statusData.close_period.time_to?.toString().substring(0, 5) ||
                  "None"
                : ""
            }
            onChange={value => onFieldChange("close_period", "time_to", value)}
            disabled={scheduler || statusData.status_awsm === "Inactive"}
            required
          />
        </Col>
      </Row>
      <hr style={{ margin: "2em 0" }} />
      {/* {errorMessage && <p className="error">{errorMessage}</p>} */}

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
