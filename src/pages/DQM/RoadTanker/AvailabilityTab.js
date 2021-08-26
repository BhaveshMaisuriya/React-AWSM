import React, { PureComponent } from "react"
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
    const { mode, scheduler, data } = this.props
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
                  ((mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler)
                  && (data?.shift_type === "OFF" ? true : false)
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
                defaultValue={data?.block_date_range}
                onChange={v =>
                  this.onChangeHandler(v, "block_date_range")
                }
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
                placeholder="Select Date"
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
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AvailabilityTab
