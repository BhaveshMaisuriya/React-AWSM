import React, { Component } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import LatestTranaction from "./LatestTranaction"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
class RTS extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }


  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={'AWSM'}
              breadcrumbItem={'RTS1'}
            />
            <Row>
              <Col lg="6" xl="6" md="6"><LatestTranaction petDataSource={0}/></Col>
              <Col lg="6" xl="6" md="6"><LatestTranaction petDataSource={1}/></Col>
            </Row>
        </Container>
      </div>
      </React.Fragment>
    )
  }
}

export default RTS
