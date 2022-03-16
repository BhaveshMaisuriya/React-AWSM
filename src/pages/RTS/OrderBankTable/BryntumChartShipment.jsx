import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { createPopper } from '@popperjs/core'
import { ganttChartTableMapping } from './tableMapping'
import { BryntumGrid } from '@bryntum/schedulerpro-react'
import {
  getShipmentOfOderBankGanttChart,
  processPaymentInGanttChart,
  selectVehicleShipment,
} from 'store/actions'
import { Droppable } from 'react-beautiful-dnd'
import BryntumDragDropAreaShipment from './BryntumDragDropAreaShipment/BryntumDragDropAreaShipment'
import OrderBankRoadTankerModal from './OrderBankRoadTankerModal'
import ChartColumnFilter from './ChartColumnFilter'
import ShiftPopover from './ShiftPopover'
import InfiniteScroll from 'react-infinite-scroll-component'

function BryntumChartShipment(props) {
  const {
    bryntumCurrentColumns,
    onSelectVehicle,
    onFilterChange,
    dateConfig,
    terminal,
    handleResetAll,
  } = props
  const tableData = useRef([])
  const gridRef = useRef()
  const colsRef = useRef(bryntumCurrentColumns)
  const [roadTankerModalShow, setRoadTankerModal] = useState(false)
  const [selectedVehicleID, setSelectedVehicleID] = useState(null)
  const firstRender = useRef(true)
  const [filterList, setFilterList] = useState([])
  const [bryntumTable, setBryntumTable] = useState({
    page: 0,
    filterCondition: [],
    sortDirection: 'asc',
    sortField: 'vehicle',
  })

  useEffect(() => onFilterChange(bryntumTable), [bryntumTable])

  useEffect(
    () => setBryntumTable({ ...bryntumTable, page: 0, filterCondition: [] }),
    [dateConfig, terminal]
  )

  const refreshGanttChartTable = () => {
    props.clearGanttData()

    setTimeout(() => {
      setBryntumTable({ ...bryntumTable })
    }, 1000)
  }

  const updateResourceRecords = (updateData, preventClear = false) => {
    const scheduler = gridRef.current?.instance
    if (scheduler) {
      if (preventClear) {
        scheduler.data = updateData
      } else {
        updateData.forEach(e => {
          scheduler?.store?.add(e)
        })
      }
      tableData.current = updateData
    }
  }

  const chartConfig = {
    columns: [],
    autoHeight: true,
    fullLastRow: false,
    autoLoad: true,
    columnLine: true,
    autoSync: true,
    autoCommit: true,
    rowHeight: 30,
    barMargin: 0,
    resourceMargin: 0,
    listeners: {
      cellClick(e) {
        // click row to select Vehicle shipment
        const { record } = e
        if (record?.data?.vehicle && record?.data?.id) {
          const { id: resourceId, vehicle } = record.data
          onSelectVehicle({ resourceId, vehicle })
        }
      },
    },
    store: {
      listeners: {
        sort(e) {
          const { ascending, field } = e.sorters[0]
          const opt = {
            sortDirection: ascending ? 'asc' : 'desc',
            sortField: field,
          }

          setBryntumTable(state => {
            if (
              opt.sortField === state.sortField &&
              opt.sortDirection === state.sortDirection
            )
              return state

            return { ...state, ...opt, page: 0 }
          })
        },
      },
    },
  }

  function showRoadTanker(event) {
    setSelectedVehicleID(event.target.innerText)
    toggleRoadTanker()
  }

  function toggleRoadTanker() {
    setRoadTankerModal(prevRoadTankerModalShow => !prevRoadTankerModalShow)
  }

  function onStatusChange(recordId, value) {
    const currentTableData = tableData.current
    const recordIndex = currentTableData.findIndex(e => e.id === recordId)
    if (recordIndex >= 0) {
      currentTableData[recordIndex] = {
        ...currentTableData[recordIndex],
        status: value,
      }
    }
    updateResourceRecords([...currentTableData], true)
  }

  function generateColumnsObj(tableMap) {
    const text =
      ganttChartTableMapping?.[tableMap]?.label_short ??
      ganttChartTableMapping?.[tableMap]?.label
    return {
      text,
      field: tableMap,
      width: text.toLowerCase() === 'vehicle' ? '130px' : '100px',
      editor: null,
      renderer: ({ value, column, record }) => {
        switch (column.field) {
          case 'vehicle': {
            return (
              <div className="chart-vehicle-cell">
                <div
                  className="value"
                  onClick={showRoadTanker}
                  style={{ cursor: 'pointer' }}
                >
                  {value}
                </div>
                {record.pump_type && (
                  <div className="suffix">{record.pump_type}</div>
                )}
              </div>
            )
          }

          case 'status': {
            return (
              <div className="chart-status-cell">
                <ShiftPopover
                  record={record}
                  onChange={onStatusChange}
                  type="status"
                />
              </div>
            )
          }
        }
        return <>{value}</>
      },
      headerRenderer: ({ column }) => {
        return `<div class="d-flex align-items-center chart-header" id="chart-column-${column.data.field}">
                  <div>${column.data.text}</div>
                  <button id="chart-column-${column.data.field}-button">
                    <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="AWSM-Calendar" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="TF-Icon---Dropdown" transform="translate(1.000000, 3.000000)" fill="currentColor">
                                <polygon id="Dropdown-Icon-Copy-2" points="6 6 11 11 16 6"></polygon>
                            </g>
                        </g>
                    </svg>
                  </button>
                </div>`
      },
    }
  }

  for (const tableMap of Object.keys(colsRef.current)) {
    chartConfig.columns.push(generateColumnsObj(tableMap))
  }

  useEffect(() => {
    setFilterList(
      Object.keys(bryntumCurrentColumns).map(e => ({
        key: e,
        type: ganttChartTableMapping[e]?.type,
      }))
    )

    if (gridRef.current && !firstRender.current) {
      const { instance: scheduler } = gridRef.current
      for (const col of Object.keys(ganttChartTableMapping)) {
        if (scheduler.columns.get(col)) {
          scheduler.columns.get(col).remove()
        }
      }
      for (const newCol of Object.keys(bryntumCurrentColumns)) {
        scheduler.columns.add(generateColumnsObj(newCol))
      }
    }

    if (bryntumCurrentColumns) {
      Object.keys(bryntumCurrentColumns).forEach(e => {
        const el = document.getElementById(`chart-column-${e}-button`)
        if (el) {
          el.addEventListener('click', event => {
            event.stopPropagation()
            event.preventDefault()
            const tooltip = document.getElementById(`chart-tooltip-${e}`)
            createPopper(el, tooltip, {
              placement: 'bottom',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 20],
                  },
                },
              ],
            })
            tooltip.classList.toggle('hide')
            Object.keys(bryntumCurrentColumns).forEach(f => {
              if (f !== e) {
                const hideEl = document.getElementById(`chart-tooltip-${f}`)
                hideEl.classList.add('hide')
              }
            })
          })
        }
      })
    }
    firstRender.current = false
  }, [bryntumCurrentColumns])

  const hideFilterElement = dataKey => {
    const $el = document.getElementById(`chart-tooltip-${dataKey}`)
    if ($el) {
      $el.classList.add('hide')
    }
  }

  const onApplyFilter = (data, dataKey) => {
    const index = bryntumTable.filterCondition.findIndex(e => e.key === dataKey)
    const newFilterCondition = [...bryntumTable.filterCondition]
    if (index >= 0) {
      newFilterCondition[index] = { ...newFilterCondition[index], data: data }
    } else {
      newFilterCondition.push({ data, key: dataKey })
    }

    setBryntumTable(state => ({
      ...state,
      filterCondition: newFilterCondition,
      page: 0,
    }))

    hideFilterElement(dataKey)
  }

  const onResetFilter = dataKey => {
    const index = bryntumTable.filterCondition.findIndex(e => e.key === dataKey)
    if (index >= 0) {
      const newFilterCondition = [...bryntumTable.filterCondition]
      newFilterCondition.splice(index, 1)

      setBryntumTable(state => ({
        ...state,
        filterCondition: newFilterCondition,
        page: 0,
      }))
    }
    hideFilterElement(dataKey)
  }

  return (
    <div className="rts-table-container" style={{ overflow: 'unset' }}>
      <div className="container-orderbank gant-chart-table row">
        <div className="col-lg-5 col-md-6 col-sm-12 pr-0">
          <InfiniteScroll
            next={() =>
              setBryntumTable(state => ({ ...state, page: state.page + 1 }))
            }
            hasMore={
              props.ganttChartTableData.length < props.totalRow_ganttChart
            }
            loader={
              <h5 className={props.totalRow_ganttChart > 10 ? '' : 'd-none'}>
                Loading...
              </h5>
            }
            dataLength={props.ganttChartTableData.length}
            height={360}
          >
            <Droppable droppableId="shipment-chart">
              {(provided, snapshot) => {
                return (
                  <div
                    className="rts-gantt-chart border-0"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {snapshot.isDraggingOver && <div className="on-dragging" />}
                    <div className="rounded wrapper-bryntum-shipment-grid border-bryntum-table">
                      <BryntumGrid
                        {...chartConfig}
                        data={props.ganttChartTableData}
                        ref={gridRef}
                      />
                    </div>
                  </div>
                )
              }}
            </Droppable>
          </InfiniteScroll>
        </div>
        <div className="col-lg-7 col-md-6 col-sm-12">
          <BryntumDragDropAreaShipment currentDate={dateConfig?.date_from} />
        </div>
        {props.ganttChartTableFilter &&
          filterList.map(e => (
            <ChartColumnFilter
              key={e.key}
              isGantt={false}
              filterKey={e.key}
              filterData={props.ganttChartTableFilter[e.key] ?? []}
              type={e.type}
              onApply={onApplyFilter}
              onReset={onResetFilter}
              onResetAll={handleResetAll}
            />
          ))}
      </div>
      <OrderBankRoadTankerModal
        isOpen={roadTankerModalShow}
        toggle={toggleRoadTanker}
        selectedVehicleID={selectedVehicleID}
        region={props.region}
        terminal={props.terminal}
        shiftDate={props.dateConfig.date_from}
        refreshTable={refreshGanttChartTable}
      />
    </div>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  ganttChartTableData: orderBank.ganttChartTableData,
  totalRow_ganttChart: orderBank.totalRow_ganttChart,
  ganttChartTableFilter: orderBank.ganttChartTableFilter,
})

const mapDispatchToProps = dispatch => {
  return {
    processPaymentInGanttChart: params =>
      dispatch(processPaymentInGanttChart(params)),
    getShipmentOfOderBankGanttChart: params =>
      dispatch(getShipmentOfOderBankGanttChart(params)),
    onSelectVehicle: params => dispatch(selectVehicleShipment(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BryntumChartShipment)
