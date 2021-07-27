import React, { PureComponent } from "react"
import { MODE } from "./constants"
class TrailerTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  OnChangHandler = (field, value) => {
    const { data, onChange } = this.props
    let newData = { ...data }
    newData[field] = value
    onChange("trailer", newData)
  }

  render() {
    const { mode, scheduler, data, onChange } = this.props
    return (
      <div className="trailer">
        <div className="row">
          <div className="col-md-6 form-group">
            <label>RT UNLADEN WEIGHT</label>
            <input
              className="form-control"
              defaultValue={data?.unladen_weight}
              disabled={true}
              onChange={e => this.OnChangHandler("unladen_weight", e.target.value)}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label>RT MAX WEIGHT</label>
            <input
              className="form-control"
              defaultValue={data?.max_weight}
              disabled
              onChange={e => this.OnChangHandler("max_weight", e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>NO OF COMPARTMENT</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data?.compartment_no}
              onChange={e => this.OnChangHandler("compartment_no", e.target.value)}
            ></input>
          </div>

          <div className="col-md-6 form-group">
            <label>MAX VOLUME PER COMPARTMENT</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data?.compartment_max_vol}
              onChange={e => this.OnChangHandler("compartment_max_vol", e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>PRODUCT WEIGHT FOR HSE COMPLIANCE</label>
            <input
              className="form-control"
              placeholder="Type something here.."
              disabled={true}
              defaultValue="2000"
              onChange={e => this.OnChangHandler("offloading_duration_mins", e.target.value)}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label>OFFLOADING DURATION (MINS)</label>
            <input
              className="form-control"
              placeholder="Type something here.."
              disabled={
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              }
              defaultValue={data?.offloading_duration}
              onChange={e => this.OnChangHandler("offloading_duration_mins", e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    )
  }
}

export default TrailerTab
