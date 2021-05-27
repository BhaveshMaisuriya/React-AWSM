import React, { useMemo } from "react"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { Col, Row } from "reactstrap"
import "./tabContact.scss"

const tabContact = ({ scheduler, data, onChange }) => {
  const contactList = useMemo(() => {
    const contactList = []
    if(!data.contact) {
      return []
    }
    for (const key in data.contact) {
      if (data.contact.hasOwnProperty(key) && /^contact_[1,2,3]$/.test(key)) {
        contactList.push({ data: data.contact[key] || {}, key: key, disabled: data.contact[key] != null});
      }
    }
    return [0, 1, 2].map(item => {
      return contactList.length > item ? contactList[item] : {
        data: {},
        key: `contact_${item + 1}`,
        disabled: false
      };
    })
  }, [data]);

  const onFieldChange = (index, key, value) => {
    const newContactData = {...data.contact}
    if (!newContactData[`contact_${index + 1}`]) {
      newContactData[`contact_${index + 1}`] = {}
    }
    newContactData[`contact_${index + 1}`][key] = value;
    if (onChange) {
      onChange("contact", newContactData)
    }
  }

  return (
    <>
      {contactList.map((item, index) => {
          return (
            <div key={index}>
              <h5>Contact Person {index + 1}</h5>
              <Row>
                <Col className="col-6">
                  <AvForm>
                    <AvField
                      name="name"
                      placeholder="Name (etc: John Doe)"
                      value={item.data.name || ""}
                      disabled={!!(item.disabled || scheduler)}
                      className={!!(item.disabled || scheduler) ? "disabledField" : ""}
                      onChange={e => onFieldChange(index, "name", e.target.value)}
                    />
                  </AvForm>
                </Col>
                <Col className="col-6">
                  <AvForm>
                    <AvField
                      name="number"
                      placeholder="Contact No. (etc: 011-234556799)"
                      value={item.data.number || ""}
                      disabled={!!(item.disabled || scheduler)}
                      className={item.disabled || scheduler ? "disabledField" : ""}
                      onChange={e => onFieldChange(index, "number", e.target.value)}
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
                      name="email"
                      placeholder="Email (etc: johndoe@petronas.com)"
                      value={item.data.email || ""}
                      disabled={!!(item.disabled || scheduler)}
                      className={item.disabled || scheduler ? "disabledField" : ""}
                      onChange={e => onFieldChange(index, "email", e.target.value)}
                    />
                  </AvForm>
                </Col>
                <Col className="col-6">
                  <AvForm>
                    <AvField
                      name="contact_position"
                      placeholder="Position (etc: Executive)"
                      value={item.data.position || ""}
                      disabled={!!(item.disabled || scheduler)}
                      className={item.disabled || scheduler ? "disabledField" : ""}
                      onChange={e => onFieldChange(index, "position", e.target.value)}
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
                value={data.territory_manager ? data.territory_manager.name || "" : ""}
                disabled={!!scheduler}
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
                value={data.territory_manager ? data.territory_manager.number || "" : ""}
                disabled={!!scheduler}
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
                value={data.territory_manager ? data.territory_manager.email || "" : ""}
                disabled={!!scheduler}
                className={scheduler ? "disabledField" : ""}
              />
            </AvForm>
          </Col>
          <Col className="col-6"/>
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
                value={data.retail_sales_manager ? data.retail_sales_manager.name || "" : ""}
                disabled={!!scheduler}
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
                value={data.retail_sales_manager ? data.retail_sales_manager.number || "" : ""}
                disabled={!!scheduler}
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
                value={data.retail_sales_manager ? data.retail_sales_manager.email || "" : ""}
                disabled={!!scheduler}
                className={scheduler ? "disabledField" : ""}
              />
            </AvForm>
          </Col>
          <Col className="col-6"/>
        </Row>
      </div>
    </>
  )
}

export default tabContact
