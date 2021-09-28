import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import TablePagination from "../DataTable/tablePagination"
import lineIcon from "../../../assets/images/auditlog-line.svg"
import { getRetailAuditLog } from "store/actions"
import { Modal, ModalHeader } from "reactstrap"
import CloseButton from "../../../components/Common/CloseButton"
import "./style.scss"

const styles = {
  profilePic: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
  profilePicImg: {
    width: "42px",
    height: "42px",
    borderRadius: "40px",
    backgroundColor: "#FCAA1B",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    letterSpacing: "0",
    color: "#FFFFFF",
  },
  lineIcon: {},
}

class AuditLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: true,
      currentPage: 0,
    }
  }

  componentDidMount() {
    const { onGetAuditLog, subModule } = this.props
    const payload = {
      limit: 6,
      page: 0,
      module: subModule,
    }
    onGetAuditLog(payload)
  }

  getAuditLogData = () => {
    const { currentPage } = this.state
    const { onGetAuditLog, subModule } = this.props
    const payload = {
      limit: 6,
      page: currentPage,
      module: subModule,
    }
    onGetAuditLog(payload)
  }

  /**
   * Get user name initial
   */
  getUserInitials = theName => {
    const name = theName
    const firstLetter = name ? name[0] : ""

    return firstLetter
  }

  /**
   * Get background colour for stripes audit log table
   */
  getBackgroundColor = index => (index % 2 !== 0 ? "#F8F8F8" : "transparent")

  /**
   * 
   * @param {*} audit 
   * @param {*} idx 
   * @returns 
   */
  handlePageChange = (event, currentPage) => {
    this.setState({ currentPage}, () => this.getAuditLogData())
  }

  /**
   * Displaying the data in audit log
   */
  modalData = (audit, idx) => {
    //cut to get name from string
    let text = audit.description
    let firstWord = text.trim().split(" ")
    let theName = audit.user
    //cut action from string
    let action = firstWord.shift()

    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //cut date from string
    let date = new Date(audit.created)
    let finalDate = date.getDate() + " " + Month[date.getMonth()] + " " + date.getFullYear()

    //cut time from string
    var ampm = (date.getHours() >= 12) ? "PM" : "AM";
    var hour = date.getHours().toString().length == 1 ? "0" + date.getHours() : date.getHours();
    var mins = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes();
    let finalTime = hour + ":" + mins + " " + ampm

    const { classes } = this.props
    return (
      <div>
        <div className="tracking-icon status-intransit">
          <i>
            {" "}
            <img className={classes.lineIcon} src={lineIcon} />
          </i>
        </div>
        <div className="tracking-date">
          {finalDate}
          <span>{finalTime}</span>
        </div>
        <div
          style={{
            backgroundColor: this.getBackgroundColor(idx),
            height: "75px",
            paddingTop: "auto",
            display: "flex",
          }}
        >
          <div className={classes.profilePic}>
            <div className={`${classes.profilePicImg} tracking-profic-pic`}>
              {this.getUserInitials(theName || "Null")}
            </div>
            <div className="tracking-content">
              <b>{theName || "Null"}</b>
              <p className="content-text">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      rowsAudit,
      auditLog,
      isOpen,
      toggle,
    } = this.props  
    const { currentPage } = this.state  
    return (
      <React.Fragment>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          id="auditLog-modal"
          contentClassName="modalContainer"
        >
          <ModalHeader
            close={<CloseButton handleClose={toggle} />}
          >
            <h3>Audit Log</h3>
          </ModalHeader>
          <div className="tracking-list">
            <div className="date-time">
              <b>DATE/TIME</b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>ACTION</b>
            </div>
            {auditLog?.list.length === 0 ? 
            <div className="audit-no-records">
              <p>No Records Found!</p>
              </div>
            : (
              <div className="container-data">
                {auditLog?.list.map((audit, idx) => (
                    <div key={idx} className="tracking-item">
                      {" "}
                      {this.modalData(audit, idx)}
                    </div>
                  ))}
              </div>
            )}
            <div>&nbsp;</div>
            <TablePagination
              rowsPerPage={rowsAudit}
              currentPage={currentPage}
              onChangePage={this.handlePageChange}
              totalPages={Math.ceil(auditLog?.total_rows / rowsAudit)}
              numShownPages={9}
            />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ retailCustomer }) => ({
  auditLog : retailCustomer.audits.data,
})

const mapDispatchToProps = dispatch => ({
  onGetAuditLog: payload => dispatch(getRetailAuditLog(payload)),
})

AuditLog.propType = {
  rowsAudit: PropTypes.number.isRequired,
  subModule: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}
export default compose(connect(mapStateToProps,mapDispatchToProps), withStyles(styles))(AuditLog)