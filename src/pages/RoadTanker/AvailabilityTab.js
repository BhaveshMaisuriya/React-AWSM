import React, { PureComponent } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class AvailabilityTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
    }
  }

  render() {
    return (
      <div className="availability"> 
        <form>
          <div className="row">
            <div class="col-md-6 form-group">
              <label> DEFAULT TERMINAL </label>
              <input
                className="form-control"
                type="text"
                defaultValue={"Lorem ipsum"}
                disabled={true}
              />
            </div>
            <div class="col-md-6 form-group">
              <label> SHIFT TYPE </label>
              <select
                className="form-control"
                type="text"
                defaultValue={"Eshah Filling Station"}
              >
                <option selected>Double</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 form-group">
              <label>
                DAILY AVAILABLE HOURS
              </label>
              <input
                className="form-control"
                type="text"
                defaultValue={"RYD0287"}
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 form-group">
              <label> STATUS IN AWSM </label>
              <select className="form-control" type="text">
                <option selected>Active</option>
                <option value="1">Inactive</option>
              </select>
            </div>
            <div class="col-md-6 form-group">
              <label> DATE</label>
              <DatePicker
                className="form-control"
                selected={new Date()}
                onChange={date => this.setState({ date: date })}
              />
            </div>
          </div>
          <div>
            <b>OTHER TERMINAL MOBILIZATION
            </b>
          </div>
          <div className="row">
            <div class="col-md-6 form-group">
              <label>DATE 1</label>
              <DatePicker
                className="form-control"
                selected={new Date()}
                onChange={date => this.setState({ date: date })}
              />
            </div>
            <div class="col-md-6 form-group">
              <label> MOBILIZED TERMINAL NAME 1</label>
              <select
                className="form-control"
                type="text"
                defaultValue={"Eshah Filling Station"}
              >
                <option selected>Lorem ipsum</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AvailabilityTab
