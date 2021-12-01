import React, { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import VarianceInput from '../VarianceInput';
import informationIcon from "../../../../assets/images/AWSM-Information.svg";

const SALES_FINAL_FIGURE = "sales_final_figure";
const SALES_VARIANCE = "sales_variance";
const YESTERDAY_SALES_FINAL_FIGURE = "yesterday_sales_final_figure";
const SALES_VARIANCE_PERCENT = "sales_variance_percent";
const EXPECTED_SALES = "expected_sales";

const SalesTab = ({ data, onChange, inventoryData }) => {
    const onChangeHandler = (value, key) => {
        let newData = { ...data }
        newData[key] = value
        onChange("sales", newData)
    }
    const onVarianceControlChange = (value, field) => {
        let newData = { ...data }
        let newInventoryData = { ...inventoryData }
        newData[field] = value
        // Mapping same data sale final figure into Sales tab and yesterday sale final figure into Inventory tab
        newInventoryData[YESTERDAY_SALES_FINAL_FIGURE] = Number(data?.actual_sales) + Number(newData?.yesterday_sales_adjustment)
        newData[SALES_FINAL_FIGURE] = Number(data?.actual_sales) + Number(newData?.yesterday_sales_adjustment)
        newData[SALES_VARIANCE] = Number(data?.actual_sales) + Number(newData?.yesterday_sales_adjustment) - Number(data?.expected_sales)
        // calculation % for sales variance
        if (Number(newData?.sales_variance) > 0 && Number(data?.expected_sales) > 0) {
            newData[SALES_VARIANCE_PERCENT] = ((Number(newData?.sales_variance) * 100) / (Number(data?.expected_sales))).toFixed(2);
        }
        onChange(["inventory", "sales"], [newInventoryData, newData])
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
                    onChange={e => onChangeHandler(e.target.value, "actual_sales")}/>
              </div>
              <div className="form-group col-md-6">
                  <label>EXPECTED SALES(L)<span className="extra-lbl">D-1</span></label>
                  <input
                    className="form-control awsm-input"
                    value={data?.expected_sales}
                    disabled="true"
                    onChange={e => onChangeHandler(e.target.value, "expected_sales")}
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
                    value={data?.yesterday_sales_adjustment_remarks || ''}
                    onChange={e => onChangeHandler(e.target.value, "yesterday_sales_adjustment_remarks")}/>
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
                    onChange={e => onChangeHandler(e.target.value, "sales_final_figure")}/>
              </div>
              <div className="col-md-6 form-group">
                  <label>SALES VARIANCE (L)  <Tooltip title="Sales Final Figure - Expected Sales">
                          <img src={informationIcon}  alt="sales variance"/>
                      </Tooltip>
                      <span className="extra-lbl">D-1</span>
                  </label>
                  <input
                    className="form-control awsm-input"
                    disabled="true" value={data?.sales_variance}
                    onChange={e => onChangeHandler(e.target.value, "sales_variance")}/>
              </div>
          </div>

          <div className="row">
              <div className="col-md-6 form-group">
                  <label>SALES VARIANCE (%)  <Tooltip title="((Sales Final Figure - ExpectedSales)/Expected Sales) * 100%">
                          <img src={informationIcon}  alt="sales variance"/>
                      </Tooltip>
                      <span className="extra-lbl">D-1</span>
                  </label>
                  <input
                    className="form-control awsm-input"
                    value={data?.sales_variance_percent}
                    disabled="true"
                    onChange={e => onChangeHandler(e.target.value, "sales_variance_percent")}/>
              </div>
          </div>
      </div >
    )
}
export default SalesTab;

