import React, { useState } from "react"
import DateRangePicker from "../../../../components/Common/DateRangePicker"
import AWSMInput from "../../../../components/Common/Input"
import AWSMInputNumber from "../../../../components/Common/InputNumber"
import AWSMDropdown from "../../../../components/Common/Dropdown"
import "./Product.scss"

const Product = ({ value, productKey, onChange, scheduler, onDelete }) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)

  const onFieldChange = (fieldKey, fieldValue) => {
    const newValue = { ...value }
    newValue[fieldKey] = fieldValue
    if (onChange) {
      onChange(newValue)
    }
  }

  const onCancel = () => {
    setIsConfirmDelete(false)
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
        <button
          className="btn-delete-product"
          onClick={() => setIsConfirmDelete(true)}
          disabled={scheduler}
        >
          Delete Product
        </button>
      </div>
      <div className="row">
        <div className="col-3 form-group">
          <label htmlFor="productName">PRODUCT NAME</label>
          <AWSMInputNumber
            value={value.name}
            placeholder="Numeric only"
            disabled
          />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="productCode">PRODUCT CODE</label>
          <AWSMInputNumber
            value={value.code}
            placeholder="Numeric only"
            disabled
          />
        </div>
        <div className="col-3 form-group">
          <label>STATUS IN SAP</label>
          <AWSMDropdown
            value={value.status_awsm}
            disabled={scheduler}
            items={["ACTIVE", "DELETE"]}
            onChange={value => onFieldChange("status_awsm", value)}
          />
        </div>
        <div className="col-3 form-group">
          <label>FLOW RATE (L/MIN)</label>
          <AWSMInputNumber
            value={value.flow_rate}
            disabled={scheduler}
            onChange={value => onFieldChange("flow_rate", value)}
          />
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
          <AWSMDropdown
            value={value.volume_capping_volume}
            disabled={scheduler}
            items={["Lorem Ipsum", "Hello world"]}
            onChange={value => onFieldChange("volume_capping_volume", value)}
          />
        </div>
        <div className="col-6 form-group">
          <label>REMARKS 1</label>
          <AWSMInput
            value={value.volume_capping_remarks}
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
          <AWSMDropdown
            value={value.volume_capping_volume_2}
            disabled={scheduler}
            items={["Lorem Ipsum", "Hello world"]}
            onChange={value => onFieldChange("volume_capping_volume_2", value)}
          />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="remarks2">REMARKS 2</label>
          <AWSMInput
            value={value.volume_capping_remarks_2}
            disabled={scheduler}
            onChange={value => onFieldChange("volume_capping_remarks_2", value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
