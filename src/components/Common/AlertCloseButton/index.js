import React from 'react'
import closeIcon from 'assets/images/AWSM-Alert_close.svg'
import errorCloseIcon from 'assets/images/AWSM-error-close.svg'
import './alertCloseButton.scss'

const alertCloseButton = props => {
  const { handleClose } = props
  return (
    <img
      src={props.status === 'success' ? closeIcon : errorCloseIcon}
      onClick={handleClose}
      className="btn-close"
    ></img>
  )
}

alertCloseButton.defaultProps = {
  handleClose: () => {},
}

export default alertCloseButton
