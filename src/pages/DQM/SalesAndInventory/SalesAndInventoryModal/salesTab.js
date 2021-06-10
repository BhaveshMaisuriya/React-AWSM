import React, { Component } from 'react'

export default class SalesTab extends Component {
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
        return (
            <div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>ACTUAL SALES(L)</label>
                        <input className="form-control" defaultValue="1000"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>EXPECTED SALES(L)</label>
                        <input className="form-control" defaultValue="1000"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT (L)</label>
                        <input className="form-control" defaultValue="12 mar 2021"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT REMARKS</label>
                        <input className="form-control" defaultValue="Select Date"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES FINAL FIGURE (L)</label>
                        <input className="form-control" defaultValue="25000"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (L)</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (%)</label>
                        <input className="form-control" defaultValue="25000"></input>
                    </div>
                </div>
            </div >
        )
    }
}
