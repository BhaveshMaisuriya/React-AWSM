import React from "react"
import { Field } from "formik"
import PopOverCalendar from "../../../../components/Common/TableInformation/components/PopOverCalendar"

const Product = props => {
  return (
    <div>
      <h6 className="my-3">PRODUCT {props.index + 1}</h6>
      <div className="row">
        <div className="col-3 form-group">
          <label htmlFor="productName">PRODUCT NAME</label>
          <Field
            className="form-control"
            id="productName"
            type="number"
            name="productName"
            value={props.values.productName}
            placeholder="Numeric only"
            onChange={props.handleChange}
            disabled
          />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="productCode">PRODUCT CODE</label>
          <Field
            className="form-control"
            id="productCode"
            type="number"
            name="productCode"
            value={props.values.productCode}
            placeholder="Numeric only"
            onChange={props.handleChange}
            disabled
          />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="statusInSap">STATUS IN SAP</label>
          <Field
            className="form-control"
            id="statusInSap"
            type="number"
            as="select"
            name="statusInSap"
            value={props.values.statusInSap}
            onChange={props.handleChange}
            disabled={props.scheduler}
          >
            <option value="active">ACTIVE</option>
            <option value="delete">DELETE</option>
          </Field>
        </div>
        <div className="col-3 form-group">
          <label htmlFor="flowRate">FLOW RATE (L/MIN)</label>
          <Field
            className="form-control"
            id="flowRate"
            type="number"
            name="flowRate"
            value={props.values.flowRate}
            placeholder="Numeric only"
            onChange={props.handleChange}
            disabled={props.scheduler}
          />
        </div>
      </div>
      <h6>VOLUME CAPPING</h6>
      <div className="row">
        <div className="col-3 form-group">
          <label>FROM TO DATE 1</label>
          <PopOverCalendar range={true} disabled={props.scheduler}>
            <Field
              className="form-control"
              id="fromToDate1"
              type="number"
              name="fromToDate1"
              value={props.values.fromToDate1}
              onChange={props.handleChange}
              disabled={props.scheduler}
            />
          </PopOverCalendar>
        </div>
        <div className="col-3 form-group">
          <label htmlFor="volume1">VOLUME (L) 1</label>
          <Field
            className="form-control"
            id="volume1"
            type="number"
            as="select"
            name="volume1"
            value={props.values.volume1}
            onChange={props.handleChange}
            disabled={props.scheduler}
          >
            <option value="active">Lorem Ipsum</option>
            <option value="delete">Hello world</option>
          </Field>
        </div>
        <div className="col-6 form-group">
          <label htmlFor="remarks1">REMARKS 1</label>
          <Field
            className="form-control"
            id="remarks1"
            type="number"
            name="remarks1"
            value={props.values.remarks1}
            onChange={props.handleChange}
            placeholder="Type something here..."
            disabled={props.scheduler}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 form-group">
          <label>FROM TO DATE 2</label>
          <PopOverCalendar range={true} disabled={props.scheduler}>
            <Field
              className="form-control"
              id="fromToDate2"
              type="number"
              name="fromToDate2"
              value={props.values.fromToDate2}
              onChange={props.handleChange}
              disabled={props.scheduler}
            />
          </PopOverCalendar>
        </div>
        <div className="col-3 form-group">
          <label htmlFor="volume2">VOLUME (L) 2</label>
          <Field
            className="form-control"
            id="volume2"
            type="number"
            as="select"
            name="volume2"
            value={props.values.volume2}
            onChange={props.handleChange}
            disabled={props.scheduler}
          >
            <option value="active">Lorem Ipsum</option>
            <option value="delete">Hello world</option>
          </Field>
        </div>
        <div className="col-6 form-group">
          <label htmlFor="remarks2">REMARKS 2</label>
          <Field
            className="form-control"
            id="remarks2"
            type="number"
            name="remarks2"
            value={props.values.remarks2}
            onChange={props.handleChange}
            placeholder="Type something here..."
            disabled={props.scheduler}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
