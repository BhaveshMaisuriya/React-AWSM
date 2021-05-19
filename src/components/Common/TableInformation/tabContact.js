import React, { Fragment } from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Col, Row } from "reactstrap"
import "./tabContact.scss"

// Dummy contacts data
const contactsDummy = [
  {
    id: "1",
    contact_name: "John Doe",
    contact_phone: "123456789",
    contact_email: "john.doe@petronas.com",
    contact_position: "Executive",
  },
];

const tabContact = ({ scheduler }) => {
  return(
    <Fragment>
    {[0, 1, 2].map((item, index) => {
      const contactInfo =
        contactsDummy.length > item ? contactsDummy[item] : null
      return (
        <div key={index}>
          <h5>Contact Person {item + 1}</h5>
          <Row>
            <Col className="col-6">
              <AvForm>
                <AvField
                  name="contact_name"
                  placeholder="Name (etc: John Doe)"
                  value={contactInfo ? contactInfo.contact_name : ""}
                  disabled={contactInfo || scheduler ? true : false}
                  className={contactInfo || scheduler ? "disabledField" : ""}
                />
              </AvForm>
            </Col>
            <Col className="col-6">
              <AvForm>
                <AvField
                  name="contact_phone"
                  type="number"
                  placeholder="Contact No. (etc: 011-234556799)"
                  value={contactInfo ? contactInfo.contact_phone : ""}
                  disabled={contactInfo || scheduler ? true : false}
                  className={contactInfo || scheduler ? "disabledField" : ""}
                  validate={{
                    max: {
                      value: 10000000,
                      errorMessage: "Maximum quota within 10,000,000 only",
                    },
                  }}
                />
              </AvForm>
            </Col>
          </Row>
          <Row>
            <Col className="col-6">
              <AvForm>
                <AvField
                  name="contact_email"
                  placeholder="Email (etc: johndoe@petronas.com)"
                  value={contactInfo ? contactInfo.contact_email : ""}
                  disabled={contactInfo || scheduler ? true : false}
                  className={contactInfo || scheduler ? "disabledField" : ""}
                />
              </AvForm>
            </Col>
            <Col className="col-6">
              <AvForm>
                <AvField
                  name="contact_position"
                  placeholder="Position (etc: Executive)"
                  value={contactInfo ? contactInfo.contact_position : ""}
                  disabled={contactInfo || scheduler ? true : false}
                  className={contactInfo || scheduler ? "disabledField" : ""}
                />
              </AvForm>
            </Col>
          </Row>
        </div>
      )
    })}
    <div>
      <h5>Territory Manager</h5>
      <Row>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="contact_name"
              placeholder="Name (etc: John Doe)"
              value={contactsDummy ? contactsDummy.contact_name : ""}
              disabled={true}
              className="disabledField"
            />
          </AvForm>
        </Col>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="contact_phone"
              type="number"
              placeholder="Contact No. (etc: 011-234556799)"
              value={contactsDummy ? contactsDummy.contact_phone : ""}
              disabled={true}
              className="disabledField"
              validate={{
                max: {
                  value: 10000000,
                  errorMessage: "Maximum quota within 10,000,000 only",
                },
              }}
            />
          </AvForm>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="contact_email"
              placeholder="Email (etc: johndoe@petronas.com)"
              value={contactsDummy ? contactsDummy.contact_email : ""}
              disabled={true}
              className="disabledField"
            />
          </AvForm>
        </Col>
        <Col className="col-6"></Col>
      </Row>
    </div>
    <div>
      <h5>Retail Sales Manager</h5>
      <Row>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="contact_name"
              placeholder="Name (etc: John Doe)"
              value={contactsDummy ? contactsDummy.contact_name : ""}
              disabled={scheduler ? true : false}
              className={scheduler ? "disabledField" : ""}
            />
          </AvForm>
        </Col>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="contact_phone"
              type="number"
              placeholder="Contact No. (etc: 011-234556799)"
              value={contactsDummy ? contactsDummy.contact_phone : ""}
              disabled={scheduler ? true : false}
              className={scheduler ? "disabledField" : ""}
              validate={{
                max: {
                  value: 10000000,
                  errorMessage: "Maximum quota within 10,000,000 only",
                },
              }}
            />
          </AvForm>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="contact_email"
              placeholder="Email (etc: johndoe@petronas.com)"
              value={contactsDummy ? contactsDummy.contact_email : ""}
              disabled={scheduler ? true : false}
              className={scheduler ? "disabledField" : ""}
            />
          </AvForm>
        </Col>
        <Col className="col-6"></Col>
      </Row>
    </div>
  </Fragment>
  )
}

export default tabContact
