import React, { useState } from "react"
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import InputWithSuffix from "../../../../components/Common/TankStatusModal/InputWithSuffix"
import ExitConfirmation from "../../../../components/Common/ExitConfirmation/index"
import "./TankStatusModal.scss"
import { updateSalesAndInventoryTankStatusModal } from "store/actions"

const mockDataOfTankStatus = {
  tableData: [
    {
      status: "LV1",
      lower_value: "3080",
      upper_value: "00000",
      percentage: false,
    },
    {
      status: "LV2",
      lower_value: "12000",
      upper_value: "00000",
      percentage: false,
    },
    {
      status: "Normal",
      lower_value: "56678",
      upper_value: false,
      percentage: false,
    },
    {
      status: "TC",
      lower_value: false,
      upper_value: false,
      percentage: "00000",
    },
  ],
  capacity: "100",
}

const TankStatusModal = props => {
  const { modalTitle, open, handleClose, updateSalesAndInventoryTankStatusModal } = props
  const [modalConfirm, setModalConfirm] = useState(false)
  const [data, setData] = useState(mockDataOfTankStatus.tableData)
  const [capacity, setCapacity] = useState(mockDataOfTankStatus.capacity)

  const handleUpdateButtonOnclick = () => {
    console.log("data", data)
    console.log("capacity", capacity)
    updateSalesAndInventoryTankStatusModal(data)
  }

  const handleOnchangeValueData = (value, index, fieldName) => {
    data[index][fieldName] = value
    setData([...data])
  }
  
  const handleCancelModalConfirm = () =>{
    setModalConfirm(false)
  }

  const handleExitModalConfirm = () =>{
      handleClose()
      setTimeout(()=>{
        setModalConfirm(false)
      },500)
  }


  return (
    <>
      <div className={`tank_status`}>
        <Modal
          isOpen={open}
          toggle={() => setModalConfirm(true)}
          centered={true}
          size={`lg`}
          className="tank_status_modal"
        >
          <ModalHeader toggle={() => setModalConfirm(true)}>{modalTitle}</ModalHeader>
          <ModalBody className="position-relative">
            { modalConfirm &&
            <ExitConfirmation
            onExit={handleExitModalConfirm}
            onCancel={handleCancelModalConfirm}
            />
}   
            <div>
              <Table responsive>
              <thead>
                <tr>
                  <th className="item first-item header">
                    Station Tank Status
                  </th>
                  <th className="item header">Lower Value</th>
                  <th className="item header">Upper Value</th>
                  <th className="item last-item header">Percentage (%)</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length &&
                  data.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td className="item first-item">{v?.status}</td>
                        <td className="item">
                          <InputWithSuffix
                            value={v?.lower_value}
                            TextOnChangeValue={handleOnchangeValueData}
                            index={i}
                            fieldName={"lower_value"}
                            isEdit={true}
                          />
                        </td>
                        <td className="item">
                          <InputWithSuffix
                            value={v?.upper_value}
                            TextOnChangeValue={handleOnchangeValueData}
                            index={i}
                            fieldName={"upper_value"}
                            isEdit={true}
                          />
                        </td>
                        <td className="item last-item">
                          <InputWithSuffix
                            value={v?.percentage}
                            TextOnChangeValue={handleOnchangeValueData}
                            index={i}
                            fieldName={"percentage"}
                            isEdit={true}
                          />
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
            </div>
            <br />
            <div
              style={{ paddingLeft: "1rem", color: "#000000" }}
              className="col-md-7"
            >
              <p style={{ textTransform: "uppercase" }}>
                Absolute Tank Capacity (%)
              </p>
              <InputWithSuffix
                value={capacity}
                border
                inputType={`baseInput`}
                TextOnChangeValue={v => setCapacity(v)}
                isEdit={true}
              />
            </div>
            <ModalFooter>
            <Button
              color="#fff"
              style={{ border: "1px solid #CBEFED", color: "#00A19C" }}
              onClick={() => setModalConfirm(true)}
            >
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleUpdateButtonOnclick}>
              Update
            </Button>
          </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  updateSalesAndInventoryTankStatusModal: data => dispatch(updateSalesAndInventoryTankStatusModal(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TankStatusModal)