import React, { Component } from 'react'

export default class DetailsTab extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    onChangeHandler = (value, key) => {
        const { data, onChange } = this.props
        let newData = { ...data }
        newData[key] = value
        onChange("details", newData)
    }

    render() {
        const { data } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SHIP TO PARTY</label>
                        <input
                          value={data?.ship_to_party}
                          className="form-control awsm-input"
                          disabled={true}
                          onChange={e => this.onChangeHandler(e.target.value, "ship_to_party")}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>PRODUCT</label>
                        <input
                          value={data?.product}
                          className="form-control awsm-input"
                          disabled={true}
                          onChange={e => this.onChangeHandler(e.target.value, "product")}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DATA SOURCE</label>
                        <input value={data?.data_source}
                          className="form-control awsm-input"
                          disabled={true}
                          onChange={e => this.onChangeHandler(e.target.value, "data_source")}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>STATION RANK STATUS</label>
                        <input value={data?.station_tank_status}
                          className="form-control awsm-input"
                          disabled={true}
                          onChange={e => this.onChangeHandler(e.target.value, "station_tank_status")}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 form-group">
                        <label>REMARKS</label>
                        <input
                          value={data?.remarks}
                          className="form-control awsm-input"
                          onChange={e => this.onChangeHandler(e.target.value, "remarks")}/>
                    </div>
                </div>
            </div>
        )
    }
}
