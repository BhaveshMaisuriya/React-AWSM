import React from 'react'
import '../index.scss'
import { Col, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import DragDropAreaHeader from './DragDropAreaHeader'
import OrderTableDropArea from './OrderTableDropArea'

// const testCurrentTableColumns = ["priority", "ship to", "name", "cloud", "trip", "delivery date", "product", "volume(l)"]
const testCurrentTableColumns = [
  {
    objKey: 'priority',
    label: 'priority',
  },
  {
    objKey: 'ship_to',
    label: 'ship to',
  },
  {
    objKey: 'name',
    label: 'name',
  },
  {
    objKey: 'cloud',
    label: 'cloud',
  },
  {
    objKey: 'trip',
    label: 'trip',
  },
  {
    objKey: 'delivery_date',
    label: 'delivery date',
  },
  {
    objKey: 'product',
    label: 'product',
  },
  {
    objKey: 'volume',
    label: 'volume(l)',
  },
]

const BryntumDragDropAreaShipment = ({ currentDate }) => {
  const selectedVehicle = useSelector(state => state?.orderBank?.selectedVehicleShipment)
  return (
    <div
      className="wrapper-bryntum-shipment-dragdrop-area border-bryntum-table rounded"
      style={{ height: 360, display: 'flex', flexFlow: 'column' }}
    >
      <div className="font-weight-bold text-uppercase w-100">
        <DragDropAreaHeader vehicle={selectedVehicle?.vehicle} currentDate={currentDate} />
      </div>

      <div
        className={`${
          selectedVehicle ? 'bg-primary-green-100' : ''
        } rounded h-100 justify-content-start align-items-start`}
        style={{ overflow: 'auto' }}
      >
        <OrderTableDropArea showTableColumns={testCurrentTableColumns} currentDate={currentDate} />
      </div>
    </div>
  )
}

export default BryntumDragDropAreaShipment
