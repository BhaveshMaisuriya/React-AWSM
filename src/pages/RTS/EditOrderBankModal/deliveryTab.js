import React from 'react'
import AWSMInput from 'components/Common/Input'
import { Row, Col } from 'reactstrap'
import { format } from 'date-fns'
import { removeKeywords } from 'pages/DQM/Common/helper'

const DeliveryTab = props => {
  const { data, hrMints } = props

  const daysTextFormatting = (
    deliveryNumber,
    deliveryType,
    deliveryDateFrom,
    deliveryDateTo,
    deliveryDays
  ) => {
    let formattedDateFrom =
      deliveryDateFrom && deliveryDateFrom !== null
        ? format(new Date(deliveryDateFrom), 'dd-MM-yyyy')
        : ''
    let formattedDateTo =
      deliveryDateTo && deliveryDateTo !== null
        ? format(new Date(deliveryDateTo), 'dd-MM-yyyy')
        : ''

    if (deliveryNumber !== undefined && deliveryType === 'daily') {
      return ' Every day'
    }
    if (deliveryNumber !== undefined && deliveryType === 'single') {
      return `${formattedDateFrom !== null ? formattedDateFrom : ''} -  
      to ${formattedDateTo !== null ? formattedDateTo : ''}`
    }
    if (deliveryNumber !== undefined && deliveryType === 'every') {
      return deliveryNumber
        ? removeKeywords(deliveryDays !== '' ? deliveryDays.join() + ' - ' : '')
        : ' - '
    }
    if (deliveryNumber !== undefined && deliveryType === 'range') {
      return `${formattedDateFrom !== null ? formattedDateFrom : ''} to ${
        formattedDateTo !== null ? formattedDateTo : ''
      }`
    } else {
      return ' - '
    }
  }

  return (
    <>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">RT Req</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_rt_req} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Accessibility</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_accessibility} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Duration</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_duration} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Distance</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.format_distance} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Delivery Open Time (From)</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Delivery Open Time (To)</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Actual open time */}
      <h5 className="text-bold mt-4 mb-3">ACTUAL OPEN TIME</h5>
      <Row className="w-100">
        <Col md={4}>
          <label className="text-upper">Days 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Actual open time 2 */}
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Days 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time1,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time1
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time1
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time1
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time1?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_2_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_2_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Actual open time 3 */}
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Days 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time2,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time2
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time2
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time2
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.delivery_open_time2?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_3_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_delivery_open_time_3_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* delivery interval*/}
      <h5 className="text-bold mt-4 mb-3">NO DELIVERY INTERVAL</h5>
      <Row className="w-100">
        <Col md={4}>
          <label className="text-upper">Days 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_1,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_1
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_1
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_1
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_1
                    ?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_1_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_1_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* delivery interval 2 */}
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Days 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_2,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_2
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_2
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_2
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_2
                    ?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_2_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_2_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* delivery interval 3 */}
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Days 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_3,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_3
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_3
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_3
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_3
                    ?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_3_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_3_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* delivery interval 4 */}
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Days 4</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_4,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_4
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_4
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_4
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_4
                    ?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 4</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_4_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 4</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_4_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* delivery interval 5  */}
      <Row className="w-100 mt-4">
        <Col md={4}>
          <label className="text-upper">Days 5</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={daysTextFormatting(
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_5,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_5
                    ?.type,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_5
                    ?.date_from,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_5
                    ?.date_to,
                  data?.retail_storage_relation?.retail_customer_relation?.no_delivery_interval_5
                    ?.days
                )}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 5</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_5_from)} disabled={true} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 5</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={hrMints(data?.format_no_del_interval_5_to)} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default DeliveryTab
