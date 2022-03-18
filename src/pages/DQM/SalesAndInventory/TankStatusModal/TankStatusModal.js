import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap'
import InputWithSuffix from 'components/Common/TankStatusModal/InputWithSuffix'
import ExitConfirmation from 'components/Common/ExitConfirmation/index'
import './TankStatusModal.scss'
import {
  updateSalesAndInventoryTankStatus,
  getSalesAndInventoryTankStatus,
} from 'store/actions'
import CloseButton from 'components/Common/CloseButton'
import { isScheduler } from 'helpers/auth_helper'
import { format } from 'date-fns'

const strArray = ['LV1', 'LV2', 'Normal', 'TC']

const TankStatusModal = props => {
  const scheduler = isScheduler()
  const {
    modalTitle,
    open,
    handleClose,
    onGetSalesAndInventoryTankStatus,
    onUpdateSalesAndInventoryTankStatus,
    selectedDate,
    tankStatus,
  } = props
  const [modalConfirm, setModalConfirm] = useState(false)
  const [unmodifiedStatus, setUnmodifiedStatus] = useState(true)
  const [data, setData] = useState({ ...tankStatus })
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const isHistoricalDate = selectedDate !== currentDate
  const handleUpdateButtonOnclick = () => {
    onUpdateSalesAndInventoryTankStatus(data)
    setUnmodifiedStatus(true)
    if (handleClose) handleClose()
  }
  useEffect(async () => {
    if (open) {
      await onGetSalesAndInventoryTankStatus(selectedDate)
    }
  }, [open])

  useEffect(() => {
    if (tankStatus) {
      setData({ ...tankStatus })
    } else {
      setData(null)
    }
  }, [tankStatus])

  useEffect(() => {
    if (props.tsUpdateSuccess) {
      props.refreshMainTable()
    }
  }, [props.tsUpdateSuccess])

  const handleOnchangeValueData = (value, _, fieldName) => {
    data[fieldName] = value
    setData({ ...data })
    setUnmodifiedStatus(false)
  }

  const handleCancelModalConfirm = () => {
    setModalConfirm(false)
  }

  const handleExitModalConfirm = () => {
    setModalConfirm(false)
    setData(tankStatus)
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

  const updatedInformation = useMemo(
    () =>
      `Last Updated By: ${
        data.updated_by
          ? data?.updated_by?.toString()?.split('@')[0]
          : 'Unknown'
      }
    ${
      data.updated_at
        ? `on ${format(new Date(data?.updated_at), 'do LLL yyyy')}`
        : ''
    }`,
    [data?.updated_at, data?.updated_by]
  )

  return (
    <>
      <div className={`tank_status`}>
        <Modal isOpen={open} size={`lg`} className="tank-status-modal">
          <div className="variance-control-container">
            <ModalHeader
              close={<CloseButton handleClose={() => setModalConfirm(true)} />}
            >
              <span className="modal-title">{modalTitle}</span>
              <span className="last-updated-sub-title">
                {updatedInformation}
              </span>
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
                        strArray.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td className="item first-item">{v}</td>
                              <td className="item">
                                <InputWithSuffix
                                  value={data[`${v.toLowerCase()}_lower_value`]}
                                  TextOnChangeValue={handleOnchangeValueData}
                                  index={i}
                                  fieldName={`${v.toLowerCase()}_lower_value`}
                                  isEdit={!scheduler && !isHistoricalDate}
                                  isBorder={false}
                                />
                              </td>
                              <td className="item">
                                <InputWithSuffix
                                  value={data[`${v.toLowerCase()}_upper_value`]}
                                  TextOnChangeValue={handleOnchangeValueData}
                                  index={i}
                                  fieldName={`${v.toLowerCase()}_upper_value`}
                                  isEdit={!scheduler && !isHistoricalDate}
                                  isBorder={false}
                                />
                              </td>
                              <td className="item last-item">
                                <InputWithSuffix
                                  value={data[`${v.toLowerCase()}_percentage`]}
                                  TextOnChangeValue={handleOnchangeValueData}
                                  index={i}
                                  fieldName={`${v.toLowerCase()}_percentage`}
                                  isEdit={!scheduler && !isHistoricalDate}
                                  isBorder={false}
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
                    value={data?.absolute_tank_capacity}
                    fieldName={'absolute_tank_capacity'}
                    inputType={`baseInput`}
                    TextOnChangeValue={handleOnchangeValueData}
                    isEdit={!scheduler && !isHistoricalDate}
                    disable={scheduler}
                    isBorder={true}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-end mt-5 mb-4 tank-status-footer">
                  {!modalConfirm && !scheduler && !isHistoricalDate && (
                    <>
                      <button
                        className="btn btn-outline-primary px-4"
                        onClick={() => setModalConfirm(true)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary ml-2 px-4"
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

const mapStateToProps = saleAndInventory => ({
  tankStatus: saleAndInventory.saleAndInventory.tankStatusData,
  tsUpdateSuccess: saleAndInventory.saleAndInventory.tsUpdateSuccess,
})

const mapDispatchToProps = dispatch => ({
  onGetSalesAndInventoryTankStatus: date =>
    dispatch(getSalesAndInventoryTankStatus(date)),
  onUpdateSalesAndInventoryTankStatus: data =>
    dispatch(updateSalesAndInventoryTankStatus(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TankStatusModal)
