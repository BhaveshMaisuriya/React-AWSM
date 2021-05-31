import React from "react"
import "./ExitConfirmation.scss"

const ExitConfirmation = ({onCancel, onExit, className = ""}) => {
  return (
    <div className={`exit-confirmation ${className}`}>
      <h3>Exit Confirmation</h3>
      <div className="text-center description-text">
        Are you sure you want to exit without update?<br/>
        You will lose all the changes made.
      </div>
      <div className="d-flex">
        <button className="btn btn-outline-danger" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger ml-2" onClick={onExit}>Exit</button>
      </div>
    </div>
  )
}

export default ExitConfirmation
