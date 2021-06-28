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

const ORDER_REGION = ["Center", "Center"]
const ORDER_TERMINAL = ["KVDT", "KVDT 1"]
const ORDER_LOAD_TIME = ["00", "01"]
const ORDER_ETA = ["00", "01"]
const ORDER_PRIORITY = ["High Priority", "Low Priority"]

const EditOrderBankModal = props => {
  const { open, onCancel } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [orderData, setOrderData] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [activeTab, setActiveTab] = useState("1")

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

  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">View/Edit Details: Order ID 36114489</span>
        <span className="last-updated-sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
      </ModalHeader>

      <ModalBody className="position-relative h-70v pl-30">
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        {!isConfirm && (
          <>
            <div className="d-flex justify-content-between align-item-baseline">
              <div className="col-4 p-0">
                <label>SHIFT DATE</label>
                <AWSMInput
                  type="text"
                  defaultValue=""
                  placeholder="Lorem Ipsum"
                  disabled={true}
                />
              </div>
              <div className="col-8 p-0 ml-4">
                <label className="text-upper">region & terminal</label>
                <Row>
                  <div className="col-3">
                    <AWSMDropdown
                      items={ORDER_REGION}
                      value={"Central"}
                      disabled={true}
                    />
                  </div>
                  <div className="col-3">
                    <AWSMDropdown
                      items={ORDER_TERMINAL}
                      onChange={value => onFieldChange("product_name", value)}
                      value={orderData.product_name}
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
                            <AWSMInput value="XXXXXXX" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="Lorem ipsum" disabled={true} />
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
                            <AWSMInput value="XXXXXXX" disabled={false} onChange={value => onFieldChange("volume", value)} />
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

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderBankModal)
