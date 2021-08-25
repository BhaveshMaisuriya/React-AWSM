import React, { useState, useEffect, useRef } from "react"
import { Formik, Form, Field } from "formik"
import { isScheduler } from "helpers/auth_helper"
import { formatNumberInput } from "../format_number_input_helper"

const placeholderNormalText = "Type something here..."
const placeholderNumberOnly = "Numeric only"
const AddressTab = (props) => {
  const [data, setData] = useState(props.data)
  const handleSubmit = values => {
    console.log(values)
  }

  useEffect(() => {
    props.onChange(data)
  }, [data])

  const handleOnChangeValue = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }
  const isDisabledField = isScheduler()


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
                  id="address_1"
                  className="form-control awsm-input"
                  value={data?.address_1}
                  onChange={(e) => handleOnChangeValue(e)}
                  disabled
                  // placeholder={isDisabledField ? "" : placeholderNormalText}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="city">CITY</label>
                <Field
                  type="text"
                  id="city"
                  className="form-control awsm-input"
                  value={data?.city}
                  onChange={(e) => handleOnChangeValue(e)}
                  disabled
                  // placeholder={isDisabledField ? "" : placeholderNormalText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="postcode">POSTCODE</label>
                <Field
                  type="text"
                  id="postcode"
                  className="form-control awsm-input"
                  value={data?.postcode}
                  onChange={(e) => handleOnChangeValue(e)}
                  disabled
                  // placeholder={isDisabledField ? "" : placeholderNormalText}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="state">STATE</label>
                <Field
                  type="text"
                  id="state"
                  className="form-control awsm-input"
                  value={data?.state}
                  onChange={(e) => handleOnChangeValue(e)}
                  disabled
                  // placeholder={isDisabledField ? "" : placeholderNormalText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="region">REGION</label>
                <Field
                  type="text"
                  id="region_name"
                  className="form-control awsm-input"
                  value={data?.region_name}
                  onChange={(e) => handleOnChangeValue(e)}
                  disabled
                  // placeholder={isDisabledField ? "" : placeholderNormalText}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="country">COUNTRY</label>
                <Field
                  type="text"
                  id="country"
                  className="form-control awsm-input"
                  value={data?.country}
                  onChange={(e) => handleOnChangeValue(e)}
                  disabled
                  // placeholder={isDisabledField ? "" : placeholderNormalText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="latitude">LATITUDE</label>
                <Field
                  type="number"
                  id="latitude"
                  className="form-control awsm-input"
                  value={data?.latitude}
                  onChange={(e) => handleOnChangeValue(e)}
                  onKeyDown={formatNumberInput(["e", "E", "+", "-","ê", "Ê"])}
                  disabled={isDisabledField}
                  placeholder={isDisabledField ? "" : placeholderNumberOnly}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="longitude">LONGITUDE</label>
                <Field
                  type="number"
                  id="longitude"
                  className="form-control awsm-input"
                  value={data?.longitude}
                  onChange={(e) => handleOnChangeValue(e)}
                  onKeyDown={formatNumberInput(["e", "E", "+", "-","ê", "Ê"])}
                  disabled={isDisabledField}
                  placeholder={isDisabledField ? "" : placeholderNumberOnly}
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
