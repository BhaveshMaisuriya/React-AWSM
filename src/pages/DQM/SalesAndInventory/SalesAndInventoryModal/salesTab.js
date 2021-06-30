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

        const { data } = this.props
        return (
            <div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>ACTUAL SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.actual_sales} disabled="true"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>EXPECTED SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.expected_sales} disabled="true"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.yesterday_sales_adjustment}></PopOverCalendar>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT REMARKS<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" defaultValue={data?.yesterday_sales_adjustment_remarks}></PopOverCalendar>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES FINAL FIGURE (L)
                            <Tooltip title="Actual Sales + Yesterday's Sales Adjustment (L)">
                                <InfoOutlinedIcon />
                            </Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.sales_final_figure} disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (L)<Tooltip title="(Sales Final Figure - Expected Sales) / Expected Sales"><InfoOutlinedIcon /></Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input className="form-control" disabled="true" defaultValue={data?.sales_variance}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (%)<Tooltip title="((Sales Final Figure - ExpectedSales)/Expected Sales) * 100%"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.sales_variance_percent} disabled="true"></input>
                    </div>
                </div>
            </div >
        )
    }
}
