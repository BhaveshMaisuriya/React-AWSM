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

    render() {
        const { data } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SHIP TO PARTY</label>
                        <input defaultValue={data?.ship_to_party}
                            className="form-control"
                            disabled={true}></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>PRODUCT</label>
                        <input defaultValue={data?.product}
                            className="form-control"
                            disabled={true}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DATA SOURCE</label>
                        <input defaultValue={data?.data_source}
                            className="form-control"
                            disabled={true}></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>STATION RANK STATUS</label>
                        <input defaultValue={data?.station_tank_status}
                            className="form-control"
                            disabled={true}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 form-group">
                        <label>REMARKS</label>
                        <input defaultValue={data?.remarks} className="form-control"></input>
                    </div>
                </div>
            </div>
        )
    }
}
