import React from 'react'
import AWSMInput from 'components/Common/Input'
import { Row, Col } from 'reactstrap'

const AddressTripTab = props => {
  const { data } = props

  return (
    <>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Delivery Address</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_delivery_address} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">City</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_city} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Postcode</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_postcode} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">state</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_state} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Latitude</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_latitude} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Longitude</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_longitude} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Country</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_country} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Cluster</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_cluster} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Alt Cluster</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_alt_cluster} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Cloud</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_cloud} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">Border Station</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={data?.format_border_station === false ? 'N' : 'Y'}
                disabled={true}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Route ID</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.route_id} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Split ID</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.split_id} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Vehicle</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.vehicle} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      <h5 className="text-bold mt-4 mb-3">TRIP INFORMATION</h5>
      <Row className="w-100">
        <Col md={4}>
          <label className="text-upper">Shipment</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.shipment} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">Trip No.</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.trip_no} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AddressTripTab
