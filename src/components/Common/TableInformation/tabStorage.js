import React, { useState, useEffect } from "react"
import DropdownInput from "../DropdownInput"
import AWSMDropdown from "../Dropdown"
import AWSMInput from "../Input"
import AWSMInputNumber from "../InputNumber"
import "./tab-storage.scss"
import { Col, Row } from "reactstrap"

import AWSMAlert from "../AWSMAlert"

const ACTIVE_PRODUCTS = ["ACTIVE", "INACTIVE"]
const SALES_CATEGORY = ["LV1", "LV2", "Normal", "TC", "LD"]
const ORDERING_CATEGORY = ["SMP"]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}
timeData.push(`23:59`)

const TabStorage = ({ scheduler, data, onChange }) => {
  const [storageData, setStorageData] = useState(data.storage || {})
  const [deleteItemKey, setDeleteItemKey] = useState(null)
  const [alert, setAlert] = useState(false)
  const pathName = window.location.pathname

  /**
   * Update end of day value
   * @param value: updated value
   */
  const onEndOfDayChange = value => {
    const newStorageData = {
      ...storageData,
      end_of_day: {
        type: "daily",
        ...storageData.end_of_day,
        time_to: value,
      },
    }
    setStorageData(newStorageData)
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  /**
   * Add new storage
   */
  const onAddStorage = () => {
    if (scheduler) {
      return
    }
    const lastStorage = Object.keys(storageData).reduce(
      (previousValue, currentValue) => {
        if (currentValue > previousValue) {
          return currentValue
        }
        return previousValue
      },
      "storage_0"
    )
    const newStorageData = { ...storageData }
    newStorageData[`storage_${Number(lastStorage.split("_")[1]) + 1}`] = {
      id: null,
      tank_capacity: null,
      active_product: null,
      ordering_category: null,
      terminal: null,
      distance: null,
      duration: null,
      remarks: null,
      sales_category: null,
      product_code_quota: null,
      monthly_fixed_quota: null,
      dead_stock: null,
      safe_fill: null,
      name: null,
      code: null,
      ordering_category_items: [],
    }
    setStorageData(newStorageData)
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  const onUpdateField = (key, subKey, value) => {
    const newStorageData = { ...storageData }
    if (!newStorageData[key]) {
      newStorageData[key] = {}
    }
    newStorageData[key] = { ...newStorageData[key], [subKey]: value }
    setStorageData(newStorageData)
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  const onAddOrderingCategory = (key, value) => {
    const newStorageData = { ...storageData }
    if (!newStorageData[key].ordering_category_items) {
      newStorageData[key].ordering_category_items = []
    }
    newStorageData[key].ordering_category_items.push(value)
    if (onChange) {
      onChange("storage", newStorageData)
    }
    setAlert(true)
  }

  /**
   * Set delete storage item
   * @param item
   */
  const onSetDeleteItem = item => {
    if (scheduler) {
      return
    }
    setDeleteItemKey(item)
  }

  /**
   * Delete storage
   */
  const onDeleteStorage = () => {
    const newStorageData = { ...storageData }
    delete newStorageData[deleteItemKey]
    setStorageData(newStorageData)
    setDeleteItemKey(null)
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  return (
    <div className="dqm-storage-container" id="dqm-storage-container">
      <Row className="row">
        <Col className="col-md-6 form-group mb-0">
          <label>END OF DAY</label>
          <AWSMDropdown
            onChange={onEndOfDayChange}
            items={timeData}
            disabled={scheduler}
            value={
              storageData.end_of_day?.time_to?.toString().substring(0, 5) || ""
            }
            placeholder="Select time"
          />
        </Col>
      </Row>
      {Object.keys(storageData).map((key, index) =>
        key.startsWith("storage_") ? (
          <div key={index}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ margin: "30px 0 22px 0" }}
            >
              <div className="section-header">{`STORAGE ${
                key.split("_")[1]
              }`}</div>
              {!scheduler && pathName !== "/retail-customer" && (
                <div
                  className="dqm-storage-delete"
                  onClick={() => onSetDeleteItem(key)}
                >
                  Delete Storage
                </div>
              )}
            </div>
            <div className="storage_delete_main">
              {deleteItemKey && deleteItemKey === key && (
                <div className="dqm-storage-confirm-delete d-flex justify-content-center align-items-center">
                  <div className="m-4">
                    Are you sure you want to delete this Storage
                  </div>
                  <button
                    onClick={() => setDeleteItemKey(null)}
                    className="btn btn-dan m-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onDeleteStorage}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </button>
                </div>
              )}
              <Row className="row">
                <Col className="col-md-3 form-group">
                  <label>PRODUCT CODE</label>
                  <AWSMInputNumber
                    defaultValue={
                      storageData[key] ? storageData[key].code || "" : ""
                    }
                    onChange={value => onUpdateField(key, "code", value)}
                    disabled={
                      !scheduler && pathName == "/commercial-customer"
                        ? false
                        : true
                    }
                  />
                </Col>

                <Col className="col-md-3 form-group">
                  <label>TANK CAPACITY</label>
                  <AWSMInputNumber
                    type="number"
                    defaultValue={
                      storageData[key]
                        ? storageData[key].tank_capacity || ""
                        : ""
                    }
                    onChange={value =>
                      onUpdateField(key, "tank_capacity", value)
                    }
                    disabled={
                      !scheduler && pathName == "/commercial-customer"
                        ? false
                        : true
                    }
                  />
                </Col>

                <Col className="col-md-3 form-group">
                  <label>ACTIVE PRODUCT</label>
                  <AWSMDropdown
                    onChange={value =>
                      onUpdateField(key, "active_product", value)
                    }
                    value={
                      storageData[key]
                        ? storageData[key].active_product || ""
                        : ""
                    }
                    items={ACTIVE_PRODUCTS}
                    disabled={scheduler}
                  />
                </Col>
                <Col
                  className="col-md-3 form-group"
                  style={{ fontSize: !scheduler ? "12px" : "" }}
                >
                  <DropdownInput
                    title="ORDERING CATEGORY"
                    value={
                      storageData[key]
                        ? storageData[key].ordering_category || ""
                        : ""
                    }
                    items={
                      storageData[key]
                        ? storageData[key].ordering_category_items || []
                        : []
                    }
                    onChange={value =>
                      onUpdateField(key, "ordering_category", value)
                    }
                    onAddItem={value => onAddOrderingCategory(key, value)}
                    disabled={scheduler}
                  />
                  <AWSMAlert
                    status="success"
                    message="New Ordering Category added"
                    openAlert={alert}
                    closeAlert={() => setAlert(false)}
                  />
                </Col>

                <Col className="col-md-3 form-group">
                  <label>TERMINAL</label>
                  <AWSMInput
                    value={
                      storageData[key] ? storageData[key].terminal || "" : ""
                    }
                    onChange={value => onUpdateField(key, "terminal", value)}
                    disabled={
                      !scheduler && pathName == "/commercial-customer"
                        ? false
                        : true
                    }
                  />
                </Col>
                <Col className="col-md-3 form-group">
                  <label>DISTANCE</label>
                  <AWSMInputNumber
                    value={
                      storageData[key] ? storageData[key].distance || "" : ""
                    }
                    onChange={value => onUpdateField(key, "distance", value)}
                    disabled={
                      !scheduler && pathName == "/commercial-customer"
                        ? false
                        : true
                    }
                  />
                </Col>

                <Col className="col-md-3 form-group">
                  <label>DURATION</label>
                  <AWSMInputNumber
                    itemKey="duration"
                    type="number"
                    value={
                      storageData[key] ? storageData[key].duration || "" : ""
                    }
                    onChange={value => onUpdateField(key, "duration", value)}
                    disabled={scheduler}
                  />
                </Col>
                <Col className="col-md-3 form-group">
                  <label>SALES CATEGORY</label>
                  <AWSMDropdown
                    value={
                      storageData[key]
                        ? storageData[key].sales_category || ""
                        : ""
                    }
                    items={SALES_CATEGORY}
                    onChange={value =>
                      onUpdateField(key, "sales_category", value)
                    }
                    disabled={scheduler}
                  />
                </Col>
                {pathName === "/commercial-customer" ? (
                  <React.Fragment>
                    <Col className="col-3">
                      <div>
                        <label>DEADSTOCK</label>
                        <AWSMInputNumber
                          type="number"
                          placeholder="Numeric only"
                          defaultValue={
                            storageData[key]
                              ? storageData[key].dead_stock || ""
                              : ""
                          }
                          onChange={value =>
                            onUpdateField(key, "dead_stock", value)
                          }
                          disabled={scheduler}
                        />
                      </div>
                    </Col>
                    <Col className="col-3 ">
                      <div>
                        <label>SAFE FILL</label>
                        <AWSMInputNumber
                          type="number"
                          placeholder="Numeric only"
                          defaultValue={
                            storageData[key]
                              ? storageData[key].safe_fill || ""
                              : ""
                          }
                          onChange={value =>
                            onUpdateField(key, "safe_fill", value)
                          }
                          disabled={scheduler}
                        />
                      </div>
                    </Col>
                  </React.Fragment>
                ) : null}
                <div
                  className={`col ${
                    pathName === "/retail-customer" ? "col-12" : "col-6"
                  }`}
                >
                  <label>REMARKS</label>
                  <AWSMInput
                    disabled={scheduler}
                    defaultValue={
                      storageData[key] ? storageData[key].remarks || "" : ""
                    }
                    onChange={value => onUpdateField(key, "remarks", value)}
                  />
                </div>
              </Row>
            </div>
          </div>
        ) : null
      )}
      <hr style={{ margin: "2em 0" }} />
      {!scheduler && pathName !== "/retail-customer" && (
        <div className="mt-4 dqm-storage-add" onClick={onAddStorage}>
          + Add storage
        </div>
      )}
    </div>
  )
}

export default TabStorage
