import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { isScheduler } from "../../../../helpers/auth_helper"

const ContactTab = (props) => {
  const { data } = props;
  const handleSubmit = values => {
    console.log(values)
  }
  const isDisabledField = isScheduler()

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {props => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="supervisorName">SUPERVISOR CONTACT NAME</label>
                <Field
                  type="text"
                  name="supervisorName"
                  id="supervisorName"
                  className="form-control"
                  value={props.values.supervisor.name}
                  placeholder="Type something here..."
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="supervisorName" component="div" />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="supervisorNumber">
                  SUPERVISOR CONTACT NUMBER
                </label>
                <Field
                  name="supervisorNumber"
                  id="supervisorNumber"
                  className="form-control"
                  value={props.values.supervisor.number}
                  placeholder="Numeric only"
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="supervisorNumber" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="supervisorEmail">SUPERVISOR EMAIL</label>
                <Field
                  type="email"
                  id="supervisorEmail"
                  name="supervisorEmail"
                  className="form-control"
                  value={props.values.supervisor.email}
                  placeholder="Type something here..."
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="supervisorEmail" component="div" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="superintendantName">
                  SUPERINTENDANT CONTACT NAME
                </label>
                <Field
                  type="text"
                  id="superintendantName"
                  name="superintendantName"
                  className="form-control"
                  value={props.values.superintendant.name}
                  placeholder="Type something here..."
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendantName" component="div" />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="superintendantNumber">
                  SUPERINTENDANT CONTACT NUMBER
                </label>
                <Field
                  id="superintendantNumber"
                  name="superintendantNumber"
                  className="form-control"
                  value={props.values.superintendant.number}
                  placeholder="Numeric only"
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />

                <ErrorMessage name="superintendantNumber" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="superintendantEmail">
                  SUPERINTENDANT EMAIL
                </label>
                <Field
                  type="email"
                  id="superintendantEmail"
                  name="superintendantEmail"
                  className="form-control"
                  placeholder="Type something here..."
                  value={props.values.superintendant.email}
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendantEmail" component="div" />
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ContactTab
