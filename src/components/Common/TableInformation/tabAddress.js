import React from "react"
import AWSMInput from "../Input"
import "./tab-address.scss"


const TabAddress = ({ scheduler, data, onChange }) => {
  return (
    <div className="dqm-address-container" id="dqm-address-container">
      <div>
        <div className="row">
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">SOLD TO (PARTY)</div>
            <AWSMInput defaultValue={data.sold_to_party || ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">SOLD TO (COMPANY NAME)</div>
            <AWSMInput defaultValue={data.sold_to_company || ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">ADDRESS 1</div>
            <AWSMInput value={data.address.address_1} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">ADDRESS 2</div>
            <AWSMInput value={data.address.address_2} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">CITY</div>
            <AWSMInput value={data.address.city} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">STATE</div>
            <AWSMInput value={data.address.state} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">POST CODE</div>
            <AWSMInput value={data.address.postcode} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">COUNTRY</div>
            <AWSMInput value={data.address.country} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">REGION</div>
            <AWSMInput value={data.address.region_name || ""} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">LATITUDE</div>
            <AWSMInput value={data.address.latitude} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">LONGITUDE</div>
            <AWSMInput value={data.address.longitude} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">ALTERNATIVE CLUSTER</div>
            <AWSMInput
              value={data.alternative_cluster || ""}
              onChange={value => onChange("alternative_cluster", value)}
              disabled={scheduler}
            />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">CLUSTER</div>
            <AWSMInput
              value={data.cluster || ""}
              onChange={value => onChange("cluster", value)}
              disabled={scheduler}
            />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">SPEED (KM/Hr)</div>
            <AWSMInput value={data.address.speed} disabled />
          </div>
          <div className="col col-12 col-sm-6 col-lg-6">
            <div className="input-header mb-2">CLOUD</div>
            <AWSMInput
              value={data.cloud || ""}
              onChange={value => onChange("cloud", value)}
              disabled={scheduler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabAddress
