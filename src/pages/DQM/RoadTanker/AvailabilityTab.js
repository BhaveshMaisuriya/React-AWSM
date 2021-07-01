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

  onChangeHandler = (value,key) => {
    const {  data, onChange } = this.props
    let newData = {...data}
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
                onChange={e => this.onChangeHandler(e.target.value,"default_terminal")}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> SHIFT TYPE </label>
              <select
                className="form-control"
                type="text"
                defaultValue={data?.shift_type}
                onChange={e => this.onChangeHandler(e.target.value,"shift_type")}
              >
                {data?.shift_type_dropdown.map((value, index) => {
                  return <option value={index}>{value}</option>
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
                onChange={e => this.onChangeHandler(e.target.value,"daily_available_hours")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label> STATUS IN AWSM </label>
              <select
                defaultValue={data?.status_awsm}
                className="form-control"
                type="text"
                onChange={e => this.onChangeHandler(e.target.value,"status_in_awsm")}
              >
                {data?.status_awsm_dropdown?.map((value, index) => {
                  return <option value={index}>{value}</option>
                })}
              </select>
            </div>
            <div className="col-md-6 form-group">
              <label>DATE</label>
              <DatePicker
                className="form-control"
                value={data?.date}
                onChange={e => this.onChangeHandler(e,"date")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
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
              <DatePicker
                className="form-control"
                selected={data?.date1}
                onChange={e => this.onChangeHandler(e,"date1")}
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
                defaultValue={"three"}
                onChange={e => this.onChangeHandler(e.target.value,"mobilized_terminal_name_1")}
              >
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AvailabilityTab
