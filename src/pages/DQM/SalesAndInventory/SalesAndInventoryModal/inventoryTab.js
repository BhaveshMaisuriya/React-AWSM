import React, { Component } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import DatePicker from "../../../../components/Common/DatePicker"
import VarianceInput from '../VarianceInput';
import informationIcon from "../../../../assets/images/AWSM-Information.svg";

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
    onChangeHandler = (value, key) => {
        const { data, onChange } = this.props
        let newData = { ...data }
        newData[key] = value
        onChange("inventory", newData)
    }

    render() {
        const { data } = this.props
        const onVarianceControlChange = (value, field) => {
            const { data, onChange } = this.props
            let newData = { ...data }
            newData[field] = value
            onChange("inventory", newData)
        }
        return (
            <>
                <strong className="font-weight-bolder marginBottom22 d-inline-block">FINAL VARIANCE & INVENTORY</strong>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY VARIANCE (L)  <Tooltip title="Inventory Final Figure - Calculated Inventory"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.inventory_variance}
                          disabled="true"
                          onChange={e => this.onChangeHandler(e.target.value, "inventory_variance")}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label> INVENTORY VARIANCE (%)  <Tooltip title="((Inventory Final Figure - Calculated Inventory)/Calculated Inventory) * 100"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.inventory_variance_percent}
                          disabled="true"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY FINAL FIGURE (L)  <Tooltip title="Total Inventory = Dipping Value(L) + Dipping to Midnight Sale Volume(L) + Dipping to Midnight Delivery(L)+ Dipping to Midnight Diversion(L) + Dipping Adjustment(L) + Delivery Adjustment"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.inventory_final_figure}
                          disabled="true"/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>CALCULATED INVENTORY (L)<span className="extra-lbl">D0</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.calculated_inventory}
                          disabled="true"/>
                    </div>
                </div>
                <hr />
                <strong className="font-weight-bolder marginBottom22 d-inline-block">TODAY SUBMISSION</strong>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING VALUE (L)<span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.dipping_value}
                          disabled="true"/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING DATE & TIME<span className="extra-lbl">D-1</span></label>
                        <DatePicker
                          className="form-control awsm-input"
                          value={data?.dipping_date_time}
                          disabled="true"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT SALES VOLUME (L)<span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.dipping_to_mid_night_sales_volume}
                          disabled="true"/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DELIVERY (L)<span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.dipping_to_midnight_delivery}
                          disabled="true"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DIVERSION (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.dipping_to_midnight_deversion}
                          onChange={(value, field = "dipping_to_midnight_deversion") => onVarianceControlChange(value, field)}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING TO MIDNIGHT DIVERSION REMARKS(L)</label>
                        <input
                          className="form-control awsm-input"
                          value={data?.dipping_to_midnight_diversion_remarks}
                          onChange={e => this.onChangeHandler(e.target.value, "dipping_to_midnight_diversion_remarks")}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DIPPING ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.dipping_adjustment}
                          onChange={(value, field = "dipping_adjustment") => onVarianceControlChange(value, field)}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DIPPING ADJUSTMENT REMARKS</label>
                        <input
                          className="form-control awsm-input"
                          selected={data?.dipping_adjustment_remarks}
                          onChange={e => this.onChangeHandler(e.target.value, "dipping_adjustment_remarks")}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DELIVERY ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.delivery_adjustment}
                          onChange={(value, field = "delivery_adjustment") => onVarianceControlChange(value, field)} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>DELIVERY ADJUSTMENT REMARKS</label>
                        <input className="form-control awsm-input"
                               value={data?.delivery_adjustment_remark}
                               onChange={e => this.onChangeHandler(e.target.value, "delivery_adjustment_remark")}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>OPENING INVENTORY @12AM (L)  <Tooltip title="Total inventory=Dipping Value (L) + Dipping to Midnigh Sales Volume (L) + Dipping to Midnight Delivery (L) + Dipping to Midnight Deversion (L) + Dipping Adjustment (L) + Delivery Adjustment (L)"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D0</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.opening_inventory}
                          disabled="true"/>
                    </div>
                </div>

                <hr />

                <strong className="font-weight-bolder marginBottom22 d-inline-block">YESTERDAY SUBMISSION</strong>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY OPENING INVENTORY (L)<span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.yesterday_opening_inventory}
                          disabled="true"/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY SALES FINAL FIGURE (L)
                          <Tooltip title="Sales of Final Figure D-1">
                            <img src={informationIcon} alt="yesterday sales final figure"/>
                          </Tooltip>
                          <span className="extra-lbl">D-1</span>
                        </label>
                        <input
                          className="form-control awsm-input"
                          value={data?.yesterday_sales_final_figure}
                          disabled="true"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY (L)</label>
                        <input
                          className="form-control awsm-input"
                          value={data?.yesterday_delivery}
                          disabled="true"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DIVERSION (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.yesterday_diversion}
                          onChange={(value, field = "yesterday_diversion") => onVarianceControlChange(value, field)} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DIVERSION REMARKS</label>
                        <input
                          className="form-control awsm-input"
                          value={data?.yesterday_diversion_remarks}
                          onChange={e => this.onChangeHandler(e.target.value, "yesterday_diversion_remarks")}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.yesterday_delivery_adjustment}
                          onChange={(value, field = "yesterday_delivery_adjustment") => onVarianceControlChange(value, field)} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY DELIVERY ADJUSTMENT REMARKS</label>
                        <input
                          className="form-control awsm-input"
                          value={data?.yesterday_delivery_adjustment_remarks}
                          onChange={e => this.onChangeHandler(e.target.value, "yesterday_delivery_adjustment_remarks")}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>CALCULATED INVENTORY @12AM (L)
                          <Tooltip title="Calculated Inventory = Yesterday Opening Inventory (L) + Yesterday Final Figure (L) + Yesterday Delivery(L)+ Yesterday Diversion + Yesterday Delivery Adjustment">
                            <img src={informationIcon} alt="calculated inventory"/>
                          </Tooltip>
                          <span className="extra-lbl">D0</span>
                        </label>
                        <input
                          className="form-control awsm-input"
                          value={data?.calculated_inventory}
                          disabled="true"/>
                    </div>
                </div>

                <hr />

                <strong className="font-weight-bolder marginBottom22 d-inline-block">INVENTORY CORRECTION</strong>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>INVENTORY CORRECTION (L)</label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.inventory_correction}
                          onChange={(value, field = "inventory_correction") => onVarianceControlChange(value, field)} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>INVENTORY CORRECTION REMARKS</label>
                        <input
                          className="form-control awsm-input"
                          value={data?.inventory_correction_remarks}
                          onChange={e => this.onChangeHandler(e.target.value, "inventory_correction_remarks")}
                        />
                    </div>
                </div>
            </>
        )
    }
}
