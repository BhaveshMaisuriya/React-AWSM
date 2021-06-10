import React, { Component } from 'react';
import PopOverCalendar from "../../../../components/Common/TableInformation/components/PopOverCalendar";

export default class InventoryTab extends Component {
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
            <>
                <h6>FINAL VARIANCE & INVENTORY</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY VARIANCE (L)</label>
                        <input className="form-control" defaultValue="25000"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label> INVENTORY VARIANCE (%)</label>
                        <input className="form-control" defaultValue="25000"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY FINAL FIGURE (L)</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>CALCULATED INVENTORY (L)</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                </div>
                <hr />
                <h6>TODAY SUBMISSION</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING VALUE (L)</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING DATE & TIME</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT SALES VOLUME (L)</label>
                        <input className="form-control" defaultValue="60000"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING DATE & TIME</label>
                        <input className="form-control" defaultValue="11 Mar 2021, 12:00"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DIVERSION (L)</label>
                        <input className="form-control" defaultValue="12 mar 2021"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DIVERSION REMARKS(L)</label>
                        <input className="form-control" defaultValue="10920"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING ADJUSTMENT (L)</label>
                        <input className="form-control" defaultValue="12 Mar 2021"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING ADJUSTMENT REMARKS</label>
                        <PopOverCalendar className="form-control" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DELIVERY ADJUSTMENT (L)</label>
                        <PopOverCalendar className="form-control" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DELIVERY ADJUSTMENT REMARKS</label>
                        <PopOverCalendar className="form-control" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>OPENING INVENTORY @12AM (L)</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                </div>

                <hr />

                <h6>YESTERDAY SUBMISSION</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY OPENING INVENTORY (L)</label>
                        <input className="form-control" defaultValue="4000"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY SALES FINAL FIGURE (L)</label>
                        <input className="form-control" defaultValue="1000"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY (L)</label>
                        <input className="form-control" defaultValue="40000"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DIVERSION (L)</label>
                        <PopOverCalendar className="form-control" defaultValue="12 Mar 2021" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DIVERSION REMARKS</label>
                        <PopOverCalendar className="form-control" defaultValue="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY ADJUSTMENT (L)</label>
                        <PopOverCalendar className="form-control" defaultValue="12 Mar 2021" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY ADJUSTMENT REMARKS</label>
                        <PopOverCalendar className="form-control" defaultValue="" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>CACULATED INVENTORY @12AM (L)</label>
                        <input className="form-control" defaultValue="30000"></input>
                    </div>
                </div>

                <hr />

                <h6>INVENTORY CORRECTION</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY CORRECTION (L)</label>
                        <PopOverCalendar className="form-control" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>INVENTORY CORRECTION REMARKS</label>
                        <PopOverCalendar className="form-control" />
                    </div>
                </div>

            </>
        )
    }
}
