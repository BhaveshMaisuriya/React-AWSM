import { Input } from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Nav,
  TabPane,
  TabContent,
} from "reactstrap"
import DatePicker from "../../components/Common/DatePicker"
import ExitConfirmation from "../../components/Common/ExitConfirmation"
import AWSMInput from "../../components/Common/Input"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import AWSMDropdown from "../../components/Common/Dropdown"
import { orderDetails } from "./newOrderData"
import AWSMAlert from "../../components/Common/AWSMAlert"

const ORDER_REGION = ["Center", "Center"]
const ORDER_TERMINAL = ["KVDT", "KVDT 1"]
const ORDER_LOAD_TIME = ["00", "01"]
const ORDER_ETA = ["00", "01"]
const ORDER_PRIORITY = ["High Priority", "Low Priority"]

const NewOrderBankModal = props => {
  const { open, onCancel } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [currentState, setCurrentState] = useState("")
  const [orderData, setOrderData] = useState({})
  const [shiptoNo, setShiptoNo] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {}, [currentState])

  const onConfirmCancel = () => {
    setIsConfirm(false)
    setCurrentState("")
  }

  const handleUpdate = () => {
    onCancel()
  }

  const onConfirmExit = () => {
    setIsConfirm(false)
    setCurrentState("")
    if (onCancel) {
      onCancel()
    }
  }

  const toggle = () => {
    setIsConfirm(true)
  }

  const onFieldChange = (key, value) => {
    const newOrderData = { ...orderData }
    newOrderData[key] = value
    setOrderData(newOrderData)
  }

  const onSearchOrder = async () => {
    setCurrentState("loading")
    let searchedData = []
    orderDetails.map((item, index) => {
      if (item.shipNo === shiptoNo) {
        searchedData.push(item)
      }
    })
    if (searchedData.length !== 0) {
      setTimeout(async function () {
        await setShowAlert(true);

        Object.keys(searchedData[0]).map(function (key) {
          orderData[key] = searchedData[0][key]
        })
        
        setCurrentState("search")
        
      }, 1000)
    } else {
      setTimeout(function () {
        setCurrentState("error")
      }, 1000)
    }
  }

  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">Add New order</span>
      </ModalHeader>

      <ModalBody className="position-relative h-70v scroll pl-30">
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        {!isConfirm && (
          <>
            <div className="d-flex justify-content-between align-item-baseline">
              <div className="col-4 p-0">
                <label>SHIFT DATE</label>
                <DatePicker />
              </div>
              <div className="col-4 p-0 ml-4">
                <label>
                  SHIP TO <span className="text-red">*</span>
                </label>
                <AWSMInput
                  type="number"
                  defaultValue=""
                  placeholder="Numeric Only"
                  onChange={val => setShiptoNo(val)}
                />
              </div>
              <div className="col-4 p-0">
                <Button
                  color="primary"
                  className="mt-27 ml-3 p-1320"
                  onClick={() => onSearchOrder()}
                >
                  Search
                </Button>
              </div>
            </div>
            <hr />
            {currentState === "search" && (
              <div className="w-100">
                <h4>Ship To: {orderData.shipNo}</h4>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-50 mr-4">
                    <label className="text-upper">Region & Terminal</label>
                    <div className="d-flex">
                      <div className="w-50 mr-2">
                        <AWSMDropdown
                          items={ORDER_REGION}
                          onChange={value => onFieldChange("region", "Center")}
                          value={orderData.region}
                          disabled={true}
                        />
                      </div>
                      <div className="w-50 mr-2">
                        <AWSMDropdown
                          items={ORDER_TERMINAL}
                          onChange={value => onFieldChange("terminal", value)}
                          value={orderData.terminal}
                          disabled={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">
                      Volume (l)<span className="text-red">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="w-70">
                        <AWSMInput
                          type="number"
                          placeholder="Numeric Only"
                          onChange={value => onFieldChange("volume", value)}
                          value={orderData.volume}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-50 mr-4">
                    <label className="text-upper">
                      Product Name<span className="text-red">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="w-100">
                        <AWSMDropdown
                          items={ORDER_TERMINAL}
                          onChange={value =>
                            onFieldChange("product_name", value)
                          }
                          value={orderData.product_name}
                          disabled={false}
                          placeholder="select"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">Product Code</label>
                    <div className="d-flex">
                      <div className="w-70">
                        <AWSMInput
                          onChange={value =>
                            onFieldChange("product_code", value)
                          }
                          value={orderData.product_code}
                          disabled={true}
                          placeholder="Lorem ipsum"
                        />
                      </div>
                      <div className="w-30 ml-3">
                        <Button color="primary">Generate</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="text-bold mt-4">Order Details</h5>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-50 mr-4">
                    <label className="text-upper">Planned Load Time</label>
                    <div className="d-flex">
                      <div className="w-100">
                        <AWSMDropdown
                          items={ORDER_LOAD_TIME}
                          onChange={value => onFieldChange("load_time", value)}
                          value={orderData.load_time}
                          disabled={false}
                          placeholder="select load time"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">eta</label>
                    <div className="d-flex">
                      <div className="w-70">
                        <AWSMDropdown
                          items={ORDER_ETA}
                          onChange={value => onFieldChange("eta", value)}
                          value={orderData.eta}
                          disabled={false}
                          placeholder="select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-100 mr-4">
                    <label className="text-upper">Order Remarks</label>
                    <div className="d-flex">
                      <div className="w-85">
                        <AWSMInput
                          onChange={value =>
                            onFieldChange("remark_order", value)
                          }
                          value={orderData.remark_order}
                          placeholder="Type Something here..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-50 mr-4">
                    <label className="text-upper">Priority</label>
                    <div className="d-flex">
                      <div className="w-100">
                        <AWSMDropdown
                          items={ORDER_PRIORITY}
                          onChange={value =>
                            onFieldChange("priority_order", value)
                          }
                          value={orderData.priority_order}
                          disabled={false}
                          placeholder="select priority"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">
                      Special Request Remarks
                    </label>
                    <div className="d-flex">
                      <div className="w-100">
                        <AWSMInput
                          onChange={value =>
                            onFieldChange("request_remark_order", value)
                          }
                          value={orderData.request_remark_order}
                          disabled={true}
                          placeholder="Lorem ipsum"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-50 mr-4">
                    <label className="text-upper">Retain</label>
                    <div className="d-flex">
                      <div className="w-100">
                        <AWSMInput
                          onChange={value => onFieldChange("retain", value)}
                          value={orderData.retain}
                          disabled={true}
                          placeholder="Lorem ipsum"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">Runout</label>
                    <div className="d-flex">
                      <div className="w-70">
                        <AWSMInput
                          onChange={value => onFieldChange("runout", value)}
                          value={orderData.runout}
                          disabled={true}
                          placeholder="Lorem ipsum"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Row className="order_details_box mt-4">
                  <Col lg={4} sm={6} xs={12}>
                    <p>Name: IDAMO Enterprise</p>
                    <p>Cloud: 00</p>
                    <p>Product Category: 1234</p>
                    <p>Order Type: SMP</p>
                    <p>Accessibility: Lorem Ipsum</p>
                    <p>Site ID: Lorem Ipsum</p>
                    <p>Site Name: Lorem Ipsum</p>
                    <p>Cust Type: Retail</p>
                    <p>Order ID: XXXXXXX</p>
                    <p>Order Date: 11th Feb 2021</p>
                    <p>Opening Stock Days: 00</p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p>Closing Stock Days: 00</p>
                    <p>Current Stock Days: 00</p>
                    <p>Ullage (L): 00</p>
                    <p>Out Of Stock: 00</p>
                    <p>Max Stock Days: 00</p>
                    <p>Monthly Fixed Quota: 00</p>
                    <p>RT Req: Lorem Ipsum</p>
                    <p>City: Lorem Ipsum</p>
                    <p>Postcode: 00</p>
                    <p>State: Lorem Ipsum</p>
                    <p>Cluster: Lorem Ipsum</p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p>Alt Cluster: Lorem Ipsum</p>
                    <p>Delivery Open Time: 00</p>
                    <p>Open Time 1: 00</p>
                    <p>Open Time 2: 00</p>
                    <p>Open Time 3: 00</p>
                    <p>No Del Interval 1: Lorem Ipsum</p>
                    <p>No Del Interval 2: Lorem Ipsum</p>
                    <p>No Del Interval 3: Lorem Ipsum</p>
                    <p>No Del Interval 4: Lorem Ipsum</p>
                    <p>No Del Interval 5: Lorem Ipsum</p>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-100 mr-4">
                    <label className="text-upper">Remarks</label>
                    <div className="d-flex">
                      <div className="w-85">
                        <AWSMInput
                          onChange={value => onFieldChange("remark", value)}
                          value={orderData.remark}
                          placeholder="Lorem ipsum"
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4 mb-4">
                  <div className="w-100 mr-4">
                    <label className="text-upper">my Remarks 1</label>
                    <div className="w-100">
                      <AWSMInput
                        onChange={value => onFieldChange("myremark1", value)}
                        value={orderData.myremark1}
                        placeholder="Type something here..."
                      />
                    </div>
                  </div>
                  <div className="w-100 mr-4">
                    <label className="text-upper">my Remarks 2</label>
                    <div className="w-100">
                      <AWSMInput
                        onChange={value => onFieldChange("myremark2", value)}
                        value={orderData.myremark2}
                        placeholder="Type something here..."
                      />
                    </div>
                  </div>
                  <div className="w-100 mr-4">
                    <label className="text-upper">my Remarks 3</label>
                    <div className="w-100">
                      <AWSMInput
                        onChange={value => onFieldChange("myremark3", value)}
                        value={orderData.myremark3}
                        placeholder="Type something here..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentState !== "search" && (
              <div
                className={`text-center h-340 w-100 table ${
                  currentState === ""
                    ? "bg-grey"
                    : currentState === "error"
                    ? "bg-err"
                    : "bg-loading"
                }`}
              >
                <div className="relative table_cell h-100">
                  <FileCopyIcon />
                  <p className="text-18">
                    {currentState === "" ? (
                      "No Data Available, Please Search Your Order"
                    ) : currentState === "error" ? (
                      "Details Not Found, Try Again"
                    ) : (
                      <Fragment> Please wait, Loading Details.. </Fragment>
                    )}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </ModalBody>

      {!isConfirm && (
        <ModalFooter>
          <Button
            color="light-primary"
            className="light-primary p-1320"
            outline
            onClick={() => setIsConfirm(true)}
          >
            Cancel
          </Button>
          <Button color="primary" className="p-1320" onClick={handleUpdate}>
            Add
          </Button>
        </ModalFooter>
      )}
      {showAlert &&
      <AWSMAlert
            status="success"
            message='Order Details has successfully load'
            openAlert={showAlert}
            closeAlert={() => setShowAlert(false)}
          />
      }
    </Modal>
  )
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderBankModal)
