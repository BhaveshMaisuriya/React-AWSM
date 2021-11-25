import ConfirmDNStatusModal from "./confirmDNStatusModal"
import RedAlertIcon from "./../../../assets/images/AWSM-Red-Alert.svg"
import React from "react"
import "./index.scss"

const AlertOverruleModal = ({ onCancel, onSend, alertType, alertMessage }) => {
  return (
    <>
      {alertType === "soft" && (
        <ConfirmDNStatusModal
          isOpen={alertType}
          headerContent={[
            <img
              src={RedAlertIcon}
              className="header-icon"
              alt="alerticon"
            />,
            "Soft Overrule Alert!",
          ]}
          bodyContent={[
            "Your order assignment does not fulfill the requirement below:",
            <br />,
            <br />,
            <textarea
              className="error-alert-message"
              rows="4"
              type="textarea"
              disabled
            >
              {alertMessage}
            </textarea>,
            <br />,
            <br />,
            "Are you sure you want to proceed?",
          ]}
          styleColor="danger"
          onCancel={onCancel}
          onSend={onSend}
        />
      )}
      {alertType === "hard" && (
        <ConfirmDNStatusModal
          isOpen={alertType}
          headerContent={[
            <img
              src={RedAlertIcon}
              className="header-icon"
              alt="alerticon"
            />,
            "Hard Overrule Alert!",
          ]}
          bodyContent={[
            <p style={{ marginBottom: "0em important" }}>
              This action is not allowed. Your order assignment does not fulfill
              the
            </p>,
            <p>requirement below:</p>,
            <textarea
              className="error-alert-message"
              rows="4"
              type="textarea"
              disabled
            >
              {alertMessage}
            </textarea>,
            <br />,
            <br />,
            "Please re-check your order and re-assign",
            <br />,
            <br />,
          ]}
          styleColor="danger"
        />
      )}
    </>
  )
}

export default AlertOverruleModal
