import React from "react"
import { Col, Row } from "reactstrap"
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

const TabDelivery = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "road_tanker_requirement" : undefined
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
  const [data, setData] = React.useState(testData)
  const [days, setDays] = React.useState(testDays)

  const handleChange = event => {
    const index = data.findIndex(item => item.name === event.target.name)
    const newData = [...data]
    newData[index].checked = event.target.checked
    setData(() => newData)
  }
  const checkedData = data.filter(item => {
    return item.checked === true
  })
  const handleChange2 = event => {
    const index = days.findIndex(item => item.name === event.target.name)
    const newDays = [...days]
    newDays[index].checked = event.target.checked
    setDays(() => newDays)
  }
  const checkedDay = days.filter(item => {
    return item.checked === true
  })

  return (
    <div
      style={{
        height: "400px",
      }}
    >
      <Row form>
        <Col className="col-6">
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
                />
              </AvForm>
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </div>
          </SimplePopover>
        </Col>
        <Col className="col-6">
          <AvForm>
            <AvField
              name="road_tanker_accessibilty"
              type="text"
              label="ROAD TANKER ACCESSIBILTY"
              value=""
              placeholder="Type something here..."
            ></AvField>
          </AvForm>
        </Col>

        <Col className="col-6">
          <h6>DILIVERY OPEN TIME (FROM)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-6">
          <h6>DILIVERY OPEN TIME (TO)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-12 mt-3">
          <h6>
            <strong>ACTUAL OPEN TIME 1</strong>
          </h6>
        </Col>
        <Col className="col-6">
          <SimplePopover handleChange={handleChange2} data={days}>
            <div>
              <AvForm>
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
                  style={{ height: "40px", marginTop: "-4px" }}
                />
              </AvForm>
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </div>
          </SimplePopover>
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-12">
          <h6>
            <strong>ACTUAL OPEN TIME 2</strong>
          </h6>
        </Col>
        <Col className="col-6">
          <SimplePopover handleChange={handleChange2} data={days}>
            <div>
              <AvForm>
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
                  style={{ height: "40px", marginTop: "-4px" }}
                />
              </AvForm>
              <div className={styles.arrow}>
                <ArrowDropDownIcon />
              </div>
            </div>
          </SimplePopover>
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
          <AWSMDropdown items={timeData} />
        </Col>

        <Col className="col-6 mb-3">
          <h6>NO DELIVERY INTERVAL</h6>
          <PopOverCalendar />
        </Col>
        <Col className="col-3">
          <h6>TIME (FROM)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-3">
          <h6>TIME (TO)</h6>
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-6 mb-3">
          <PopOverCalendar />
        </Col>
        <Col className="col-3">
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-3">
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-6 mb-3">
          <PopOverCalendar />
        </Col>
        <Col className="col-3">
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-3">
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-6">
          <PopOverCalendar />
        </Col>
        <Col className="col-3">
          <AWSMDropdown items={timeData} />
        </Col>
        <Col className="col-3">
          <AWSMDropdown items={timeData} />
        </Col>
      </Row>
    </div>
  )
}
export default TabDelivery
