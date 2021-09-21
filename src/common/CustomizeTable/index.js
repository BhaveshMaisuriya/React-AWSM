import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// Components
import AWSMCheckBox from "../CheckBox"
import { XIcon, AlertIcon, EllipsisIcon, RefreshDotIcon } from "./icons"
import CloseButton from "../../components/Common/CloseButton"
// Css
import "./customizeTable.scss"
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Col,
  Row,
} from "reactstrap"
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
      <div className="">{item.label} {item.extraText? <i>{item.extraText}</i>: ""}</div>
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
                        <div className="drag-content-label">{item.label} {item.extraText? <i>{item.extraText}</i>: ""}</div>
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
 * @param defaultMetric
 * @param maxMetrics
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
  maxMetrics = null,
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

  const frozenCols = React.useMemo(() => {
    if (!availableMetric) return []
    return Object.keys(availableMetric).filter(
      metric => availableMetric[metric].key === "frozen"
    )
  }, [availableMetric])

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
    if (typeof maxMetrics === "number") {
      if (maxMetrics < defaultMetric.length) {
        return console.error(
          `maxMetrics(${maxMetrics}) is smaller than minMetrics(${defaultMetric.length})`
        )
      }
      if (itemToDrag.length >= maxMetrics && item.checked) {
        setError(
          `Must not be more than ${maxMetrics - frozenCols.length} metrics`
        )
      }
    }

    // Update drag item list
    const newItemToDrag = [...itemToDrag].map(item => ({
      ...item,
      disabled: false,
    }))
    const pathName = window.location.pathname
    const dragIndex = newItemToDrag.findIndex(element => element.id === item.id)
    if (item.checked && dragIndex < 0) {
      newItemToDrag.push(item)
    } else if (!item.checked && dragIndex >= 0) {
      newItemToDrag.splice(dragIndex, 1)
    }
    if (
      newItemToDrag.length >= defaultMetric.length &&
      newItemToDrag.length <= maxMetrics
    ) {
      setError("")
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
    // // Remove item when number of selected item is less or equal to defaultmetric will set all selected item to disabled and display error message
    if (itemToDrag.length <= defaultMetric.length && !item.checked) {
      setItemToSelect(
        newItemToSelect.map(item =>
          item.checked ? { ...item, disabled: true } : item
        )
      )
      if (pathName === "/sales-inventory")
        return setError(
          `Must not be less than ${defaultMetric.length - 2} metrics`
        )
      return setError(
        `Must not be less than ${defaultMetric.length - 1} metrics`
      )
    }
    if (typeof maxMetrics !== "number") {
      setError("")
    }
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
    if (error) {
      return
    }
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
   * On key down
   */
  const onKeyPress = e => {
    if (e.key === "Escape") onExit()
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
    <div onKeyDown={onKeyPress}>
      <Modal isOpen={open} id="customize_popup">
        <ModalHeader close={<CloseButton handleClose={onExit} />}>
          <div>Customise Column</div>
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
        </ModalBody>
        <ModalFooter className="customize-table-footer">
          <Row className="customize-table-footer-error">
            {error && (
              <>
                <AlertIcon />
                <Col>{error}</Col>
              </>
            )}
          </Row>
          <Row className="customize-table-footer-buttons">
            <Col className="default-button">
              <button
                onClick={onRevertToDefault}
                className="btn btn-outline-primary px-4 btn-size"
              >
                <div className="btn-pre-icon">
                  <RefreshDotIcon />
                  <div>Default</div>
                </div>
              </button>
            </Col>
            <Col className="cancel-save-buttons ">
              <button
                onClick={onExit}
                className="btn btn-outline-primary px-4 mr-2 btn-size"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="btn btn-primary px-4 btn-size"
                disabled={error}
              >
                Save
              </button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CustomizeTableModal
