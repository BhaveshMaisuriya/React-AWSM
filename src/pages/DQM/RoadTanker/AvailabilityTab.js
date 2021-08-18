import React, { PureComponent } from "react"
import DatePicker from "../../../components/Common/DatePicker"
import DateRangePicker from "components/Common/DateRangePicker"
import { MODE } from "./constants"
import AWSMDropdown from "components/Common/Dropdown"
import { SHIFT_TYPE_DROPDOWN_VALUE, RT_STATUS_IN_AWSM_DROPDOWN_VALUE } from "./constants"

class AvailabilityTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
    }
  }

  onChangeHandler = (value, key) => {
    const { data, onChange } = this.props
    let newData = { ...data }
    newData[key] = value
    onChange("availability", newData)
  }

  render() {
    const { mode, scheduler, data, onChange } = this.props
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
                placeholder="Typing something here..."
              />
            </div>
            <div className="col-md-6 form-group">
              <label> SHIFT TYPE </label>
              <AWSMDropdown
                value={data?.shift_type}
                items={SHIFT_TYPE_DROPDOWN_VALUE}
                onChange={e => this.onChangeHandler(e, "shift_type")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
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
                placeholder="Typing something here..."
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
              />
            </div>
            <div className="col-md-6 form-group">
              <label> Date </label>
              <DateRangePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                placeholder="Select Date"
              />
            </div>
          </div>

          <div>
            <b>OTHER TERMINAL MOBILIZATION</b>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DATE 1</label>
              <DateRangePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                placeholder="Typing something here..."
              />
            </div>
            <div className="col-md-6 form-group">
              <label> MOBILIZED TERMINAL NAME 1</label>
              <AWSMDropdown
                value={data?.default_terminal}
                items={data?.terminal_dropdown}
                onChange={e => {
                  this.onChangeHandler(e, "default_terminal")
                }}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder="Select"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DATE 2</label>
              <DateRangePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                placeholder="Select Date"
              />
            </div>
            <div className="col-md-6 form-group">
              <label> MOBILIZED TERMINAL NAME 2</label>
              <AWSMDropdown
                value={data?.default_terminal}
                items={data?.terminal_dropdown}
                onChange={e => {
                  this.onChangeHandler(e, "default_terminal")
                }}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AvailabilityTab
