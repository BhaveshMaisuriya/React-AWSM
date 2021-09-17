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
import { getSLAAttchments } from "store/actions"

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
      acceptedFiles: "application/pdf", // add more using comma like ex:: image/png, image/gif
    }
  }

  fileToBase64 = (filename, filepath) => {
    return new Promise(resolve => {
      var file = new File([filename], filepath);
      var reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      
      // Convert data to base64 
      reader.readAsDataURL(file);
    });
  };

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
    ];
    console.log("val::", val)
    const { onGetSLAAttchments } = this.props
    this.fileToBase64(val[0].name, val[0].path).then(async result => {
    const params = {
      data: result,
      category: "sla",
      filename: val[0].name,
      remarks: "asfashkdashdkga"
    }
    await onGetSLAAttchments(params)
  })
    

    // val.map((item, index) => {
      var uploadedDate = ""
      var uploadedTime = ""
      var getFullDate = new Date(val[0].lastModified)
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
        name: val[0].name,
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
    // })
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
              filesLimit={1}
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

const mapStateToProps = ({ sla }) => ({
  slaAttachments: sla.slaAttachments,
})

const mapDispatchToProps = dispatch => ({
  onGetSLAAttchments: params => dispatch(getSLAAttchments(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Attachments))