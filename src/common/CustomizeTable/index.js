import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// Components
import AWSMCheckBox from "../CheckBox"
import { XIcon, AlertIcon, EllipsisIcon, RefreshDotIcon } from "./icons"
import CloseButton from "../../components/Common/CloseButton"
// Css
import "./customizeTable.scss"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
/**
 * Select item component
 * @param item
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
const ItemSelect = ({ item, onChange }) => {
  const onCheckChange = () => {
    onChange({
      ...item,
      checked: !item.checked,
    })
  }
  return (
    <div className="d-flex align-items-center">
      <AWSMCheckBox
        disabled={item.disabled}
        onChange={onCheckChange}
        checked={item.checked}
        color="primary"
      />
      <div className="">{item.label}</div>
    </div>
  )
}

/**
 * Drag and drop list component
 * @param items
 * @param onChange
 * @param onUpdateOne
 * @returns {JSX.Element}
 * @constructor
 */
const DragContainer = ({ items, onChange, onUpdateOne }) => {
  // a little function to help us with reordering the result
  const reOrder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const newItems = reOrder(
      items,
      result.source.index,
      result.destination.index
    )
    onChange(newItems)
  }

  const onRemoveItem = item => {
    onUpdateOne({
      ...item,
      checked: false,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) =>
              item.key !== "frozen" ? (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`drag-content ${
                        snapshot.isDragging ? "drag-content-dragging" : ""
                      }`}
                    >
                      <div className="d-flex">
                        <div className="drag-content-start-icon">
                          <EllipsisIcon />
                          <EllipsisIcon />
                        </div>
                        <div className="drag-content-label">{item.label}</div>
                      </div>
                      <div
                        className="drag-content-x-icon"
                        onClick={() => onRemoveItem(item)}
                      >
                        <XIcon />
                      </div>
                    </div>
                  )}
                </Draggable>
              ) : (
                ""
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

/**
 * Set cookie with name, value and expires
 * @param name
 * @param value
 * @param expires
 */
function setCookie(name, value, expires) {
  document.cookie = [`${name}=${value}`, `expires=${expires}`, "path=/"].join(
    " ;"
  )
}

/**
 * Get cookies by key
 * @param key
 * @returns {string|null}
 */
function getCookieByKey(key) {
  try {
    if (!document.cookie) {
      return null
    }
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(key))
      .split("=")[1]
  } catch (err) {
    return null
  }
}

/**
 * Modal for customize table header
 * @param open
 * @param onChange
 * @param closeDialog
 * @param tableName
 * @param initialMetric
 * @param availableMetric
 * @param metricArray
 * @param metricKey
 * @returns {JSX.Element}
 * @constructor
 */
const CustomizeTableModal = ({
  open,
  onChange,
  closeDialog,
  tableName,
  initialMetric = [],
  availableMetric = {},
  defaultMetric = [],
  metricArray = false,
  metricKey = "id",
}) => {
  // State
  const [initMetric, setInitMetric] = useState(
    getCookieByKey(tableName)
      ? JSON.parse(getCookieByKey(tableName))
      : initialMetric
  )
  let availableMetricTransform = []
  if (metricArray) {
    availableMetricTransform = availableMetric.map(item => ({
      ...item,
      id: item[metricKey],
      checked: initMetric.includes(item[metricKey]),
    }))
  } else {
    for (const key in availableMetric) {
      availableMetricTransform.push({
        ...availableMetric[key],
        id: key,
        checked: initMetric.includes(key),
      })
    }
  }

  const [itemToSelect, setItemToSelect] = useState(
    availableMetricTransform.sort((a, b) => b.checked - a.checked)
  )
  const [itemToDrag, setItemToDrag] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const newItemToDrag = []
    for (let i = 0; i < initMetric.length; i++) {
      const indexItem = itemToSelect.findIndex(
        item => item.id === initMetric[i]
      )
      if (indexItem >= 0) {
        newItemToDrag.push(itemToSelect[indexItem])
      }
    }
    setItemToDrag(newItemToDrag)
  }, [])
  // Function handler
  const onItemSelectChange = item => {
    // Remove item when number of selected item is less or equal 10 will set all selected item to disabled and display error message
    if (itemToDrag.length < 11 && !item.checked) {
      setItemToSelect(
        itemToSelect.map(item =>
          item.checked ? { ...item, disabled: true } : item
        )
      )
      return setError("Must not be less than 9 metrics")
    }

    // Update drag item list
    const newItemToDrag = [...itemToDrag].map(item => ({
      ...item,
      disabled: false,
    }))
    const dragIndex = newItemToDrag.findIndex(element => element.id === item.id)
    if (item.checked && dragIndex < 0) {
      newItemToDrag.push(item)
    } else if (!item.checked && dragIndex >= 0) {
      newItemToDrag.splice(dragIndex, 1)
    }
    setItemToDrag(newItemToDrag)

    // Update select item list
    const newItemToSelect = [...itemToSelect].map(item => ({
      ...item,
      disabled: false,
    }))
    const selectIndex = newItemToSelect.findIndex(
      element => element.id === item.id
    )
    if (selectIndex >= 0) {
      newItemToSelect[selectIndex] = item
    }
    setItemToSelect(newItemToSelect)
    setError("")
  }

  /**
   * Update current drag items
   * @param items
   */
  const onItemOderChange = items => {
    setItemToDrag(items)
  }

  /**
   * Save current value to default value then close modal
   */
  const onSave = () => {
    const itemKeys = itemToDrag.map(item => item.id)
    setCookie(tableName, JSON.stringify(itemKeys), "01 Dec 3000 12:00:00 UTC")
    setInitMetric(itemKeys)
    setItemToSelect(itemToSelect.sort((a, b) => b.checked - a.checked))
    if (onChange) {
      onChange(itemKeys)
    }
    if (closeDialog) {
      closeDialog()
    }
  }

  /**
   * On click exit or cancel
   */
  const onExit = () => {
    onRevertToInitial()
    setError("")
    if (closeDialog) {
      closeDialog()
    }
  }

  /**
   * Revert to default
   */
  const onRevertToDefault = () => {
    setItemToSelect(
      availableMetricTransform
        .map(item => ({
          ...item,
          checked: defaultMetric.includes(item.id),
        }))
        .sort((a, b) => b.checked - a.checked)
    )
    const newItemToDrag = []
    for (let i = 0; i < defaultMetric.length; i++) {
      const indexItem = itemToSelect.findIndex(
        item => item.id === defaultMetric[i]
      )
      if (indexItem >= 0) {
        newItemToDrag.push(itemToSelect[indexItem])
      }
    }
    setItemToDrag(newItemToDrag)
    setError("")
  }

  /**
   * Revert to initial
   */
  const onRevertToInitial = () => {
    setItemToSelect(
      availableMetricTransform.map(item => ({
        ...item,
        checked: initMetric.includes(item.id),
      }))
    )
    const newItemToDrag = []
    for (let i = 0; i < initMetric.length; i++) {
      const indexItem = itemToSelect.findIndex(
        item => item.id === initMetric[i]
      )
      if (indexItem >= 0) {
        newItemToDrag.push(itemToSelect[indexItem])
      }
    }
    setItemToDrag(newItemToDrag)
    setError("")
  }

  return (
    <div>
      <Modal isOpen={open} id="customize_popup">
        <ModalHeader close={<CloseButton handleClose={onExit} />}>
          <h3>Customise Column</h3>
        </ModalHeader>
        <ModalBody className="customize-table-container">
          <div className="customize-table-content">
            <div className="col-5">
              <h5>Available Metrics</h5>
              {itemToSelect.map(item =>
                item.key !== "frozen" ? (
                  <ItemSelect
                    key={item.id}
                    onChange={onItemSelectChange}
                    item={item}
                  />
                ) : (
                  ""
                )
              )}
            </div>
            <div className="col-7 ">
              <h5>Column Arrangement</h5>
              <DragContainer
                onUpdateOne={onItemSelectChange}
                items={itemToDrag}
                onChange={onItemOderChange}
              />
            </div>
          </div>
          <div className="customize-table-footer">
            <div className="customize-table-footer-error">
              {error && (
                <>
                  <AlertIcon />
                  <div>{error}</div>
                </>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
              <button
                onClick={onRevertToDefault}
                className="btn btn-outline-primary px-4 btn-size"
              >
                <div className="btn-pre-icon">
                  <RefreshDotIcon />
                  <div>Default</div>
                </div>
              </button>
              <div className="d-flex align-items-center">
                <button
                  onClick={onExit}
                  className="btn btn-outline-primary px-4 mr-2 btn-size"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="btn btn-primary px-4 btn-size"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CustomizeTableModal
