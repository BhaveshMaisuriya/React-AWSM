import React,{ useState, useEffect } from "react"
import { Formik, Form, Field } from "formik"

const AddressTab = (props) => {
  const [data,setData] = useState(props.data)
  const handleSubmit = values => {
    console.log(values)
  }

  useEffect(() => {
      props.onChange(data)
  }, [data])

  const handleOnChangeValue = (e) =>{
    let newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
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
                  id="address_1"
                  className="form-control"
                  value={data?.address_1}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="city">CITY</label>
                <Field
                  type="text"
                  id="city"
                  className="form-control"
                  value={data?.city}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
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
                  value={data?.postcode}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="state">STATE</label>
                <Field
                  type="text"
                  id="state"
                  className="form-control"
                  value={data?.state}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="region">REGION</label>
                <Field
                  type="text"
                  id="region_name"
                  className="form-control"
                  value={data?.region_name}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="country">COUNTRY</label>
                <Field
                  type="text"
                  id="country"
                  className="form-control"
                  value={data?.country}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
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
                  value={data?.latitude}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="longitude">LONGITUDE</label>
                <Field
                  type="text"
                  id="longitude"
                  className="form-control"
                  value={data?.longitude}
                  onChange={(e)=>handleOnChangeValue(e)}
                  disabled
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
