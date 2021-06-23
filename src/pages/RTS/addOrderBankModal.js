import { Input } from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap"
import DatePicker from "../../components/Common/DatePicker"
import ExitConfirmation from "../../components/Common/ExitConfirmation"
import AWSMInput from "../../components/Common/Input"
import FileCopyIcon from "@material-ui/icons/FileCopy"

const NewOrderBankModal = props => {
  const { open, onCancel } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [currentState, setCurrentState] = useState("")

  useEffect(() => {}, [currentState])

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const handleUpdate = () => {
    onCancel()
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    if (onCancel) {
      onCancel()
    }
  }

  const toggle = () => {
    setIsConfirm(true)
  }

  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">Add New order</span>
      </ModalHeader>

      <ModalBody className="position-relative">
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        <div className="d-flex justify-content-between align-item-baseline">
          <div className="col-4 p-0">
            <label>SHIFT DATE</label>
            <DatePicker />
          </div>
          <div className="col-4 p-0 ml-4">
            <label>SHIP TO</label>
            <AWSMInput
              type="number"
              defaultValue=""
              placeholder="Numeric Only"
            />
          </div>
          <div className="col-4 p-0">
            <Button
              color="primary"
              className="mt-27 ml-3"
              onClick={() => setCurrentState("search")}
            >
              Search
            </Button>
            <Button
              color="warning"
              className="mt-27 ml-3"
              onClick={() => setCurrentState("loading")}
            >
              Loading
            </Button>
            <Button
              color="danger"
              className="mt-27 ml-3"
              onClick={() => setCurrentState("error")}
            >
              Error
            </Button>
          </div>
        </div>
        <hr />

        {currentState === 'search' &&
          <div className='h-280 w-100'>

          </div>
        }
        {currentState !== 'search' &&
          <div
          className={`text-center h-280 w-100 table ${
            currentState === ""
              ? "bg-grey"
              : currentState === "error"
              ? "bg-err"
              : "bg-loading"
          }`}
        >
          <div className="relative table_cell h-100">
            <FileCopyIcon />
            <p className='text-18'>
              {currentState === ""
                ? "No Data Available, Please Search Your Order"
                : currentState === "error"
                ? "Details Not Found, Try Again"
                : "Please wait, Loading Details.. 85%"}
            </p>
          </div>
        </div>
        }
        <ModalFooter>
          <Button color="primary" outline onClick={() => setIsConfirm(true)}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            Add
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  )
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderBankModal)