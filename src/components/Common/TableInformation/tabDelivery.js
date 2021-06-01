import React, { useState, useEffect } from "react"
import { Col, Row } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import styles from "./tabDelivery.module.css"
import SimplePopover from "./components/SimplePopOver"
import TimePicker from "./components/TimePicker"
import DateRangePicker from "../DateRangePicker"

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`)

const ROAD_TANKER_REQUIREMENT = [
  { name: "Long Hose", checked: false },
  { name: "Long Distance", checked: false },
]

const ACTUAL_OPEN_TIME_1 = [
  { name: "Monday", checked: false },
  { name: "Tuesday", checked: false },
  { name: "Wednesday", checked: false },
  { name: "Thursday", checked: false },
  { name: "Friday", checked: false },
  { name: "Saturday", checked: false },
  { name: "Sunday", checked: false },
]

const ACTUAL_OPEN_TIME_2 = [
  { name: "Monday", checked: false },
  { name: "Tuesday", checked: false },
  { name: "Wednesday", checked: false },
  { name: "Thursday", checked: false },
  { name: "Friday", checked: false },
  { name: "Saturday", checked: false },
  { name: "Sunday", checked: false },
]

const TabDelivery = ({ scheduler, onChange, data }) => {
  const pathName = window.location.pathname
  const [tanker, setTanker] = useState(ROAD_TANKER_REQUIREMENT)
  const [deliveryData, setDeliveryData] = useState(data.delivery)
  const [openTime1, setOpenTime1] = useState(ACTUAL_OPEN_TIME_1)
  const [openTime2, setOpenTime2] = useState(ACTUAL_OPEN_TIME_2)

  const no_interval_array = Object.keys(deliveryData).filter(item =>
    item.includes("no_delivery_interval")
  )

  useEffect(() => {
    setDeliveryData(data.delivery)
  }, [])


  useEffect(() => {
    if (deliveryData.road_tanker_requirement && deliveryData.road_tanker_requirement.length > 0) {
      const newTanker = deliveryData.road_tanker_requirement.map(item => {
        return { name: item, checked: true }
      })
      setTanker(newTanker)
    }
  }, [])

  const onFieldChange = (key, value) => {
    const newDeliveryData = {...deliveryData};
    newDeliveryData[key] = value;
    setDeliveryData(newDeliveryData);
    if (onChange) {
      onChange("delivery", newDeliveryData)
    }
  }

  const handleChangeTanker = event => {
    const index = tanker.findIndex(item => item.name === event.target.name)
    const newTanker = [...tanker]
    newTanker[index].checked = !newTanker[index].checked
    setTanker(() => newTanker)
    setDeliveryData({
      ...deliveryData,
      road_tanker_requirement: tanker
        .filter(i => i.checked === true)
        .map(i => i.name),
    })
    onChange("delivery", {
      ...deliveryData,
      road_tanker_requirement: tanker
        .filter(i => i.checked === true)
        .map(i => i.name),
    })
  }

  const handleActualTime1 = event => {
    const index = openTime1.findIndex(item => item.name === event.target.name)
    const newDays = [...openTime1]
    newDays[index].checked = event.target.checked
    setOpenTime1(() => newDays)
    setDeliveryData({
      ...deliveryData,
      actual_open_time_1: {
        ...deliveryData.actual_open_time_1,
        days: openTime1.filter(i => i.checked === true).map(i => i.name),
      },
    })
    onChange("delivery", {
      ...deliveryData,
      actual_open_time_1: {
        ...deliveryData.actual_open_time_1,
        days: openTime1.filter(i => i.checked === true).map(i => i.name),
      },
    })
  }
  const actualOpenTime1 = openTime1.filter(item => {
    return item.checked === true
  })
  const handleActualTime2 = event => {
    const index = openTime2.findIndex(item => item.name === event.target.name)
    const newDays2 = [...openTime2]
    newDays2[index].checked = event.target.checked
    setOpenTime2(() => newDays2)
    setDeliveryData({
      ...deliveryData,
      actual_open_time_2: {
        ...deliveryData.actual_open_time_2,
        days: openTime1.filter(i => i.checked === true).map(i => i.name),
      },
    })
    onChange("delivery", {
      ...deliveryData,
      actual_open_time_2: {
        ...deliveryData.actual_open_time_2,
        days: openTime2.filter(i => i.checked === true).map(i => i.name),
      },
    })
  }
  const actualOpenTime2 = openTime2.filter(item => {
    return item.checked === true
  })

  return (
    <div
      style={{
        height: "400px",
        paddingRight: "15px",
      }}
    >
      <Row form>
        <Col className="col-6" style={{ marginTop: 4 }}>
          <SimplePopover handleChange={handleChangeTanker} data={tanker} disabled={scheduler}>
            <AvForm>
              <AvField
                name="road_tanker_requirement"
                type="text"
                label="ROAD TANKER REQUIREMENT"
                value={tanker.filter(i => i.checked === true).map(i => i.name)}
                className={`${styles.field} ${
                  scheduler ? styles.disabled : ""
                }`}
                disabled
                style={{ cursor: "pointer" }}
              />
              <button className={styles.add}>+Add</button>
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </AvForm>
          </SimplePopover>
        </Col>
        {pathName === "/commercial-customer" && <Col className="col-6"></Col>}
        <Col className="col-6">
          <AvForm>
            <AvField
              name="road_tanker_accessibility"
              type="text"
              label="ROAD TANKER ACCESSIBILITY"
              value={deliveryData.road_tanker_accessibilty}
              placeholder="Type something here..."
              disabled
              className={styles.disabled}
              onChange={event => {
                setDeliveryData({
                  ...deliveryData,
                  road_tanker_accessibility: event.target.value,
                })
                onChange("delivery", {
                  ...deliveryData,
                  road_tanker_accessibility: event.target.value,
                })
              }}
            />
          </AvForm>
        </Col>
        {pathName === "/commercial-customer" && (
          <Col className="col-6">
            <AvForm>
              <AvField
                name="pump_type"
                type="text"
                label="PUMP TYPE"
                value={deliveryData.pump_type}
                placeholder="Type something here..."
                disabled
                className={styles.disabled}
                onChange={event => {
                  setDeliveryData({
                    ...deliveryData,
                    pump_type: event.target.value,
                  })
                  onChange("delivery", {
                    ...deliveryData,
                    pump_type: event.target.value,
                  })
                }}
              />
            </AvForm>
          </Col>
        )}

        <Col className="col-6">
          <h6>DELIVERY OPEN TIME (FROM)</h6>
          <TimePicker
            value={deliveryData.delivery_open_time_1.time_from}
            items={timeData}
            disabled
            className={styles.disabled}
            onChange={value => {
              setDeliveryData({
                ...deliveryData,
                delivery_open_time_1: {
                  ...deliveryData.delivery_open_time_1,
                  time_from: value,
                },
              })
              onChange("delivery", {
                ...deliveryData,
                delivery_open_time_1: {
                  ...deliveryData.delivery_open_time_1,
                  time_from: value,
                },
              })
            }}
          />
        </Col>
        <Col className="col-6">
          <h6>DELIVERY OPEN TIME (TO)</h6>
          <TimePicker
            items={timeData}
            disabled={scheduler}
            value={deliveryData.delivery_open_time_1.time_to}
            onChange={value => {
              setDeliveryData({
                ...deliveryData,
                delivery_open_time_1: {
                  ...deliveryData.delivery_open_time_1,
                  time_to: value,
                },
              })
              onChange("delivery", {
                ...deliveryData,
                delivery_open_time_1: {
                  ...deliveryData.delivery_open_time_1,
                  time_to: value,
                },
              })
            }}
          />
        </Col>
        <Col className="col-12 mt-3">
          <h6>
            <strong>ACTUAL OPEN TIME 1</strong>
          </h6>
        </Col>
        <Col className="col-6">
          <SimplePopover handleChange={handleActualTime1} data={openTime1} disabled={!!scheduler}>
            <AvForm>
              <AvField
                name="days1"
                type="text"
                label="DAY(S)"
                value={
                  deliveryData.actual_open_time_1 && deliveryData.actual_open_time_1.length !== 0
                    ? actualOpenTime1.map(i => i.name)
                    : "Select day(s)"
                }
                className={`${styles.field} ${
                  scheduler ? styles.disabled : ""
                }`}
                disabled={!!scheduler}
                style={{ height: "40px", marginTop: "-4px", cursor: "pointer" }}
              />
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </AvForm>
          </SimplePopover>
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
          <TimePicker
            items={timeData}
            disabled={scheduler}
            value={deliveryData.actual_open_time_1 ? deliveryData.actual_open_time_1.time_from : ""}
            onChange={value => {
              setDeliveryData({
                ...deliveryData,
                actual_open_time_1: {
                  ...deliveryData.actual_open_time_1,
                  time_from: value,
                },
              })
              onChange("delivery", {
                ...deliveryData,
                actual_open_time_1: {
                  ...deliveryData.actual_open_time_1,
                  time_from: value,
                },
              })
            }}
          />
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
          <TimePicker
            items={timeData}
            disabled={scheduler}
            value={deliveryData.actual_open_time_1 ? deliveryData.actual_open_time_1.to || "" : ""}
            onChange={value => {
              setDeliveryData({
                ...deliveryData,
                actual_open_time_1: {
                  ...deliveryData.actual_open_time_1,
                  time_to: value,
                },
              })
              onChange("delivery", {
                ...deliveryData,
                actual_open_time_1: {
                  ...deliveryData.actual_open_time_1,
                  time_to: value,
                },
              })
            }}
          />
        </Col>
        {pathName === "/retail-customer" ? (
          <React.Fragment>
            <Col className="col-12">
              <h6>
                <strong>ACTUAL OPEN TIME 2</strong>
              </h6>
            </Col>
            <Col className="col-6">
              <SimplePopover handleChange={handleActualTime2} data={openTime2}>
                <AvForm>
                  <AvField
                    name="openTime2"
                    type="text"
                    label="DAY(S)"
                    value={
                      actualOpenTime2.length !== 0
                        ? actualOpenTime2.map(i => i.name)
                        : "Select day(s)"
                    }
                    disabled
                    className={`${styles.field} ${
                      scheduler ? styles.disabled : undefined
                    }`}
                    style={{ height: "40px", marginTop: "-4px" }}
                  />
                  <div className={styles.arrow}>
                    <ArrowDropDownIcon />
                  </div>
                </AvForm>
              </SimplePopover>
            </Col>
            <Col className="col-3">
              <h6>TIME (FROM)</h6>
              <TimePicker
                items={timeData}
                disabled={scheduler}
                value={deliveryData.actual_open_time_2 ? deliveryData.actual_open_time_2.time_from || "" : ""}
                onChange={value => {
                  setDeliveryData({
                    ...deliveryData,
                    actual_open_time_2: {
                      ...deliveryData.actual_open_time_2,
                      time_from: value,
                    },
                  })
                  onChange("delivery", {
                    ...deliveryData,
                    actual_open_time_2: {
                      ...deliveryData.actual_open_time_2,
                      time_from: value,
                    },
                  })
                }}
              />
            </Col>
            <Col className="col-3">
              <h6>TIME (TO)</h6>
              <TimePicker
                items={timeData}
                disabled={scheduler}
                value={deliveryData.actual_open_time_2 ? deliveryData.actual_open_time_2.to || "" : ""}
                onChange={value => {
                  setDeliveryData({
                    ...deliveryData,
                    actual_open_time_2: {
                      ...deliveryData.actual_open_time_2,
                      time_to: value,
                    },
                  })
                  onChange("delivery", {
                    ...deliveryData,
                    actual_open_time_2: {
                      ...deliveryData.actual_open_time_2,
                      time_to: value,
                    },
                  })
                }}
              />
            </Col>
          </React.Fragment>
        ) : null}
        <Col className="col-6 mb-3">
          <h6>NO DELIVERY INTERVAL</h6>
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
        </Col>
        {no_interval_array.map((subKey, index) => {
          return (
            <React.Fragment key={index}>
              <Col className="col-6 mb-3">
                <DateRangePicker
                  defaultValue={deliveryData[subKey]}
                  onChange={(value) => onFieldChange(subKey, value)}
                  disabled={index < 3 ? true : scheduler}
                />
              </Col>
              <Col className="col-3">
                <TimePicker
                  items={timeData}
                  disabled={scheduler}
                  value={deliveryData[subKey].time_from}
                  onChange={value => {
                    setDeliveryData({
                      ...deliveryData,
                      [subKey]: {
                        ...deliveryData[subKey],
                        time_from: value,
                      },
                    })
                    onChange("delivery", {
                      ...deliveryData,
                      [subKey]: {
                        ...deliveryData[subKey],
                        time_from: value,
                      },
                    })
                  }}
                />
              </Col>
              <Col className="col-3">
                <TimePicker
                  items={timeData}
                  disabled={scheduler}
                  value={deliveryData[subKey].time_to}
                  onChange={value => {
                    setDeliveryData({
                      ...deliveryData,
                      [subKey]: {
                        ...deliveryData[subKey],
                        time_to: value,
                      },
                    })
                    onChange("delivery", {
                      ...deliveryData,
                      [subKey]: {
                        ...deliveryData[subKey],
                        time_to: value,
                      },
                    })
                  }}
                />
              </Col>
            </React.Fragment>
          )
        })}
      </Row>
    </div>
  )
}

export default TabDelivery

