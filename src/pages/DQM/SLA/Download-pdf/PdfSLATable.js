import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import EditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../../assets/images/AWSM-Trash-Icon.svg"
import createDOMPurify from "dompurify"


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

const PdfSLATable = ({ items, onDeleteSLADetail, scheduler, onUpdate }) => {
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

  const columns = Object.keys(tableMapping).map(key => tableMapping[key])

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
              return(<tr>
                {columns.map(({ TDComponent, apiKey, TDComponentProps }) =>(
                    <td
                      className="ck ck-content"
                      dangerouslySetInnerHTML={{
                        __html: createDOMPurify.sanitize(
                          apiKey ? item[apiKey] || "" : ""
                        ),
                      }}
                    />
                  )
                )}
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PdfSLATable