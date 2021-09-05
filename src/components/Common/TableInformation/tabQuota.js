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
    if (!newStorageData[key]) {
      newStorageData[key] = {}
    }
    newStorageData[key] = { ...newStorageData[key], [subKey]: value }
    setStorageData(newStorageData)
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  return (
    <>
      {Object.keys(storageData).map((key, index) =>  key.startsWith("storage_") ? (
         <div className="dqm-address-container" id="dqm-address-container">
         <div>
           <div className="row mt-3">
          <Col className="col-6">
            <AvForm>
              <AvField
                name="code"
                label="PRODUCT CODE"
                value={storageData[key] ? storageData[key].code || "" : ""}
                disabled
                className="disabledField"
              />
            </AvForm>
          </Col>
          <Col className="col-6">
            <AvForm>
              <AvField  
                name="monthly_fixed_quota"
                type="number"
                label="MONTHLY FIXED QUOTA"
                value={storageData[key] ? storageData[key].monthly_fixed_quota || "" : ""}
                placeholder="Quota (etc: 10,000,000)"
                validate={{
                  max: {
                    value: 10000000,
                    errorMessage: "Must not exceed 10,000,000",
                  },
                }}
                className={scheduler ? "disabledField" : 'awsm-input'}
                disabled={scheduler}
                onChange={(e) => onUpdateField(key, "monthly_fixed_quota", e.target.value)}
              />
            </AvForm>
          </Col>
        </div>
        </div>
        </div>
      ) : null)}
    </>
  )
}

export default tabQuota
