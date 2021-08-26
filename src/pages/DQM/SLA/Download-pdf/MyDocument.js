import * as React from "react"
import "./styles.scss"
import logo from "../../../../assets/images/AWSM-logo.png"
import { Col, Row } from "reactstrap"
import { tableMapping } from "../tableMapping"
import SLATable from "../SLATable"

const MyDocument = props => {

  return (
    <div className="sla-table" id='sla_pdf'>
      {/* <Row>
        <Col lg={6}> */}
          <img src={logo} />
          <p className="p_txt">test test test </p>
          {props.data.length &&
            props.data.map((item, index) => {
              return <SLATable items={item.records} key={index} />
            })}
        {/* </Col>
        <Col lg={6}>
          <h3>here here here</h3>
        </Col> 
      </Row>*/}
    </div>
  )
}

export default MyDocument
