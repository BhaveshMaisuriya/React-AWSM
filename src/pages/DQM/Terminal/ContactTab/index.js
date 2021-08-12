import React,{ useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { isScheduler } from "../../../../helpers/auth_helper"
import { isEqual } from "lodash"
import AWSMInput from "components/Common/Input"

const ContactTab = (props) => {
  const [data,setData] = useState(props.data)

  useEffect(() => {
    props.onChange(data)
  }, [data])

  const handleSubmit = values => {
    console.log(values)
  }
  const isDisabledField = isScheduler()
  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {props => {
        if(!isEqual(data,props.values)){
          setData(props.values)
        }
        return (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="supervisor.name">SUPERVISOR CONTACT NAME</label>
                <AWSMInput
                  type="text"
                  name="supervisor.name"
                  id="supervisorName"
                  className="form-control"
                  value={props?.values?.supervisor?.name}
                  placeholder="Name (etc: John Doe)"
                  disabled={isDisabledField}
                  onChange={props.handleChange}
                />
                <ErrorMessage name="supervisor.name" component="div" />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="supervisor.number">
                  SUPERVISOR CONTACT NUMBER
                </label>
                <AWSMInput
                  name="supervisor.number"
                  id="supervisorNumber"
                  className="form-control"
                  value={props?.values?.supervisor?.number}
                  onChange={props.handleChange}
                  placeholder="Contact No. (etc: 011-23456789)"
                  disabled={isDisabledField}
                />
                <ErrorMessage name="supervisorNumber" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="supervisor.email">SUPERVISOR EMAIL</label>
                <AWSMInput
                  type="email"
                  id="supervisorEmail"
                  name="supervisor.email"
                  className="form-control"
                  value={props?.values?.supervisor?.email}
                  onChange={props.handleChange}
                  placeholder="Email (etc: johndoe@petronas.com"
                  disabled={isDisabledField}
                />
                <ErrorMessage name="supervisorEmail" component="div" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="superintendant.name">
                  SUPERINTENDANT CONTACT NAME
                </label>
                <AWSMInput
                  type="text"
                  id="superintendantName"
                  name="superintendant.name"
                  className="form-control"
                  value={props?.values?.superintendant?.name}
                  onChange={props.handleChange}
                  placeholder="Name (etc: John Doe)"
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendant.name" component="div" />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="superintendant.number">
                  SUPERINTENDANT CONTACT NUMBER
                </label>
                <AWSMInput
                  id="superintendantNumber"
                  name="superintendant.number"
                  className="form-control"
                  value={props?.values?.superintendant?.number}
                  onChange={props.handleChange}
                  placeholder="Contact No. (etc: 011-23456789)"
                  disabled={isDisabledField}
                />

                <ErrorMessage name="superintendant.number" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="superintendant.email">
                  SUPERINTENDANT EMAIL
                </label>
                <AWSMInput
                  type="email"
                  id="superintendantEmail"
                  name="superintendant.email"
                  className="form-control"
                  placeholder="Email (etc: johndoe@petronas.com"
                  value={props?.values?.superintendant?.email}
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendant.email" component="div" />
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ContactTab
