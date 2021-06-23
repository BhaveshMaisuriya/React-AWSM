import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import ExitConfirmation from "components/Common/ExitConfirmation"
import { XIcon } from "common/CustomizeTable/icons"
import { Button, Modal, ModalBody, Table } from "reactstrap"
import CustomCKEditor from "./CustomCKEditor"
import "./ModalDetail.scss"
import { updateSLAItem, createSLARecord } from "store/actions"
import SLARecordEditor from "./CustomCKEditor5"

export const SLAModalDetail = ({ ...props }) => {
  const { openModalDetail, handleCloseModal, onUpdateSLAItem, data, type, onCreateSLARecord  } = props
  const [modalConfirm, setModalConfirm] = useState(false)
  const [dataSubmitted,setDataSubmitted] = useState(null)

  const handleCancelModalConfirm = () => {
    setModalConfirm(false)
  }

  const handleExitModalConfirm = () => {
    setModalConfirm(false)
    setDataSubmitted(null)
    handleCloseModal()
  }

  const ValidateDataHandler = () =>{
    if(!dataSubmitted && type !== "add") return false
    else if(!dataSubmitted) return true
    else{
      let keys = Object.keys(dataSubmitted)
      for(let i = 0;i< keys.length;i++){
        if(!dataSubmitted[keys[i]] || dataSubmitted[keys[i]] == '&nbsp;'){
          return true
        }
      }
      return false
    }
  }

  const handleOnUpdateClick = () => {
    if(type == 'add'){
      onCreateSLARecord(dataSubmitted || {
        itemIdentifier:'',
        description:'',
        kpi:'',
        mitigation_plan:'',
        action_by:'',
        module:'',
        remarks:'',
      })
    }
    else{
      onUpdateSLAItem({
        itemId : data.id,
        recordValue:dataSubmitted || data
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
                      <th className="header hd_1">item no.</th>
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
                        {/* <CustomCKEditor data={data} /> */}
                        <SLARecordEditor onChange={(v)=>setDataSubmitted(v)} data={data}/>
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
                  <button
                  disabled={ValidateDataHandler()}
                  className="btn btn-primary ml-4 px-4"
                  onClick={handleOnUpdateClick}
                >
                  { type == "add" ? 'Add' : 'Update' }
                </button>
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

export default SLAModalDetail
