import React from 'react'
import createDOMPurify from 'dompurify'

const tableMapping = {
  item: {
    label: 'ITEM NO.',
    apiKey: 'itemIdentifier',
    columnSize: 0.5,
  },
  description: {
    label: 'Description',
    apiKey: 'description',
    columnSize: 2,
  },
  kpi: {
    label: 'KPI',
    apiKey: 'kpi',
    columnSize: 2,
  },
  mitigation_plan: {
    label: 'Mitigation Plan',
    apiKey: 'mitigation_plan',
    columnSize: 1,
  },
  action_by: {
    label: 'Action By',
    apiKey: 'action_by',
    columnSize: 1,
  },
  module: {
    label: 'Module',
    apiKey: 'module',
    columnSize: 1,
  },
  remarks: {
    label: 'Remarks',
    apiKey: 'remarks',
    columnSize: 1,
  },
}

const PdfSLATable = ({ items }) => {
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
          {items.map(item => {
            return (
              <tr>
                {columns.map(({ TDComponent, apiKey, TDComponentProps }) => (
                  <td
                    className="ck ck-content"
                    dangerouslySetInnerHTML={{
                      __html: createDOMPurify.sanitize(
                        apiKey ? item[apiKey] || '' : ''
                      ),
                    }}
                  />
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PdfSLATable
