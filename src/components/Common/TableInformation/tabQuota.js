import React, { useEffect, useState } from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Col, Row } from "reactstrap"
import "./tabQuota.scss"

const tabQuota = ({ scheduler, data, onChange }) => {
  const [storageData, setStorageData] = useState(data.storage)

  useEffect(() => {
    setStorageData(data.storage)
  }, [data])

  const onUpdateField = (key, subKey, value) => {
    const newStorageData = { ...storageData }
    newStorageData[key][subKey] = value
    setStorageData(newStorageData)
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  return (
    <>
      {Object.keys(storageData).map((key, index) => (
        <Row>
          <Col className="col-6">
            <AvForm>
              <AvField
                name="product_code"
                label="PRODUCT CODE (QUOTA)"
                value={storageData[key].product_code || ""}
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
                value={storageData[key].product_code_quota || ""}
                placeholder="Quota (etc: 10,000,000)"
                validate={{
                  max: {
                    value: 10000000,
                    errorMessage: "Maximum quota within 10,000,000 only",
                  },
                }}
                className={scheduler ? "disabledField" : null}
                disabled={scheduler}
                onChange={(e) => onUpdateField(key, "product_code_quota", e.target.value)}
              />
            </AvForm>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default tabQuota
