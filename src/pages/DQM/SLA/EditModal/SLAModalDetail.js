import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ExitConfirmation from "components/Common/ExitConfirmation"
import { XIcon } from "common/CustomizeTable/icons"
import { Button, Modal, ModalBody, Table } from "reactstrap"
import CustomCKEditor from "./CustomCKEditor"
import "./ModalDetail.scss"
import { updateSLAItem, createSLARecord } from "store/actions"

export const SLAModalDetail = ({ ...props }) => {
  const { openModalDetail, handleCloseModal, onUpdateSLAItem, data, type, onCreateSLARecord  } = props
  const [modalConfirm, setModalConfirm] = useState(false)

  const handleCancelModalConfirm = () => {
    setModalConfirm(false)
  }

  const handleExitModalConfirm = () => {
    setModalConfirm(false)
    handleCloseModal()
  }


  const handleOnUpdateClick = () => {
    
    // var data = CKEDITOR.instances['sla-detail'].getData()
    let instance = CKEDITOR.instances["sla-detail"].document
    let item = instance.getById("sla-td-1").$.innerHTML
    let description = instance.getById("sla-td-2").$.innerHTML
    let kpi = instance.getById("sla-td-3").$.innerHTML
    let mitigation_plan = instance.getById("sla-td-4").$.innerHTML
    let action_by = instance.getById("sla-td-5").$.innerHTML
    let module = instance.getById("sla-td-6").$.innerHTML
    let remarks = instance.getById("sla-td-7").$.innerHTML
    if(type == 'add'){
      onCreateSLARecord({
        item,
        description,
        kpi,
        mitigation_plan,
        action_by,
        module,
        remarks,
      })
    }
    else{
      onUpdateSLAItem({
        item,
        description,
        kpi,
        mitigation_plan,
        action_by,
        module,
        remarks,
      })
    }
    handleCloseModal()

  }

  return (
    <div className={`sla-modal-content`}>
      <Modal isOpen={openModalDetail} size={`lg`} className="modal-detail">
        <div className="variance-control-container">
          <div className="d-flex align-items-center justify-content-between px-4 pt-4 pb-2">
            <h3 className="variance-label">
              {type == "add" ? "Add Row" : "Edit detail"}
            </h3>
            <div className="d-flex align-items-center">
              <button
                className="variance-close-button"
                onClick={() => setModalConfirm(true)}
                style={{ width: 30 }}
              >
                <XIcon />
              </button>
            </div>
          </div>
          <ModalBody className="variance-control-content position-relative">
            {modalConfirm && (
              <ExitConfirmation
                onExit={handleExitModalConfirm}
                onCancel={handleCancelModalConfirm}
              />
            )}
            <div className="w-100">
              <div className="px-2">
                <Table className="sla-detail-table">
                  <thead>
                    <tr>
                      <th className="header hd_1">itemno.</th>
                      <th className="header hd_2">description</th>
                      <th className="header hd_3">kpi</th>
                      <th className="header hd_4">mitigation plan</th>
                      <th className="header hd_5">action by</th>
                      <th className="header hd_6">module</th>
                      <th className="header hd_7">remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="ck-content">
                      <td className="" colSpan={7}>
                        <CustomCKEditor data={data} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="d-flex align-items-center justify-content-end mt-5 mb-3 mr-2">
                <button
                  className="btn btn-outline-primary px-4"
                  onClick={() => setModalConfirm(true)}
                >
                  Cancel
                </button>
                {type == "add" ? (
                  <button
                    className="btn btn-primary ml-4 px-4"
                    onClick={handleOnUpdateClick}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="btn btn-primary ml-4 px-4"
                    onClick={handleOnUpdateClick}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </div>
  )
}

SLAModalDetail.propTypes = {
  openModalDetail: PropTypes.bool,
  type: PropTypes.string,
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onUpdateSLAItem: event => dispatch(updateSLAItem(event)),
  onCreateSLARecord: event => dispatch(createSLARecord(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SLAModalDetail)
