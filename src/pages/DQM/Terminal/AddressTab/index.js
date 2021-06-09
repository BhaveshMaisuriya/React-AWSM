import React from "react"
import { Formik, Form, Field } from "formik"

const AddressTab = (props) => {
  const { data } = props
  const handleSubmit = values => {
    console.log(values)
  }
  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {props => {
        return (
          <Form>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="address">ADDRESS</label>
                <Field
                  type="text"
                  id="address"
                  className="form-control"
                  disabled
                  value={props.values.address_1}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="city">CITY</label>
                <Field
                  type="text"
                  id="city"
                  className="form-control"
                  disabled
                  value={props.values.city}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="postcode">POSTCODE</label>
                <Field
                  type="text"
                  id="postcode"
                  className="form-control"
                  disabled
                  value={props.values.postcode}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="state">STATE</label>
                <Field
                  type="text"
                  id="state"
                  className="form-control"
                  disabled
                  value={props.values.state}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="region">REGION</label>
                <Field
                  type="text"
                  id="region"
                  className="form-control"
                  disabled
                  value={props.values.region_name}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="country">COUNTRY</label>
                <Field
                  type="text"
                  id="country"
                  className="form-control"
                  disabled
                  value={props.values.country}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="latitude">LATITUDE</label>
                <Field
                  type="text"
                  id="latitude"
                  className="form-control"
                  disabled
                  value={props.values.latitude}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="longitude">LONGITUDE</label>
                <Field
                  type="text"
                  id="longitude"
                  className="form-control"
                  disabled
                  value={props.values.longitude}
                />
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddressTab
