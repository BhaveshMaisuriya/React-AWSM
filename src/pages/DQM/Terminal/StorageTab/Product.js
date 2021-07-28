import React, { useState } from "react"
import DateRangePicker from "../../../../components/Common/DateRangePicker"
import AWSMInput from "../../../../components/Common/Input"
import AWSMInputNumber from "../../../../components/Common/InputNumber"
import AWSMDropdown from "../../../../components/Common/Dropdown"
import AutoCompleteDropDown from "./AutoCompleteDropDown"
import "./Product.scss"

const Product = ({
  value,
  productKey,
  onChange,
  scheduler,
  onDelete,
  productsList,
}) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)

  const onFieldChange = (fieldKey, fieldValue) => {
    const newValue = { ...value }
    newValue[fieldKey] = fieldValue
    if (onChange) {
      if (fieldKey === "code") {
        newValue[fieldKey] = fieldValue?.code
        newValue["name"] = fieldValue?.name
      }
      onChange(newValue)
    }
  }

  const onCancel = () => {
    setIsConfirmDelete(false)
  }
  function renderExceedError(key, max) {
    if (value?.[key] > max) {
      return <p style={{ color: "red" }}>Must not exceed {max}</p>
    }
    return null
  }
  return (
    <div className="terminal-product">
      {isConfirmDelete && (
        <div className="d-flex align-items-center justify-content-center delete-confirm">
          <div>Are you sure you want to delete this Product?</div>
          <button
            className="btn btn-outline-danger mr-2 ml-3"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="btn btn-danger ml-2" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
      <div className="d-flex justify-content-between">
        <h6 className="my-3 font-weight-bold">
          PRODUCT {productKey.substring(8)}
        </h6>
        {!scheduler && (
          <button
            className="btn-delete-product"
            onClick={() => setIsConfirmDelete(true)}
            disabled={scheduler}
          >
            Delete Product
          </button>
        )}
      </div>
      <div className="row">
        <div className="col-3 form-group">
          <label htmlFor="productCode">PRODUCT CODE</label>
          <AutoCompleteDropDown
            value={value.code}
            disabled={scheduler}
            items={productsList}
            key={value.code}
            onChange={value => onFieldChange("code", value)}
          />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="productName">PRODUCT NAME</label>
          <AWSMInput
            key={value.code}
            defaultValue={value.name}
            disabled
            onChange={value => onFieldChange("name", value)}
          />
        </div>
        <div className="col-3 form-group">
          <label>STATUS IN SAP</label>
          <AWSMDropdown
            value={value.status_awsm}
            disabled={scheduler}
            items={["Active", "Inactive"]}
            onChange={value => onFieldChange("status_awsm", value)}
          />
        </div>
        <div className="col-3 form-group">
          <label>FLOW RATE (L/MIN)</label>
          <AWSMInputNumber
            defaultValue={value.flow_rate}
            disabled={scheduler}
            onChange={value => onFieldChange("flow_rate", value)}
            // max={10000}
          />
          {renderExceedError("flow_rate", 10000)}
        </div>
      </div>
      <h6 className="font-weight-bold">VOLUME CAPPING</h6>
      <div className="row pt-2">
        <div className="col-3 form-group">
          <label>FROM TO DATE 1</label>
          <DateRangePicker
            defaultValue={value.volume_capping_date_range}
            disabled={scheduler}
            onChange={value =>
              onFieldChange("volume_capping_date_range", value)
            }
          />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="volume1">VOLUME (L) 1</label>
          <AWSMInputNumber
            defaultValue={value.volume_capping_volume}
            disabled={scheduler}
            items={["Lorem Ipsum"]}
            onChange={value => onFieldChange("volume_capping_volume", value)}
            // max={10000000}
          />
          {renderExceedError("volume_capping_volume", 10000000)}
        </div>
        <div className="col-6 form-group">
          <label>REMARKS 1</label>
          <AWSMInput
            defaultValue={value.volume_capping_remarks}
            disabled={scheduler}
            onChange={value => onFieldChange("volume_capping_remarks", value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 form-group">
          <label>FROM TO DATE 2</label>
          <DateRangePicker
            defaultValue={value.volume_capping_date_range_2}
            disabled={scheduler}
            onChange={value =>
              onFieldChange("volume_capping_date_range_2", value)
            }
          />
        </div>
        <div className="col-3 form-group">
          <label>VOLUME (L) 2</label>
          <AWSMInputNumber
            defaultValue={value.volume_capping_volume_2}
            disabled={scheduler}
            items={["Lorem Ipsum"]}
            onChange={value => onFieldChange("volume_capping_volume_2", value)}
            // max={10000000}
          />
          {renderExceedError("volume_capping_volume_2", 10000000)}
        </div>
        <div className="col-6 form-group">
          <label htmlFor="remarks2">REMARKS 2</label>
          <AWSMInput
            defaultValue={value.volume_capping_remarks_2}
            disabled={scheduler}
            onChange={value => onFieldChange("volume_capping_remarks_2", value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
