import React, { PureComponent } from "react"
import PopOverCalendar from "../../../components/Common/TableInformation/components/PopOverCalendar"
import { MODE } from "./constants"

class AvailabilityTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
    }
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
                onChange={e => onChange("default_terminal", e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> SHIFT TYPE </label>
              <select
                className="form-control"
                type="text"
                defaultValue={data?.shift_type}
                onChange={e => onChange("shift_type", e.target.value)}
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
                onChange={e =>
                  onChange("daily_available_hours", e.target.value)
                }
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
                onChange={e => onChange("status_in_awsm", e.target.value)}
              >
                {data?.status_awsm_dropdown?.map((value, index) => {
                  return <option value={index}>{value}</option>
                })}
              </select>
            </div>
            <div className="col-md-6 form-group">
              <label>DATE</label>
              <PopOverCalendar
                className="form-control"
                selected={new Date()}
                selected={data?.date}
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
              <PopOverCalendar
                className="form-control"
                selected={data?.date1}
                onChange={date => this.setState({ date: date })}
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
                onChange={e =>
                  onChange("mobilized_terminal_name_1", e.target.value)
                }
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
