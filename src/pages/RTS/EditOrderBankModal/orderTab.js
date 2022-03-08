import React, { useMemo, useState } from 'react'
import AWSMInput from 'components/Common/Input'
import { Row, Col } from 'reactstrap'
import DatePicker from 'components/Common/DatePicker'
import TimePicker from 'components/Common/TableInformation/components/TimePicker'
import AWSMDropdown from 'components/Common/Dropdown'
import { format } from 'date-fns'
import moment from 'moment'

const OrderTab = props => {
  const {
    data,
    inputValue,
    inputValue1,
    inputValue2,
    inputValue3,
    onFieldChange,
    timeData,
    productList,
  } = props
  const ORDER_PRIORITY = ['High Priority']
  const [multiProductToggle, setMultiProductToggle] = useState(false)
  const [multiLoadToggle, setMultiLoadToggle] = useState(false)
  const remainChars1 = useMemo(() => {
    return 40 - inputValue1?.length
  }, [inputValue1])

  const remainChars2 = useMemo(() => {
    return 40 - inputValue2?.length
  }, [inputValue2])

  const remainChars3 = useMemo(() => {
    return 40 - inputValue3?.length
  }, [inputValue3])

  const remainChars = useMemo(() => {
    return 40 - inputValue?.length
  }, [inputValue])

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

  return (
    <>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Ship To</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_ship_to} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">name</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={
                  data?.retail_storage_relation?.retail_customer_relation
                    ?.ship_to_company
                }
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Requested Delivery Date</label>
          <div className="d-flex">
            <div className="w-100">
              <DatePicker
                value={data?.requested_delivery_date}
                placeholder="Select Date"
                disabled={true}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Volume (L)</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={data?.volume}
                disabled={false}
                onChange={value => onFieldChange('volume', value)}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">customer Type</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.customer_type} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Product Category</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={data?.format_product_category}
                disabled={true}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Product</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMDropdown
                items={productList}
                onChange={value => onFieldChange('product_name', value)}
                value={data?.format_product}
                disabled={false}
                placeholder="Select"
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Product Code</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_product_code} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Order Type</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.order_type} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Planned Load Time</label>
          <div className="d-flex">
            <div className="w-100">
              <TimePicker
                value={
                  data?.planned_load_time &&
                  moment(data?.planned_load_time).utc().format('HH:mm')
                }
                items={timeData}
                onChange={value =>
                  onFieldChange(
                    'planned_load_time',
                    format(
                      new Date(data?.requested_delivery_date),
                      'yyyy-MM-dd'
                    ) +
                      ' ' +
                      value
                  )
                }
                hasNone
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">ETA</label>
          <div className="d-flex">
            <div className="w-100">
              <TimePicker
                value={data?.eta && moment(data?.eta).utc().format('HH:mm')}
                items={timeData}
                onChange={value =>
                  onFieldChange(
                    'eta',
                    format(new Date(data?.eta), 'yyyy-MM-dd') + ' ' + value
                  )
                }
                hasNone
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Multiproduct ID</label>
          {data?.multi_prod_id && (
            <span
              className="remove_text text-red"
              onClick={() => setMultiProductToggle(true)}
            >
              Remove
            </span>
          )}
          <div className="d-flex">
            <div
              className={`w-100 relative ${multiProductToggle && 'border-red'}`}
            >
              <AWSMInput value={data?.multi_prod_id} disabled={true} />
              {multiProductToggle && (
                <div className="confirm-main">
                  <span
                    class="confirm-text text-red"
                    onClick={() => {
                      onFieldChange('multi_prod_id', '')
                      setMultiProductToggle(false)
                    }}
                  >
                    Confirm
                  </span>
                  <span
                    class="confirm-no-text text-red"
                    onClick={() => setMultiProductToggle(false)}
                  >
                    No
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Retain</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={
                  data?.retain
                    ? moment(data?.retain).utc().format('DD-MM-yyyy HH:mm')
                    : '00'
                }
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Runout</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={
                  data?.runout
                    ? moment(data?.runout).utc().format('DD-MM-yyyy HH:mm')
                    : '00'
                }
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Multiload ID</label>
          {data?.multi_load_id && (
            <span
              className="remove_text text-red"
              onClick={() => setMultiLoadToggle(true)}
            >
              Remove
            </span>
          )}
          <div className="d-flex">
            <div
              className={`w-100 relative ${multiLoadToggle && 'border-red'}`}
            >
              <AWSMInput value={data?.multi_load_id} disabled={true} />
              {multiLoadToggle === true && (
                <div className="confirm-main">
                  <span
                    class="confirm-text text-red"
                    onClick={() => {
                      onFieldChange('multi_load_id', '')
                      setMultiLoadToggle(false)
                    }}
                  >
                    Confirm
                  </span>
                  <span
                    class="confirm-no-text text-red"
                    onClick={() => setMultiLoadToggle(false)}
                  >
                    No
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">
            Priority<span className="text-red">*</span>
          </label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMDropdown
                items={ORDER_PRIORITY}
                onChange={value => onFieldChange('priority', value)}
                value={data?.priority}
                hasNone
                placeholder={'None'}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Special Request Remarks</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.sr} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col md={8}>
          <label className="text-upper">Order Remarks</label>
          <div className="d-flex">
            <div className="w-100 relative">
              <input
                onChange={e => onFieldChange('order_remarks', e.target.value)}
                value={data?.order_remarks}
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
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">my Remarks 1</label>
          <div className="w-100 relative">
            <input
              onChange={e => onFieldChange('my_remark_1', e.target.value)}
              value={data?.my_remark_1}
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
              onChange={e => onFieldChange('my_remark_2', e.target.value)}
              value={data?.my_remark_2}
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
              onChange={e => onFieldChange('my_remark_3', e.target.value)}
              value={data?.my_remark_3}
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
    </>
  )
}

export default OrderTab
