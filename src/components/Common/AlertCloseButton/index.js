import React from "react"
import closeIcon from "../../../assets/images/AWSM-Alert_close.svg"
import "./alertCloseButton.scss"

const alertCloseButton = props => {
  const { handleClose } = props
  return <img src={closeIcon} onClick={handleClose} className="btn-close"></img>
}

alertCloseButton.defaultProps = {
  handleClose: () => {},
}

export default alertCloseButton
