import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import EditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../../assets/images/AWSM-Trash-Icon.svg"
import createDOMPurify from "dompurify"
import SLAModalDetail from "../EditModal/SLAModalDetail"
import { isScheduler } from "../../../../helpers/auth_helper"

import "./index.scss"

const tableMapping = {
  item: {
    label: "ITEM NO.",
    apiKey: "itemIdentifier",
    columnSize: 0.5,
  },
  description: {
    label: "Description",
    apiKey: "description",
    columnSize: 2,
  },
  kpi: {
    label: "KPI",
    apiKey: "kpi",
    columnSize: 2,
  },
  mitigation_plan: {
    label: "Mitigation Plan",
    apiKey: "mitigation_plan",
    columnSize: 1,
  },
  action_by: {
    label: "Action By",
    apiKey: "action_by",
    columnSize: 1,
  },
  module: {
    label: "Module",
    apiKey: "module",
    columnSize: 1,
  },
  remarks: {
    label: "Remarks",
    apiKey: "remarks",
    columnSize: 1,
  },
}

const TDActionsComponent = ({ item, index, onEdit, onDelete, disabled }) => {
  return (
    <td>
      <div className="d-flex sla-table-actions">
        <button disabled={disabled} onClick={() => onEdit(index, item)}>
          <ReactSVG className="mr-2" src={EditIcon} />
        </button>
        <button disabled={disabled} onClick={() => onDelete(index, item)}>
          <ReactSVG src={TrashIcon} />
        </button>
      </div>
    </td>
  )
}

const SLATable = ({ items, onDeleteSLADetail, scheduler, onUpdate }) => {
  const [deleteItem, setDeleteItem] = useState(null)
  const [modalDetail, setModalDetail] = useState({ isShow: false, data: [] })

  const handleCloseModalDetail = () => {
    setModalDetail({ ...modalDetail, isShow: false })
  }

  const onEdit = (index, item) => {
    setModalDetail({
      isShow: true,
      data: item,
    })
  }

  const onDelete = (index, item) => {
    setDeleteItem(item.id)
  }

  const columns = Object.keys(tableMapping)?.map(key => tableMapping[key])
  if (!isScheduler()) {
    columns.push({
      label: "Action",
      apiKey: null,
      columnSize: 0.6,
      TDComponent: TDActionsComponent,
      TDComponentProps: { onEdit, onDelete, disabled: scheduler },
    })
  }

  const totalColSizes = columns.reduce(
    (previousValue, currentValue) => previousValue + currentValue.columnSize || 1,
    0
  )

  const getColSize = col => {
    return `${(((col.columnSize || 1) / totalColSizes) * 100).toFixed(2)}%`
  }

  const OnDeleteSLAHandler = () => {
    setDeleteItem(null)
    onDeleteSLADetail(deleteItem)
  }

  return (
    <div className="sla-table">
      <table>
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th key={index} style={{ width: getColSize(col) }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => {
            return item.id !== deleteItem ? (
              <tr>
                {columns?.map(({ TDComponent, apiKey, TDComponentProps }) =>
                  TDComponent ? (
                    <TDComponent index={index} item={item} {...TDComponentProps} />
                  ) : (
                    <td
                      className="ck ck-content"
                      dangerouslySetInnerHTML={{
                        __html: createDOMPurify.sanitize(apiKey ? item[apiKey] || '' : ''),
                      }}
                    />
                  )
                )}
              </tr>
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex align-items-center justify-content-center sla-table-confirm-delete-item">
                    <div>Are you sure you want to delete this data from this table?</div>
                    <button className="btn btn-dan ml-3 mr-2" onClick={() => setDeleteItem(null)}>
                      Cancel
                    </button>
                    <button className="btn btn-danger" onClick={() => OnDeleteSLAHandler()}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <SLAModalDetail
        type={'update'}
        openModalDetail={modalDetail.isShow}
        data={modalDetail.data}
        handleCloseModal={handleCloseModalDetail}
        onUpdateSLAItem={onUpdate}
      />
    </div>
  )
}

export default SLATable
