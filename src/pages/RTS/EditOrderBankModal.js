import { Input } from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { format } from "date-fns"
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
  NavItem,
  NavLink,
} from "reactstrap"
import DatePicker from "../../components/Common/DatePicker"
import ExitConfirmation from "../../components/Common/ExitConfirmation"
import AWSMInput from "../../components/Common/Input"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import AWSMDropdown from "../../components/Common/Dropdown"
import { orderDetails } from "./newOrderData"
import AWSMAlert from "../../components/Common/AWSMAlert"
import { getOrderBankDetail } from "../../store/actions"

const ORDER_REGION = ["Center", "Center"]
const ORDER_TERMINAL = ["KVDT", "KVDT 1"]

const EditOrderBankModal = props => {
  const { open, onCancel } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [editOrderData, setEditOrderData] = useState(null)
  const [orderData, setOrderData] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [activeTab, setActiveTab] = useState("1")

  useEffect(async () => {
    const { onGetOrderBankDetails } = props
    await onGetOrderBankDetails('11111')
  }, []);

  useEffect(async () => {
    if (props.currentOrderDetail !== null) {
      setEditOrderData(props.currentOrderDetail);
    }
  }, [props.currentOrderDetail])

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

  const onFieldChange = (key, value) => {
    const newOrderData = { ...orderData }
    newOrderData[key] = value
    setOrderData(newOrderData)
  }
console.log(editOrderData)
  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">View/Edit Details: Order ID 36114489</span>
        <span className="last-updated-sub-title">
        {`Last Updated By: ${editOrderData?.updated_by?.split("@")[0] || "Unknown"} on ${editOrderData?.updated_at && format(new Date(editOrderData?.updated_at), "do LLL yyyy") || ""}`}
        </span>
      </ModalHeader>

      <ModalBody className="position-relative h-70v pl-30">
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        {(!isConfirm && editOrderData !== null) && (
          <>
            <div className="d-flex justify-content-between align-item-baseline">
              <div className="col-4 p-0">
                <label>SHIFT DATE</label>
                <AWSMInput
                  type="text"
                  value={editOrderData.shiftDate}
                  disabled={true}
                />
              </div>
              <div className="col-8 p-0 ml-4">
                <label className="text-upper">region & terminal</label>
                <Row>
                  <div className="col-3">
                    <AWSMDropdown
                      items={ORDER_REGION}
                      value={editOrderData.region}
                      disabled={true}
                    />
                  </div>
                  <div className="col-3">
                    <AWSMDropdown
                      items={ORDER_TERMINAL}
                      onChange={value => onFieldChange("terminal", value)}
                      value={orderData.terminal}
                      disabled={false}
                    />
                  </div>
                  <div className="col-3"></div>
                </Row>
              </div>
            </div>

            <div className="mt-4 border-tab">
              <Nav pills justified>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    <span className="d-none d-sm-block">Order</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => setActiveTab("2")}
                  >
                    <span className="d-none d-sm-block">Delivery</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => setActiveTab("3")}
                  >
                    <span className="d-none d-sm-block">Site & DN</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "4" ? "active" : ""}
                    onClick={() => setActiveTab("4")}
                  >
                    <span className="d-none d-sm-block">
                      Indicator & Contact
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "5" ? "active" : ""}
                    onClick={() => setActiveTab("5")}
                  >
                    <span className="d-none d-sm-block">Address & Trip</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className='scroll order-scroll'>
              <TabContent activeTab={activeTab} className="py-4">
                <TabPane tabId="1">
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Ship To</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.order.shipTo} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.order.name} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Order Date</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <DatePicker placeholder='Select Date' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Volume (L)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.order.volume} disabled={false} onChange={value => onFieldChange("volume", value)} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">customer Type</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="retail" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Product Category</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Product</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Primax 95 Premium" disabled={false} onChange={value => onFieldChange("product", value)} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Product Code</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Order Type</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="SMP" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Planned Load Time</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXX" disabled={false} onChange={value => onFieldChange("loadTime", value)} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">ETA</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Multiproduct ID</label>
                        <span className='remove_text text-red' onClick={() => onFieldChange("ConfirmMultiproduct", true)} >Remove</span>
                        <div className="d-flex">
                          <div className={`w-100 relative ${orderData.ConfirmMultiproduct === true && 'border-red'}`}>
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                            {orderData.ConfirmMultiproduct === true &&
                              <div className='confirm-main'>
                                <span class='confirm-text text-red' onClick={() => onFieldChange("ConfirmMultiproduct", false)}>Confirm</span>
                                <span class='confirm-no-text text-red' onClick={() => onFieldChange("ConfirmMultiproduct", false)}>No</span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Retain</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="00" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Runout</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="00" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Multiload ID</label>
                        <span className='remove_text text-red' onClick={() => onFieldChange("ConfirmMultiload", true)}>Remove</span>
                        <div className="d-flex">
                          <div className={`w-100 relative ${orderData.ConfirmMultiload === true && 'border-red'}`}>
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                            {orderData.ConfirmMultiload === true &&
                              <div className='confirm-main'>
                                <span class='confirm-text text-red' onClick={() => onFieldChange("ConfirmMultiload", false)}>Confirm</span>
                                <span class='confirm-no-text text-red' onClick={() => onFieldChange("ConfirmMultiload", false)}>No</span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Priority<span className='text-red'>*</span></label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem Ipsum" disabled={false} onChange={value => onFieldChange("priority", value)} />
                          </div>
                        </div>
                      </div>
                      <div className="w-70 mr-4">
                        <label className="text-upper">Special Request Remarks</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-70 mr-4">
                        <label className="text-upper">Order Remarks</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Type something here ..." disabled={false} onChange={value => onFieldChange("order-remark", value)} />
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
                </TabPane>
                <TabPane tabId="2">
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">RT Req</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.delivery.rt} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Accessibility</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.delivery.accessibility} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Duration</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.delivery.duration} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Distance</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Delivery Open Time (From)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Central" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Delivery Open Time (To)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Central" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5 className='text-bold mt-3 mb-3'>Actual Open Time</h5>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-31 mr-4">
                        <label className="text-upper">Days 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Monday, Tuesday, Wednesday" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From) 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XX:XX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To) 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XX:XX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-31 mr-4">
                        <label className="text-upper">Days 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From) 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To) 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-31 mr-4">
                        <label className="text-upper">Days 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From) 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To) 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <h5 className='text-bold mt-3 mb-3'>No Delivery Interval</h5>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-31 mr-4">
                        <label className="text-upper">Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-31 mr-4">
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Site Name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.site.name} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">site ID</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.site.id} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-64 mr-4">
                        <label className="text-upper">Remarks</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.site.remark} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5 className='text-bold mt-3 mb-3'>DN Information</h5>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN No.</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Status</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Date</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XX XXX XXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Time Creation.</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XX:XX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Created By</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Sales Order No</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Opening Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.indication.open} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Closing Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.indication.close} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Current Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.indication.current} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Ullage (L)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Out of Stock</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Max Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Monthly Fixed Quota</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XX" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5 className='text-bold mt-3 mb-3'>Contact</h5>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Name 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Number 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Name 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Number 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Name 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Number 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">TM Name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Tm Number</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">TM Name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Tm Number</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">TM Name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Tm Number</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Delivery Address</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.address.address} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">City</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.address.city} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Postcode</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData.address.pincode} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">state</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Latitude</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Longitude</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Country</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Cluster</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Alt Cluster</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Cloud</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Border Station</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                  </div>
                  <h5 className='text-bold'>Trip Information</h5>
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Route ID</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Split ID</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Vehicle</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Shipment</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="-" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Trip No.</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="1" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
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
  currentOrderDetail: orderBank.currentOrderDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetOrderBankDetails: params => dispatch(getOrderBankDetail(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderBankModal)