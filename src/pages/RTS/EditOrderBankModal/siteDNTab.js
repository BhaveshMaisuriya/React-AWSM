import React from 'react'
import AWSMInput from 'components/Common/Input'
import { Row, Col } from 'reactstrap'

const SiteDNTab = props => {
  const { data } = props

  const dataChecker = inputValue => {
    return inputValue ? inputValue : ''
  }

  return (
    <>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Site Name</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={data?.retail_storage_relation?.retail_customer_relation?.site_name}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <label className="text-upper">site ID</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={data?.retail_storage_relation?.retail_customer_relation?.site_id}
                disabled={true}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={8}>
          <label className="text-upper">Remarks</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.remarks} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      <h5 className="text-bold mt-4 mb-3">DN INFORMATION</h5>
      <Row className="w-100">
        <Col>
          <label className="text-upper">DN No.</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={dataChecker(data?.dn_no)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">DN Status</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={dataChecker(data?.dn_status)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">DN Date</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={dataChecker(data?.dn_date)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">DN Time Creation.</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={dataChecker(data?.dn_created_at)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">DN Created By</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={dataChecker(data?.dn_created_by)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Sales Order No</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={dataChecker(data?.sales_order_no)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default SiteDNTab
