import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from 'reactstrap'
import DatePicker from 'components/Common/DatePicker'
import ExitConfirmation from 'components/Common/ExitConfirmation'
import AWSMInput from 'components/Common/Input'
import AWSMDropdown from 'components/Common/Dropdown'
import AWSMAlert from 'components/Common/AWSMAlert'
import TimePicker from 'components/Common/TableInformation/components/TimePicker'

import { getOrderBank, addOrderBank, getTableInformation } from 'store/actions'
import { removeKeywords } from '../../pages/DQM/Common/helper'
import REGION_TERMINAL, {
  TERMINAL_CODE_MAPPING,
} from 'common/data/regionAndTerminal'
import NoDataIcon from 'assets/images/AWSM-No-Data-Available-Inverted.svg'
import { format, sub, add } from 'date-fns'
import CloseButton from 'components/Common/CloseButton'
import { isNull, isUndefined } from 'lodash'

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, '0')}:00`)
  timeData.push(`${i.toString().padStart(2, '0')}:15`)
  timeData.push(`${i.toString().padStart(2, '0')}:30`)
  timeData.push(`${i.toString().padStart(2, '0')}:45`)
}
timeData.push(`23:59`)
const ORDER_PRIORITY = ['High Priority']
const NewOrderBankModal = props => {
  const { open, onCancel, addOrderDetailsData, onGetAddOrderBankDetails } =
    props

  const [isConfirm, setIsConfirm] = useState(false)
  const [currentState, setCurrentState] = useState('')
  const [orderData, setOrderData] = useState({})
  const [productCode, setProductCode] = useState()
  const [shiptoNo, setShiptoNo] = useState('')
  const [progress, setProgress] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [isaddClicked, setIsaddClicked] = useState(false)
  const [updatedData, setUpdatedData] = useState(false)
  const [terminalList, setTerminalList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [productList, setProductList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')
  const [allProductDetailList, setAllProductDetailList] = useState([])
  const [priorityDisable, setPriorityDisable] = useState(false)
  const defaultDate = new Date()
  const [shiftDate, setShiftDate] = useState(add(defaultDate, { days: 1 }))

  useEffect(() => {
    if (currentState === 'loading') {
      const timer = setInterval(() => {
        setProgress(prevProgress =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        )
      }, 400)
      return () => {
        clearInterval(timer)
      }
    } else {
      setProgress(0)
    }
  }, [currentState])

  useEffect(() => {
    const temp = []
    REGION_TERMINAL.map(item => {
      temp.push(item.region)
    })
    setRegionList(temp)
  }, [REGION_TERMINAL])

  useEffect(() => {
    if (shiptoNo && productCode && shiftDate) {
      const params = {
        ship_to: shiptoNo,
        product_code: productCode,
        shift_date: format(shiftDate, 'yyyy-MM-dd'),
      }
      onGetAddOrderBankDetails(params)
    }
  }, [productCode])

  useEffect(() => {
    if (addOrderDetailsData) {
      const runoutDate =
        addOrderDetailsData?.runout &&
        format(new Date(addOrderDetailsData?.runout), 'dd-MM-yyyy')
      const formattedShiftDate = format(new Date(shiftDate), 'dd-MM-yyyy')
      if (runoutDate === formattedShiftDate) {
        setPriorityDisable(true)
        const newOrderData = { ...orderData }
        newOrderData['priority_order'] = 'High Priority'
        setOrderData(newOrderData)
      } else if (priorityDisable) setPriorityDisable(false)
    }
  }, [addOrderDetailsData])

  const checkUndefinedorNull = (value, defaultValue = '-') =>
    !isUndefined(value) && !isNull(value) ? value : defaultValue

  const onConfirmCancel = () => {
    if (currentState === 'search') {
      setIsConfirm(false)
    } else {
      setIsConfirm(false)
      setOrderData({})
      setIsaddClicked(false)
      setShiptoNo('')
      setCurrentState('')
      setShiftDate(defaultDate)
    }
  }
  const handleUpdate = async () => {
    setIsaddClicked(true)
    if (
      !isUndefined(orderData.terminal) &&
      !isUndefined(orderData.volume) &&
      !isUndefined(orderData.product_name) &&
      shiptoNo !== ''
    ) {
      const formattedShiftDate = format(shiftDate, 'yyyy-MM-dd')
      const temp = {
        shift_date: formattedShiftDate,
        requested_delivery_date: formattedShiftDate,
        my_remark_1: checkUndefinedorNull(orderData.myremark1, ''),
        my_remark_2: checkUndefinedorNull(orderData.myremark2, ''),
        my_remark_3: checkUndefinedorNull(orderData.myremark3, ''),
        terminal: checkUndefinedorNull(
          TERMINAL_CODE_MAPPING[orderData.terminal],
          ''
        ),
        volume: checkUndefinedorNull(parseInt(orderData.volume), 0),
        eta: orderData.eta
          ? formattedShiftDate + ' ' + checkUndefinedorNull(orderData.eta, '')
          : '',
        planned_load_time: orderData.load_time
          ? formattedShiftDate +
            ' ' +
            checkUndefinedorNull(orderData.load_time, '')
          : '',
        order_remarks: checkUndefinedorNull(orderData.order_remarks, ''),
        remarks: checkUndefinedorNull(orderData.remarks, ''),
        priority: checkUndefinedorNull(orderData.priority_order, null),
        retail_storage: parseInt(orderData.product_id),
        product: checkUndefinedorNull(orderData.product_code, ''),
        customer_type: 'RETAIL',
        order_type: checkUndefinedorNull(
          orderData?.storeData?.ordering_category,
          ''
        ),
        product_category: checkUndefinedorNull(
          orderData?.storeData?.sales_category,
          ''
        ),
      }

      const { onAddOrderBank } = props
      await onAddOrderBank(temp)
      setOrderData({})
      setIsaddClicked(false)
      setShiptoNo('')
      setCurrentState('')
      setShiftDate(defaultDate)
    }
  }
  useEffect(() => {
    if (props.addorderBankData) {
      typeof props.addorderBankData === 'object' &&
      isUndefined(props.addorderBankData.status)
        ? onCancel('add', 'success')
        : onCancel('add', 'error')
    }
  }, [props.addorderBankData])

  const onConfirmExit = () => {
    setIsConfirm(false)
    setCurrentState('')
    setShiptoNo('')
    setShiftDate(defaultDate)
    if (onCancel) {
      onCancel('cancel')
    }
  }

  const onFieldChange = (key, value) => {
    setUpdatedData(true);
    const newOrderData = { ...orderData }
    if (key === 'product_name') {
      const pro_code = allProductDetailList.find(res => res.name === value)
      newOrderData[key] = value
      newOrderData['product_code'] = pro_code.code
      setProductCode(pro_code.code)
      newOrderData['product_id'] = pro_code.id
      newOrderData['storeData'] = pro_code
    } else if (key === 'region') {
      const currentRegion = REGION_TERMINAL.find(e => e.region === value)
      setTerminalList(currentRegion ? currentRegion.terminal : [])
      newOrderData[key] = currentRegion ? currentRegion.region : ''
      newOrderData['terminal'] = ''
    } else if (key === 'order_remarks') {
      setInputValue(value)
      newOrderData[key] = value
    } else if (key === 'myremark1') {
      setInputValue1(value)
      newOrderData[key] = value
    } else if (key === 'myremark2') {
      setInputValue2(value)
      newOrderData[key] = value
    } else if (key === 'myremark3') {
      setInputValue3(value)
      newOrderData[key] = value
    } else {
      newOrderData[key] = value
    }
    setOrderData(newOrderData)
  }

  const onSearchOrder = async () => {
    setCurrentState('loading')
    setUpdatedData(false);
    const { onGetTableInformation } = props
    await onGetTableInformation({ ship_to_party: shiptoNo })
  }

  useEffect(() => {
    if (props.currentRetailDetail !== null) {
      if (
        typeof props.currentRetailDetail === 'object' &&
        props.currentRetailDetail.ship_to_party === shiptoNo
      ) {
        setTimeout(function () {
          setShowAlert(true)
          const temporderBankData = { ...props.currentRetailDetail }
          temporderBankData.myremark1 = ''
          temporderBankData.myremark2 = ''
          temporderBankData.myremark3 = ''
          setOrderData(temporderBankData)
          const temp = []
          const temp1 = []
          Object.keys(props.currentRetailDetail?.storage).map(key => {
            if (key.startsWith('storage_')) {
              if (
                props.currentRetailDetail?.storage[key].ordering_category !==
                'SMP'
              ) {
                temp1.push(props.currentRetailDetail?.storage[key])
                temp.push(props.currentRetailDetail?.storage[key].name)
              }
            }
          })
          setAllProductDetailList(temp1)
          setProductList(temp)
          setCurrentState('search')
        }, 1000)
      } else if (
        props?.currentRetailDetail?.data &&
        props.currentRetailDetail.status === 404
      ) {
        setTimeout(function () {
          setCurrentState('error')
        }, 500)
      } else {
        setTimeout(function () {
          setCurrentState('error')
        }, 500)
      }
    }
  }, [props.currentRetailDetail])

  const onCancelClick = () => {
    if ((shiptoNo !== '' || defaultDate !== shiftDate) && updatedData === true) {
      setIsConfirm(true);
    } else {
      onCancel('cancel')
      setCurrentState('')
      setShiptoNo('')
      setShiftDate(defaultDate)
    }
  }

  useEffect(() => {
    const currentRegion = REGION_TERMINAL.find(
      e => e.region === orderData?.address?.address.region_group
    )
    setTerminalList(currentRegion ? currentRegion.terminal : [])

    const newOrderData = { ...orderData }
    newOrderData['region'] = currentRegion ? currentRegion.region : ''
    setOrderData(newOrderData)
  }, [orderData?.address])

  const remainChars = useMemo(() => {
    return 40 - inputValue.length
  }, [inputValue])

  const remainChars1 = useMemo(() => {
    return 40 - inputValue1.length
  }, [inputValue1])

  const remainChars2 = useMemo(() => {
    return 40 - inputValue2.length
  }, [inputValue2])

  const remainChars3 = useMemo(() => {
    return 40 - inputValue3.length
  }, [inputValue3])

  const isValid = useMemo(() => {
    return inputValue && remainChars >= 0
  }, [remainChars])

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
    if (val) {
      const temp = val.split(':')
      return temp[0] + ':' + temp[1]
    } else {
      return '00:00'
    }
  }

  const getActualOpenTimeText = openTimeValue =>
    openTimeValue
      ? removeKeywords(
          openTimeValue?.days ? openTimeValue?.days.join() + ' - ' : ''
        ) +
        hrMints(openTimeValue?.time_from) +
        ' to ' +
        hrMints(openTimeValue?.time_to)
      : '-'

  const getDeliveryIntervalText = deliveryObject =>
    generateDeliveryIntervalText(
      deliveryObject,
      deliveryObject?.type,
      deliveryObject?.time_from,
      deliveryObject?.time_to,
      deliveryObject?.date_from,
      deliveryObject?.date_to,
      deliveryObject?.days
    )

  const generateDeliveryIntervalText = (
    deliveryNumber = '',
    deliveryType = '',
    deliveryTimeFrom = '',
    deliveryTimeTo = '',
    deliveryDateFrom = '',
    deliveryDateTo = '',
    deliveryDays = ''
  ) => {
    const formattedDateFrom = deliveryDateFrom
      ? format(new Date(deliveryDateFrom), 'dd-MM-yyyy')
      : ''
    const formattedDateTo = deliveryDateTo
      ? format(new Date(deliveryDateTo), 'dd-MM-yyyy')
      : ''
    if (deliveryNumber !== undefined) {
      if (deliveryType === 'daily') {
        return (
          ' Every day' +
          ' - ' +
          hrMints(deliveryTimeFrom) +
          ' to ' +
          hrMints(deliveryTimeTo)
        )
      }
      if (deliveryType === 'single') {
        return `${
          formattedDateFrom !== null ? formattedDateFrom : ''
        } - ${hrMints(deliveryTimeFrom)} 
      to ${formattedDateTo !== null ? formattedDateTo : ''} ${hrMints(
          deliveryTimeTo
        )}`
      }
      if (deliveryType === 'every') {
        return (
          ' ' +
          removeKeywords(
            deliveryDays !== '' ? deliveryDays.join() + ' - ' : ''
          ) +
          hrMints(deliveryTimeFrom) +
          ' to ' +
          hrMints(deliveryTimeTo)
        )
      }
      if (deliveryType === 'range') {
        return `${formattedDateFrom !== null ? formattedDateFrom : ''} to ${
          formattedDateTo !== null ? formattedDateTo : ''
        }
      - ${hrMints(deliveryTimeFrom)} to ${hrMints(deliveryTimeTo)}`
      } else {
        return ' - '
      }
    }
  }

  return (
    <Modal centered={true} isOpen={open} className="new-order-modal">
      <ModalHeader close={<CloseButton handleClose={onCancelClick} />}>
        <span className="modal-title">Add New order</span>
      </ModalHeader>

      <ModalBody
        className={`position-relative scroll pl-40 ${
          currentState === 'search' || isConfirm ? 'h-70v' : ''
        }`}
      >
        {isConfirm && (
          <ExitConfirmation
            isAddOrder={true}
            onExit={onConfirmExit}
            onCancel={onConfirmCancel}
          />
        )}
        {!isConfirm && (
          <>
            <Row>
              <Col md={4}>
                <label>SHIFT DATE</label>
                <DatePicker
                  className="form-control awsm-input"
                  value={shiftDate}
                  startDate={defaultDate}
                  defaultValue={defaultDate}
                  onChange={date => setShiftDate(date)}
                  orderBankShiftDate={true}
                />
              </Col>
              <Col md={4}>
                <label>
                  SHIP TO <span className="text-red">*</span>
                </label>
                <AWSMInput
                  type="number"
                  error={shiptoNo === '' && isaddClicked ? true : false}
                  defaultValue=""
                  placeholder="Numeric Only"
                  onChange={val => setShiptoNo(val)}
                  value={shiptoNo}
                />
              </Col>
              <Col md={2}>
                <Button
                  color="primary"
                  className="mt-27 ml-3 p-1320"
                  onClick={() => onSearchOrder()}
                  disabled={!shiftDate && !shiptoNo ? true : false}
                >
                  Search
                </Button>
              </Col>
            </Row>
            <hr className="mt-4 mb-4" />
            {currentState === 'search' && (
              <div className="scroll order-scroll">
                <h4>Ship To: {shiptoNo}</h4>
                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <label className="text-upper">
                      Region & Terminal<span className="text-red">*</span>
                    </label>
                    <Row>
                      <Col>
                        <AWSMDropdown
                          items={regionList.splice(6) && regionList}
                          onChange={value => onFieldChange('region', value)}
                          value={orderData.region ? orderData.region : ''}
                          error={
                            isUndefined(orderData.region) && isaddClicked
                              ? true
                              : false
                          }
                        />
                      </Col>
                      <Col>
                        <AWSMDropdown
                          items={terminalList}
                          onChange={value => onFieldChange('terminal', value)}
                          error={
                            isUndefined(orderData.terminal) && isaddClicked
                              ? true
                              : false
                          }
                          value={orderData.terminal ? orderData.terminal : ''}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <label className="text-upper">
                      Volume (l)<span className="text-red">*</span>
                    </label>
                    <AWSMInput
                      type="number"
                      placeholder="Numeric Only"
                      error={
                        isUndefined(orderData.volume) && isaddClicked
                          ? true
                          : false
                      }
                      onChange={value => onFieldChange('volume', value)}
                      value={orderData.volume}
                    />
                  </Col>
                </Row>

                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <label className="text-upper">
                      Product Name<span className="text-red">*</span>
                    </label>
                    <AWSMDropdown
                      items={productList}
                      onChange={value => onFieldChange('product_name', value)}
                      error={
                        isUndefined(orderData.product_name) && isaddClicked
                          ? true
                          : false
                      }
                      value={orderData.product_name}
                    />
                  </Col>
                  <Col md={4}>
                    <label className="text-upper">Product Code</label>
                    <AWSMInput value={productCode} disabled={true} />
                  </Col>
                </Row>
                <h5 className="text-bold mt-4 mb-3">Order Details</h5>

                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <label className="text-upper">Planned Load Time</label>
                    <TimePicker
                      value={orderData.load_time}
                      items={timeData}
                      onChange={value => onFieldChange('load_time', value)}
                      hasNone
                    />
                  </Col>
                  <Col md={4}>
                    <label className="text-upper">eta</label>
                    <TimePicker
                      value={orderData.eta}
                      items={timeData}
                      onChange={value => onFieldChange('eta', value)}
                      hasNone
                    />
                  </Col>
                </Row>
                <Row className="mt-4 w-100">
                  <Col md={8}>
                    <label className="text-upper">Order Remarks</label>
                    <div className="relative">
                      <input
                        onChange={e =>
                          onFieldChange('order_remarks', e.target.value)
                        }
                        maxLength={40}
                        className={`awsm-input w-100 ${
                          inputValue && !isValid ? 'out-range ' : ''
                        }`}
                      />
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue && !isValid ? 'out-range ' : ''
                        }`}
                      >{`${remainChars >= 0 ? '+' : ''}${remainChars}`}</span>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <label className="text-upper">Priority</label>
                    <AWSMDropdown
                      items={ORDER_PRIORITY}
                      onChange={value => onFieldChange('priority_order', value)}
                      value={orderData.priority_order}
                      disabled={priorityDisable}
                      hasNone
                      placeholder={'None'}
                    />
                  </Col>
                </Row>
                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <label className="text-upper">Retain</label>
                    <AWSMInput
                      onChange={value => onFieldChange('retain', value)}
                      value={
                        addOrderDetailsData?.retain
                          ? format(
                              sub(new Date(addOrderDetailsData?.retain), {
                                hours: 8,
                              }),
                              'dd-MM-yyyy HH:mm'
                            )
                          : ''
                      }
                      disabled={true}
                      placeholder="Lorem ipsum"
                    />
                  </Col>
                  <Col md={4}>
                    <label className="text-upper">Runout</label>
                    <AWSMInput
                      onChange={value => onFieldChange('runout', value)}
                      value={
                        addOrderDetailsData?.runout
                          ? format(
                              sub(new Date(addOrderDetailsData?.runout), {
                                hours: 8,
                              }),
                              'dd-MM-yyyy HH:mm'
                            )
                          : ''
                      }
                      disabled={true}
                      placeholder="Lorem ipsum"
                    />
                  </Col>
                </Row>
                <Row className="order_details_box mt-4">
                  <Col lg={4} sm={6} xs={12}>
                    <p>
                      <strong>Name: </strong>
                      {checkUndefinedorNull(orderData?.ship_to_company)}
                    </p>
                    <p>
                      <strong>Cloud: </strong>
                      {checkUndefinedorNull(orderData?.address?.cloud)}
                    </p>
                    <p>
                      <strong>Product Category: </strong>
                      {checkUndefinedorNull(
                        orderData?.storeData?.sales_category
                      )}
                    </p>
                    <p>
                      <strong>Order Type:</strong>
                      {checkUndefinedorNull(
                        orderData?.storeData?.ordering_category
                      )}
                    </p>
                    <p>
                      <strong>Accessibility: </strong>
                      {checkUndefinedorNull(
                        orderData?.delivery?.road_tanker_accessibility
                      )}
                    </p>
                    <p>
                      <strong>Site ID: </strong>
                      {checkUndefinedorNull(orderData?.address?.site_id)}
                    </p>
                    <p>
                      <strong>Site Name: </strong>
                      {checkUndefinedorNull(orderData?.address?.site_name)}
                    </p>
                    <p>
                      <strong>Cust Type:</strong> Retail
                    </p>
                    {/* <p>
                      <strong>Order ID: </strong> 
                    </p> */}
                    <p>
                      <strong>Requested Delivery Date: </strong>
                      {format(new Date(shiftDate), 'dd-MM-yyyy')}
                    </p>
                    <p>
                      <strong>Opening Stock Days: </strong>
                      {checkUndefinedorNull(
                        addOrderDetailsData?.opening_stock_days
                      )}
                    </p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p>
                      <strong>Closing Stock Days: </strong>
                      {checkUndefinedorNull(
                        addOrderDetailsData?.closing_stock_days
                      )}
                    </p>
                    <p>
                      <strong>Current Stock Days: </strong>
                      {checkUndefinedorNull(
                        addOrderDetailsData?.current_stock_days
                      )}
                    </p>
                    <p>
                      <strong>Ullage (L): </strong>
                      {checkUndefinedorNull(addOrderDetailsData?.ullage)}
                    </p>
                    <p>
                      <strong>Out Of Stock: </strong>
                      {checkUndefinedorNull(addOrderDetailsData?.out_of_stock)}
                    </p>
                    <p>
                      <strong>Max Stock Days: </strong>
                      {checkUndefinedorNull(
                        addOrderDetailsData?.max_stock_days
                      )}
                    </p>
                    <p>
                      <strong>Monthly Fixed Quota: </strong>
                      {checkUndefinedorNull(
                        orderData?.storeData?.monthly_fixed_quota
                      )}
                    </p>
                    <p>
                      <strong>RT Req: </strong>
                      {checkUndefinedorNull(
                        orderData?.delivery?.road_tanker_requirement
                      )}
                    </p>
                    <p>
                      <strong>City: </strong>{' '}
                      {checkUndefinedorNull(orderData?.address?.address?.city)}
                    </p>
                    <p>
                      <strong>Postcode: </strong>
                      {checkUndefinedorNull(
                        orderData?.address?.address?.postcode
                      )}
                    </p>
                    <p>
                      <strong>State: </strong>
                      {checkUndefinedorNull(orderData?.address?.address?.state)}
                    </p>
                    <p>
                      <strong>Cluster: </strong>
                      {checkUndefinedorNull(orderData?.address?.cluster)}
                    </p>
                  </Col>
                  <Col lg={4} sm={6} xs={12}>
                    <p>
                      <strong>Alt Cluster: </strong>
                      {checkUndefinedorNull(
                        orderData?.address?.alternative_cluster
                      )}
                    </p>
                    <p>
                      <strong>Delivery Open Time: </strong>
                      {orderData?.delivery?.delivery_open_time_1?.time_from} to
                      {orderData?.delivery?.delivery_open_time_1?.time_to}
                    </p>
                    <p>
                      <strong>Open Time 1: </strong>
                      {getActualOpenTimeText(
                        orderData?.delivery?.actual_open_time_1
                      )}
                    </p>
                    <p>
                      <strong>Open Time 2:</strong>
                      {getActualOpenTimeText(
                        orderData?.delivery?.actual_open_time_2
                      )}
                    </p>
                    <p>
                      <strong>Open Time 3:</strong>
                      {getActualOpenTimeText(
                        orderData?.delivery?.actual_open_time_3
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 1:</strong>
                      {getDeliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_1
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 2: </strong>
                      {getDeliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_2
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 3:</strong>
                      {getDeliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_3
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 4:</strong>
                      {getDeliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_4
                      )}
                    </p>
                    <p>
                      <strong>No Del Interval 5:</strong>
                      {getDeliveryIntervalText(
                        orderData?.delivery?.no_delivery_interval_5
                      )}
                    </p>
                  </Col>
                </Row>
                <Row className="mt-4 w-100">
                  <Col md={8}>
                    <label className="text-upper">Remarks DQM</label>
                    <AWSMInput value={orderData?.remarks} disabled={true} />
                  </Col>
                </Row>
                <Row className="w-100 mt-4">
                  <Col>
                    <label className="text-upper">my Remarks 1</label>
                    <div className="w-100 relative">
                      <input
                        onChange={e =>
                          onFieldChange('myremark1', e.target.value)
                        }
                        value={orderData?.myremark1}
                        maxLength={40}
                        className={`awsm-input w-100 ${
                          inputValue1 && !isValid1 ? 'out-range ' : ''
                        }`}
                      />
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue1 && !isValid1 ? 'out-range ' : ''
                        }`}
                      >{`${remainChars1 >= 0 ? '+' : ''}${remainChars1}`}</span>
                    </div>
                  </Col>
                  <Col>
                    <label className="text-upper">my Remarks 2</label>
                    <div className="w-100 relative">
                      <input
                        onChange={e =>
                          onFieldChange('myremark2', e.target.value)
                        }
                        value={orderData?.myremark2}
                        maxLength={40}
                        className={`awsm-input w-100 ${
                          inputValue2 && !isValid2 ? 'out-range ' : ''
                        }`}
                      />
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue2 && !isValid2 ? 'out-range ' : ''
                        }`}
                      >{`${remainChars2 >= 0 ? '+' : ''}${remainChars2}`}</span>
                    </div>
                  </Col>
                  <Col>
                    <label className="text-upper">my Remarks 3</label>
                    <div className="w-100 relative">
                      <input
                        onChange={e =>
                          onFieldChange('myremark3', e.target.value)
                        }
                        value={orderData?.myremark3}
                        maxLength={40}
                        className={`awsm-input w-100 ${
                          inputValue3 && !isValid3 ? 'out-range ' : ''
                        }`}
                      />
                      <span
                        className={`position-absolute awsm-input-right-content ${
                          inputValue3 && !isValid3 ? 'out-range ' : ''
                        }`}
                      >{`${remainChars3 >= 0 ? '+' : ''}${remainChars3}`}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
            {currentState !== 'search' && (
              <div
                className={`text-center h-340 w-100 table mt-3 ${
                  currentState === '' || currentState === 'cancel'
                    ? 'bg-grey'
                    : currentState === 'error'
                    ? 'bg-err'
                    : 'bg-loading'
                }`}
              >
                <div className="relative table_cell h-100 verticle-middle">
                  <img src={NoDataIcon} alt="No Data" />
                  <p className="text-18">
                    {currentState === '' ? (
                      'No Data Available, Please Search Your Order'
                    ) : currentState === 'error' ? (
                      'Details Not Found, Try Again'
                    ) : (
                      <Fragment>
                        Please wait, Loading Details.. {progress}%{' '}
                      </Fragment>
                    )}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </ModalBody>

      {!isConfirm && currentState === 'search' ? (
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
      ) : (
        ''
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

const mapStateToProps = ({ orderBank, retailCustomer }) => ({
  currentRetailDetail: retailCustomer.currentRetailDetail,
  addOrderDetailsData: orderBank.orderBankData,
  addorderBankData: orderBank.addorderBankData,
})

const mapDispatchToProps = dispatch => ({
  onGetTableInformation: params => dispatch(getTableInformation(params)),
  onGetAddOrderBankDetails: params => dispatch(getOrderBank(params)),
  onAddOrderBank: params => dispatch(addOrderBank(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderBankModal)
