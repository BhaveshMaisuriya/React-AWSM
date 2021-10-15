import React, { Component } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import DatePicker from "../../../../components/Common/DatePicker"
import VarianceInput from '../VarianceInput';
import informationIcon from "../../../../assets/images/AWSM-Information.svg";

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
                          className="form-control awsm-input"
                          value={data?.actual_sales}
                          disabled="true"
                          onChange={e => this.onChangeHandler(e.target.value, "actual_sales")}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>EXPECTED SALES(L)<span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.expected_sales}
                          disabled="true"
                          onChange={e => this.onChangeHandler(e.target.value, "expected_sales")}
                          />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
                        <VarianceInput
                          className="form-control awsm-input"
                          value={data?.yesterday_sales_adjustment}
                          onChange={(value, field = "yesterday_sales_adjustment") => onVarianceControlChange(value, field)}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>YESTERDAY'S SALES ADJUSTMENT REMARKS<span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.yesterday_sales_adjustment_remarks}
                          onChange={e => this.onChangeHandler(e.target.value, "yesterday_sales_adjustment_remarks")}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES FINAL FIGURE (L)  <Tooltip title="Actual Sales + Yesterday's Sales Adjustment (L)">
                            <img src={informationIcon}  alt="sales final figure"/>
                        </Tooltip>
                            <span className="extra-lbl">D-1</span></label>
                        <input
                          className="form-control awsm-input"
                          value={data?.sales_final_figure}
                          disabled="true"
                          onChange={e => this.onChangeHandler(e.target.value, "sales_final_figure")}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (L)
                            <Tooltip title="Sales Final Figure - Expected Sales">
                                <img src={informationIcon}  alt="sales variance"/>
                            </Tooltip>
                            <span className="extra-lbl">D-1</span>
                        </label>
                        <input
                          className="form-control awsm-input"
                          disabled="true" value={data?.sales_variance}
                          onChange={e => this.onChangeHandler(e.target.value, "sales_variance")}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SALES VARIANCE (%)
                            <Tooltip title="((Sales Final Figure - ExpectedSales)/Expected Sales) * 100%">
                                <img src={informationIcon}  alt="sales variance"/>
                            </Tooltip>
                            <span className="extra-lbl">D-1</span>
                        </label>
                        <input
                          className="form-control awsm-input"
                          value={data?.sales_variance_percent}
                          disabled="true"
                          onChange={e => this.onChangeHandler(e.target.value, "sales_variance_percent")}/>
                    </div>
                </div>
            </div >
        )
    }
}
