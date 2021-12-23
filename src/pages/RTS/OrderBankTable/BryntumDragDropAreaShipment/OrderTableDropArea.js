import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import {CustomInput} from "reactstrap";
import CloseButton from "../../../../components/Common/CloseButton";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import selectAllIcon from "../../../../assets/images/AWSM-Select-all-Checkbox.svg";
import RedAlertIcon from "./../../../../assets/images/AWSM-Red-Alert.svg"
import './OrderTableDropArea.scss'
import ConfirmDNStatusModal from "../confirmDNStatusModal";
import {removeOrderFromShipment, removeShipmentFromEvent, getShipmentDetail} from "../../../../store/orderBank/actions";

const supportReorderShameShipment = (list, startIdx, endIdx) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIdx, 1)
  result.splice(endIdx, 0, removed)

  return result
}

const OrderTableDropArea = ({
                              showTableColumns,
                              ganttChartEvents,
                              resourceId,
                              removeOrderFromShipment,
                              removeShipmentFromEvent,
                              getShipmentDetail,
                              dropDataShipment,
                            }) => {

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [invalidSelectedShipment, setInvalidSelectedShipment] = useState(null)
  const [shipmentReadyToCancel, setShipmentReadyToCancel] = useState(null) // shipment ready to cancel if all orders in shipment are selected

  const [showCancelPopup, setShowCancelPopup] = useState(false)
  const [deleteShipmentList, setDeleteShipment] = useState(null)
  const [dropData, setDropData] = useState(dropDataShipment)

  useEffect(() => {
    // merge all orders from all events that belong to resource Id ( vehicle)
    // if (resourceId && Array.isArray(ganttChartEvents) && ganttChartEvents.length > 0) {
    //   let dropDataResult = []
    //   const matchedEvents = ganttChartEvents.filter(({resourceId: id}) => resourceId === id)
    //   if (matchedEvents && matchedEvents.length > 0) {
    //     for (let event of matchedEvents) {
    //       const {shipments} = event
    //       if (shipments && Array.isArray(shipments) && shipments.length > 0) {
    //         for (let shipment of shipments) {
    //           const shipmentObj = {...shipment}
    //           shipmentObj.event = event.id
    //           const {orders} = shipment
    //           if (orders && Array.isArray(orders) && orders.length > 0) {
    //             shipmentObj.orders = orders.map(item => {
    //               item.isChecked = false
    //               item.isOnRemove = false
    //               return item
    //             })
    //             dropDataResult.push(shipmentObj)
    //           }
    //         }
    //       }
    //     }
    //   }
    //   setDropData(dropDataResult)
    // }
    if (resourceId) {
      getShipmentDetail(resourceId)
      setDropData(dropDataShipment)
    }
  }, [resourceId])

  // Handle checkbox click
  const setSelectedShipmentDependOnOrders = (selectedShip) => {
    const selectedOrders = selectedShip.orders.filter(item => item.isChecked === true)
    setSelectedShipment((selectedOrders && selectedOrders.length > 0) ? selectedShip.id : null)
    setShipmentReadyToCancel(selectedOrders.length === selectedShip.orders.length ? selectedShip.id : null)
  }

  const handleCheckBoxChange = (order, shipmentId) => {
    if (selectedShipment && selectedShipment !== shipmentId) {
      setInvalidSelectedShipment(shipmentId)
      return
    }
    setInvalidSelectedShipment(null)
    const cloneDropData = [...dropData]
    const selectedShip = cloneDropData.find(item => item.id === shipmentId)
    const checkedItem = selectedShip.orders.flat().find(item => item.id === order.id)
    if (checkedItem) {
      checkedItem.isChecked = !checkedItem.isChecked
      setDropData(cloneDropData)
      setSelectedShipmentDependOnOrders(selectedShip)
    }
  }

  // Remove order from shipment
  const prepareRemoveOrderHandler = (order, shipmentId, onRemove = true) => {
    setInvalidSelectedShipment(null)
    const cloneDropData = [...dropData]
    const selectedShip = cloneDropData.find(item => item.id === shipmentId)
    const checkedItem = selectedShip.orders.flat().find(item => item.id === order.id)
    if (checkedItem) {
      checkedItem.isOnRemove = onRemove
      setDropData(cloneDropData)
    }
  }

  const onRemoveOrderHandler = (order, shipmentId, eventId) => {
    setSelectedShipment(null)
    if (removeOrderFromShipment) removeOrderFromShipment({orderId: order.id, shipmentId, resourceId, eventId})
  }

  // Remove shipment from event
  const onRemoveShipmentHandler = () => {
    const selectedShip = dropData.find(item => item.id === selectedShipment)
    setSelectedShipment(null)
    if (removeShipmentFromEvent && selectedShip) {
      removeShipmentFromEvent({shipmentId: selectedShip.id, eventId: selectedShip.event})
      setShowCancelPopup(false)
    }
    if (deleteShipmentList) {
      const shipmentToDelete = dropData.find(item => item.id === deleteShipmentList)
      removeShipmentFromEvent({shipmentId: shipmentToDelete.id, eventId: shipmentToDelete.event})
      setDeleteShipment(null)
    }
  }

  // Render check box option cell
  const renderOptionCell = (order, shipmentId, isSap = false) => {
    return (
      <td className="d-flex align-items-center justify-content-around">
        <DragIndicatorIcon
          style={{color: "#D9D9D9", transform: "translateX(5px)"}}
        />
        <CustomInput
          type="checkbox"
          id={order.id}
          checked={order.isChecked || isSap}
          disabled={isSap}
          onChange={() => handleCheckBoxChange(order, shipmentId)}
        />
      </td>
    )
  }

  // transform data to show on table
  const filterShowData = (shipment) => {
    const {orders} = shipment
    if (orders && orders.length > 0 && showTableColumns && showTableColumns.length > 0) {
      return orders.map(order => {
        const filteredItem = {id: order?.id}
        showTableColumns.forEach(({objKey}) => filteredItem[objKey] = order[objKey])
        filteredItem['isChecked'] = order['isChecked']
        filteredItem['isOnRemove'] = order['isOnRemove']
        return filteredItem
      })
    }

    return []
  }

  const renderBodyRow = (shipment) => {
    const orders = filterShowData(shipment)
    if (orders.length > 0) {
      return (orders.map((dataRow, index) => {
        if (dataRow.isOnRemove) {
          return (
            <tr>
              <td colSpan={showTableColumns.length + 2}>
                <div className='d-flex justify-content-center align-items-center'>
                  <p className='mb-0 mr-4'>Are you sure you want to remove and unschedule this order?</p>
                  <button className='mr-2 btn btn-outline-danger btn-sm'
                          onClick={() => prepareRemoveOrderHandler(dataRow, shipment.id, false)}>
                    Cancel
                  </button>
                  <button className='btn btn-danger btn-sm'
                          onClick={() => onRemoveOrderHandler(dataRow, shipment.id, shipment.event)}>
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          )
        }
        const dataCells = Object.keys(dataRow)
          .filter((key) => key !== "id" && key !== "isChecked" && key !== 'isOnRemove')
          .map((key) => {
            if (key === "priority") {
              return (
                <td key={key}>
                  {dataRow[key]
                    ?.map((value, index) => <span key={index} className={`circle ${value}`}>{value}</span>)
                  }
                </td>
              )
            }
            return <td key={key}>
              <div className=''>
                {dataRow[key]}
              </div>
            </td>
          })

        dataCells.push(<td className="text-right pr-4"><CloseButton
          handleClose={() => prepareRemoveOrderHandler(dataRow, shipment.id, true)}/></td>)
        const optionCell = shipment.type === "SAP" ? renderOptionCell(dataRow, shipment.id, true) : renderOptionCell(dataRow, shipment.id)
        dataCells.unshift(optionCell)

        return (
          <Draggable index={index} key={dataRow?.id} draggableId={`shipment-order-${dataRow?.id}`}
                     isDragDisabled={!dataRow.isChecked}>
            {
              (provided, {isDragging}) => {
                return (
                  <tr {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`text-left ${isDragging ? "override-dragging" : "table-row-shadow"} ${dataRow.isChecked ? "selected-row" : "bg-white"} ${shipment.type === "SAP" ? "red-outline" : "" }`}
                  >{dataCells}
                  </tr>
                )
              }
            }
          </Draggable>
        )
      }))
    }
    return null
  }

  //Table heading
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

  /*Handle drag item end*/
  const handleOnDragEnd = (result) => {
    const {destination, source} = result
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      // In the same shipment
      if (destination.index === source.index) return;
      const cloneDropData = [...dropData]
      const selectedShipIndex = cloneDropData.findIndex(item => item.id === selectedShipment)
      cloneDropData[selectedShipIndex].orders = supportReorderShameShipment(cloneDropData[selectedShipIndex].orders, source.index, destination.index)

      setDropData([...cloneDropData])
    } else {
      // Drag order to other shipment
      // deep clone arr
      const cloneDropData = JSON.parse(JSON.stringify(dropData))

      const fromShipment = cloneDropData.find(item => +item.id === +source.droppableId)
      const destinationShipment = cloneDropData.find(item => +item.id === +destination.droppableId)

      const [removed] = fromShipment.orders.splice(source.index, 1)
      // clear checked and reset selected
      removed.isChecked = false
      setSelectedShipment(null)
      setInvalidSelectedShipment(null)

      destinationShipment.orders.splice(destination.index, 0, {...removed})

      setDropData(cloneDropData)
    }
  }

  const renderTable = () => {
    return (
      <>
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
            {
              dropData.map((shipment, index) => {
                if (shipment.orders && shipment.orders.length > 0) {
                  return (
                    <Droppable droppableId={shipment.id?.toString()} key={shipment.id}>
                      {
                        ((provided) => {
                          return (
                            <>
                              {shipment.id === shipmentReadyToCancel && <tbody>
                              <tr className='clear-bg-tr'>
                                <td colSpan={showTableColumns.length + 2}
                                    style={{textAlign: 'right', color: 'red', height: 'auto'}}>
                                  <p className='clear-mb-alert'
                                     style={{cursor: 'pointer'}}
                                     onClick={() => setShowCancelPopup(true)}>
                                    Cancel shipment
                                  </p>
                                </td>
                              </tr>
                              </tbody>}
                              {shipment.type === "SAP" && <tbody>
                                <tr className='clear-bg-tr'>
                                  <td colSpan={showTableColumns.length + 2}
                                      style={{textAlign: 'right', color: 'red', height: 'auto'}}>
                                    <p className='clear-mb-alert'
                                      style={{cursor: 'pointer'}}
                                      onClick={() => setDeleteShipment(shipment.id)}
                                      >
                                      Delete shipment
                                    </p>
                                  </td>
                                </tr>
                                </tbody>
                              }
                              <tbody
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                              {renderBodyRow(shipment)}
                              {provided.placeholder}
                              </tbody>

                              {shipment.id === invalidSelectedShipment && <tbody>
                              <tr className='clear-bg-tr'>
                                <td colSpan="4" style={{textAlign: 'left', color: 'red', height: 'auto'}}>
                                  <p className='clear-mb-alert'>Cross shipment selection is not allowed</p>
                                </td>
                              </tr>
                              </tbody>}

                              {shipment.type === "SAP" && <tbody>
                              <tr className='clear-bg-tr'>
                                <td colSpan="4" style={{textAlign: 'left', color: 'red', height: 'auto'}}>
                                <p className='clear-mb-alert'><img style={{ paddingBottom:"4px", paddingRight:"3px" }} src={RedAlertIcon}/>SAP Alert found</p>
                                </td>
                              </tr>
                              </tbody>}
                              
                              {index !== dropData.length - 1 && <tbody>
                              <tr className='shipment-line'/>
                              </tbody>}
                            </>
                          )
                        })
                      }
                    </Droppable>
                  )
                }
              })
            }
          </DragDropContext>
          <ConfirmDNStatusModal
            isOpen={showCancelPopup}
            headerContent='Cancel Shipment Confirmation'
            bodyContent={['Are you sure you want to proceed with this shipment cancellation?', <br/> ,'All order under this shipment will be drop back to Unscheduled list in Order Bank']}
            styleColor='danger'
            onCancel={() => setShowCancelPopup(false)}
            onSend={() => onRemoveShipmentHandler()}
          />
          <ConfirmDNStatusModal
            isOpen={deleteShipmentList}
            headerContent='Delete Shipment Confirmation'
            bodyContent={["This action cannot be undone.", <br />,
            "Are you sure want to proceed with the shipment deletion?", <br />,
            "This shipment will be deleted in both RTS and SAP."]}
            styleColor='danger'
            onCancel={() => setDeleteShipment(false)}
            onSend={() => onRemoveShipmentHandler()}
          />
        </table>
      </>
    )
  }

  return (
    <div className={`drag-drop-area d-flex
            text-primary-green font-weight-bold b-text-align-center
            ${dropData && dropData.length > 0 && resourceId ? "align-items-start justify-content-start" :
      "dash-green-border align-items-center justify-content-center"}`}>
      {
        dropData && dropData.length > 0 && resourceId ? renderTable() : resourceId ? (
          <span className="text-uppercase">Drag & drop the order here <br/> from order bank</span>) : (
          <span className="text-uppercase">Please select a vehicle <br/> to assign shipment</span>)
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removeOrderFromShipment: payload => dispatch(removeOrderFromShipment(payload)),
  removeShipmentFromEvent: payload => dispatch(removeShipmentFromEvent(payload)),
  getShipmentDetail: payload => dispatch(getShipmentDetail(payload)),
})

const mapStateToProps = ({orderBank}) => ({
  ganttChartEvents: orderBank?.ganttChart?.event,
  resourceId: orderBank?.selectedVehicleShipment?.resourceId,
  dropDataShipment: orderBank?.shipmentDropData,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableDropArea)
