import React, { useState } from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import Alert from '@material-ui/lab/Alert';

const AWSMAlert = ({ status, message, openAlert, closeAlert }) => {
  let color
  let colorBack
  switch (status) {
    case "success":
      color = "#4CAF50"
      colorBack = "#edf7ed"
      break
    case "warning":
      color = "#ff9800"
      colorBack = "#fff4e5"
      break
    case "error":
      color = "#f44336"
      colorBack = "#fdecea"
      break
    default:
      break
  }

  return (
    <Snackbar
      style={{
        border: "1px solid color",
        borderRadius: "5px",
        width: "fit-content",
        marginLeft: "auto",
      }}
      open={openAlert}
      message={
        <Alert severity={status} style={{ color: color, padding: 0 }}>
          {message}
        </Alert>
      }
      ContentProps={{
        style: { backgroundColor: colorBack, padding: "0 15px" },
      }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={closeAlert}
      autoHideDuration={3000}
      action={
        <IconButton aria-label="close" style={{ width:45 }} onClick={closeAlert}>
          <CloseIcon style={{ color: color }} />
        </IconButton>
      }
    ></Snackbar>
  )
}

export default AWSMAlert