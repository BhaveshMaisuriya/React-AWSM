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
} from "reactstrap"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import Header from "../../../components/Common/CustomPageHeader"
import './style.scss';
import FileUpload from "../../../components/Common/FileUpload"

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
    this.state = {
      
    }
  }

  render() {
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
                <Link
                  to="#"
                >
                  <img src={eyeIcon} alt="info" /> View Audit Log
                </Link>
              </div>
            </div>
            <Row>
              <Card>
                <CardBody>
                  <FileUpload />
                </CardBody>
              </Card>
            </Row>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ SLA }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SLA))
