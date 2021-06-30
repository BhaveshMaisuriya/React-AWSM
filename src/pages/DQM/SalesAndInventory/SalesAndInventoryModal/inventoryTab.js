import React, { Component } from 'react';
import PopOverCalendar from "../../../../components/Common/TableInformation/components/PopOverCalendar";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
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
        const { data } = this.props
        return (
            <>
                <h6>FINAL VARIANCE & INVENTORY</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY VARIANCE (L)<Tooltip title="Inventory Final Figure - Calculated Inventory"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input className="form-control" defaultValue={data?.inventory_variance} disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label> INVENTORY VARIANCE (%)<Tooltip title="((Inventory Final Figure - Calculated Inventory)/Calculated Inventory) * 100"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input className="form-control" defaultValue={data?.inventory_variance_percent} disabled="true"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY FINAL FIGURE (L)<Tooltip title="Total Inventory = Dipping Value(L) + Dipping to Midnight Sale Volume(L) + Dipping to Midnight Delivery(L)+ Dipping to Midnight Diversion(L) + Dipping Adjustment(L) + Delivery Adjustment"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input className="form-control" defaultValue={data?.inventory_final_figure} disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>CALCULATED INVENTORY (L)<span className="extra-lbl">D0</span></label>
                        <input className="form-control" defaultValue={data?.calculated_inventory} disabled="true"></input>
                    </div>
                </div>
                <hr />
                <h6>TODAY SUBMISSION</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING VALUE (L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.dipping_value} disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING DATE & TIME<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.dipping_date_time} disabled="true"></PopOverCalendar>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT SALES VOLUME (L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.dipping_to_mid_night_sales_volume} disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DELIVERY (L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.dipping_to_midnight_delivery} disabled="true"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DIVERSION (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.dipping_to_midnight_deversion}></PopOverCalendar>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DIVERSION REMARKS(L)</label>
                        <PopOverCalendar className="form-control" selected={data?.dipping_to_midnight_deversion_remarks} ></PopOverCalendar>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.dipping_adjustment}></PopOverCalendar>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING ADJUSTMENT REMARKS</label>
                        <PopOverCalendar className="form-control" selected={data?.dipping_adjustment_remarks} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DELIVERY ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.delivery_adjustment} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DELIVERY ADJUSTMENT REMARKS</label>
                        <PopOverCalendar className="form-control" selected={data?.delivery_adjustment_remark} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>OPENING INVENTORY @12AM (L)<Tooltip title="Total inventory=Dipping Value (L) + Dipping to Midnigh Sales Volume (L) + Dipping to Midnight Delivery (L) + Dipping to Midnight Deversion (L) + Dipping Adjustment (L) + Delivery Adjustment (L)"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input className="form-control" defaultValue={data?.opening_inventory} disabled="true"></input>
                    </div>
                </div>

                <hr />

                <h6>YESTERDAY SUBMISSION</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY OPENING INVENTORY (L)<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.yesterday_opening_inventory} disabled="true"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY SALES FINAL FIGURE (L)<Tooltip title="Sales of Final Figure D-1"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.yesterday_sales_final_figure} disabled="true"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY (L)</label>
                        <input className="form-control" defaultValue={data?.yesterday_delivery} disabled="true"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DIVERSION (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.yesterday_diversion} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DIVERSION REMARKS</label>
                        <PopOverCalendar className="form-control" defaultValue={data?.yesterday_diversion_remarks} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <PopOverCalendar className="form-control" selected={data?.yesterday_delivery_adjustment} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY ADJUSTMENT REMARKS</label>
                        <PopOverCalendar className="form-control" defaultValue={data?.yesterday_delivery_adjustment_remarks} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>CACULATED INVENTORY @12AM (L)<Tooltip title="Calculated Inventory = Yesterday Opening Inventory (L) + Yesterday Final Figure (L) + Yesterday Delivery(L)+ Yesterday Diversion + Yesterday Delivery Adjustment"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input className="form-control" defaultValue={data?.calculated_inventory} disabled="true"></input>
                    </div>
                </div>

                <hr />

                <h6>INVENTORY CORRECTION</h6>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY CORRECTION (L)</label>
                        <PopOverCalendar className="form-control" selected={data?.inventory_correction} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>INVENTORY CORRECTION REMARKS</label>
                        <input className="form-control" selected={data?.inventory_correction_remarks}></input>
                    </div>
                </div>

            </>
        )
    }
}
