import React, { useState, useEffect } from "react"
import DropdownInput from "../DropdownInput"
import AWSMDropdown from "../Dropdown"
import AWSMInput from "../Input"
import AWSMInputNumber from "../InputNumber"
import "./tab-storage.scss"
import { Col } from "reactstrap"

import AWSMAlert from "../AWSMAlert"

const ACTIVE_PRODUCTS = ["Active", "None"]
const SALES_CATEGORY = ["Yes", "No"]
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
      end_of_day: value,
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
    newStorageData[key][subKey] = value
    if (onChange) {
      onChange("storage", newStorageData)
    }
  }

  const onAddOrderingCategory = (key, value) => {
    const newStorageData = {...storageData}
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
      <div className="w-50">
        <div className="mb-2 input-header">END OF DAY</div>
        <AWSMDropdown
          onChange={onEndOfDayChange}
          items={timeData}
          disabled={scheduler}
          value={storageData.end_of_day || ""}
        />
      </div>
      {Object.keys(storageData).map((key, index) => key.startsWith("storage_") ? (
        <div key={index}>
          <div className="d-flex justify-content-between align-items-center"
               style={{ margin: "3em 0 10px 0" }}>
            <div className="section-header">{`STORAGE ${
              key.split("_")[1]
            }`}</div>
            <div
              className="dqm-storage-delete"
              onClick={() => onSetDeleteItem(key)}
            >
              Delete Storage
            </div>
          </div>
          <div className="storage_delete_main">
            {deleteItemKey && deleteItemKey === key && (
              <div className="dqm-storage-confirm-delete d-flex justify-content-center align-items-center">
                <div className="m-4">
                  Are you sure you want to delete this Storage
                </div>
                <button
                  onClick={() => setDeleteItemKey(null)}
                  className="btn btn-outline-danger m-2"
                >
                  Cancel
                </button>
                <button onClick={onDeleteStorage} className="btn btn-danger m-2">
                  Delete
                </button>
              </div>
            )}
            <div className="row">
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">PRODUCT CODE</div>
                <AWSMInput
                  defaultValue={storageData[key] ? storageData[key].code || "" : ""}
                  onChange={value => onUpdateField(key, "code", value)}
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">TANK CAPACITY</div>
                <AWSMInputNumber
                  type="number"
                  defaultValue={storageData[key] ? storageData[key].tank_capacity || "" : ""}
                  onChange={value => onUpdateField(key, "tank_capacity", value)}
                  disabled={scheduler}
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">ACTIVE PRODUCT</div>
                <AWSMDropdown
                  onChange={value => onUpdateField(key, "active_product", value)}
                  value={storageData[key] ? storageData[key].active_product || "" : ""}
                  items={ACTIVE_PRODUCTS}
                  disabled={scheduler}
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <DropdownInput
                  title="ORDERING CATEGORY"
                  value={storageData[key] ? storageData[key].ordering_category || "" : ""}
                  items={storageData[key] ? storageData[key].ordering_category_items || [] : []}
                  onChange={value =>
                    onUpdateField(key, "ordering_category", value)
                  }
                  onAddItem={(value) => onAddOrderingCategory(key, value)}
                />
                <AWSMAlert
                  status="success"
                  message="New Ordering Category added"
                  openAlert={alert}
                  closeAlert={() => setAlert(false)}
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">TERMINAL</div>
                <AWSMInput
                  value={storageData[key] ? storageData[key].terminal || "" : ""}
                  onChange={value =>
                    onUpdateField(key, "terminal", value)
                  }
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">DISTANCE</div>
                <AWSMInput
                  value={storageData[key] ? storageData[key].distance || "" : ""}
                  onChange={value =>
                    onUpdateField(key, "distance", value)
                  }
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">DURATION</div>
                <AWSMInputNumber
                  itemKey="duration"
                  type="number"
                  value={storageData[key] ? storageData[key].duration || "" : ""}
                  onChange={value => onUpdateField(key, "duration", value)}
                  disabled={scheduler}
                />
              </div>
              <div className="col col-12 col-sm-6 col-lg-3">
                <div className="input-header mb-2">SALE CATEGORY</div>
                <AWSMDropdown
                  value={storageData[key] ? storageData[key].sale_category || "" : ""}
                  items={SALES_CATEGORY}
                  onChange={value =>
                    onUpdateField(key, "sale_category", value)
                  }
                />
              </div>
              {pathName === "/commercial-customer" ? (
                <React.Fragment>
                  <Col className="col-3" style={{ marginTop: "12px" }}>
                    <div>
                      <label>DEADSTOCK</label>
                      <AWSMInputNumber
                        type="number"
                        placeholder="Numberic only"
                        defaultValue={storageData[key] ? storageData[key].dead_stock || "" : ""}
                        onChange={value =>
                          onUpdateField(key, "dead_stock", value)
                        }
                      />
                    </div>
                  </Col>
                  <Col className="col-3 " style={{ marginTop: "12px" }}>
                    <div>
                      <label>SAFE FILL</label>
                      <AWSMInputNumber
                        type="number"
                        placeholder="Numberic only"
                        defaultValue={storageData[key] ? storageData[key].safe_fill || "" : ""}
                        onChange={value => onUpdateField(key, "safe_fill", value)}
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
                <div className="input-header mb-2">REMARKS</div>
                <AWSMInput
                  placeholder="Write something here..."
                  disabled={scheduler}
                  defaultValue={storageData[key] ? storageData[key].remarks || "" : ""}
                  onChange={value => onUpdateField(key, "remarks", value)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null)}
      <hr style={{ margin: "2em 0" }} />
      <div className="mt-4 dqm-storage-add" onClick={onAddStorage}>
        + Add storage
      </div>
    </div>
  )
}

export default TabStorage
