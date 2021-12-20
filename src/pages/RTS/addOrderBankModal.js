import React, { Fragment, useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalFooter, ModalBody, ModalHeader, Row, Col } from "reactstrap"
import DatePicker from "../../components/Common/DatePicker"
import ExitConfirmation from "../../components/Common/ExitConfirmation"
import AWSMInput from "../../components/Common/Input"
import AWSMDropdown from "../../components/Common/Dropdown"
import AWSMAlert from "../../components/Common/AWSMAlert"
import { getOrderBank, addOrderBank } from "../../store/actions"
import { removeKeywords } from "../../pages/DQM/Common/helper"
import REGION_TERMINAL, { TERMINAL_CODE_MAPPING } from "common/data/regionAndTerminal"
import TimePicker from "../../components/Common/TableInformation/components/TimePicker"
import NoDataIcon from "assets/images/AWSM-No-Data-Available-Inverted.svg"

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`)
const ORDER_PRIORITY = ["High Priority", "Low Priority"]
const NewOrderBankModal = props => {
  const { open, onCancel } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [currentState, setCurrentState] = useState("")
  const [orderData, setOrderData] = useState({})
  const [shiptoNo, setShiptoNo] = useState("")
  const [progress, setProgress] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [terminalList, setTerminalList] = useState([])
  const [productList, setProductList] = useState([])
  const [inputValue1, setInputValue1] = useState("")
  const [inputValue2, setInputValue2] = useState("")
  const [inputValue3, setInputValue3] = useState("")
  const [allProductDetailList, setAllProductDetailList] = useState([])
  const [shiftDate, setShiftDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

  useEffect(() => {
    if (currentState === "loading") {
      const timer = setInterval(() => {
        setProgress(prevProgress => (prevProgress >= 100 ? 100 : prevProgress + 10))
      }, 400)
      return () => {
        clearInterval(timer)
      }
    } else {
      setProgress(0)
    }
  }, [currentState])

  const onConfirmCancel = () => {
    setIsConfirm(false)
    setCurrentState("")
  }

  const handleUpdate = async () => {
    const temp = {
      shift_date: shiftDate.toISOString().split("T")[0],
      requested_delivery_date: shiftDate.toISOString().split("T")[0],
      my_remark_1: orderData.myremark1 !== undefined ? orderData.myremark1 : "",
      my_remark_2: orderData.myremark2 !== undefined ? orderData.myremark2 : "",
      my_remark_3: orderData.myremark3 !== undefined ? orderData.myremark3 : "",
      terminal: orderData.terminal !== undefined ? TERMINAL_CODE_MAPPING[orderData.terminal] : "",
      volume: orderData.volume !== undefined ? parseInt(orderData.volume) : 0,
      eta: orderData.eta !== undefined ? orderData.eta : "",
      planned_load_time: orderData.load_time !== undefined ? orderData.load_time : "",
      remarks: orderData.remarks !== undefined ? orderData.remarks : "",
      priority: orderData.priority_order !== undefined ? orderData.priority_order : "",
      retail_storage: parseInt(orderData.product_id),
    }

    const { onAddOrderBank } = props
<<<<<<< HEAD
    await onAddOrderBank(temp)
=======
    await onAddOrderBank(temp);
>>>>>>> a3b4c233d1d02fdbeed279f4868ef22330e5fb2f
  }
 
  useEffect(() => {
<<<<<<< HEAD
    if (props.addorderBankData) {
      typeof props.addorderBankData === "object" && props.addorderBankData.status === undefined
        ? onCancel("add", "success")
        : onCancel("add", "error")
      setShiftDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      setOrderData({})
      setShiptoNo("")
=======
    if(props.addorderBankData) {
      (typeof props.addorderBankData === 'object' && props.addorderBankData.status === undefined) ? onCancel('add', 'success') : onCancel('add', 'error');
      setShiftDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      setOrderData({});
      setShiptoNo('');
>>>>>>> a3b4c233d1d02fdbeed279f4868ef22330e5fb2f
    }
  }, [props.addorderBankData])

  const onConfirmExit = () => {
    setIsConfirm(false)
    setCurrentState("")
    setShiptoNo("")
    if (onCancel) {
      onCancel("cancle")
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
    if (key === "product_name") {
      const pro_code = allProductDetailList.find(res => res.name === value)
      const newOrderData = { ...orderData }
      newOrderData[key] = value
      newOrderData["product_code"] = pro_code.code
      newOrderData["product_id"] = pro_code.id
      newOrderData["storeData"] = pro_code
      setOrderData(newOrderData)
    } else if (key === "myremark1") {
      setInputValue1(value)
      if (value.length < 40) {
        const newOrderData = { ...orderData }
        newOrderData[key] = value
        setOrderData(newOrderData)
      }
    } else if (key === "myremark2") {
      setInputValue2(value)
      if (value.length < 40) {
        const newOrderData = { ...orderData }
        newOrderData[key] = value
        setOrderData(newOrderData)
      }
    } else if (key === "myremark3") {
      setInputValue3(value)
      if (value.length < 40) {
        const newOrderData = { ...orderData }
        newOrderData[key] = value
        setOrderData(newOrderData)
      }
    } else {
      const newOrderData = { ...orderData }
      newOrderData[key] = value
      setOrderData(newOrderData)
    }
  }

  const onSearchOrder = async () => {
    setCurrentState("loading")
    const { onGetOrderBank } = props
    await onGetOrderBank(shiptoNo)
  }

  useEffect(async () => {
    if (props.orderBankData !== null) {
      if (
        typeof props.orderBankData === "object" &&
        props.orderBankData.ship_to_party === shiptoNo
      ) {
        setTimeout(async function () {
          await setShowAlert(true)
          await setOrderData(props.orderBankData)
          let temp = []
          let temp1 = []
          Object.keys(props.orderBankData?.storage).map((key, index) => {
            if (key.startsWith("storage_")) {
              temp1.push(
                props.orderBankData?.storage[key]
                //   {
                //   name: .name,
                //   code: props.orderBankData?.storage[key].code,
                //   id: props.orderBankData?.storage[key].id,
                // }
              )
              temp.push(props.orderBankData?.storage[key].name)
            }
          })
          await setAllProductDetailList(temp1)
          await setProductList(temp)
          await setCurrentState("search")
        }, 1000)
      } else if (props?.orderBankData?.data && props.orderBankData.status === 404) {
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

  const onCancelClick = () => {
    shiptoNo !== "" ? setIsConfirm(true) : onCancel("cancle")
    setShiptoNo("")
    setCurrentState("")
  }

  useEffect(() => {
    const currentRegion = REGION_TERMINAL.find(
      e => e.region === orderData?.address?.address.region_group
    ) //"Nothern"
    setTerminalList(currentRegion ? currentRegion.terminal : [])
  }, [orderData?.address])

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

  const hrMints = val => {
    if (val !== "" && val !== undefined && val !== null) {
      let temp = val.split(":")
      return temp[0] + ":" + temp[1]
    } else {
      return "00:00"
    }
  }

  const deliveryIntervalText = (
    deliveryNumber,
    deliveryType,
    deliveryTimeFrom,
    deliveryTimeTo,
    deliveryDateFrom,
    deliveryDateTo,
    deliveryDays
  ) => {
    if (deliveryNumber !== undefined && deliveryType === "daily") {
      return " Every day" + " - " + hrMints(deliveryTimeFrom) + " to " + hrMints(deliveryTimeTo)
    }
    if (deliveryNumber !== undefined && deliveryType === "single") {
      return ` From ${deliveryDateFrom !== null ? deliveryDateFrom : ""} - ${hrMints(
        deliveryTimeFrom == null ? deliveryTimeFrom : ""
      )} to ${deliveryDateTo !== null ? deliveryDateTo : ""} ${hrMints(
        deliveryTimeTo == null ? deliveryTimeTo : ""
      )}`
    }
    if (deliveryNumber !== undefined && deliveryType === "every") {
      return deliveryNumber
        ? " " +
            removeKeywords(deliveryDays !== "" ? deliveryDays.join() + " - " : "") +
            hrMints(deliveryTimeFrom) +
            " to " +
            hrMints(deliveryTimeTo)
        : " - "
    } else {
      return " - "
    }
  }

  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">Add New order</span>
      </ModalHeader>

      <ModalBody className="position-relative h-70v scroll pl-30">
        {isConfirm && <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />}
        {!isConfirm && (
          <>
            <div className="d-flex justify-content-between align-item-baseline">
              <div className="col-4 p-0">
                <label>SHIFT DATE</label>
                <DatePicker
                  className="form-control awsm-input"
                  value={shiftDate}
                  onChange={date => setShiftDate(date)}
                  orderBankShiftDate={true}
                />
              </div>
              <div className="col-4 p-0 ml-4">
                <label>SHIP TO</label>
                <AWSMInput
                  type="number"
                  defaultValue=""
                  placeholder="Numeric Only"
                  onChange={val => setShiptoNo(val)}
                  value={shiptoNo}
                />
              </div>
              <div className="col-4 p-0">
                <Button
                  color="primary"
                  className="mt-27 ml-3 p-1320"
                  onClick={() => onSearchOrder()}
                  disabled={
                    shiftDate === ""
                      ? shiptoNo === ""
                        ? true
                        : false
                      : shiptoNo === ""
                      ? true
                      : false
                  }
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
                          // items={ORDER_REGION}
                          // onChange={value => onAddressFieldChange("region_group", value)}
                          value={orderData?.address?.address?.region_group}
                          disabled={true}
                        />
                      </div>
                      <div className="w-50 mr-2">
                        <AWSMDropdown
                          items={terminalList}
                          onChange={value => onFieldChange("terminal", value)}
                          value={orderData.terminal ? orderData.terminal : ""}
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
                          items={productList}
                          onChange={value => onFieldChange("product_name", value)}
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
                          onChange={value => onFieldChange("product_code", value)}
                          value={orderData.product_code}
                          disabled={true}
                          placeholder="Lorem ipsum"
                        />
                      </div>
                      <div className="w-40 ml-3">
                        <Button className="h-100" block color="primary">
                          Generate
                        </Button>
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
                        <TimePicker
                          value={orderData.load_time}
                          items={timeData}
                          onChange={value => onFieldChange("load_time", value)}
                          hasNone
                        />
                        {/* <AWSMDropdown
                          items={ORDER_LOAD_TIME}
                          onChange={value => onFieldChange("load_time", value)}
                          value={orderData.load_time}
                          disabled={false}
                          placeholder="select load time"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">eta</label>
                    <div className="d-flex">
                      <div className="w-70">
                        <TimePicker
                          value={orderData.eta}
                          items={timeData}
                          onChange={value => onFieldChange("eta", value)}
                          hasNone
                        />
                        {/* <AWSMDropdown
                          items={ORDER_ETA}
                          onChange={value => onFieldChange("eta", value)}
                          value={orderData.eta}
                          disabled={false}
                          placeholder="select"
                        /> */}
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
                          onChange={value => onFieldChange("remarks", value)}
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
                          onChange={value => onFieldChange("priority_order", value)}
                          value={orderData.priority_order}
                          disabled={false}
                          placeholder="select priority"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mr-4">
                    <label className="text-upper">Special Request Remarks</label>
                    <div className="d-flex">
                      <div className="w-100">
                        <AWSMInput
                          onChange={value => onFieldChange("request_remark_order", value)}
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
                    <p>
                      <strong>Name: </strong>
                      {orderData?.ship_to_company}
                    </p>
                    <p>
                      <strong>Cloud: </strong>
                      {orderData?.address?.cloud}
                    </p>
                    <p>
                      <strong>Product Category:</strong> {orderData?.storeData?.sales_category}
                    </p>
                    <p>
                      <strong>Order Type:</strong> {orderData?.storeData?.ordering_category}
                    </p>
                    <p>
                      <strong>Accessibility:</strong>{" "}
                      {orderData?.delivery?.road_tanker_accessibility}
                    </p>
                    <p>
                      <strong>Site ID: </strong>
                      {orderData?.address?.site_id}
                    </p>
                    <p>
                      <strong>Site Name: </strong>
                      {orderData?.address?.site_name}
                    </p>
                    <p>
                      <strong>Cust Type:</strong> Retail
                    </p>
                    <p>
                      <strong>Order ID: </strong>
                    </p>
                    <p>
                      <strong>Order Date:</strong> {shiftDate.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Opening Stock Days: </strong>{" "}
                    </p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p>
                      <strong>Closing Stock Days:</strong>{" "}
                    </p>
                    <p>
                      <strong>Current Stock Days:</strong>{" "}
                    </p>
                    <p>
                      <strong>Ullage (L):</strong>{" "}
                    </p>
                    <p>
                      <strong>Out Of Stock:</strong>{" "}
                    </p>
                    <p>
                      <strong>Max Stock Days:</strong>{" "}
                    </p>
                    <p>
                      <strong>Monthly Fixed Quota:</strong>{" "}
                      {orderData?.storeData?.monthly_fixed_quota}
                    </p>
                    <p>
                      <strong>RT Req:</strong> {orderData?.delivery?.road_tanker_requirement}
                    </p>
                    <p>
                      <strong>City:</strong> {orderData?.address?.address?.city}
                    </p>
                    <p>
                      <strong>Postcode: </strong>
                      {orderData?.address?.address?.postcode}
                    </p>
                    <p>
                      <strong>State: </strong>
                      {orderData?.address?.address?.state}
                    </p>
                    <p>
                      <strong>Cluster: </strong>
                      {orderData?.address?.cluster}
                    </p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p>
                      <strong>Alt Cluster: </strong>
                      {orderData?.address?.alternative_cluster}
                    </p>
                    <p>
                      <strong>Delivery Open Time: </strong>
                      {orderData?.delivery?.delivery_open_time_1?.time_from} to{" "}
                      {orderData?.delivery?.delivery_open_time_1?.time_to}
                    </p>
                    <p>
                      <strong>Open Time 1: </strong>
                      {orderData?.delivery?.actual_open_time_1
                        ? removeKeywords(
                            orderData?.delivery?.actual_open_time_1?.days !== ""
                              ? orderData?.delivery?.actual_open_time_1?.days.join() + " - "
                              : ""
                          ) +
                          hrMints(orderData?.delivery.actual_open_time_1?.time_from) +
                          " to " +
                          hrMints(orderData?.delivery?.actual_open_time_1?.time_to)
                        : "-"}
                    </p>
                    <p>
                      <strong>Open Time 2:</strong>{" "}
                      {orderData?.delivery?.actual_open_time_2
                        ? removeKeywords(
                            orderData?.delivery?.actual_open_time_2?.days !== ""
                              ? orderData?.delivery?.actual_open_time_2?.days.join() + " - "
                              : ""
                          ) +
                          hrMints(orderData?.delivery?.actual_open_time_2?.time_from) +
                          " to " +
                          hrMints(orderData?.delivery?.actual_open_time_2?.time_to)
                        : "-"}
                    </p>
                    <p>
                      <strong>Open Time 3:</strong>{" "}
                      {orderData?.delivery?.actual_open_time_3
                        ? removeKeywords(
                            orderData?.delivery?.actual_open_time_3?.days !== ""
                              ? orderData?.delivery?.actual_open_time_3?.days.join() + " - "
                              : ""
                          ) +
                          hrMints(orderData?.delivery?.actual_open_time_3?.time_from) +
                          " to " +
                          hrMints(orderData?.delivery?.actual_open_time_3?.time_to)
                        : "-"}
                    </p>
                    <p>
                      <strong>No Del Interval 1:</strong>
                      {deliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_1,
                        orderData?.delivery?.no_delivery_interval_1?.type,
                        orderData?.delivery?.no_delivery_interval_1?.time_from,
                        orderData?.delivery?.no_delivery_interval_1?.time_to,
                        orderData?.delivery?.no_delivery_interval_1?.date_from,
                        orderData?.delivery?.no_delivery_interval_1?.date_to,
                        orderData?.delivery?.no_delivery_interval_1?.days
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 2: </strong>
                      {deliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_2,
                        orderData?.delivery?.no_delivery_interval_2?.type,
                        orderData?.delivery?.no_delivery_interval_2?.time_from,
                        orderData?.delivery?.no_delivery_interval_2?.time_to,
                        orderData?.delivery?.no_delivery_interval_2?.date_from,
                        orderData?.delivery?.no_delivery_interval_2?.date_to,
                        orderData?.delivery?.no_delivery_interval_2?.days
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 3:</strong>
                      {deliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_3,
                        orderData?.delivery?.no_delivery_interval_3?.type,
                        orderData?.delivery?.no_delivery_interval_3?.time_from,
                        orderData?.delivery?.no_delivery_interval_3?.time_to,
                        orderData?.delivery?.no_delivery_interval_3?.date_from,
                        orderData?.delivery?.no_delivery_interval_3?.date_to,
                        orderData?.delivery?.no_delivery_interval_3?.days
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 4:</strong>
                      {deliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_4,
                        orderData?.delivery?.no_delivery_interval_4?.type,
                        orderData?.delivery?.no_delivery_interval_4?.time_from,
                        orderData?.delivery?.no_delivery_interval_4?.time_to,
                        orderData?.delivery?.no_delivery_interval_4?.date_from,
                        orderData?.delivery?.no_delivery_interval_4?.date_to,
                        orderData?.delivery?.no_delivery_interval_4?.days
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 5:</strong>
                      {deliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_5,
                        orderData?.delivery?.no_delivery_interval_5?.type,
                        orderData?.delivery?.no_delivery_interval_5?.time_from,
                        orderData?.delivery?.no_delivery_interval_5?.time_to,
                        orderData?.delivery?.no_delivery_interval_5?.date_from,
                        orderData?.delivery?.no_delivery_interval_5?.date_to,
                        orderData?.delivery?.no_delivery_interval_5?.days
                      )}
                    </p>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-4">
                  <div className="w-100 mr-4">
                    <label className="text-upper">Remarks</label>
                    <div className="d-flex">
                      <div className="w-85">
                        <AWSMInput
                          onChange={value => onFieldChange("remarks", value)}
                          value={orderData?.remarks}
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
                    <div className="w-100 relative">
                      <input
                        onChange={e => onFieldChange("myremark1", e.target.value)}
                        value={orderData?.myremark1}
                        className={`awsm-input w-100 ${
                          inputValue1 && !isValid1 ? "out-range " : ""
                        }`}
                      />
                      {/* <AWSMInput
                        onChange={value => onFieldChange("myremark1", value)}
                        value={orderData.myremark1}
                        className={`awsm-input w-100 ${(orderData.myremark1 && !isValid) ? "out-range " : ""}`}
                        placeholder="Type something here..."
                      /> */}
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue1 && !isValid1 ? "out-range " : ""
                        }`}
                      >{`${remainChars1 >= 0 ? "+" : ""}${remainChars1}`}</span>
                    </div>
                  </div>
                  <div className="w-100 mr-4">
                    <label className="text-upper">my Remarks 2</label>
                    <div className="w-100 relative">
                      {/* <AWSMInput
                        onChange={value => onFieldChange("myremark2", value)}
                        value={orderData.myremark2}
                        placeholder="Type something here..."
                      /> */}
                      <input
                        onChange={e => onFieldChange("myremark2", e.target.value)}
                        value={orderData?.myremark2}
                        className={`awsm-input w-100 ${
                          inputValue2 && !isValid2 ? "out-range " : ""
                        }`}
                      />
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue2 && !isValid2 ? "out-range " : ""
                        }`}
                      >{`${remainChars2 >= 0 ? "+" : ""}${remainChars2}`}</span>
                    </div>
                  </div>
                  <div className="w-100 mr-4">
                    <label className="text-upper">my Remarks 3</label>
                    <div className="w-100 relative">
                      {/* <AWSMInput
                        onChange={value => onFieldChange("myremark3", value)}
                        value={orderData.myremark3}
                        placeholder="Type something here..."
                      /> */}
                      <input
                        onChange={e => onFieldChange("myremark3", e.target.value)}
                        value={orderData?.myremark3}
                        className={`awsm-input w-100 ${
                          inputValue3 && !isValid3 ? "out-range " : ""
                        }`}
                      />
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue3 && !isValid3 ? "out-range " : ""
                        }`}
                      >{`${remainChars3 >= 0 ? "+" : ""}${remainChars3}`}</span>
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
                <div className="relative table_cell h-100 verticle-middle">
                  <img src={NoDataIcon} alt="No Data" />
                  <p className="text-18">
                    {currentState === "" ? (
                      "No Data Available, Please Search Your Order"
                    ) : currentState === "error" ? (
                      "Details Not Found, Try Again"
                    ) : (
                      <Fragment>Please wait, Loading Details.. {progress}% </Fragment>
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
            onClick={onCancelClick}
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
  addorderBankData: orderBank.addorderBankData,
})

const mapDispatchToProps = dispatch => ({
  onGetOrderBank: params => dispatch(getOrderBank(params)),
  onAddOrderBank: params => dispatch(addOrderBank(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderBankModal)
