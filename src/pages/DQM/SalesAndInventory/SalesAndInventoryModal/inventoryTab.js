import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import DatePicker from "../../../../components/Common/DatePicker"
import VarianceInput from '../VarianceInput';
import informationIcon from "../../../../assets/images/AWSM-Information.svg";
import { differenceInDays } from "date-fns"

const INVENTORY_FINAL_FIGURE = "inventory_final_figure";
const OPENING_INVENTORY = "opening_inventory";
const CALCULATED_INVENTORY = "calculated_inventory";
const INVENTORY_VARIANCE_PERCENT = "inventory_variance_percent";
const INVENTORY_VARIANCE = "inventory_variance";

const InventoryTab = ({ data, onChange, salesDate }) => {
  const onChangeHandler = (value, key) => {
    let newData = { ...data }
    newData[key] = value
    onChange("inventory", newData)
  }
  const onVarianceControlChange = (value, field) => {
    let newData = { ...data }
    newData[field] = value
    if (field === "dipping_to_midnight_diversion" || field === "dipping_adjustment" || field === "delivery_adjustment") {
      newData[INVENTORY_FINAL_FIGURE] = Number(data?.dipping_value) - Number(data?.dipping_to_mid_night_sales_volume)
        + Number(data?.dipping_to_midnight_delivery) + Number(newData?.dipping_to_midnight_diversion)
        + Number(newData?.dipping_adjustment) + Number(newData?.delivery_adjustment);
      newData[OPENING_INVENTORY] = newData[INVENTORY_FINAL_FIGURE]
    }
    if (field === "yesterday_diversion" || field === "yesterday_delivery_adjustment") {
      newData[CALCULATED_INVENTORY] = Number(data?.yesterday_opening_inventory) - Number(data?.yesterday_sales_final_figure)
        + Number(data?.yesterday_delivery) + Number(newData?.yesterday_delivery_adjustment) + Number(newData?.yesterday_diversion);
    }
    // Calculate inventory variance
    newData[INVENTORY_VARIANCE] = Number(newData?.inventory_final_figure) - Number(data?.calculated_inventory);
    // Handle percent inventory field
    newData[INVENTORY_VARIANCE_PERCENT] = ((Number(newData?.inventory_variance) * 100) / (Number(data?.calculated_inventory))).toFixed(2)
    onChange("inventory", newData)
  }
  const isDisableInventoryField = () => {
    return differenceInDays(new Date(), new Date(salesDate)) > 1;
  }
  return (
    <>
      <strong className="font-weight-bolder marginBottom22 d-inline-block">FINAL VARIANCE & INVENTORY @ 12am</strong>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>INVENTORY VARIANCE (L)  <Tooltip title="Inventory Final Figure - Calculated Inventory"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D+0</span></label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.inventory_variance) ? Number(data?.inventory_variance).toFixed(1) : ''}
            disabled="true"
            onChange={e => onChangeHandler(e.target.value, "inventory_variance")}/>
        </div>
        <div className="col-md-6 form-group">
          <label> INVENTORY VARIANCE (%)  <Tooltip title="((Inventory Final Figure - Calculated Inventory)/Calculated Inventory) * 100"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D+0</span></label>
          <input
            className="form-control awsm-input"
            value={data?.inventory_variance_percent}
            disabled="true"/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>INVENTORY FINAL FIGURE (L)  <Tooltip title="Total Inventory = Dipping Value(L) - Dipping to Midnight Sale Volume(L) + Dipping to Midnight Delivery(L)+ Dipping to Midnight Diversion(L) + Dipping Adjustment(L) + Delivery Adjustment"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D+0</span></label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.inventory_final_figure) ? Number(data?.inventory_final_figure).toFixed(1) : ''}
            disabled="true"/>
        </div>
        <div className="col-md-6 form-group">
          <label>CALCULATED INVENTORY (L)<span className="extra-lbl">D+0</span></label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.calculated_inventory) ? Number(data?.calculated_inventory).toFixed(1) : ''}
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
            value={!isNaN(data?.dipping_value) ? Number(data?.dipping_value).toFixed(1) : ''}
            disabled="true"/>
        </div>
        <div className="col-md-6 form-group">
          <label>DIPPING TIMESTAMP<span className="extra-lbl">D-1</span></label>
          <DatePicker
            className="form-control awsm-input"
            value={data?.dipping_timestamp?data?.dipping_timestamp:data?.dipping_datetime}
            format={'DD-MM-yyyy , HH:mm:ss'}
            disabled="true"/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>DIPPING TO MIDNIGHT SALES VOLUME (L)<span className="extra-lbl">D-1</span></label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.dipping_to_mid_night_sales_volume) ? Number(data?.dipping_to_mid_night_sales_volume).toFixed(1) : ''}
            disabled="true"/>
        </div>
        <div className="col-md-6 form-group">
          <label>DIPPING TO MIDNIGHT DELIVERY (L)<span className="extra-lbl">D-1</span></label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.dipping_to_midnight_delivery) ? Number(data?.dipping_to_midnight_delivery).toFixed(1) : ''}
            disabled="true"/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>DIPPING TO MIDNIGHT DIVERSION (L)<span className="extra-lbl">D-1</span></label>
          <VarianceInput
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={!isNaN(data?.dipping_to_midnight_diversion) ? Number(data?.dipping_to_midnight_diversion).toFixed(1) : ''}
            onChange={(value, field = "dipping_to_midnight_diversion") => onVarianceControlChange(value, field)}/>
        </div>
        <div className="col-md-6 form-group">
          <label>DIPPING TO MIDNIGHT DIVERSION REMARKS(L)</label>
          <input
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={!isNaN(data?.dipping_to_midnight_diversion_remarks) ? Number(data?.dipping_to_midnight_diversion_remarks).toFixed(1) : ''}
            onChange={e => onChangeHandler(e.target.value, "dipping_to_midnight_diversion_remarks")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>DIPPING ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
          <VarianceInput
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={!isNaN(data?.dipping_adjustment) ? Number(data?.dipping_adjustment).toFixed(1) : ''}
            onChange={(value, field = "dipping_adjustment") => onVarianceControlChange(value, field)}/>
        </div>
        <div className="col-md-6 form-group">
          <label>DIPPING ADJUSTMENT REMARKS</label>
          <input
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={data?.dipping_adjustment_remarks}
            onChange={e => onChangeHandler(e.target.value, "dipping_adjustment_remarks")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>DELIVERY ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
          <VarianceInput
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={!isNaN(data?.delivery_adjustment) ? Number(data?.delivery_adjustment).toFixed(1) : ''}
            onChange={(value, field = "delivery_adjustment") => onVarianceControlChange(value, field)} />
        </div>
        <div className="col-md-6 form-group">
          <label>DELIVERY ADJUSTMENT REMARKS</label>
          <input
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={data?.delivery_adjustment_remark}
            onChange={e => onChangeHandler(e.target.value, "delivery_adjustment_remark")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>OPENING INVENTORY @12AM (L)  <Tooltip title="Total inventory=Dipping Value (L) - Dipping to Midnight Sales Volume (L) + Dipping to Midnight Delivery (L) + Dipping to Midnight Deversion (L) + Dipping Adjustment (L) + Delivery Adjustment (L)"><img src={informationIcon} /></Tooltip><span className="extra-lbl">D+0</span></label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.opening_inventory) ? Number(data?.opening_inventory).toFixed(1) : ''}
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
            value={!isNaN(data?.yesterday_opening_inventory) ? Number(data?.yesterday_opening_inventory).toFixed(1) : ''}
            disabled="true"/>
        </div>
        <div className="col-md-6 form-group">
          <label>YESTERDAY SALES FINAL FIGURE (L) <Tooltip title="Sales of Final Figure D-1">
              <img src={informationIcon} alt="yesterday sales final figure"/>
            </Tooltip>
            <span className="extra-lbl">D-1</span>
          </label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.yesterday_sales_final_figure) ? Number(data?.yesterday_sales_final_figure).toFixed(1) : ''}
            disabled="true"/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>YESTERDAY DELIVERY (L)</label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.yesterday_delivery) ? Number(data?.yesterday_delivery).toFixed(1) : ''}
            disabled="true"/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>YESTERDAY DIVERSION (L)<span className="extra-lbl">D-1</span></label>
          <VarianceInput
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={!isNaN(data?.yesterday_diversion) ? Number(data?.yesterday_diversion).toFixed(1) : ''}
            onChange={(value, field = "yesterday_diversion") => onVarianceControlChange(value, field)} />
        </div>
        <div className="col-md-6 form-group">
          <label>YESTERDAY DIVERSION REMARKS</label>
          <input
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={data?.yesterday_diversion_remarks}
            onChange={e => onChangeHandler(e.target.value, "yesterday_diversion_remarks")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>YESTERDAY DELIVERY ADJUSTMENT (L)<span className="extra-lbl">D-1</span></label>
          <VarianceInput
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={!isNaN(data?.yesterday_delivery_adjustment) ? Number(data?.yesterday_delivery_adjustment).toFixed(1) : ''}
            onChange={(value, field = "yesterday_delivery_adjustment") => onVarianceControlChange(value, field)} />
        </div>
        <div className="col-md-6 form-group">
          <label>YESTERDAY DELIVERY ADJUSTMENT REMARKS</label>
          <input
            disabled={isDisableInventoryField()}
            className="form-control awsm-input"
            value={data?.yesterday_delivery_adjustment_remarks}
            onChange={e => onChangeHandler(e.target.value, "yesterday_delivery_adjustment_remarks")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label>CALCULATED INVENTORY @12AM (L) <Tooltip title="Calculated Inventory = Yesterday Opening Inventory (L) - Yesterday Sales Final Figure (L) + Yesterday Delivery(L)+ Yesterday Diversion(L) + Yesterday Delivery Adjustment(L)">
              <img src={informationIcon} alt="calculated inventory"/>
            </Tooltip>
            <span className="extra-lbl">D+0</span>
          </label>
          <input
            className="form-control awsm-input"
            value={!isNaN(data?.calculated_inventory) ? Number(data?.calculated_inventory).toFixed(1) : ''}
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
            value={!isNaN(data?.inventory_correction) ? Number(data?.inventory_correction).toFixed(1) : ''}
            onChange={(value, field = "inventory_correction") => onVarianceControlChange(value, field)} />
        </div>
        <div className="col-md-6 form-group">
          <label>INVENTORY CORRECTION REMARKS</label>
          <input
            className="form-control awsm-input"
            value={data?.inventory_correction_remarks}
            onChange={e => onChangeHandler(e.target.value, "inventory_correction_remarks")}
          />
        </div>
      </div>
    </>
  )
}
export default InventoryTab;
