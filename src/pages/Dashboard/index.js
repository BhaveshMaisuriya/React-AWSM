import React, { Component } from "react"
import PropTypes from 'prop-types'
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
import { Link } from "react-router-dom"
import TotalSellingProduct from "../Dashboard-saas/total-selling-product"
//import Charts
import StackedColumnChart from "./StackedColumnChart"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"
import SmallTransaction from "./SmallTransaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [
        { title: "Master Data Change - Retail Station", iconClass: "bx-gas-pump", description: "2" },
        {
          title: "Master Data Change - Terminal Data",
          iconClass: "bxs-terminal",
          description: "1",
        },
        {
          title: "Master Data Change - Road Tanker",
          iconClass: "bx-car",
          description: "0",
        },
        {
          title: "Master Data Change - Product",
          iconClass: "bx-purchase-tag-alt",
          description: "0",
        },
      ],
      email: [
        { title: "Year", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Week", linkto: "#", isActive: true },
      ],
      modal: false,
    }
    this.togglemodal.bind(this)
  }

  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={'AWSM'}
              breadcrumbItem={'Data Quality Management'}
            />

            <Row>

              <Col xl="8">
              <MonthlyEarning />
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4 float-sm-left">
                      ASR Submission Summary
                    </CardTitle>
                    <div className="float-sm-right">
                      <ul className="nav nav-pills">
                        {this.state.email.map((mail, key) => (
                          <li className="nav-item" key={"_li_" + key}>
                            <Link
                              className={
                                mail.isActive ? "nav-link active" : "nav-link"
                              }
                              to={mail.linkto}
                            >
                              {mail.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="clearfix"/>
                    <StackedColumnChart />
                  </CardBody>
                </Card>
            {/* // Cards */}
               <Row>
                {this.state.reports.map((report, key) => (
                    <Col md="6" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody style={{height: '100px'}}>
                          <Media>
                            <Media body>
                              <p className="text-muted font-weight-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </Media>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                />
                              </span>
                            </div>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                  </Row>
                {/* <SmallTransaction petDataSource={0}/> */}
                {/* <LatestTranaction petDataSource={0} /> */}
                <LatestTranaction petDataSource={1}/>
              </Col>
              <Col xl="4">
              <ActivityComp />
              <TotalSellingProduct />
                <TopCities />
                
              </Col>
            </Row>
            {/* <Col xl="12">
              <Row>
                  {this.state.reports.map((report, key) => (
                    <Col md="3" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody style={{height: '100px'}}>
                          <Media>
                            <Media body>
                              <p className="text-muted font-weight-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </Media>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                />
                              </span>
                            </div>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col> */}

            <Row>
              <Col lg="12">
                {/* <LatestTranaction petDataSource={0} />
                <LatestTranaction petDataSource={1}/> */}
              </Col>
            </Row>
          </Container>
        </div>
        <Modal
                          isOpen={this.state.modal}
                          // toggle={this.tog_standard}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                              View Details
                            </h5>
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ modal: false })
                              }
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            {
                              // data[locationPath].columns.map((col, index) => {
                              //   if (col.type === 'btn') return null
                              //   return (
                              //     <div key={index} className="form-group row">
                              //       <label
                              //         htmlFor="example-text-input"
                              //         className="col-md-2 col-form-label"
                              //       >
                              //         {col.label}
                              //       </label>
                              //       <div className="col-md-10">
                              //         <input
                              //           className="form-control"
                              //           type="text"
                              //           defaultValue={this.state.currentItem ? this.state.currentItem[col.field] : ''}
                              //         />
                              //       </div>
                              //     </div>
                              //   )
                              // })
                            }

                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              onClick={() => {
                                this.setState({
                                  modal: false
                                })
                              }}
                              className="btn btn-secondary waves-effect"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={() => {
                                this.setState({
                                  modal: false
                                })
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </Modal>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(Dashboard)
