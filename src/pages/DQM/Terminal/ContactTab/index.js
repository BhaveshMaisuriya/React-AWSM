import React,{ useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { isScheduler } from "../../../../helpers/auth_helper"
import { isEqual } from "lodash"
import { allowOnlyPhoneNumber, formatNumberInput } from "../format_number_input_helper"
import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"

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

        const onHandlePhoneChange = (evt)=>{
          const value = evt.target.value;
          const regExp = new RegExp(/^[0-9 +-]+$/) // accept only numbers, plus (+) and minus(-)
          // Validate when user try to copy and paste a plain text into phone number value
          if(value && !value.match(regExp)){
            return evt.preventDefault();
          }
          props.handleChange(evt)
        }

        return (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="supervisor.name">SUPERVISOR CONTACT NAME</label>
                <Field
                  type="text"
                  name="supervisor.name"
                  id="supervisorName"
                  className="form-control awsm-input"
                  value={props?.values?.supervisor?.name}
                  placeholder={isDisabledField ? "": "Name (etc: John Doe)"}
                  disabled={isDisabledField}
                  onChange={props.handleChange}
                />
                <ErrorMessage name="supervisor.name" component="div" />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="supervisor.number">
                  SUPERVISOR CONTACT NUMBER
                </label>
                <Field
                  type="text"
                  name="supervisor.number"
                  id="supervisorNumber"
                  className="form-control awsm-input"
                  value={props?.values?.supervisor?.number}
                  onChange={onHandlePhoneChange}
                  onKeyDown={allowOnlyPhoneNumber}
                  placeholder={isDisabledField ? "" : "Numeric only"}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="supervisorNumber" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">                
                <AvForm>
                <label htmlFor="supervisor.email">SUPERVISOR EMAIL</label>
                    <AvField
                      name="email"
                      placeholder="Email (etc: johndoe@petronas.com)"
                      name="supervisor.email"
                      value={props?.values?.supervisor?.email}
                      disabled={isDisabledField}
                      className="form-control awsm-input"
                      type='email'
                      validate={{
                        pattern: {value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$', errorMessage: 'Incorrect format,please re-check the email address'},
                      }}
                      onChange={props.handleChange}
                    />
                  </AvForm>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="superintendant.name">
                  SUPERINTENDANT CONTACT NAME
                </label>
                <Field
                  type="text"
                  id="superintendantName"
                  name="superintendant.name"
                  className="form-control awsm-input"
                  value={props?.values?.superintendant?.name}
                  onChange={props.handleChange}
                  placeholder={isDisabledField ? "" : "Name (etc: John Doe)"}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendant.name" component="div" />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="superintendant.number">
                  SUPERINTENDANT CONTACT NUMBER
                </label>
                <Field
                  type="text"
                  id="superintendantNumber"
                  name="superintendant.number"
                  className="form-control awsm-input"
                  value={props?.values?.superintendant?.number}
                  onChange={onHandlePhoneChange}
                  onKeyDown={allowOnlyPhoneNumber}
                  placeholder={isDisabledField ? "" : "Numeric only"}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendant.number" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
              <AvForm>
                <label htmlFor="supervisor.email"> SUPERINTENDANT EMAIL</label>
                    <AvField
                      name="email"
                      name="superintendant.email"
                      placeholder="Email (etc: johndoe@petronas.com)"
                      value={props?.values?.superintendant?.email}
                      disabled={isDisabledField}
                      className="form-control awsm-input"
                      type='email'
                      validate={{
                        pattern: {value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$', errorMessage: 'Incorrect format,please re-check the email address'},
                      }}
                      onChange={props.handleChange}
                    />
                  </AvForm>

                {/* <label htmlFor="superintendant.email">
                  SUPERINTENDANT EMAIL
                </label>
                <Field
                  type="email"
                  id="superintendantEmail"
                  name="superintendant.email"
                  className="form-control awsm-input"
                  placeholder={isDisabledField ? "" : "Email (etc: johndoe@petronas.com"}
                  value={props?.values?.superintendant?.email}
                  onChange={props.handleChange}
                  disabled={isDisabledField}
                />
                <ErrorMessage name="superintendant.email" component="div" /> */}
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ContactTab