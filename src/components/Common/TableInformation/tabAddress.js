import React, { useMemo } from "react"
import { Col, Row } from "reactstrap"
import AWSMInput from "../Input"
import "./tab-address.scss"
import AWSMDropdown from "../Dropdown"
import AWSMInputNumber from "../InputNumber"

const TabAddress = ({ scheduler, data, onChange }) => {
  const addressData = useMemo(() => {
    return data.address || {}
  }, [data])

  const onFieldChange = (key, value) => {
    const newAddressData = { ...addressData }
    newAddressData[key] = value
    if (onChange) {
      onChange("address", newAddressData)
    }
  }

  const pathName = window.location.pathname

  return (
    <div className="dqm-address-container" id="dqm-address-container">
      <Row className="row">
        <Col className="col-md-6 form-group">
          <label>SOLD TO (PARTY)</label>
          <AWSMInput defaultValue={addressData.sold_to_party || ""} disabled />
        </Col>
        <Col className="col-md-6 form-group">
          <label>SOLD TO (COMPANY NAME)</label>
          <AWSMInput
            defaultValue={addressData.sold_to_company || ""}
            disabled
          />
        </Col>
        {pathName === "/retail-customer" && (
          <>
            <Col className="col-md-6 form-group">
              <label>SITE ID</label>
              <AWSMInput defaultValue={addressData.site_id || ""} disabled />
            </Col>
            <Col className="col-md-6 form-group">
              <label>SITE NAME</label>
              <AWSMInput defaultValue={addressData.site_name || ""} disabled />
            </Col>
          </>
        )}
        <Col className="col-md-6 form-group">
          <label>ADDRESS 1</label>
          <AWSMInput
            value={
              addressData.address ? addressData.address.address_1 || "" : ""
            }
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>ADDRESS 2</label>
          <AWSMInput
            value={
              addressData.address ? addressData.address.address_2 || "" : ""
            }
            disabled
          />
        </Col>
        {pathName === "/retail-customer" && (
          <Col className="col-md-6 form-group">
            <label>ADDRESS 3</label>
            <AWSMInput
              value={
                addressData.address ? addressData.address.address_3 || "" : ""
              }
              disabled
            />
          </Col>
        )}
        <Col className="col-md-6 form-group">
          <label>CITY</label>
          <AWSMInput
            value={addressData.address ? addressData.address.city || "" : ""}
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>STATE</label>
          <AWSMInput
            value={addressData.address ? addressData.address.state || "" : ""}
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>POST CODE</label>
          <AWSMInput
            value={
              addressData.address ? addressData.address.postcode || "" : ""
            }
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>COUNTRY</label>
          <AWSMInput
            value={addressData.address ? addressData.address.country || "" : ""}
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>REGION</label>
          <AWSMInput
            value={
              addressData.address ? addressData.address.region_name || "" : ""
            }
            disabled
          />
        </Col>
        {pathName !== "/retail-customer" && (
          <Col className="col-md-6 form-group"></Col>
        )}
        <Col className="col-md-6 form-group">
          <label>LATITUDE</label>
          <AWSMInput
            value={
              addressData.address ? addressData.address.latitude || "" : ""
            }
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>LONGITUDE</label>
          <AWSMInput
            value={
              addressData.address ? addressData.address.longitude || "" : ""
            }
            disabled
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>ALTERNATIVE CLUSTER</label>
          <AWSMInput
            value={addressData.alternative_cluster || ""}
            onChange={value => onFieldChange("alternative_cluster", value)}
            disabled={scheduler}
            placeholder="Type something here..."
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>CLUSTER</label>
          <AWSMInput
            value={addressData.cluster || ""}
            onChange={value => onFieldChange("cluster", value)}
            disabled={scheduler}
            placeholder="Type something here..."
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>SPEED (KM/Hr)</label>
          <AWSMInputNumber
            value={addressData.speed || ""}
            disabled={scheduler}
            onChange={value => onFieldChange("speed", value)}
            placeholder="Type something here..."
          />
        </Col>
        <Col className="col-md-6 form-group">
          <label>CLOUD</label>
          <AWSMInput
            value={addressData.cloud || ""}
            onChange={value => onFieldChange("cloud", value)}
            disabled={scheduler}
            placeholder="Type something here..."
          />
        </Col>
        {pathName === "/retail-customer" && (
          <Col className="col-md-6 form-group">
            <label>BORDER</label>
            <AWSMDropdown
              value={addressData.border ? "Y" : "N"}
              onChange={value => onFieldChange("border", value === "Y")}
              disabled={scheduler}
              items={["Y", "N"]}
            />
          </Col>
        )}
      </Row>
      <hr style={{ margin: "2em 0" }} />
    </div>
  )
}

export default TabAddress
