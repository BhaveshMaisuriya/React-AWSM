import React, { Fragment } from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Col, Row } from "reactstrap"
import "./tabQuota.scss"

const tabQuota = ({ scheduler, storageData }) => {
  return (
    <Fragment>
      {storageData.length > 0 &&
        storageData.map((item, index) => {
          return (
            <Row key={index}>
              <Col className="col-6">
                <AvForm>
                  <AvField
                    name="product_code"
                    label="PRODUCT CODE (QUOTA)"
                    value="Active"
                    disabled
                    className="disabledField"
                  />
                </AvForm>
              </Col>
              <Col className="col-6">
                <AvForm>
                  <AvField
                    name="monthly_quota"
                    type="number"
                    label="MONTHLY FIXED QUOTA"
                    value="Quota (etc: 10,000,000)"
                    placeholder='Quota (etc: 10,000,000)'
                    validate={{
                      max: {
                        value: 10000000,
                        errorMessage: "Maximum quota within 10,000,000 only",
                      },
                    }}
                    className={scheduler ? "disabledField" : null}
                    disabled={scheduler}
                  />
                </AvForm>
              </Col>
            </Row>
          )
        })}
    </Fragment>
  )
}

export default tabQuota
