import React, { memo } from "react"
import "./index.scss"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd"
import { TableGroupEvent } from "./index"
import CloseButton from "components/Common/CloseButton"
/*
* @params currentDate
* @params selectedRow
* @params dropData // Redux prop
* */

// const testCurrentTableColumns = ["priority", "ship to", "name", "cloud", "trip", "delivery date", "product", "volume(l)"]
const testCurrentTableColumns = [
  {
    objKey: "priority",
    label: "priority"
  },
  {
    objKey: "ship_to",
    label: "ship to"
  },
  {
    objKey: "name",
    label: "name"
  },
  {
    objKey: "cloud",
    label: "cloud"
  },
  {
    objKey: "trip",
    label: "trip"
  },
  {
    objKey: "delivery_date",
    label: "delivery date"
  },
  {
    objKey: "product",
    label: "product"
  },
  {
    objKey: "volume",
    label: "volume(l)"
  }
]

const BryntumDragDropAreaShipment = ({ selectedRow, currentDate, dropData }) => {
  const renderDragDropBody = () => {
    if (dropData && selectedRow) { // if drop Data available , return directly Table
      return <OrderTableDropArea dropData={dropData} showTableColumns={testCurrentTableColumns} />
    }
    return selectedRow ?
      (<span>Drag & drop the oder here <br /> from order bank</span>) :
      (<span>Please select a vehicle <br /> to assign shipment</span>)
  }

  return (
    <div
      className="wrapper-bryntum-shipment-dragdrop-area border-bryntum-table
      rounded">
      <Row className={`${selectedRow ? "bg-primary-green-100" : ""} rounded h-100 
      justify-content-start align-items-start`}>
        <Col xs={12} className="font-weight-bold text-uppercase" style={{height:"18%"}}>
          <DragDropAreaHeader vehicle={selectedRow?.vehicle} currentDate={currentDate} />
        </Col>
        <Col xs={12} className="px-4" style={{height:"77%"}}>
          <div className={`drag-drop-area d-flex text-uppercase
            text-primary-green font-weight-bold text-center 
            ${dropData && selectedRow ? "align-items-start justify-content-start" : 
            "dash-green-border align-items-center justify-content-center"}`}>
            {renderDragDropBody()}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const DragDropAreaHeader = memo(({ vehicle, currentDate }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center
            p-3 border-black-100 drag-drop-header">
      <p className="mb-0">
        vehicle id: &nbsp;
        <span className="text-primary-green">
          {vehicle ? vehicle : " - "}
        </span>
      </p>
      <p className="mb-0 text-center">
        {currentDate ? currentDate : "Thursday, 11th FEB 2021"}
      </p>
      <p />
    </div>
  )
})

// if drag drop data available
const OrderTableDropArea = ({ dropData, showTableColumns }) => {

  const renderTableHeadings = () => {
    return showTableColumns &&
      showTableColumns.length > 0 ? showTableColumns.map(({ label }, index) => {
        return (
          <th key={index} className="text-left fw-600">
            {label}
          </th>
        )
      }) : null
  }

  const filterShowData = () => {
    return dropData && dropData.length > 0 &&
      showTableColumns && showTableColumns.length > 0 ? dropData.map((order) => {
        const filteredItem = { id: order?.id }
        showTableColumns.forEach(({ objKey }) => filteredItem[objKey] = order[objKey])
        return filteredItem
      }) : []
  }

  const onRemoveOrder = () => {

  }

  const renderBodyRow = () => {
    const showInTableData = filterShowData()
    return showInTableData.length > 0 ? (
      showInTableData.map((dataRow, index) => {
        const dataCells = Object.keys(dataRow)
          .filter((key) => key !== "id")
          .map((key) => {
            if (key === "priority") {
              return (
                <td key={key}>
                  {dataRow[key]
                    .map((value, index) => <span key={index}
                      className={`circle ${value}`}>{value}</span>)}
                </td>
              )
            }
            return <td key={key}>{dataRow[key]}</td>
          })
        dataCells.push(<td className="text-right pr-4"><CloseButton handleClose={onRemoveOrder} /></td>)
        const optionCell = <td className="d-flex align-items-center"><TableGroupEvent/></td>
        dataCells.unshift(optionCell)
        return (
          <Draggable index={index} key={dataRow?.id} draggableId={`shipment-order-${dataRow?.id}`}>
            {
              (provided,{isDragging}) => {
                return (
                  <tr {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                      className={`text-left ${isDragging? "" : "table-row-shadow"}`}
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

  return (
      <table className="w-100">
        <thead>
          <tr className="text-dark ">
            <th>
              <img src={selectAllIcon} className="header-select-icon" alt="icon" />
            </th>
            {renderTableHeadings()}
            <th></th>
          </tr>
        </thead>
        <DragDropContext>
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


const mapStateToProps = (state) => (
  {
    dropData: state.orderBank.shipmentOrderDropFromOrderBank
  }
)
export default connect(mapStateToProps, null)(BryntumDragDropAreaShipment)