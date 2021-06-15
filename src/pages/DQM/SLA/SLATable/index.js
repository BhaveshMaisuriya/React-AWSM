import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import EditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../../assets/images/AWSM-Trash-Icon.svg"
import createDOMPurify from 'dompurify'
import SLAModalDetail from "../EditModal/SLAModalDetail"

import "./index.scss"

const tableMapping = {
  item: {
    label: "ITEM NO.",
    apiKey: "item",
    columnSize: 1,
  },
  description: {
    label: "Description",
    apiKey: "description",
    columnSize: 2,
  },
  kpi: {
    label: "KPI",
    apiKey: "kpi",
    columnSize: 3,
  },
  mitigation_plan: {
    label: "Mitigation Plan",
    apiKey: "mitigation_plan",
    columnSize: 2,
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
    columnSize: 2,
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

const SLATable = ({ items, scheduler }) => {
  const [deleteItem, setDeleteItem] = useState(null)
  const [modalDetail, setModalDetail]= useState({isShow:false,data:[]})

  const handleCloseModalDetail = () =>{
    setModalDetail({...modalDetail,isShow:false})
  }

  const onEdit = (index, item) => {
    setModalDetail({
      isShow:true,
      data:item
    })
  }

  const onDelete = (index, item) => {
    setDeleteItem(index)
  }

  const columns = Object.keys(tableMapping).map(key => tableMapping[key])
  columns.push({
    label: "Actions",
    apiKey: null,
    columnSize: 1,
    TDComponent: TDActionsComponent,
    TDComponentProps: { onEdit, onDelete, disabled: scheduler},
  })

  const totalColSizes = columns.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.columnSize || 1,
    0
  )

  const getColSize = col => {
    return `${(((col.columnSize || 1) / totalColSizes) * 100).toFixed(2)}%`
  }

  return (
    <div className="sla-table">
      <table>
        <thead>
          {columns.map(col => (
            <th style={{ width: getColSize(col) }}>{col.label}</th>
          ))}
        </thead>
        <tbody>
          {items.map((item, index) => {
            return index !== deleteItem ? (
              <tr>
                {columns.map(({ TDComponent, apiKey, TDComponentProps }) =>
                  TDComponent ? (
                    <TDComponent
                      index={index}
                      item={item}
                      {...TDComponentProps}
                    />
                  ) : (
                    <td className="ck ck-content" dangerouslySetInnerHTML={{ __html: createDOMPurify.sanitize(apiKey ? item[apiKey] || "" : "") }}/>
                  )
                )}
              </tr>
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex align-items-center justify-content-center sla-table-confirm-delete-item">
                    <div>
                      Are you sure you want to delete this data from this table?
                    </div>
                    <button
                      className="btn btn-outline-danger ml-3 mr-2"
                      onClick={() => setDeleteItem(null)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <SLAModalDetail openModalDetail={modalDetail.isShow} data={modalDetail.data} handleCloseModal={handleCloseModalDetail}/>
    </div>
  )
}

export default SLATable
