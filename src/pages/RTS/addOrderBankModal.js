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
import { getOrderBank } from "../../store/actions"
import { removeKeywords } from '../../pages/DQM/Common/helper';

const ORDER_REGION = ["Center", "Northern"]
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

  const onAddressFieldChange = (key, value) => {
    const newOrderData = { ...orderData }
    newOrderData.address.address[key] = value
    setOrderData(newOrderData)
  }
  
  const onFieldChange = (key, value) => {
    const newOrderData = { ...orderData }
    newOrderData[key] = value
    setOrderData(newOrderData)
  }

  const onSearchOrder = async () => {
    setCurrentState("loading")
    const { onGetOrderBank } = props
    await onGetOrderBank(shiptoNo)
  }

  useEffect(async () => {
    if (props.orderBankData !== null) {
      if (typeof props.orderBankData === 'object' && props.orderBankData.ship_to_party === shiptoNo) {
        setTimeout(async function () {
          await setShowAlert(true)
          await setOrderData(props.orderBankData)
          await setCurrentState("search")
        }, 1000)
      } else if(props?.orderBankData?.data && props.orderBankData.status === 404) {
        setTimeout(function () {
          setCurrentState("error")
        }, 500)
      } else {
        setTimeout(function () {
          setCurrentState("error")
        }, 500)
      }
    }
  }, [props.orderBankData])

  // const onCancel = () => {
  //   setIsConfirm(true);
  //   setShiptoNo('')
  //   setCurrentState("")
  // }

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
                <h4>Ship To: {shiptoNo}</h4>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-50 mr-4">
                    <label className="text-upper">Region & Terminal</label>
                    <div className="d-flex">
                      <div className="w-50 mr-2">
                        <AWSMDropdown
                          items={ORDER_REGION}
                          // onChange={value => onAddressFieldChange("region_group", value)}
                          value={orderData.address.address.region_group}
                          disabled={true}
                        />
                      </div>
                      <div className="w-50 mr-2">
                        <AWSMDropdown
                          items={ORDER_TERMINAL}
                          onChange={value => onFieldChange("terminal", value)}
                          value={orderData.terminal ? orderData.terminal : ''}
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
                            onFieldChange("remarks", value)
                          }
                          value={orderData.remarks}
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
                    <p><strong>Name: </strong>{orderData.address.ship_to_company}</p>
                    <p><strong>Cloud: </strong>{orderData.address.cloud}</p>
                    <p><strong>Product Category:</strong> </p>
                    <p><strong>Order Type:</strong> </p>
                    <p><strong>Accessibility:</strong> </p>
                    <p><strong>Site ID: </strong>{orderData.address.site_id}</p>
                    <p><strong>Site Name: </strong>{orderData.address.site_name}</p>
                    <p><strong>Cust Type:</strong> Retail</p>
                    <p><strong>Order ID: </strong></p>
                    <p><strong>Order Date:</strong> </p>
                    <p><strong>Opening Stock Days: </strong></p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p><strong>Closing Stock Days:</strong> </p>
                    <p><strong>Current Stock Days:</strong> </p>
                    <p><strong>Ullage (L):</strong> </p>
                    <p><strong>Out Of Stock:</strong> </p>
                    <p><strong>Max Stock Days:</strong> </p>
                    <p><strong>Monthly Fixed Quota:</strong> </p>
                    <p><strong>RT Req:</strong> Lorem Ipsum</p>
                    <p><strong>City:</strong> {orderData.address.address.city}</p>
                    <p><strong>Postcode: </strong>{orderData.address.address.postcode}</p>
                    <p><strong>State: </strong>{orderData.address.address.state}</p>
                    <p><strong>Cluster: </strong>{orderData.address.cluster}</p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p><strong>Alt Cluster: </strong>{orderData.address.alternative_cluster}</p>
                    <p><strong>Delivery Open Time: </strong>{orderData.delivery.delivery_open_time_1.time_from}  to  {orderData.delivery.delivery_open_time_1.time_to}</p>
                    <p><strong>Open Time 1: </strong>{removeKeywords(orderData.delivery.actual_open_time_1.days.join())}</p>
                    <p><strong>Open Time 2:</strong> {removeKeywords(orderData.delivery.actual_open_time_1.days.join())}</p>
                    <p><strong>Open Time 3:</strong> {removeKeywords(orderData.delivery.actual_open_time_1.days.join())}</p>
                    <p><strong>No Del Interval 1:</strong> {orderData.delivery.no_delivery_interval_1.type !== '' ? orderData.delivery.no_delivery_interval_1.type === 'daily' ? 'Every day' : `From ${orderData.delivery.no_delivery_interval_1.date_from} to ${orderData.delivery.no_delivery_interval_1.date_to}` : '-'}</p>
                    <p><strong>No Del Interval 2: </strong>{orderData.delivery.no_delivery_interval_2.type !== '' ? orderData.delivery.no_delivery_interval_2.type === 'daily' ? 'Every day' : `From ${orderData.delivery.no_delivery_interval_2.date_from} to ${orderData.delivery.no_delivery_interval_2.date_to}` : '-'}</p>
                    <p><strong>No Del Interval 3:</strong> {orderData.delivery.no_delivery_interval_3.type !== '' ? orderData.delivery.no_delivery_interval_3.type === 'daily' ? 'Every day' : `From ${orderData.delivery.no_delivery_interval_3.date_from} to ${orderData.delivery.no_delivery_interval_3.date_to}` : '-'}</p>
                    <p><strong>No Del Interval 4:</strong> {orderData.delivery.no_delivery_interval_4.type !== '' ? orderData.delivery.no_delivery_interval_4.type === 'daily' ? 'Every day' : `From ${orderData.delivery.no_delivery_interval_4.date_from} to ${orderData.delivery.no_delivery_interval_4.date_to}` : '-'}</p>
                    <p><strong>No Del Interval 5:</strong> {orderData.delivery.no_delivery_interval_5.type !== '' ? orderData.delivery.no_delivery_interval_5.type === 'daily' ? 'Every day' : `From ${orderData.delivery.no_delivery_interval_5.date_from} to ${orderData.delivery.no_delivery_interval_5.date_to}` : '-'}</p>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-100 mr-4">
                    <label className="text-upper">Remarks</label>
                    <div className="d-flex">
                      <div className="w-85">
                        <AWSMInput
                          onChange={value => onFieldChange("remarks", value)}
                          value={orderData.remarks}
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
                className={`text-center h-340 w-100 table ${currentState === ""
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
      {showAlert && (
        <AWSMAlert
          status="success"
          message="Order Details has successfully load"
          openAlert={showAlert}
          closeAlert={() => setShowAlert(false)}
        />
      )}
    </Modal>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  orderBankData: orderBank.orderBankData,
})

const mapDispatchToProps = dispatch => ({
  onGetOrderBank: params => dispatch(getOrderBank(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderBankModal)