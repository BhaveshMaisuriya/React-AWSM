import React, { useState } from "react"
import DropdownInput from "../DropdownInput"
import AWSMInput from "../Input"
import AWSMInputNumber from "../InputNumber"
import "./tab-address.scss"

// Dummy storage data
const addressDummy = [
  {
    id: "1",
    sold_to_party: "012345",
    sold_to_company_name: "Eshah Filling Station",
    site_id: "012345",
    site_name: "Shaziman only",
    address_1: "Lot 26103",
    address_2: "Jalan SP 4/31",
    address_3: "Bandar Saujana Putra",
    city: "Sungai Jarum",
    state: "Selangor",
    post_code: "54789",
    country: "Malaysia",
    region: "west",
    latitude: "1 WM",
    longitude: "Sungai Jarum",
    cluster: "Bandar",
    alt_cluster: "Sungai Jarum",
    cloud: "Bandar Saujana Putra",
    border: "Sungai Jarum",
    distance_from_terminal: "3000",
    speed: "2000",
  },
]

const TabAddress = ({ scheduler }) => {
  const [addressData, setAddressData] = useState(addressDummy)

  /**
   * Update cluster value
   * @param index: address index item
   * @param value: updated value
   */
  const onClusterChange = (index, value) => {
    const newAddressData = [...addressData]
    newAddressData[index].cluster = value
    setAddressData(newAddressData)
  }

  /**
   * Update alternative cluster value
   * @param index: address index item
   * @param value: updated value
   */
  const onAlternativeClusterChange = (index, value) => {
    const newAddressData = [...addressData]
    newAddressData[index].alt_cluster = value
    setAddressData(newAddressData)
  }

  /**
   * Update cloud value
   * @param index: address index item
   * @param value: updated value
   */
  const onCloudChange = (index, value) => {
    const newAddressData = [...addressData]
    newAddressData[index].cloud = value
    setAddressData(newAddressData)
  }

  /**
   * Update border value
   * @param index: address index item
   * @param value: updated value
   */
  const onBorderChange = (index, value) => {
    const newAddressData = [...addressData]
    newAddressData[index].border = value
    setAddressData(newAddressData)
  }

  return (
    <div className="dqm-address-container" id="dqm-address-container">
      {addressData.map((item, index) => (
        <div key={index}>
          <div className="row">
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">SOLD TO (PARTY)</div>
              <AWSMInput value={item.sold_to_party} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">SOLD TO (COMPANY NAME)</div>
              <AWSMInput value={item.sold_to_company_name} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">ADDRESS 1</div>
              <AWSMInput value={item.address_1} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">ADDRESS 2</div>
              <AWSMInput value={item.address_2} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">CITY</div>
              <AWSMInput value={item.city} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">STATE</div>
              <AWSMInput value={item.state} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">POST CODE</div>
              <AWSMInput value={item.post_code} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">COUNTRY</div>
              <AWSMInput value={item.country} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">REGION</div>
              <AWSMInput value={item.region} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">LATITUDE</div>
              <AWSMInput value={item.latitude} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">LONGITUDE</div>
              <AWSMInput value={item.longitude} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">CLUSTER</div>
              <AWSMInput
                value={item.cluster}
                onChange={value => onClusterChange(index, value)}
                disabled={scheduler}
              />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">ALTERNATIVE CLUSTER</div>
              <AWSMInput
                value={item.alt_cluster}
                onChange={value => onAlternativeClusterChange(index, value)}
                disabled={scheduler}
              />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">CLOUD</div>
              <AWSMInput
                value={item.cloud}
                onChange={value => onCloudChange(index, value)}
                disabled={scheduler}
              />
            </div>
            <div className="col col-12 col-sm-6 col-lg-6">
              <div className="input-header mb-2">SPEED (KM/Hr)</div>
              <AWSMInput value={item.speed} disabled />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TabAddress
