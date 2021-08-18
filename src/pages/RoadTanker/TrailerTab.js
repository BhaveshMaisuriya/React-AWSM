import React, { PureComponent } from "react"

class TrailerTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="trailer">
      <div className="row">
        <div className="col-md-6 form-group">
          <label>RT WEIGHT</label>
          <input className="form-control awsm-input" defaultValue={"012345"} disabled={true}></input>
        </div>
        <div className="col-md-6 form-group">
          <label>LEGAL WEIGHT ALLOWED</label>
          <input className="form-control awsm-input" defaultValue={"Lorem Ipsum"} disabled></input>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>NO OF COMP</label>
          <input className="form-control awsm-input" disabled={true} defaultValue={"012345"}></input>
        </div>

        <div className="col-md-6 form-group">
          <label>MAX VOLUME PER COMP</label>
          <input className="form-control awsm-input" disabled={true} defaultValue={"lorem Ipsum"}></input>
        </div>
      </div>

      <div className="row">
      <div className="col-md-6 form-group">
        <label>PROD WEIGHT (HSE COMP)</label>
        <input className="form-control awsm-input" disabled={true} defaultValue={"012345"}></input>
      </div>

      <div className="col-md-6 form-group">
        <label>OFFLOADING DURATION (MINS)</label>
        <input className="form-control awsm-input" placeholder="Type something here.."></input>
      </div>
      </div>
      </div>
    )
  }
}

export default TrailerTab
