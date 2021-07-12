import React, { Component } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import DatePicker from "../../../../components/Common/DatePicker"
import VarianceInput from '../VarianceInput';
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

    onChangeHandler = (value, key) => {
        const { data, onChange } = this.props
        let newData = { ...data }
        newData[key] = value
        onChange("sales", newData)
    }
    render() {
        const { data } = this.props

        const onVarianceControlChange = (value, field) => {
            const { data, onChange } = this.props
            let newData = { ...data }
            newData[field] = value
            onChange("sales", newData)
        }

        return (
            <div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>ACTUAL SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input
                            className="form-control"
                            defaultValue={data?.actual_sales}
                            disabled="true"
                            onChange={e => this.onChangeHandler(e.target.value, "actual_sales")}></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>EXPECTED SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input
                            className="form-control"
                            defaultValue={data?.expected_sales}
                            disabled="true"
                            onChange={e => this.onChangeHandler(e.target.value, "expected_sales")}
                        ></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput className="form-control" value={data?.yesterday_sales_adjustment} onChange={(value, field = "yesterday_sales_adjustment") => onVarianceControlChange(value, field)}></VarianceInput>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT REMARKS<span className="extra-lbl">D-1</span></label>
                        <input className="form-control" value={data?.yesterday_sales_adjustment_remarks} onChange={e => this.onChangeHandler(e.target.value, "yesterday_sales_adjustment_remarks")}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES FINAL FIGURE (L)
                            <Tooltip title="Actual Sales + Yesterday's Sales Adjustment (L)">
                                <InfoOutlinedIcon />
                            </Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.sales_final_figure} disabled="true" onChange={e => this.onChangeHandler(e.target.value, "sales_final_figure")}></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (L)<Tooltip title="(Sales Final Figure - Expected Sales) / Expected Sales"><InfoOutlinedIcon /></Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input className="form-control" disabled="true" defaultValue={data?.sales_variance} onChange={e => this.onChangeHandler(e.target.value, "sales_variance")}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (%)<Tooltip title="((Sales Final Figure - ExpectedSales)/Expected Sales) * 100%"><InfoOutlinedIcon /></Tooltip><span className="extra-lbl">D-1</span></label>
                        <input className="form-control" defaultValue={data?.sales_variance_percent} disabled="true" onChange={e => this.onChangeHandler(e.target.value, "sales_variance_percent")}></input>
                    </div>
                </div>
            </div >
        )
    }
}
