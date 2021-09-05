import React, { useEffect, useMemo } from "react"
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
        contactList.push({ data: data.contact[key] || {}, key: key, disabled: key.split("").pop() === "1" });
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
      console.log("pattern::", newContactData)
      if (!newContactData[`contact_${index + 1}`]) {
        newContactData[`contact_${index + 1}`] = {}
      }
      newContactData[`contact_${index + 1}`] = { ...newContactData[`contact_${index + 1}`], [key]: value }
      if (onChange) {
        onChange("contact", newContactData)
      }
  }

  const onParentFieldChange = (key, subKey, value) => {
    const newData = { ...data[key] }
    newData[subKey] = value
    if (onChange) {
      onChange(key, newData)
    }
  }

  const pathName = window.location.pathname

  return (
    <div className='pr-23'>
      <div className="d-flex align-items-center justify-content-end">
        <p>
          <i className="last-updated-sub-title">{`Contact Last Updated By: ${data.contact?.updated_by || ""} on ${data.contact?.updated_at || ""}`}</i>
        </p>
      </div>
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
                      className={!!(item.disabled || scheduler) ? "disabledField" : "awsm-input"}
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
                      className={item.disabled || scheduler ? "disabledField" : "awsm-input"}
                      onChange={e => onFieldChange(index, "number", e.target.value)}
                      validate={{
                        pattern:{value: '^\\+?[0-9- ]+$'},
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
                      className={item.disabled || scheduler ? "disabledField" : "awsm-input"}                     
                      validate={{
                        pattern:{value: '/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/'},
                      }}
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
                      disabled={scheduler || (item.disabled && pathName === "/commercial-customer")}
                      className={scheduler ? "disabledField" : "awsm-input"}
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
                disabled={true}//!!scheduler
                className={scheduler ? "disabledField" : "awsm-input"}
                onChange={e => onParentFieldChange("territory_manager", "name", e.target.value)}
              />
            </AvForm>
          </Col>
          <Col className="col-6">
            <AvForm>
              <AvField
                name="contact_phone"
                placeholder="Contact No. (etc: 011-234556799)"
                value={data.territory_manager ? data.territory_manager.number || "" : ""}
                disabled={true}//!!scheduler
                className={scheduler ? "disabledField" : "awsm-input"}
                validate={{
                  pattern:{ value: '^\\+?[0-9- ]+$' },
                }}
                onChange={e => onParentFieldChange("territory_manager", "number", e.target.value)}
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
                disabled={true}//!!scheduler
                className={scheduler ? "disabledField" : "awsm-input"}
                onChange={e => onParentFieldChange("territory_manager", "email", e.target.value)}
                validate={{
                  pattern:{value: ' /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/'},
                }}
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
                className={scheduler ? "disabledField" : "awsm-input"}
                onChange={e => onParentFieldChange("retail_sales_manager", "name", e.target.value)}
              />
            </AvForm>
          </Col>
          <Col className="col-6">
            <AvForm>
              <AvField
                name="contact_phone"
                placeholder="Contact No. (etc: 011-234556799)"
                value={data.retail_sales_manager ? data.retail_sales_manager.number || "" : ""}
                disabled={!!scheduler}
                className={scheduler ? "disabledField" : "awsm-input"}
                validate={{
                  pattern:{ value: '^\\+?[0-9- ]+$' },
                }}
                onChange={e => onParentFieldChange("retail_sales_manager", "number", e.target.value)}
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
                className={scheduler ? "disabledField" : "awsm-input"}
                onChange={e => onParentFieldChange("retail_sales_manager", "email", e.target.value)}
                validate={{
                  pattern:{value: ' /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/'},
                }}
              />
            </AvForm>
          </Col>
          <Col className="col-6"/>
        </Row>
      </div>
    </div>
  )
}

export default tabContact
