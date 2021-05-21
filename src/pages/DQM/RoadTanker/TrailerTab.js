import React, { PureComponent } from "react"
import { MODE } from "./constants"
class TrailerTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { mode, scheduler, data, onChange } = this.props
    return (
      <div className="trailer">
        <div className="row">
          <div className="col-md-6 form-group">
            <label>RT WEIGHT</label>
            <input
              className="form-control"
              defaultValue={data.rt_weight}
              disabled={true}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label>LEGAL WEIGHT ALLOWED</label>
            <input
              className="form-control"
              defaultValue={data.legal_weight_allowed}
              disabled
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>NO OF COMP</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data.no_of_comp}
            ></input>
          </div>

          <div className="col-md-6 form-group">
            <label>MAX VOLUME PER COMP</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data.max_volume_per_comp}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>PROD WEIGHT (HSE COMP)</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data.prod_weight_hse_copmp}
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
              defaultValue={data.offloading_duration_mins}
              onChange={e =>
                onChange("offloading_duration_mins", e.target.value)
              }
            ></input>
          </div>
        </div>
      </div>
    )
  }
}

export default TrailerTab
