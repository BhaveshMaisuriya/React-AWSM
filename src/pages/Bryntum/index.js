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
// import Panel from './Panel';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import 'bryntum-react-shared/resources/shared.scss';
class Bryntum extends Component {
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
              breadcrumbItem={'Bryntum'}
            />
            <div id="bryntum-container"></div>
            <iframe style={{border: 'none', width: '100%', height: '1000px'}} src="http://bryntum-test-poc.s3-website-ap-southeast-1.amazonaws.com/examples/nested-events1/" />
     {/* <Panel /> */}
        </Container>
      </div>
      </React.Fragment>
    )
  }
}

export default Bryntum
