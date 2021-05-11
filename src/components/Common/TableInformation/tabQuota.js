import React from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Col, Row } from "reactstrap"
import "./tabQuota.scss"

const tabQuota = () => {
  return (
    <Row>
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
            validate={{
              max: {
                value: 10000000,
                errorMessage: "Maximum quota within 10,000,000 only",
              },
            }}
            className="abc"
          />
        </AvForm>
      </Col>
    </Row>
  )
}

export default tabQuota
