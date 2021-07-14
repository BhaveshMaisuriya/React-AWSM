import React, { PureComponent } from "react"
import DatePicker from "../../../components/Common/DatePicker"
import { MODE } from "./constants"

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
                className="form-control"
                type="text"
                defaultValue={data?.default_terminal}
                disabled={true}
                onChange={e => this.onChangeHandler(e.target.value, "default_terminal")}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> SHIFT TYPE </label>
              <select
                className="form-control"
                type="text"
                defaultValue={data?.shift_type}
                onChange={e => this.onChangeHandler(e.target.value, "shift_type")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
              >
                {data?.shift_type_dropdown.map((value, index) => {
                  return <option value={value}>{value}</option>
                })}

              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DAILY AVAILABLE HOURS</label>
              <input
                className="form-control"
                type="text"
                defaultValue={data?.daily_available_hours}
                disabled={true}
                onChange={e => this.onChangeHandler(e.target.value, "daily_available_hours")}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> STATUS IN AWSM </label>
              <select
                defaultValue={data?.status_awsm}
                className="form-control"
                type="text"
                onChange={e => this.onChangeHandler(e.target.value, "status_in_awsm")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
              >
                {data?.status_awsm_dropdown?.map((value) => {
                  return <option value={value}>{value}</option>
                })}
              </select>
            </div>
          </div>

          <div>
            <b>OTHER TERMINAL MOBILIZATION</b>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>DATE </label>
              <DatePicker
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
              />
            </div>
            <div className="col-md-6 form-group">
              <label> MOBILIZED TERMINAL NAME 1</label>
              <select
                className="form-control"
                type="text"
                value={data?.default_terminal}
                onChange={e => this.onChangeHandler(e.target.value, "default_terminal")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
              >
                {data?.terminal_dropdown?.map((value) => {
                  return <option value={value}>{value}</option>
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AvailabilityTab
