import React from 'react'
import './styles.scss'
import logo from 'assets/images/AWSM.png'
import { Col, Row } from 'reactstrap'
import PdfSLATable from './PdfSLATable'

const MyDocument = props => {
  let months = [
    'Jan',
    'Fab',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const dt = new Date()

  return (
    <div className="sla-table" id="sla_pdf">
      <Row>
        <Col lg={3} className="header-left">
          <img src={logo} width="300px" />
        </Col>
        <Col lg={5}></Col>
        <Col lg={4}>
          <div className="d-flex header-right">
            <div className="title">
              <p>
                <strong>Module</strong>
              </p>
              <p>
                <strong>Last Updated</strong>
              </p>
              <p>
                <strong>Download on</strong>
              </p>
            </div>
            <div className="desc">
              <p>: Data Quality Management</p>
              <p>: 12 Mar 2021</p>
              <p>
                :{' '}
                {dt.getDate() +
                  ' ' +
                  months[dt.getMonth()] +
                  ' ' +
                  dt.getFullYear()}
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <div className="second-sec">
        <h6>Service Level Agreement (SLA) / Procedures</h6>
        <p>
          {props?.type === '0'
            ? 'Retail Business Division (RBD)'
            : props?.type === '1'
            ? 'Commercial Business Division (CBD)'
            : 'Internal'}
        </p>
      </div>

      <div className="third-sec">
        <p>
          {props?.type === '0'
            ? 'SLA on Customer Order Fulfilment (COF) between Retail Business Division (RBD), Supply & distribution (SSD), Finance Division (FDN) & Customer Experience Department'
            : props?.type === '1'
            ? 'SLA on Customer Order Fulfilment (COF) between Commercial Business Division (CBD), Supply & distribution (SSD), Finance Division (FDN) & Customer Experience Department'
            : 'Internal'}
        </p>
      </div>
      {props.data &&
        props.data.length &&
        props.data.map((item, index) => {
          return (
            <>
              {item.records && item.records.length > 0 ? (
                <div className="pdf_maintable">
                  <div className="table_title">
                    <h5>
                      {item.title}: {item.subtitle}
                    </h5>
                  </div>
                  <PdfSLATable items={item.records} key={index} />
                </div>
              ) : (
                <div className="pdf_maintable">
                  <div className="table_title">
                    <h5>
                      {item.title}: {item.subtitle}
                    </h5>
                  </div>
                  <p className="text-center">No Records founds.</p>
                </div>
              )}
            </>
          )
        })}
    </div>
  )
}

export default MyDocument
