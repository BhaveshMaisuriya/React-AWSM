import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import Alert from "@material-ui/lab/Alert"
import CloseButton from "./../AlertCloseButton"
import AlertSuccess from "./../../../assets/images/AWSM-success-alert.svg"
import { alertConfig } from "./helper"

const AWSMAlert = ({ status = "", message = null, openAlert, closeAlert }) => {
  let statusConfig = alertConfig[status] || alertConfig["error"]
  // console.log(status, message, openAlert, closeAlert)
  let color = ""
  let colorBack = ""
  switch (status) {
    case true:
    case "success":
      color = "#4CAF50"
      colorBack = "#edf7ed"
      break
    case false:
    case "error":
      color = "#f44336"
      colorBack = "#fdecea"
      break
    default:
      color = "#ff9800"
      colorBack = "#fff4e5"
      break
  }

  return (
    <Snackbar
      style={{
        border: `solid 1px ${statusConfig.color}`,
        borderRadius: "5px",
        width: "fit-content",
        marginLeft: "auto",
      }}
      open={openAlert}
      message={
        <Alert
          severity={statusConfig.status}
          iconMapping={{ success: <img src={AlertSuccess} alt="icon" /> }}
          style={{ color: statusConfig.color, padding: 0 }}
        >
          {message || statusConfig.message}
        </Alert>
      }
      ContentProps={{
        style: { backgroundColor: statusConfig.colorBack, padding: "0 15px" },
      }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={closeAlert}
      autoHideDuration={3000}
      action={
        <IconButton aria-label="close" onClick={closeAlert}>
          <CloseButton status={status} />
        </IconButton>
      }
    ></Snackbar>
  )
}

export default AWSMAlert