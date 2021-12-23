import React, { Fragment, useEffect, useMemo, useState } from "react"
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
import AWSMDropdown from "../../components/Common/Dropdown"
import AWSMAlert from "../../components/Common/AWSMAlert"
import { getEditOrderBankDetail } from "../../store/actions"
import TimePicker from "../../components/Common/TableInformation/components/TimePicker"
import REGION_TERMINAL, { TERMINAL_CODE_MAPPING_ID } from "common/data/regionAndTerminal"

const ORDER_PRIORITY = ["None", "High Priority"]
const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:15`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
  timeData.push(`${i.toString().padStart(2, "0")}:45`)
}
timeData.push(`23:59`)

const EditOrderBankModal = props => {
  const { open, onCancel, viewData } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [editOrderData, setEditOrderData] = useState(null)
  const [showAlert, setShowAlert] = useState(false)  
  const [isUpdate, setIsUpdate] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  const [inputValue1, setInputValue1] = useState("")
  const [inputValue2, setInputValue2] = useState("") 
  const [inputValue3, setInputValue3] = useState("")  
  const [terminalList, setTerminalList] = useState([])
  const [regionList, setRegionList] = useState([])

  useEffect(() => {
    let temp = [];
    REGION_TERMINAL.map((item, index) => {
      temp.push(item.region);
    })
    setRegionList(temp) 
  }, [REGION_TERMINAL])

  useEffect(async () => {
    if(viewData !== null ){ 
      let temp = {...viewData};
      const currentRegion = REGION_TERMINAL.find(e => e.region === temp.region);
      setTerminalList(currentRegion ? currentRegion.terminal : []);
      temp.terminal_name = TERMINAL_CODE_MAPPING_ID[temp.terminal];
      temp.region = props?.region;
      setEditOrderData(temp); 
    }
  }, [viewData]);  

  useEffect(async () => {
  }, [props.region]);    

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const handleUpdate = async() => {
    const temp = {
      shift_date: editOrderData?.shift_date, //shiftDate.toISOString().split('T')[0],
      requested_delivery_date: editOrderData?.requested_delivery_date, //shiftDate.toISOString().split('T')[0],
      my_remark_1:editOrderData?.my_remark_1,
      my_remark_2:editOrderData?.my_remark_2,
      my_remark_3:editOrderData?.my_remark_3,
      terminal: editOrderData?.terminal,
      volume: parseInt(editOrderData?.volume),
      eta: editOrderData?.eta,
      planned_load_time: editOrderData?.planned_load_time,
      remarks: editOrderData?.remarks,
      priority: editOrderData?.priority,
      vehicle: editOrderData?.vehicle,
      commercial_storage: editOrderData?.commercial_storage,
      retail_storage: editOrderData?.retail_storage,
    };
    const { onGetEditOrderBankDetails } = props
    await onGetEditOrderBankDetails({id: editOrderData.id, data: temp}) 
    setIsUpdate(true);
  }

  useEffect(() => {
    if(props.editorderBankData && isUpdate === true) {
      (typeof props.editorderBankData === 'object' && props.editorderBankData.status === undefined) ? onCancel('edit', 'success') : onCancel('edit', 'error');
      setEditOrderData(null);
      setIsUpdate(false);
      }
  }, [props.editorderBankData])

  const onConfirmExit = () => {
    setIsConfirm(false)
    if (onCancel) {
      onCancel('cancel')
    }
  }

  const toggle = () => {
    setIsConfirm(true)
  }

  const onFieldChange = (key, value) => {
    if(key === 'region'){
      const currentRegion = REGION_TERMINAL.find(e => e.region === value);
      setTerminalList(currentRegion ? currentRegion.terminal : []);
  
      const newOrderData = { ...editOrderData }
      newOrderData[key] = currentRegion ? currentRegion.region : ''
      newOrderData['terminal_name'] = '';
      setEditOrderData(newOrderData)
    }else if(key === 'my_remark_1') {
      setInputValue1(value);
      if(value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    }  else if(key === 'my_remark_2') {
      setInputValue2(value);
      if(value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    }  else if(key === 'my_remark_3') {
      setInputValue3(value);
      if(value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else {
      const newOrderData = { ...editOrderData }
      newOrderData[key] = value
      setEditOrderData(newOrderData)
    }
  }

  const remainChars1 = useMemo(() => {
    return 40 - inputValue1.length
  }, [inputValue1])

  const remainChars2 = useMemo(() => {
    return 40 - inputValue2.length
  }, [inputValue2])

  const remainChars3 = useMemo(() => {
    return 40 - inputValue3.length
  }, [inputValue3])

  const isValid1 = useMemo(() => {
    return inputValue1 && remainChars1 >= 0
  }, [remainChars1])

  const isValid2 = useMemo(() => {
    return inputValue2 && remainChars2 >= 0
  }, [remainChars2])

  const isValid3 = useMemo(() => {
    return inputValue3 && remainChars3 >= 0
  }, [remainChars3])


  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">View/Edit Details: Order ID {editOrderData?.id}</span>
        <span className="last-updated-sub-title">
        {`Last Updated By: ${editOrderData?.updated_by?.split("@")[0] || "Unknown"} on ${editOrderData?.created_at && format(new Date(editOrderData?.created_at), "do LLL yyyy") || ""}`}
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
                  value={editOrderData?.shift_date}
                  disabled={true}
                />
              </div>
              <div className="col-8 p-0 ml-4">
                <label className="text-upper">region & terminal</label>
                <Row>
                  <div className="col-3">
                  <AWSMDropdown
                          items={regionList}
                          onChange={value => onFieldChange("region", value)}
                          value={editOrderData.region ? editOrderData.region : ""}
                          disabled={false}
                        />
                  </div>
                  <div className="col-3">
                    <AWSMDropdown
                      items={terminalList}
                      onChange={value => onFieldChange("terminal_name", value)}
                      value={editOrderData?.terminal_name}
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
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.ship_to_party} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">name</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.ship_to_company} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Requested Delivery Date</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <DatePicker value={editOrderData?.requested_delivery_date} placeholder='Select Date' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Volume (L)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.volume} disabled={false} onChange={value => onFieldChange("volume", value)} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">customer Type</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.customer_type} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Product Category</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.ordering_category} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Product</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMDropdown
                              items={''}//productList
                              onChange={value =>
                                onFieldChange("product_name", value)
                              }
                              value={editOrderData?.product_name}
                              disabled={false}
                              placeholder="select"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Product Code</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.product} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Order Type</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.order_type} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Planned Load Time</label>
                        <div className="d-flex">
                          <div className="w-100">
                          <TimePicker
                        value={editOrderData.planned_load_time}
                        items={timeData}
                        onChange={value => onFieldChange("planned_load_time", value)}
                        hasNone
                      />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">ETA</label>
                        <div className="d-flex">
                          <div className="w-100">
                          <TimePicker
                            value={editOrderData.eta}
                            items={timeData}
                            onChange={value => onFieldChange("eta", value)}
                            hasNone
                          />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Multiproduct ID</label>
                        <span className='remove_text text-red' onClick={() => onFieldChange("ConfirmMultiproduct", true)} >Remove</span>
                        <div className="d-flex">
                          <div className={`w-100 relative ${editOrderData?.ConfirmMultiproduct === true && 'border-red'}`}>
                            <AWSMInput value={editOrderData?.multi_prod_id} disabled={true} />
                            {editOrderData?.ConfirmMultiproduct === true &&
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
                            <AWSMInput value={editOrderData?.retain === null ? '00' : editOrderData?.retain} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Runout</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.runout === null ? '00' : editOrderData?.runout} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Multiload ID</label>
                        <span className='remove_text text-red' onClick={() => onFieldChange("ConfirmMultiload", true)}>Remove</span>
                        <div className="d-flex">
                          <div className={`w-100 relative ${editOrderData?.ConfirmMultiload === true && 'border-red'}`}>
                            <AWSMInput value={editOrderData?.multi_load_id} disabled={true} />
                            {editOrderData?.ConfirmMultiload === true &&
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
                            <AWSMDropdown
                          items={ORDER_PRIORITY}
                          onChange={value =>
                            onFieldChange("priority", value)
                          }
                          value={editOrderData?.priority}
                        />
                          </div>
                        </div>
                      </div>
                      <div className="w-70 mr-4">
                        <label className="text-upper">Special Request Remarks</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.remarks} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-70 mr-4">
                        <label className="text-upper">Order Remarks</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.order_remarks} disabled={false} onChange={value => onFieldChange("order-remark", value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4 mb-4">
                      <div className="w-100 mr-4">
                        <label className="text-upper">my Remarks 1</label>
                        <div className="w-100 relative">
                        <input
                          onChange={e => onFieldChange("my_remark_1", e.target.value)}
                          value={editOrderData?.my_remark_1}
                          className={`awsm-input w-100 ${(inputValue1 && !isValid1) ? "out-range " : ""}`}
                        />
                        <span
                          className={`position-absolute awsm-input-right-content ${
                            (inputValue1 && !isValid1) ? "out-range " : ""
                          }`}
                        >{`${remainChars1 >= 0 ? "+" : ""}${remainChars1}`}</span>
                        </div>
                      </div>
                      <div className="w-100 mr-4">
                        <label className="text-upper">my Remarks 2</label>
                        <div className="w-100 relative">
                        <input
                        onChange={e => onFieldChange("my_remark_2", e.target.value)}
                        value={editOrderData?.my_remark_2}
                        className={`awsm-input w-100 ${(inputValue2 && !isValid2) ? "out-range " : ""}`}
                    />
                    <span
                          className={`position-absolute awsm-input-right-content ${
                            (inputValue2 && !isValid2) ? "out-range " : ""
                          }`}
                        >{`${remainChars2 >= 0 ? "+" : ""}${remainChars2}`}</span>
                        </div>
                      </div>
                      <div className="w-100 mr-4">
                        <label className="text-upper">my Remarks 3</label>
                        <div className="w-100 relative">
                        <input
                        onChange={e => onFieldChange("my_remark_3", e.target.value)}
                        value={editOrderData?.my_remark_3}
                        className={`awsm-input w-100 ${(inputValue3 && !isValid3) ? "out-range " : ""}`}
                      />
                       <span
                          className={`position-absolute awsm-input-right-content ${
                            (inputValue3 && !isValid3) ? "out-range " : ""
                          }`}
                        >{`${remainChars3 >= 0 ? "+" : ""}${remainChars3}`}</span>
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
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.road_tanker_requirement} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Accessibility</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.road_tanker_accessibility} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Duration</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.duration} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Distance</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.distance} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Delivery Open Time (From)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Delivery Open Time (To)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From) 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To) 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
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
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From) 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To) 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
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
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From) 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To) 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
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
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <label className="text-upper">time (From)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <label className="text-upper">Time (To)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-31 mr-4">
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-4">
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-15 ml-2">
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value="" disabled={true} />
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
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.site_name} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">site ID</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.site_id} disabled={true} />
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
                            <AWSMInput value={editOrderData?.remarks} disabled={true} />
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
                            <AWSMInput value={editOrderData?.dn_no} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Status</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.dn_status} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Date</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.dn_date} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Time Creation.</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.dn_created_at} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">DN Created By</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.dn_created_by} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Sales Order No</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.sales_order_no} disabled={true} />
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
                            <AWSMInput value={editOrderData?.opening_stock_days} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Closing Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.closing_stock_days} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Current Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.current_stock_days} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Ullage (L)</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.ullage} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Out of Stock</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.out_of_stock} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Max Stock Days</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.max_stock_days} disabled={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="w-30 mr-4">
                        <label className="text-upper">Monthly Fixed Quota</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.monthly_fixed_quota} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Number 1</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.contact1} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Number 2</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.contact2} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Contact Number 3</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.contact3} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Tm Number</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Tm Number</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Tm Number</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
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
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.address}  disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">City</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Postcode</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
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
                            <AWSMInput value={""} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Latitude</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Longitude</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={''} disabled={true} />
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
                            <AWSMInput value={''} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Cluster</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.cluster} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Alt Cluster</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.alternative_cluster} disabled={true} />
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
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.cloud} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Border Station</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.retail_storage_relation?.retail_customer_relation?.border_station} disabled={true} />
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
                            <AWSMInput value={editOrderData?.route_id} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Split ID</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.split_id} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Vehicle</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.vehicle} disabled={true} />
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
                            <AWSMInput value={editOrderData?.shipment} disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="w-30 mr-4">
                        <label className="text-upper">Trip No.</label>
                        <div className="d-flex">
                          <div className="w-100">
                            <AWSMInput value={editOrderData?.trip_no} disabled={true} />
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
            Update
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
  editorderBankData: orderBank.editorderBankData,
})

const mapDispatchToProps = dispatch => ({
  onGetEditOrderBankDetails: params => dispatch(getEditOrderBankDetail(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderBankModal)