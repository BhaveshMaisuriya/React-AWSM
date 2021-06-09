import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/styles"
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
  CardHeader,
} from "reactstrap"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import Header from "../../../components/Common/CustomPageHeader"
import "./style.scss"
import FileUpload from "../../../components/Common/FileUpload"
import SLATable from "./table"

const styles = {
  headerText: {
    marginLeft: "15px",
    marginBottom: "15px",
    paddingRight: "32px",
    textAlign: "right",
    fontSize: "14px",
    letterSpacing: "0",
    color: "#00A19C",
  },
  modalHeader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
}

class SLA extends Component {
  constructor(props) {
    super(props)
    this.allDocuments = this.allDocuments.bind(this)
    this.state = {
      documents: [],
      acceptedFiles: ["image/*"],
    }
  }

  allDocuments = async(val) => {
    let allData = []
    var months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ]
    val.map((item, index) => {
      var uploadedDate = ""
      var uploadedTime = ""
      var getFullDate = new Date(item.lastModified)
      var hours = getFullDate.getHours()
      var minutes = getFullDate.getMinutes()
      var ampm = hours >= 12 ? "pm" : "am"
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes
      uploadedDate =
        getFullDate.getDate() +
        " " +
        months[getFullDate.getMonth()] +
        " " +
        getFullDate.getFullYear()
      uploadedTime =
        getFullDate.getHours() + ":" + getFullDate.getMinutes() + " " + ampm
      allData.push({
        name: item.name,
        uploadedDate: <p className="uploaded_time">{uploadedDate}<br /><span> {uploadedTime}</span></p>,
        version: "1",
        uploadedby: "user",
      })
    })
    await this.setState({ documents: allData })
  }

  render() {
    const tableHead = {
      name: "FILE NAME",
      uploadedDate: "TIME UPDATED",
      version: "VERSION",
      uploadedby: "UPLOADED BY",
      action: "ACTION",
    }
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <Header title="Service Level Agreement (SLA)" />
              <div
                className={`${classes.headerText} d-flex justify-content-between align-items-center`}
              >
                <Link to="#">
                  <img src={eyeIcon} alt="info" /> View Audit Log
                </Link>
              </div>
            </div>
            <Row className="sla_file_upload">
              <Col lg={12} md={12} xs={12}>
                <Card>
                  <CardBody>
                    <h4>SLA Approved Documents</h4>
                    <FileUpload
                      acceptedFiles={this.state.acceptedFiles}
                      filesLimit={10}
                      allDocuments={this.allDocuments}
                    />
                    <div className="sla_table">
                      <SLATable
                        allData={this.state.documents}
                        tableHead={tableHead}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ SLA }) => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SLA))