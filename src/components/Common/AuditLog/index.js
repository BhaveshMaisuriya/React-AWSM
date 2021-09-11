import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import TablePagination from "../DataTable/tablePagination"
// import ModalPagination from "./auditModalPagination"
import lineIcon from "../../../assets/images/auditlog-line.svg"
import "./style.scss"
import { getMonth, getYear } from "date-fns"

const styles = {
  profilePic: {
    cursor: "pointer",
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
   * Displaying the data in audit log
   */
  modalData = (audit, idx) => {
    //cut to get name from string
    let text = audit.description
    let firstWord = text.trim().split(" ")
    let theName = audit.user

    //cut action from string
    let action = firstWord.shift()

    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "octomber", "November", "December"];

    //cut date from string
    let date = new Date(audit.created)
    let finalDate = date.getDate() + " " + Month[date.getMonth() + 1] + " " + date.getFullYear()

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
            paddingLeft: "18px",
            paddingTop: "15px",
          }}
        >
          <div className={classes.profilePic}>
            <div className={classes.profilePicImg}>
              {this.getUserInitials(theName)}
            </div>
            <div className="tracking-content">
              <b>{theName}</b>
              <span>
                {text}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      data,
      classes,
      currentAuditPage,
      rowsAudit,
      handlePageChange,
    } = this.props    
    return (
      <React.Fragment>
        <div className="tracking-list">
          <div className="date-time">
            <b>DATE/TIME</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>ACTION</b>
          </div>
          {data.length === 0 ? 
          <div>
            <p>No Records Found!</p>
            </div>
          : (
            <div className="container-data">
              {data.map((audit, idx) => (
                  <div key={idx} className="tracking-item">
                    {" "}
                    {this.modalData(audit, idx)}
                  </div>
                ))
                .slice(
                  currentAuditPage * rowsAudit,
                  currentAuditPage * rowsAudit + rowsAudit
                )}
            </div>
          )}
          <div>&nbsp;</div>
          <TablePagination
            rowsPerPage={rowsAudit}
            currentPage={currentAuditPage}
            onChangePage={handlePageChange}
            totalPages={Math.ceil(data.length / rowsAudit)}
            numShownPages={9}
          />
        </div>
      </React.Fragment>
    )
  }
}

AuditLog.propType = {
  closeModal: PropTypes.func.isRequired,
  rowsAudit: PropTypes.number.isRequired,
  currentAuditPage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(AuditLog)