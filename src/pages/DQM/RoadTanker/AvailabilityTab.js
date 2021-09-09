import React, { PureComponent } from "react"
import DateRangePicker from "components/Common/DateRangePicker"
import { MODE } from "./constants"
import AWSMDropdown from "components/Common/Dropdown"
import {
  SHIFT_TYPE_DROPDOWN_VALUE,
  RT_STATUS_IN_AWSM_DROPDOWN_VALUE,
} from "./constants"
import "./AvailabilityTab.scss"

class AvailabilityTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      isDateRangeError: false,
    }
  }
// !(props?.data?.status_awsm === "Temporary Blocked" && this.isEmptyDate(props?.data?.block_date_range)
  isEmptyDate = (date) => {
    if (date?.type === "single" && date?.days?.length === 0) {
      return true
    } else if (date?.type === "range" && date?.date_from === null && date?.date_to === null) {
      return true;
    } else if (date?.type === "") { 
      return true
    } else if (date === null) { 
      return true
    } else {
      return false
    }
  }

  onChangeHandler = (value, key) => {
    const { data, onChange } = this.props
    let newData = { ...data }
    if (key === "status_awsm" || key === "block_date_range") {
      if ((value === "Temporary Blocked" && this.isEmptyDate(data?.block_date_range))
        || (this.isEmptyDate(value) && data?.status_awsm === "Temporary Blocked")) {
        this.setState({ isDateRangeError: true })
      }
      else {
        this.setState({ isDateRangeError: false })
      }
    }

    newData[key] = value
    onChange("availability", newData)
  }

  render() {
    const { mode, scheduler, data, isActive, showError } = this.props
    console.log("showError::", showError)
    return (
      <div className="availability">
        <form>
          <div className="row">
            <div className="col-md-6 form-group">
              <label> DEFAULT TERMINAL </label>
              <input
                className="form-control awsm-input"
                type="text"
                defaultValue={data?.default_terminal}
                disabled={true}
                onChange={e =>
                  this.onChangeHandler(e.target.value, "default_terminal")
                }
              />
            </div>
            <div className="col-md-6 form-group">
              <label> SHIFT TYPE </label>
              <AWSMDropdown
                value={data?.shift_type}
                items={SHIFT_TYPE_DROPDOWN_VALUE}
                onChange={e => this.onChangeHandler(e, "shift_type")}
                disabled={
                  ((mode === MODE.VIEW_AND_AMEND ? false : true) ||
                    scheduler) &&
                  (isActive === "Active" ? true : false)
                }
                className="form-control awsm-input"
                placeholder={!scheduler ? "Select" : ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DAILY AVAILABLE HOURS</label>
              <input
                className="form-control awsm-input"
                type="text"
                defaultValue={data?.daily_available_hours}
                disabled={true}
                onChange={e =>
                  this.onChangeHandler(e.target.value, "daily_available_hours")
                }
              // placeholder="Typing something here..."
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label> STATUS IN AWSM </label>
              <AWSMDropdown
                value={data?.status_awsm}
                items={RT_STATUS_IN_AWSM_DROPDOWN_VALUE}
                onChange={e => this.onChangeHandler(e, "status_awsm")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder={!scheduler ? "Select" : ""}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> Date </label>
              <DateRangePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                placeholder={!scheduler ? "Select Date" : ""}
                defaultValue={data?.block_date_range}
                onChange={v => this.onChangeHandler(v, "block_date_range")}
                error={((mode === MODE.VIEW_AND_AMEND ? true : false) || !scheduler) && (showError && showError.indexOf('block_date_range') !== -1)}
              />
              {((mode === MODE.VIEW_AND_AMEND ? true : false) || !scheduler) && showError && showError.indexOf('block_date_range')  !== -1 &&
              <p className="error">Please fill in Temporary Blocked Date range</p>}
            </div>
          </div>
          <div className="marginTop14 marginBottom22">
            <strong className="font-weight-bolder">OTHER TERMINAL MOBILIZATION</strong>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DATE 1</label>
              <DateRangePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                placeholder={!scheduler ? "Select Date" : ""}
                onChange={e => {
                  this.onChangeHandler(e, "other_terminal_mobilization_1_date")
                }}
                defaultValue={data?.other_terminal_mobilization_1_date}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> MOBILIZED TERMINAL NAME 1</label>
              <AWSMDropdown
                value={data?.other_terminal_mobilization_1_name}
                items={data?.terminal_dropdown}
                onChange={e => {
                  this.onChangeHandler(e, "other_terminal_mobilization_1_name")
                }}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder={!scheduler ? "Select" : ""}
                error={showError && showError.indexOf('other_terminal_mobilization_1_name') !== -1 }
              />
              {(showError && showError.indexOf('other_terminal_mobilization_1_name') !== -1) && <p className="error">Please select MOBILIZED TERMINAL NAME 1</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DATE 2</label>
              <DateRangePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                placeholder={!scheduler ? "Select Date" : ""}
                defaultValue={data?.other_terminal_mobilization_2_date}
                onChange={v =>
                  this.onChangeHandler(v, "other_terminal_mobilization_2_date")
                }
              />
            </div>
            <div className="col-md-6 form-group">
              <label> MOBILIZED TERMINAL NAME 2</label>
              <AWSMDropdown
                value={data?.other_terminal_mobilization_2_name}
                items={data?.terminal_dropdown}
                onChange={e => {
                  this.onChangeHandler(e, "other_terminal_mobilization_2_name")
                }}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder={!scheduler ? "Select" : ""}
                error={showError && showError.indexOf('other_terminal_mobilization_2_name') !== -1}
              />
              {(showError && showError.indexOf('other_terminal_mobilization_2_name') !== -1) && <p className="error">Please select MOBILIZED TERMINAL NAME 2</p>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AvailabilityTab
