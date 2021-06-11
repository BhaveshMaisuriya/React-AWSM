import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/styles"
import {
  Row,
  Col,
} from "reactstrap"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import "./style.scss"
import FileUpload from "../../../components/Common/FileUpload"
import SLATable from "./table"
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

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

class Attachments extends Component {
  constructor(props) {
    super(props)
    this.allDocuments = this.allDocuments.bind(this)
    this.state = {
      documents: [],
      acceptedFiles: "image/*", // add more using comma like ex:: image/png, image/gif
    }
  }

  allDocuments = async val => {
    let allData = [...this.state.documents];
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
        uploadedDate: (
          <p className="uploaded_time">
            {uploadedDate}
            <br />
            <span> {uploadedTime}</span>
          </p>
        ),
        version: "1",
        uploadedby: "user",
        action: (
          <div className="action">
            <EditOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;
            <SystemUpdateAltOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;
            <VisibilityOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;
            <DeleteOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        )
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
        <Row className="sla_file_upload">
          <Col lg={12} md={12} xs={12}>
            <h4>SLA Approved Documents</h4>
            <FileUpload
              acceptedFormat={this.state.acceptedFiles}
              filesLimit={10}
              allDocuments={this.allDocuments}
            />
            <div className="sla_table">
              <SLATable allData={this.state.documents} tableHead={tableHead} />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ SLA }) => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Attachments))