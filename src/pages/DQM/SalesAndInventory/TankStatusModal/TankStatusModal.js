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
import { XIcon } from "common/CustomizeTable/icons"
import CloseButton from "../../../../components/Common/CloseButton"
import { isScheduler } from "helpers/auth_helper"

const mockDataOfTankStatus = {
  date: "2020-02-06",
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
  const scheduler = isScheduler()
  const {
    modalTitle,
    open,
    handleClose,
    updateSalesAndInventoryTankStatusModal,
  } = props
  const [modalConfirm, setModalConfirm] = useState(false)
  const [unmodifiedStatus, setUnmodifiedStatus] = useState(true)
  const [data, setData] = useState(mockDataOfTankStatus.tableData)
  const [capacity, setCapacity] = useState(mockDataOfTankStatus.capacity)
  const handleUpdateButtonOnclick = () => {
    updateSalesAndInventoryTankStatusModal(data)
    setUnmodifiedStatus(true)
    if (handleClose) handleClose()
  }

  const handleOnchangeValueData = (value, index, fieldName) => {
    data[index][fieldName] = value
    setData([...data])
    setUnmodifiedStatus(false)
  }

  const handleCancelModalConfirm = () => {
    setModalConfirm(false)
  }

  const handleExitModalConfirm = () => {
    setModalConfirm(false)
    setUnmodifiedStatus(true)
    if (handleClose) handleClose()
  }

  const showExitConfirmation = () => {
    return !unmodifiedStatus ? (
      <ExitConfirmation
        onExit={handleExitModalConfirm}
        onCancel={handleCancelModalConfirm}
      />
    ) : (
      handleExitModalConfirm()
    )
  }

  return (
    <>
      <div className={`tank_status`}>
        <Modal isOpen={open} size={`lg`} className="tank-status-modal">
          <div className="variance-control-container">
            <ModalHeader
              close={<CloseButton handleClose={() => setModalConfirm(true)} />}
            >
              <h3>{modalTitle}</h3>
            </ModalHeader>
            <ModalBody className="variance-control-content position-relative">
              {modalConfirm && showExitConfirmation()}
              <div className="w-100">
                <div className="px-2">
                  <Table responsive className="tank-status-table">
                    <thead>
                      <tr>
                        <th className="item first-item header">
                          Station Tank Status
                        </th>
                        <th className="item header">Lower Value</th>
                        <th className="item header">Upper Value</th>
                        <th className="item last-item header">
                          Percentage (%)
                        </th>
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
                                  isEdit={!scheduler}
                                />
                              </td>
                              <td className="item">
                                <InputWithSuffix
                                  value={v?.upper_value}
                                  TextOnChangeValue={handleOnchangeValueData}
                                  index={i}
                                  fieldName={"upper_value"}
                                  isEdit={!scheduler}
                                />
                              </td>
                              <td className="item last-item">
                                <InputWithSuffix
                                  value={v?.percentage}
                                  TextOnChangeValue={handleOnchangeValueData}
                                  index={i}
                                  fieldName={"percentage"}
                                  isEdit={!scheduler}
                                />
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </Table>
                </div>
                <br />
                <div className="col-md-7 capacity">
                  <div className="capacity-title">
                    Absolute Tank Capacity (%)
                  </div>
                  <InputWithSuffix
                    value={capacity}
                    inputType={`baseInput`}
                    TextOnChangeValue={v => setCapacity(v)}
                    isEdit={!scheduler}
                    disable={scheduler}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-end mt-5 mb-3 tank-status-footer">
                  {!modalConfirm && !scheduler && (
                    <>
                      <button
                        className="btn btn-outline-primary px-4"
                        onClick={() => setModalConfirm(true)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary ml-4 px-4"
                        onClick={handleUpdateButtonOnclick}
                      >
                        Update
                      </button>
                    </>
                  )}
                </div>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  updateSalesAndInventoryTankStatusModal: data =>
    dispatch(updateSalesAndInventoryTankStatusModal(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TankStatusModal)
