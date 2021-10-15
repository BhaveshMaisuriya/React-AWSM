import React, { useState, useEffect, useMemo } from "react"
import { Col, Row } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"import { ReactSVG } from "react-svg"
import { ReactSVG } from "react-svg"
import ArrowDropDownIcon from "../../../assets/images/AWSM-Dropdown.svg"
import styles from "./tabDelivery.module.css"
import SimplePopover from "./components/SimplePopOver"
import TimePicker from "./components/TimePicker"
import DateRangePicker from "../DateRangePicker"
import DropdownInput from "../DropdownInput"
import AWSMInput from "../Input"
import AWSMCheckBox from "../../../common/CheckBox"
import { isValidDate } from "../../../pages/DQM/Common/helper"

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`)

const ACTUAL_OPEN_TIME = [
  { name: "Monday", checked: false },
  { name: "Tuesday", checked: false },
  { name: "Wednesday", checked: false },
  { name: "Thursday", checked: false },
  { name: "Friday", checked: false },
  { name: "Saturday", checked: false },
  { name: "Sunday", checked: false },
]

const RowComponent = ({ onChange, item }) => {
  return (
    <div
      className={`d-flex align-items-center ${
        item.checked ? styles.dropdownChecked : ""
      }`}
    >
      <AWSMCheckBox
        checked={item.checked}
        onChange={() => onChange(item)}
        name={item.name}
      />
      <label className="mb-0">{item.name || "-"}</label>
    </div>
  )
}

const TabDelivery = ({ scheduler, onChange, data }) => {
  const pathName = window.location.pathname
  const [tanker, setTanker] = useState([])
  const [deliveryData, setDeliveryData] = useState(data.delivery)
  const [openTime1, setOpenTime1] = useState(
    JSON.parse(JSON.stringify(ACTUAL_OPEN_TIME))
  )
  const [openTime2, setOpenTime2] = useState(
    JSON.parse(JSON.stringify(ACTUAL_OPEN_TIME))
  )
  const [openTime3, setOpenTime3] = useState(
    JSON.parse(JSON.stringify(ACTUAL_OPEN_TIME))
  )

  const no_interval_array = [1, 2, 3, 4, 5].map(
    e => `no_delivery_interval_${e}`
  )

  useEffect(() => {
    setDeliveryData(data.delivery)
    if (
      data.delivery.actual_open_time_1 &&
      data.delivery.actual_open_time_1.days
    ) {
      setOpenTime1(
        [...openTime1].map(item => ({
          ...item,
          checked: data.delivery.actual_open_time_1.days.includes(item.name) || data.delivery.actual_open_time_1.type === "daily",
        }))
      )
    }
    if (
      data.delivery.actual_open_time_2 &&
      data.delivery.actual_open_time_2.days
    ) {
      setOpenTime2(
        [...openTime2].map(item => ({
          ...item,
          checked: data.delivery.actual_open_time_2.days.includes(item.name) || data.delivery.actual_open_time_2.type === "daily",
        }))
      )
    }
    if (
      data.delivery.actual_open_time_3 &&
      data.delivery.actual_open_time_3.days
    ) {
      setOpenTime3(
        [...openTime3].map(item => ({
          ...item,
          checked: data.delivery.actual_open_time_3.days.includes(item.name) || data.delivery.actual_open_time_3.type === "daily",
        }))
      )
    }
  }, [data])

  useEffect(() => {
    if (
      deliveryData &&
      deliveryData.road_tanker_requirement_items &&
      Array.isArray(deliveryData.road_tanker_requirement_items) &&
      deliveryData.road_tanker_requirement_items?.length > 0
    ) {
      let temp = [];
      let defaultVal = deliveryData.road_tanker_requirement && deliveryData.road_tanker_requirement.split(',');
      deliveryData.road_tanker_requirement_items
          .map((item, index) => {
            console.log("item::", defaultVal);
            temp.push({
              name: item,
              checked:
                defaultVal &&
                defaultVal.indexOf(item) > -1 ? true : false,
            });
          });
      setTanker(temp);
    }
  }, [])

  const onFieldChange = (key, value) => {
    const newDeliveryData = { ...deliveryData }
    newDeliveryData[key] = value
    setDeliveryData(newDeliveryData)
    if (onChange) {
      onChange("delivery", newDeliveryData)
    }
  }

  const handleChangeTanker = item => {
    const index = tanker.findIndex(e => e.name === item.name)
    if (index < 0) {
      return
    }
    const newTanker = [...tanker]
    newTanker[index].checked = !newTanker[index].checked
    setTanker(newTanker)
    const newDeliveryData = {
      ...deliveryData,
      road_tanker_requirement: newTanker
        .filter(i => i.checked === true)
        .map(i => i.name)
        .join(","),
      road_tanker_requirement_items: newTanker.map(e => e.name),
    }
    onChange("delivery", newDeliveryData)
  }

  const handleAddTanker = value => {
    const newTanker = [...tanker]
    newTanker.push({
      name: value,
      checked: false,
    })
    setTanker(newTanker)
  }

  const actualOpenTime = {
    id: null,
    type: "every",
    time_from: null,
    time_to: null,
    date_from: null,
    date_to: null,
    days: [],
  }

  const handleActualTime1 = item => {
    const index = openTime1.findIndex(e => e.name === item.name)
    if (index < 0) {
      return
    }
    const newDays = [...openTime1]
    newDays[index].checked = !newDays[index].checked
    setOpenTime1(newDays)
    const actualOpenTime1 = deliveryData.actual_open_time_1 || actualOpenTime
    const selectedDays =  openTime1.filter(i => i.checked)
    onFieldChange("actual_open_time_1", {
      ...actualOpenTime1,
      days: selectedDays.length < 7 ? selectedDays.map(i => i.name).join(",") : [],
      type: selectedDays.length < 7 ? "every" : "daily"
    })
  }

  const actualOpenTime1 = useMemo(() => {
    return openTime1.filter(item => {
      return item.checked === true
    })
  }, [deliveryData, openTime1])

  const handleActualTime2 = item => {
    const index = openTime2.findIndex(e => e.name === item.name)
    if (index < 0) {
      return
    }
    const newDays = [...openTime2]
    newDays[index].checked = !newDays[index].checked
    setOpenTime2(newDays)
    const actualOpenTime2 = deliveryData.actual_open_time_2 || actualOpenTime
    const selectedDays =  openTime2.filter(i => i.checked)
    onFieldChange("actual_open_time_2", {
      ...actualOpenTime2,
      days: selectedDays.length < 7 ? selectedDays.map(i => i.name).join(",") : [],
      type: selectedDays.length < 7 ? "every" : "daily",
    })
  }

  const actualOpenTime2 = useMemo(() => {
    return openTime2.filter(item => {
      return item.checked === true
    })
  }, [deliveryData, openTime2])

  const handleActualTime3 = item => {
    const index = openTime3.findIndex(e => e.name === item.name)
    if (index < 0) {
      return
    }
    const newDays = [...openTime3]
    newDays[index].checked = !newDays[index].checked
    setOpenTime3(newDays)
    const actualOpenTime3 = deliveryData.actual_open_time_3 || actualOpenTime
    const selectedDays =  openTime3.filter(i => i.checked)
    onFieldChange("actual_open_time_3", {
      ...actualOpenTime3,
      days: selectedDays.length < 7 ? selectedDays.map(i => i.name).join(",") : [],
      type: selectedDays.length < 7 ? "every" : "daily",
    })
  }

  const actualOpenTime3 = useMemo(() => {
    return openTime3.filter(item => {
      return item.checked === true
    })
  }, [deliveryData, openTime3])
  
  const getDateError = (date) => {
    if (date && (date.time_from || date.time_to) && !isValidDate(date)) {
      return "Please select date"
    }
    return  null
  }
  
  const getTimeError = (date, key) => {
    if (isValidDate(date) && !date[key]) {
      return "Please select time"
    }
    return null
  }

  return (
    <>
      <Row className="row">
        <Col className="col-md-6 form-group">
          <DropdownInput
            title="ROAD TANKER REQUIREMENT"
            disabled={scheduler}
            items={tanker}
            onAddItem={handleAddTanker}
            value={tanker
              .filter(i => i.checked === true)
              .map(i => i.name)
              .join(",")}
            RowComponent={RowComponent}
            onChange={handleChangeTanker}
          />
        </Col>
        {pathName === "/commercial-customer" && <Col className="col-md-6" />}
        <Col className="col-md-6 form-group">
          <label>ROAD TANKER ACCESSIBILITY</label>
          <AWSMInput
            value={deliveryData.road_tanker_accessibility || ""}
            disabled
          />
        </Col>
        {pathName === "/commercial-customer" && (
          <Col className="col-md-6">
            <label>PUMP TYPE</label>
            <AWSMInput
              placeholder="Type something here..."
              disabled
              value={deliveryData.pump_type}
            />
          </Col>
        )}

        <Col className="col-md-6">
          <label>DELIVERY OPEN TIME (FROM)</label>
          <TimePicker
            value={
              deliveryData.delivery_open_time_1
                ? deliveryData.delivery_open_time_1.time_from
                : ""
            }
            items={timeData}
            disabled
            className={styles.disabled}
            onChange={value =>
              onFieldChange("delivery_open_time_1", {
                ...deliveryData.delivery_open_time_1,
                time_from: value,
              })
            }
            hasNone
          />
        </Col>
        <Col className="col-md-6">
          <label>DELIVERY OPEN TIME (TO)</label>
          <TimePicker
            items={timeData}
            disabled
            value={deliveryData.delivery_open_time_1.time_to}
            onChange={value =>
              onFieldChange("delivery_open_time_1", {
                ...deliveryData.delivery_open_time_1,
                time_to: value,
              })
            }
            hasNone
          />
        </Col>
        <Col
          className={`col-12 ${styles.marginTop30} ${styles.marginBottom14}`}
        >
          <label>
            <strong>ACTUAL OPEN TIME 1</strong>
          </label>
        </Col>
        <Col className="col-md-6">
          <SimplePopover
            handleChange={handleActualTime1}
            data={openTime1}
            disabled={!!scheduler}
          >
            <AvForm>
              <AvField
                name="days1"
                type="text"
                label="DAY(S)"
                value={
                  actualOpenTime1.length > 0
                    ? actualOpenTime1.length === 7
                      ? "Every Day"
                      : actualOpenTime1.map(i => i.name)
                    : "Select day(s)"
                }
                className={`${styles.field} ${
                  scheduler ? styles.disabled : ""
                } ${!scheduler && getDateError(deliveryData.actual_open_time_1) ? "border-danger" : ""}`}
                disabled={!!scheduler}
              />
              <div className={styles.arrow}>
                <ReactSVG src={ArrowDropDownIcon} />
              </div>
              {!scheduler && getDateError(deliveryData.actual_open_time_1) && <div className={styles.fieldError}>
                Please select date
              </div>}
            </AvForm>
          </SimplePopover>
        </Col>
        <Col className="col-md-3">
          <label>TIME (FROM)</label>
          <TimePicker
            items={timeData}
            disabled={scheduler}
            value={
              deliveryData.actual_open_time_1
                ? deliveryData.actual_open_time_1.time_from
                : ""
            }
            onChange={value =>
              onFieldChange("actual_open_time_1", {
                ...actualOpenTime,
                ...deliveryData.actual_open_time_1,
                time_from: value,
              })
            }
            hasNone
            error={getTimeError(deliveryData.actual_open_time_1, "time_from")}
          />
        </Col>
        <Col className="col-md-3">
          <label>TIME (TO)</label>
          <TimePicker
            items={timeData}
            disabled={scheduler}
            value={
              deliveryData.actual_open_time_1
                ? deliveryData.actual_open_time_1.time_to || ""
                : ""
            }
            onChange={value =>
              onFieldChange("actual_open_time_1", {
                ...actualOpenTime,
                ...deliveryData.actual_open_time_1,
                time_to: value,
              })
            }
            hasNone
            error={getTimeError(deliveryData.actual_open_time_1, "time_to")}
          />
        </Col>
        {pathName === "/retail-customer" ||
        pathName === "/commercial-customer" ? (
          <React.Fragment>
            <Col
              className={`col-12 ${styles.marginTop14} ${styles.marginBottom14}`}
            >
              <label>
                <strong>ACTUAL OPEN TIME 2</strong>
              </label>
            </Col>
            <Col className="col-md-6">
              <SimplePopover
                handleChange={handleActualTime2}
                data={openTime2}
                disabled={scheduler}
              >
                <AvForm>
                  <AvField
                    name="openTime2"
                    type="text"
                    label="DAY(S)"
                    value={
                      actualOpenTime2.length > 0
                        ? actualOpenTime2.length === 7
                          ? "Every Day"
                          : actualOpenTime2.map(i => i.name)
                        : "Select day(s)"
                    }
                    disabled={scheduler}
                    className={`${styles.field} ${
                      scheduler ? styles.disabled : undefined
                    } ${!scheduler && getDateError(deliveryData.actual_open_time_2) ? "border-danger" : ""}`}
                  />
                  <div className={styles.arrow}>
                    <ReactSVG src={ArrowDropDownIcon} />
                  </div>
                  {!scheduler && getDateError(deliveryData.actual_open_time_2) && <div className={styles.fieldError}>
                    Please select date
                  </div>}
                </AvForm>
              </SimplePopover>
            </Col>
            <Col className="col-md-3">
              <label>TIME (FROM)</label>
              <TimePicker
                items={timeData}
                disabled={scheduler}
                value={
                  deliveryData.actual_open_time_2
                    ? deliveryData.actual_open_time_2.time_from || ""
                    : ""
                }
                onChange={value =>
                  onFieldChange("actual_open_time_2", {
                    ...actualOpenTime,
                    ...deliveryData.actual_open_time_2,
                    time_from: value,
                  })
                }
                hasNone
                error={getTimeError(deliveryData.actual_open_time_2, "time_from")}
              />
            </Col>
            <Col className="col-md-3">
              <label>TIME (TO)</label>
              <TimePicker
                items={timeData}
                disabled={scheduler}
                value={
                  deliveryData.actual_open_time_2
                    ? deliveryData.actual_open_time_2.time_to || ""
                    : ""
                }
                onChange={value =>
                  onFieldChange("actual_open_time_2", {
                    ...actualOpenTime,
                    ...deliveryData.actual_open_time_2,
                    time_to: value,
                  })
                }
                hasNone
                error={getTimeError(deliveryData.actual_open_time_2, "time_to")}
              />
            </Col>
            <Col
              className={`col-12 ${styles.marginTop14} ${styles.marginBottom14}`}
            >
              <label>
                <strong>ACTUAL OPEN TIME 3</strong>
              </label>
            </Col>
            <Col className="col-md-6">
              <SimplePopover
                handleChange={handleActualTime3}
                data={openTime3}
                disabled={scheduler}
              >
                <AvForm>
                  <AvField
                    name="openTime3"
                    type="text"
                    label="DAY(S)"
                    value={
                      actualOpenTime3.length > 0
                        ? actualOpenTime3.length === 7
                          ? "Every Day"
                          : actualOpenTime3.map(i => i.name)
                        : "Select day(s)"
                    }
                    disabled={scheduler}
                    className={`${styles.field} ${
                      scheduler ? styles.disabled : undefined
                    } ${!scheduler && getDateError(deliveryData.actual_open_time_3) ? "border-danger" : ""}`}
                  />
                  <div className={styles.arrow}>
                    <ReactSVG src={ArrowDropDownIcon} />
                  </div>
                  {!scheduler && getDateError(deliveryData.actual_open_time_3) && <div className={styles.fieldError}>
                    Please select date
                  </div>}
                </AvForm>
              </SimplePopover>
            </Col>
            <Col className="col-md-3">
              <label>TIME (FROM)</label>
              <TimePicker
                items={timeData}
                disabled={scheduler}
                value={
                  deliveryData.actual_open_time_3
                    ? deliveryData.actual_open_time_3.time_from || ""
                    : ""
                }
                onChange={value =>
                  onFieldChange("actual_open_time_3", {
                    ...actualOpenTime,
                    ...deliveryData.actual_open_time_3,
                    time_from: value,
                  })
                }
                error={getTimeError(deliveryData.actual_open_time_3, "time_from")}
                hasNone
              />
            </Col>
            <Col className="col-md-3">
              <label>TIME (TO)</label>
              <TimePicker
                items={timeData}
                disabled={scheduler}
                value={
                  deliveryData.actual_open_time_3
                    ? deliveryData.actual_open_time_3.time_to || ""
                    : ""
                }
                onChange={value =>
                  onFieldChange("actual_open_time_3", {
                    ...actualOpenTime,
                    ...deliveryData.actual_open_time_3,
                    time_to: value,
                  })
                }
                hasNone
                error={getTimeError(deliveryData.actual_open_time_3, "time_to")}
              />
            </Col>
          </React.Fragment>
        ) : null}
        <Col
          className={`col-12 ${styles.marginTop14} ${styles.marginBottom14}`}
        >
          <label>
            <strong>NO DELIVERY INTERVAL</strong>
          </label>
        </Col>
        {no_interval_array.map((subKey, index) => {
          return (
            <React.Fragment key={index}>
              <Col className="col-md-6">
                <label>DATE {index + 1}</label>
              </Col>
              <Col className="col-md-3">
                <label>TIME (FROM) {index + 1}</label>
              </Col>
              <Col className="col-md-3">
                <label>TIME (TO) {index + 1}</label>
              </Col>
              <Col className="col-md-6" style={{marginBottom: "1.2rem"}}>
                <DateRangePicker
                  defaultValue={deliveryData[subKey]}
                  onChange={value => onFieldChange(subKey, value)}
                  disabled={index < 2 ? true : scheduler}
                  validateTime
                />
              </Col>
              <Col className="col-md-3">
                <TimePicker
                  flip={true}
                  items={timeData}
                  disabled={index < 2 ? true : scheduler}
                  value={deliveryData[subKey]?.time_from}
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
                  hasNone
                  error={getTimeError(deliveryData[subKey], "time_from")}
                />
              </Col>
              <Col className="col-md-3">
                <TimePicker
                  flip={true}
                  items={timeData}
                  disabled={index < 2 ? true : scheduler}
                  value={deliveryData[subKey]?.time_to}
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
                  hasNone
                  error={getTimeError(deliveryData[subKey], "time_to")}
                />
              </Col>
            </React.Fragment>
          )
        })}
      </Row>
      <hr style={{ margin: "2em 0" }} />
    </>
  )
}

export default TabDelivery
