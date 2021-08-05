import React, { Fragment, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { connect } from "react-redux"
import { shipmentTableColumns } from "./tableMapping"

function OrderBankShipmentModal(props) {
  function toggle() {
    props.istoggle()
  }
  return (
    <Fragment>
      <Modal
        isOpen={props.open}
        toggle={toggle}
        id="auditLog-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={toggle}>
          <h3>Shipment Details: Vehicle No VBF 5559</h3>
        </ModalHeader>
        <ModalBody>
          <div className="top-shipment-details">
            <span>
              Terminal: <b>KVDT M808</b>
            </span>
            <span>
              Shipment No: <b>12345678</b>
            </span>
            <span>
              Planned Load Time: <b>09:00</b>
            </span>
          </div>
          <div className="rts-table-container scroll" id="scrollableDiv">
            <div className="container-orderbank" style={{ maxWidth: "100%" }}>
              <table className={`scrollable shipment-main`}>
                <thead>
                  <tr>
                    {shipmentTableColumns &&
                      shipmentTableColumns.map((item, index) => {
                        return <th className={`${index === 0 ? 'text-center' : ''}`}>{item.toUpperCase()}</th>
                      })}
                  </tr>
                </thead>
                <tbody>
                  {props.shipmentOrderBankTableData &&
                    props.shipmentOrderBankTableData.map(item => {
                      return (
                        <tr>
                          <td className="text-center">
                            <p>{item.no}</p>
                          </td>
                          <td>
                            <p>Cust ID: {item.station.id}</p>
                            <p>Cust Name: {item.station.name}</p>
                            <p>Planned Load Time: {item.station.load_time}</p>
                            <p>Loading Time: {item.station.loading_time}</p>
                            <p>Duration From Terminal: {item.station.duration}</p>
                            <p>ETA: {item.station.eta}</p>
                          </td>
                          <td>
                            {item.order1 !== null ? (
                              <Fragment>
                                <p>Product: {item.order1.product}</p>
                                <p>Volume: {item.order1.volume}</p>
                                <p>Station Category: {item.order1.station_cat}</p>
                                <p>DN No.: {item.order1.DN}</p>
                              </Fragment>
                            ) : (
                              <p>N / A</p>
                            )}
                          </td>
                          <td>
                            {item.order2 !== null ? (
                              <Fragment>
                                <p>Product: {item.order2.product}</p>
                                <p>Volume: {item.order2.volume}</p>
                                <p>Station Category: {item.order2.station_cat}</p>
                                <p>DN No.: {item.order2.DN}</p>
                              </Fragment>
                            ) : (
                              <p>N / A</p>
                            )}
                          </td>
                          <td>
                            {item.order3 !== null ? (
                              <Fragment>
                                <p>Product: {item.order3.product}</p>
                                <p>Volume: {item.order3.volume}</p>
                                <p>Station Category: {item.order3.station_cat}</p>
                                <p>DN No.: {item.order3.DN}</p>
                              </Fragment>
                            ) : (
                              <p>N / A</p>
                            )}
                          </td>
                          <td>
                            {item.order4 !== null ? (
                              <Fragment>
                                <p>Product: {item.order4.product}</p>
                                <p>Volume: {item.order4.volume}</p>
                                <p>Station Category: {item.order4.station_cat}</p>
                                <p>DN No.: {item.order4.DN}</p>
                              </Fragment>
                            ) : (
                              <p>N / A</p>
                            )}
                          </td>
                          <td>
                            {item.order5 !== null ? (
                              <Fragment>
                                <p>Product: {item.order5.product}</p>
                                <p>Volume: {item.order5.volume}</p>
                                <p>Station Category: {item.order5.station_cat}</p>
                                <p>DN No.: {item.order5.DN}</p>
                              </Fragment>
                            ) : (
                              <p>N / A</p>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  shipmentOrderBankTableData: orderBank.shipmentOrderBankTableData,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBankShipmentModal)