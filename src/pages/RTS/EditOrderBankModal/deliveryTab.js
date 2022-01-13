import React from "react"
import AWSMInput from "components/Common/Input"
import { Row, Col } from "reactstrap"

const DeliveryTab = props => {
  const { data } = props

  const deliveryIntervalText = data => {
    if (data) {
      return data
    } else {
      return " - "
    }
  }

  return (
    <>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">RT Req</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={
                  data?.retail_storage_relation?.retail_customer_relation?.road_tanker_requirement
                }
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Accessibility</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={
                  data?.retail_storage_relation?.retail_customer_relation?.road_tanker_accessibility
                }
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Duration</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.duration} disabled={true} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="w-100 mt-4">
        <Col>
          <label className="text-upper">Distance</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={data?.distance} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Delivery Open Time (From)</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={""} disabled={true} />
            </div>
          </div>
        </Col>
        <Col>
          <label className="text-upper">Delivery Open Time (To)</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput value={""} disabled={true} />
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
                value={deliveryIntervalText(data?.delivery?.actual_open_time_1?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.actual_open_time_1?.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.actual_open_time_1?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.actual_open_time_2?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.actual_open_time_2?.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.actual_open_time_2?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_3?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_3?.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_3?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_1?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_1.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 1</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_1?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_2?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_2.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 2</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_2?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_3?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_3.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 3</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_3?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_4?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 4</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_4.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 4</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_4?.time_to)}
                disabled={true}
              />
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
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_5?.days)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">time (From) 5</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_5.time_from)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <label className="text-upper">Time (To) 5</label>
          <div className="d-flex">
            <div className="w-100">
              <AWSMInput
                value={deliveryIntervalText(data?.delivery?.no_delivery_interval_5?.time_to)}
                disabled={true}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default DeliveryTab
