import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/styles"
import { Row, Col } from "reactstrap"
import "./style.scss"
import FileUpload from "../../../components/Common/FileUpload"
import { getSLAAttchments, getSLAPdfs } from "store/actions"
import SLAPdfTable from "./SLAPdfTable"

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

  componentDidMount () {
    this.getAllSLAPdf();
  }

  fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

  getAllSLAPdf = async() => {
    const { onGetSLAPDFs } = this.props
    await onGetSLAPDFs()
  }

  allDocuments = async val => {
    const { onGetSLAAttchments } = this.props
    this.fileToBase64(val[0], async(err, result) => {
      if (result) {
        const base64WithoutPrefix = result.substr('data:application/pdf;base64,'.length);
        const params = {
          data: base64WithoutPrefix,
          category: "sla",
          filename: val[0].name,
          remarks: ""
        }
        await onGetSLAAttchments(params)
      }
    });
  }

shouldComponentUpdate(nextProps){
  if (nextProps.slaAttachments !== this.props.slaAttachments) {
    this.getAllSLAPdf();
    
  } else {
    return false;
  }
}


  render() {
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
              <SLAPdfTable getAllPdf={this.getAllSLAPdf} />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ sla }) => ({
  slaAttachments: sla.slaAttachments,
  slaPdfs: sla.slaPdfs,
})

const mapDispatchToProps = dispatch => ({
  onGetSLAAttchments: params => dispatch(getSLAAttchments(params)),
  onGetSLAPDFs: () => dispatch(getSLAPdfs()),  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Attachments))