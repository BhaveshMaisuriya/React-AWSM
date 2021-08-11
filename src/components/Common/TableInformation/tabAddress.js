import React, { useMemo } from "react"
import AWSMInput from "../Input"
import "./tab-address.scss"
import AWSMDropdown from "../Dropdown"


const TabAddress = ({ scheduler, data, onChange }) => {
  const addressData = useMemo(() => {
    return data.address || {};
  }, [data]);

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
      <div>
        <div className="row">
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">SOLD TO (PARTY)</div>
            <AWSMInput defaultValue={addressData.sold_to_party || ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">SOLD TO (COMPANY NAME)</div>
            <AWSMInput defaultValue={addressData.sold_to_company || ""} disabled />
          </div>
          {pathName === "/retail-customer" && (
            <>
              <div className="col col-12 col-sm-6 col-lg-6">
                <div className="input-header mb-2">SITE ID</div>
                <AWSMInput defaultValue={addressData.site_id || ""} disabled />
              </div>
              <div className="col col-12 col-sm-6 col-lg-6">
                <div className="input-header mb-2">SITE NAME</div>
                <AWSMInput defaultValue={addressData.site_name || ""} disabled />
              </div>
            </>
          )}
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">ADDRESS 1</div>
            <AWSMInput value={addressData.address ? addressData.address.address_1 || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">ADDRESS 2</div>
            <AWSMInput value={addressData.address ? addressData.address.address_2 || "" : ""} disabled />
          </div>
          {pathName === "/retail-customer" && (
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">ADDRESS 3</div>
              <AWSMInput value={addressData.address ? addressData.address.address_3 || "" : ""} disabled />
            </div>
          )}
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">CITY</div>
            <AWSMInput value={addressData.address ? addressData.address.city || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">STATE</div>
            <AWSMInput value={addressData.address ? addressData.address.state || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">POST CODE</div>
            <AWSMInput value={addressData.address ? addressData.address.postcode || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">COUNTRY</div>
            <AWSMInput value={addressData.address ? addressData.address.country || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">REGION</div>
            <AWSMInput value={addressData.address ? addressData.address.region_name || "" : ""} disabled />
          </div>
          {pathName !== "/retail-customer" && (
            <div className="col col-12 col-sm-6 col-lg-6"></div>
          )}
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">LATITUDE</div>
            <AWSMInput value={addressData.address ? addressData.address.latitude || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">LONGITUDE</div>
            <AWSMInput value={addressData.address ? addressData.address.longitude || "" : ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">ALTERNATIVE CLUSTER</div>
            <AWSMInput
              value={addressData.alternative_cluster || ""}
              onChange={value => onFieldChange("alternative_cluster", value)}
              disabled={scheduler}
              placeholder='Type something here...'
            />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">CLUSTER</div>
            <AWSMInput
              value={addressData.cluster || ""}
              onChange={value => onFieldChange("cluster", value)}
              disabled={scheduler}
              placeholder='Type something here...'
            />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">SPEED (KM/Hr)</div>
            <AWSMInput
              value={addressData.speed || ""}
              disabled={scheduler}
              onChange={value => onFieldChange("speed", value)}
              placeholder='Type something here...'
            />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">CLOUD</div>
            <AWSMInput
              value={addressData.cloud || ""}
              onChange={value => onFieldChange("cloud", value)}
              disabled={scheduler}
              placeholder='Type something here...'
            />
          </div>
          {pathName === "/retail-customer" && (
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">BORDER</div>
              <AWSMDropdown
                value={addressData.border ? "Y" : "N"}
                onChange={value => onFieldChange("border", value === "Y")}
                disabled={scheduler}
                items={["Y", "N"]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TabAddress
