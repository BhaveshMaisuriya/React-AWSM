import React, { useState, useEffect } from "react"
import DropdownInput from "../DropdownInput"
import AWSMDropdown from "../Dropdown"
import AWSMInput from "../Input"
import AWSMInputNumber from "../InputNumber"
import "./tab-storage.scss"

const ACTIVE_PRODUCTS = ["Active", "None"]
const ORDERING_CATEGORY = ["SMP", "SCP"]
const SALES_CATEGORY = ["Yes", "No"]

// Dummy storage data
const storageDummy = [
  {
    id: "1",
    product_code: "12345",
    tank_capacity: 10000,
    active_product: "Active",
    ordering_category: {items: [...ORDERING_CATEGORY], value: "SMP"},
    terminal: "M808",
    distance: "40",
    duration: 4.4,
    sale_category: "Yes"
  },
  {
    id: "2",
    product_code: "12345",
    tank_capacity: 10000,
    active_product: "Active",
    ordering_category: {items: [...ORDERING_CATEGORY], value: "SMP"},
    terminal: "M808",
    distance: "40",
    duration: 4.4,
    sale_category: "Yes"
  }
]

const timeData = []
for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, "0")}:00`)
  timeData.push(`${i.toString().padStart(2, "0")}:30`)
}

const TabStorage = ({}) => {

  const [storageData, setStorageData] = useState(storageDummy)
  const [endOfDay, setEndOfDay] = useState("")
  const [deleteItem, setDeleteItem] = useState(null)

  /**
   * Update tank capacity value
   * @param index: storage index item
   * @param value: updated value
   */
  const onTankCapacityChange = (index, value) => {
    const newStorageData = [...storageData]
    newStorageData[index].tank_capacity = value
    setStorageData(newStorageData)
  }

  /**
   * Update duration value
   * @param index: storage index item
   * @param value: updated value
   */
  const onDurationChange = (index, value) => {
    const newStorageData = [...storageData]
    newStorageData[index].duration = value
    setStorageData(newStorageData)
  }

  /**
   * Update end of day value
   * @param value: updated value
   */
  const onEndOfDayChange = (value) => {
    setEndOfDay(value)
  }

  /**
   * Add new storage
   */
  const onAddStorage = () => {
    const nextID = storageData && storageData.length ? (Number(storageData[storageData.length - 1].id) + 1).toString() : "1"
    setStorageData([...storageData, {
      id: nextID,
      product_code: "12345",
      tank_capacity: 10000,
      active_product: "Active",
      ordering_category: "SMP",
      terminal: "M808",
      distance: "40",
      duration: 4.4,
      sale_category: "Yes"
    }])
  }

  /**
   * Update active product value
   * @param index: storage index item
   * @param value: updated value
   */
  const onActiveProductChange = (index, value) => {
    const newStorageData = [...storageData]
    newStorageData[index].active_product = value
    setStorageData(newStorageData)
  }

  /**
   * Update ordering category value
   * @param index: storage index item
   * @param value: updated value
   */
  const onOrderingCategoryChange = (index, value) => {
    const newStorageData = [...storageData]
    newStorageData[index].ordering_category.value = value
    setStorageData(newStorageData)
  }

  const onAddOrderingCategory = (index, value) => {
    const newStorageData = [...storageData]
    newStorageData[index].ordering_category.items.push(value)
    setStorageData(newStorageData)
  }

  /**
   * Set delete storage item
   * @param item
   */
  const onSetDeleteItem = (item) => {
    setDeleteItem(item)
  }

  /**
   * Delete storage
   */
  const onDeleteStorage = () => {
    const index = storageData.findIndex(item => item.id === deleteItem.id)
    const newStorageData = [...storageData]
    newStorageData.splice(index, 1)
    setStorageData(newStorageData)
    setDeleteItem(null)
  }

  return (
    <div className="dqm-storage-container" id="dqm-storage-container">
      <div className="w-50">
        <div className="mb-2 input-header">END OF DAY</div>
        <AWSMDropdown onChange={onEndOfDayChange} items={timeData} />
      </div>
      {storageData.map((item, index) =>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="section-header">{`STORAGE ${item.id}`}</div>
            <div className="dqm-storage-delete" onClick={() => onSetDeleteItem(item)}>Delete Storage</div>
          </div>
          {(deleteItem && deleteItem.id === item.id) && <div className="dqm-storage-confirm-delete d-flex justify-content-center align-items-center">
            <div className="m-4">Are you sure you want to delete this Storage</div>
            <button onClick={() => setDeleteItem(null)} className="btn btn-outline-danger m-2">Cancel</button>
            <button onClick={onDeleteStorage} className="btn btn-danger m-2">Delete</button>
          </div>}
          <div className="row">
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">PRODUCT CODE</div>
              <AWSMInput value={item.product_code} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">TANK CAPACITY</div>
              <AWSMInput value={item.tank_capacity} onChange={(value) => onTankCapacityChange(index, value)} />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">ACTIVE PRODUCT</div>
              <AWSMDropdown onChange={(value) => onActiveProductChange(index, value)} value={item.active_product}
                            items={ACTIVE_PRODUCTS} />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <DropdownInput title="ORDERING CATEGORY" value={item.ordering_category.value} items={item.ordering_category.items}
                             onChange={(value) => onOrderingCategoryChange(index, value)} onAddItem={(value) => onAddOrderingCategory(index, value)} />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">TERMINAL</div>
              <AWSMInput value={item.terminal} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">DISTANCE</div>
              <AWSMInput value={item.distance} disabled />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">DURATION</div>
              <AWSMInputNumber item={item} itemKey="duration" type="number" value={item.duration}
                               onChange={(value) => onDurationChange(index, value)} />
            </div>
            <div className="col col-12 col-sm-6 col-lg-3">
              <div className="input-header mb-2">SALE CATEGORY</div>
              <AWSMDropdown value={item.sale_category} items={SALES_CATEGORY} disabled />
            </div>
            <div className="col col-12">
              <div className="input-header mb-2">REMARKS</div>
              <AWSMInput className="p-3" placeholder="Write something here..." />
            </div>
          </div>
        </div>)}
      <div className="mt-4 dqm-storage-add" onClick={onAddStorage}>+ Add storage</div>
    </div>
  )
}

export default TabStorage