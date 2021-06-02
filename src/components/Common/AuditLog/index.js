import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import ModalPagination from "./auditModalPagination"
import lineIcon from "../../../assets/images/auditlog-line.svg"
import "./style.scss"

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
  lineIcon: {
    // height: "16px",
    // width: "16px",
    //paddingTop: "10px",
  },
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
    let theName = firstWord.shift()

    //cut action from string
    let action = firstWord.shift()

    //cut date from string
    let date = audit.created
    let cutDate = date.trim().split(" ")
    let cutDate1 = cutDate[1]
    let cutDate2 = cutDate[2]
    let cutDate3 = cutDate[3]
    let finalDate = cutDate1 + " " + cutDate2 + " " + cutDate3

    //cut time from string
    let cutTime1 = cutDate[4]
    let cutTime2 = cutDate[5]
    let finalTime = cutTime1 + " " + cutTime2

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
                {theName} <b>{action}</b> {firstWord.join(" ")}
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
          {data.length === 0 ? null : (
            <div className="container-data">
              {data
                .map((audit, idx) => (
                  <div key={idx} className="tracking-item"> {this.modalData(audit, idx)}</div>
                ))
                .slice(
                  currentAuditPage * rowsAudit,
                  currentAuditPage * rowsAudit + rowsAudit
                )}
            </div>
          )}
        </div>
        <ModalPagination
          count={data.length}
          rowsPerPage={rowsAudit}
          currentPage={currentAuditPage}
          onChangePage={handlePageChange}
        />
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
