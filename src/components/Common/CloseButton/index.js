import React from "react"
import closeIcon from "../../../assets/images/AWSM-Cancel-Icon.svg"
import "./closeButton.scss"

const closeButton = props => {
  const { handleClose } = props
  return <img src={closeIcon} onClick={handleClose} className="btn-close"></img>
}

closeButton.defaultProps = {
  handleClose: () => {},
}

export default closeButton
