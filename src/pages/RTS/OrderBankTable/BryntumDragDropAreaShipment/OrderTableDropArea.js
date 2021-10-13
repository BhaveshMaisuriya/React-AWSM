import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import {CustomInput} from "reactstrap";
import CloseButton from "../../../../components/Common/CloseButton";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import selectAllIcon from "../../../../assets/images/AWSM-Select-all-Checkbox.svg";
import './OrderTableDropArea.scss'

const supportReorder = (list, startIdx, endIdx) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIdx, 1)
  result.splice(endIdx, 0, removed)

  return result
}

const OrderTableDropArea = ({showTableColumns}) => {
  // resource Id is
  // the id of gantt chart table object in redux. that matched for resource Id in gantt chart events
  const ganttChartEvents = useSelector(state => state?.orderBank?.ganttChart?.event)
  const resourceId = useSelector(state => state?.orderBank?.selectedVehicleShipment?.resourceId)
  const [dropData, setDropData] = useState([])

  useEffect(() => {
    // merge all orders from all events that belong to resource Id ( vehicle)
    if (resourceId && Array.isArray(ganttChartEvents) && ganttChartEvents.length > 0) {
      const matchedEvents = ganttChartEvents.filter(({resourceId: id}) => resourceId === id)
      if (matchedEvents && matchedEvents.length > 0) {
        let allOrders = matchedEvents.reduce((initArr, event) => {
          const {shipments} = event
          if (!shipments) return initArr
          const shipmentOrders = shipments.reduce((shipmentsArr, {orders}) => [...shipmentsArr, ...orders], [])
          return [...initArr, ...shipmentOrders]
        }, [])
        allOrders = allOrders.map(item => {
          item.isChecked = false
          return item
        })
        setDropData(allOrders)
      }
    }
  }, [resourceId, ganttChartEvents])

  const renderTableHeadings = () => {
    return showTableColumns &&
    showTableColumns.length > 0 ? showTableColumns.map(({label}, index) => {
      return (
        <th key={index} className="text-left fw-600 text-uppercase">
          {label}
        </th>
      )
    }) : null
  }

  const filterShowData = () => {
    return dropData && dropData.length > 0 &&
    showTableColumns && showTableColumns.length > 0 ? dropData.map((order) => {
      const filteredItem = {id: order?.id}
      showTableColumns.forEach(({objKey}) => filteredItem[objKey] = order[objKey])
      filteredItem['isChecked'] = order['isChecked']
      return filteredItem
    }) : []
  }

  const onRemoveOrder = () => {

  }

  const handleCheckBoxChange = (rowData) => {
    const cloneDropData = [...dropData]
    const checkedItem = cloneDropData.find(item => item.id === rowData.id)
    if (checkedItem) {
      checkedItem.isChecked = !checkedItem.isChecked
      setDropData(cloneDropData)
    }
  }

  const renderOptionCell = (rowData) => {
    return (
      <td className="d-flex align-items-center justify-content-around">
        <DragIndicatorIcon
          style={{color: "#D9D9D9", transform: "translateX(5px)"}}
        />
        <CustomInput
          type="checkbox"
          id={rowData.id}
          checked={rowData.isChecked}
          onChange={() => handleCheckBoxChange(rowData)}
        />
      </td>
    )
  }

  const renderBodyRow = () => {
    const showInTableData = filterShowData()
    return showInTableData.length > 0 ? (
      showInTableData.map((dataRow, index) => {
        const dataCells = Object.keys(dataRow)
          .filter((key) => key !== "id" && key !== "isChecked")
          .map((key) => {
            if (key === "priority") {
              return (
                <td key={key}>
                  {dataRow[key]
                    .map((value, index) => <span key={index}
                                                 className={`circle ${value}`}>{value}</span>)
                  }
                </td>
              )
            }
            return <td key={key}>{dataRow[key]}</td>
          })

        dataCells.push(<td className="text-right pr-4"><CloseButton handleClose={onRemoveOrder}/></td>)
        const optionCell = renderOptionCell(dataRow)
        dataCells.unshift(optionCell)
        return (
          <Draggable index={index} key={dataRow?.id} draggableId={`shipment-order-${dataRow?.id}`} isDragDisabled={!dataRow.isChecked}>
            {
              (provided, {isDragging}) => {
                return (
                  <tr {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`text-left ${isDragging ? "override-dragging" : "table-row-shadow"} ${dataRow.isChecked ? "selected-row" : "bg-white"}`}
                  >{dataCells}
                  </tr>
                )
              }
            }
          </Draggable>
        )
      })
    ) : null
  }

  /*Handle drag item end*/
  const handleOnDragEnd = (result) => {
    debugger
    if (!result.destination || result.destination.index === result.source.index) return;
    const reOrderDropData = supportReorder(dropData, result.source.index, result.destination.index)

    setDropData([...reOrderDropData])
  }

  const renderTable = () => {
    return (
      <table className="w-100">
        <thead>
        <tr className="text-dark ">
          <th>
            <img src={selectAllIcon} className="header-select-icon" alt="icon"/>
          </th>
          {renderTableHeadings()}
          <th/>
        </tr>
        </thead>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="shipment-drop-area">
            {
              ((provided) => {
                return (
                  <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                  {renderBodyRow()}
                  {provided.placeholder}
                  </tbody>
                )
              })
            }
          </Droppable>
        </DragDropContext>
      </table>
    )
  }

  return (
    <div className={`drag-drop-area d-flex
            text-primary-green font-weight-bold b-text-align-center
            ${dropData && dropData.length > 0 && resourceId ? "align-items-start justify-content-start" :
      "dash-green-border align-items-center justify-content-center"}`}>
      {
        dropData && dropData.length > 0 && resourceId ? renderTable() : resourceId ? (
          <span className="text-uppercase">Drag & drop the oder here <br/> from order bank</span>) : (
          <span className="text-uppercase">Please select a vehicle <br/> to assign shipment</span>)
      }
    </div>
  )
}

export default OrderTableDropArea
