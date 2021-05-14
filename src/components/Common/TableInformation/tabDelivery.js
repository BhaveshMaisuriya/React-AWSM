import React from "react"
import { Col, Row, Button } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import styles from "./tabDelivery.module.css"
import SimplePopover from "./components/SimplePopOver"
import AWSMDropdown from "./components/TimePicker"
import PopOverCalendar from "./components/PopOverCalendar"

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`);

const TabDelivery = ({ scheduler }) => {
  const pathName = window.location.pathname
  const testData = [
    { name: "Long Hose", checked: false },
    { name: "Long Distance", checked: false },
  ]
  const testDays = [
    { name: "Monday", checked: false },
    { name: "Tuesday", checked: false },
    { name: "Wednesday", checked: false },
    { name: "Thursday", checked: false },
    { name: "Friday", checked: false },
    { name: "Saturday", checked: false },
    { name: "Sunday", checked: false },
  ]

  const testDays2 = [
    { name: "Monday", checked: false },
    { name: "Tuesday", checked: false },
    { name: "Wednesday", checked: false },
    { name: "Thursday", checked: false },
    { name: "Friday", checked: false },
    { name: "Saturday", checked: false },
    { name: "Sunday", checked: false },
  ]
  const [data, setData] = React.useState(testData)
  const [days, setDays] = React.useState(testDays)
  const [days2, setDays2] = React.useState(testDays2)

  const handleChange = event => {
    const index = data.findIndex(item => item.name === event.target.name)
    const newData = [...data]
    newData[index].checked = event.target.checked
    setData(() => newData)
  }
  const checkedData = data.filter(item => {
    return item.checked === true
  })
  const handleActualTime1 = event => {
    const index = days.findIndex(item => item.name === event.target.name)
    const newDays = [...days]
    newDays[index].checked = event.target.checked
    setDays(() => newDays)
  }
  const checkedDay = days.filter(item => {
    return item.checked === true
  })
  const handleActualTime2 = event => {
    const index = days2.findIndex(item => item.name === event.target.name)
    const newDays2 = [...days2]
    newDays2[index].checked = event.target.checked
    setDays2(() => newDays2)
  }
  const checkedDay2 = days2.filter(item => {
    return item.checked === true
  })
  
  return (
    <div
      style={{
        height: "400px",
      }}
    >
      <Row>
        <Col className="col-6" style={{marginTop: 4}}>
          <SimplePopover handleChange={handleChange} data={data}>
            <div>
              <AvForm>
                <AvField
                  name="road_tanker_requirement"
                  type="text"
                  label="ROAD TANKER REQUIREMENT"
                  value={checkedData.map(i => i.name)}
                  className={styles.field}
                  disabled
                  className={scheduler ? styles.disabled : undefined}
                />
              </AvForm>
              <button className={styles.add}>+Add</button>
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </div>
          </SimplePopover>
        </Col>
        {pathName === "/commercial-customer" && <Col className="col-6"></Col>}
        <Col className="col-6">
          <AvForm>
            <AvField
              name="road_tanker_accessibilty"
              type="text"
              label="ROAD TANKER ACCESSIBILTY"
              value=""
              placeholder="Type something here..."
              disabled={scheduler}
              className={scheduler ? styles.disabled : undefined}
            ></AvField>
          </AvForm>
        </Col>
        {pathName === "/commercial-customer" && (
          <Col className="col-6">
            <AvForm>
              <AvField
                name="pump_type"
                type="text"
                label="PUMP TYPE"
                value=""
                placeholder="Type something here..."
                disabled={scheduler}
                className={scheduler ? styles.disabled : undefined}
              ></AvField>
            </AvForm>
          </Col>
        )}

        <Col className="col-6">
          <h6>DELIVERY OPEN TIME (FROM)</h6>
          <AWSMDropdown items={timeData} disabled={scheduler} />
        </Col>
        <Col className="col-6">
          <h6>DELIVERY OPEN TIME (TO)</h6>
          <AWSMDropdown items={timeData} disabled={scheduler} />
        </Col>
        <Col className="col-12 mt-3">
          <h6>
            <strong>ACTUAL OPEN TIME 1</strong>
          </h6>
        </Col>
        <Col className="col-6">
          <SimplePopover handleChange={handleActualTime1} data={days}>
            <div>
              {/* <AvForm> */}
                <AvField
                  name="days1"
                  type="text"
                  label="DAY(S)"
                  value={
                    checkedDay.length !== 0
                      ? checkedDay.map(i => i.name)
                      : "Select day(s)"
                  }
                  className={`${styles.field}`}
                  disabled
                  className={scheduler ? styles.disabled : undefined}
                  style={{ height: "40px", marginTop: "-4px" }}
                />
              {/* </AvForm> */}
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </div>
          </SimplePopover>
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
          <AWSMDropdown items={timeData} disabled={scheduler} />
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
          <AWSMDropdown items={timeData} disabled={scheduler} />
        </Col>
        {pathName === "/retail-customer" ? (
          <React.Fragment>
            <Col className="col-12">
              <h6>
                <strong>ACTUAL OPEN TIME 2</strong>
              </h6>
            </Col>
            <Col className="col-6">
              <SimplePopover handleChange={handleActualTime2} data={days2}>
                <div>
                  <AvField
                    name="days2"
                    type="text"
                    label="DAY(S)"
                    value={
                      checkedDay2.length !== 0
                        ? checkedDay2.map(i => i.name)
                        : "Select day(s)"
                    }
                    className={`${styles.field}`}
                    disabled
                    className={scheduler ? styles.disabled : undefined}
                    style={{ height: "40px", marginTop: "-4px" }}
                  />
                  <div className={styles.arrow}>
                    <ArrowDropDownIcon />
                  </div>
                </div>
              </SimplePopover>
            </Col>
            <Col className="col-3">
              <h6>TIME (FROM)</h6>
              <AWSMDropdown items={timeData} disabled={scheduler} />
            </Col>
            <Col className="col-3">
              <h6>TIME (TO)</h6>
              <AWSMDropdown items={timeData} disabled={scheduler} />
            </Col>
          </React.Fragment>
        ) : null}

        <Col className="col-6 mb-3">
          <h6>NO DELIVERY INTERVAL</h6>
          <PopOverCalendar disabled={scheduler} />
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
          <AWSMDropdown items={timeData} disabled={scheduler} />
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
          <AWSMDropdown items={timeData} disabled={scheduler} />
        </Col>
        {[2,3,4,5].map(function(){
          return <>
            <Col className="col-6 mb-3">
              <PopOverCalendar disabled={scheduler} />
            </Col>
            <Col className="col-3">
              <AWSMDropdown items={timeData} disabled={scheduler} />
            </Col>
            <Col className="col-3">
              <AWSMDropdown items={timeData} disabled={scheduler} />
            </Col>
          </>
        })
      }
        
      </Row>
    </div>
  )
}
export default TabDelivery
