import React, { Component } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import PopOverCalendar from "../../../../components/Common/TableInformation/components/PopOverCalendar";

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
                        <label>ACTUAL SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue="1000" disabled="true"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>EXPECTED SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue="1000" disabled="true"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected="12 mar 2021"></PopOverCalendar>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT REMARKS<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" defaultValue="Select Date"></PopOverCalendar>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES FINAL FIGURE (L)
                            <Tooltip title="Actual Sales + Yesterday's Sales Adjustment (L)">
                                <InfoOutlinedIcon />
                            </Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue="25000" disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (L)<Tooltip title="(Sales Final Figure - Expected Sales) / Expected Sales"><InfoOutlinedIcon /></Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input className="form-control" disabled="true" defaultValue="30000"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (%)<Tooltip title="((Sales Final Figure - ExpectedSales)/Expected Sales) * 100%"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue="25000" disabled="true"></input>
                    </div>
                </div>
            </div >
        )
    }
}
