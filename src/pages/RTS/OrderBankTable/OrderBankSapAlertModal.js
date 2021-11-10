import React, { Fragment, useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import { connect } from "react-redux"
import ConfirmationPopup from "../../../components/Common/DeleteConfirmationPopup"
import RedAlertIcon from "./../../../assets/images/AWSM-Red-Alert.svg"
import CloseButton from "../../../components/Common/CloseButton"
import { getShipmentOfOderBankGanttChart } from "../../../store/actions"
import { shipmentTableColumns } from "./tableMapping"

const OrderbankSapAlertModal = ({ istoggle, open, shipmentOrderBankTableData, getShipmentOfOderBankGanttChart, shipmentClicked, onSend}) => {
  const [showDeleteModal, setDeleteModal] = useState(false)
  const toggleDeleteModal = () => setDeleteModal(!showDeleteModal)

  useEffect(()=>{
    if(open)getShipmentOfOderBankGanttChart()
  },[open])

  const orderTemplate = (data) => {
    return <td>
      {data !== null ? (
        <p>Product: {data.product}</p>
      ) : (
        <p>N / A</p>
      )}
    </td>
  }
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={istoggle}
        className="modal-lg"
      >
        <ModalHeader close={<CloseButton handleClose={istoggle} />}>
          <img style={{ paddingBottom:"4px", paddingRight:"3px" }} src={RedAlertIcon}/><h3>{`SAP Alert: Vehicle No ${shipmentClicked}`}</h3>
        </ModalHeader>
        <ModalBody>
          <p style={{ marginBottom: "0px"}}> Looks like somneone has created a shipment via SAP, further details are as following: </p>
          <div className="rts-table-container">
            <div className="container-orderbank">
              <table className={`shipment-main`}>
                <thead>
                  <tr>
                    {shipmentTableColumns.map((item, index) => {
                        return <th style={index === 0 ? {textAlign: "center"} : {}}>{item.toUpperCase()}</th>
                      })}
                  </tr>
                </thead>
                <tbody>
                  {shipmentOrderBankTableData &&
                    shipmentOrderBankTableData.map(item => {
                      return (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            <p>{item.no}</p>
                          </td>
                          <td>
                            <p>Cust ID: {item.station.id}</p>
                            <p>Cust Name: {item.station.name}</p>
                          </td>
                            {orderTemplate(item.order1)}
                            {orderTemplate(item.order2)}
                            {orderTemplate(item.order3)}
                            {orderTemplate(item.order4)}
                            {orderTemplate(item.order5)}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginBottom: "0px", marginTop: "10px"}}>You are recommending to delete this shipment, do you want to delete this shipment in SAP?</p>
        </ModalBody>
        {true ? (
          <ModalFooter>
            <button
              className="btn-sec"
              onClick={istoggle}
            >
              Cancel
            </button>
            <Button onClick={setDeleteModal} color="primary">
              Delete
            </Button>
          </ModalFooter>
        ) : null}
      </Modal>
      {showDeleteModal && <ConfirmationPopup open={showDeleteModal} istoggle={toggleDeleteModal} deleteFunction={onSend}/>}
    </Fragment>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  shipmentOrderBankTableData: orderBank.shipmentOrderBankTableData,
})

const mapDispatchToProps = dispatch => ({
  getShipmentOfOderBankGanttChart: (params) => dispatch(getShipmentOfOderBankGanttChart(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderbankSapAlertModal)