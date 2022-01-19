import React from 'react'
import AWSMInput from 'components/Common/Input'
import { Row, Col } from 'reactstrap'

const IndicatorContactTab = props => {
  const { data } = props

  return (
    <>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Opening Stock Days</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.opening_stock_days} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Closing Stock Days</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.closing_stock_days} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Current Stock Days</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.current_stock_days} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Ullage (L)</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.ullage} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Out of Stock</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.out_of_stock} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Max Stock Days</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.max_stock_days} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Monthly Fixed Quota</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_monthly_fixed_quota} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      <h5 className="text-bold mt-4 mb-3">CONTACT</h5>
      <Row className="w-100">
        <Col md={4}>
          <label className="text-upper">Contact Name 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_contact_name_1} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">Contact Number 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_contact_number_1} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Contact Name 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_contact_name_2} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">Contact Number 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_contact_number_2} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Contact Name 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_contact_name_3} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">Contact Number 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_contact_number_3} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">TM Name</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_tm_name} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">TM Number</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_tm_number} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">RS Name</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_rs_name} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">RS Number</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_rs_number} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default IndicatorContactTab
