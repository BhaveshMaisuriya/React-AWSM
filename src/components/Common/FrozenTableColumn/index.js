import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filter from '../FilterDropdown'
import { Link } from 'react-router-dom'
import './style.scss'
import { isNull, isUndefined } from 'lodash'
import { Badge } from 'reactstrap'
import OverrideIcon from 'assets/images/AWSM-success-alert.svg'
import { ReactSVG } from 'react-svg'
import { removeKeywords } from 'pages/DQM/Common/helper'
import NoDataIcon from 'assets/images/AWSM-No-Data-Available.svg'
import { format } from 'date-fns'

class FixedCoulmnTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'ship_to_party',
      tableDatas: this.props.tableData,
      fixedHeaders: this.props.headers.slice(0, this.props.frozen),
      regularHeaders: this.props.headers.slice(this.props.frozen, this.props.headers.length),
    }
  }

  componentDidUpdate(prevProps) {
    const { tableData, headers } = this.props
    if (tableData !== prevProps.tableData) {
      this.setState({ tableDatas: tableData })
    }
    if (headers !== prevProps.headers) {
      const fixedHeaders = headers.slice(0, this.props.frozen)
      const regularHeaders = headers.slice(this.props.frozen, headers.length)
      this.setState({ fixedHeaders, regularHeaders })
    }
  }

  createSortHandler = property => event => {
    const { headerSortHandler } = this.props
    const orderBy = property
    let order = 'asc'

    if (this.state.orderBy === property && this.state.order === 'asc') {
      order = 'desc'
    }
    this.setState({ order, orderBy })
    headerSortHandler(order, orderBy)
  }

  handleClickApply = (checkedFilter, dataKey) => {
    const tempObj = {}
    tempObj[dataKey] = checkedFilter
    this.props.filterApplyHandler(tempObj, 'insert')
  }

  handleClickReset = dataKey => {
    this.props.filterApplyHandler(dataKey, 'remove')
  }

  addTd = arr => {
    const { config, filterData } = this.props
    if (!arr) return null
    return arr.map((e, index) => (
      <td key={index}>
        <div className={'d-flex align-items-center table_header_fit_text'}>
          <span onClick={this.createSortHandler(e)} className="header_text">
            {config[e] && config[e].label}
          </span>
          <Filter
            dataFilter={filterData}
            dataKey={e}
            handleClickApply={this.handleClickApply}
            handleClickReset={this.handleClickReset}
          />
        </div>
      </td>
    ))
  }
  renderFrozenTd = (arr, parentIndex) => {
    const sliceArr = this.props.headers.slice(0, this.state.fixedHeaders.length)
    return this.getTdType(sliceArr, arr, parentIndex)
  }
  renderFrozenTr = arr => {
    if (!arr) return null
    return typeof arr === 'string' ? (
      <tr>
        <td className="h-145"></td>
      </tr>
    ) : (
      arr &&
        arr.map((e, index) => {
          return <tr key={index}>{this.renderFrozenTd(e, index)}</tr>
        })
    )
  }
  renderRegularTd = arr => {
    const sliceArr = this.props.headers.slice(this.state.fixedHeaders.length, arr.length)
    return this.getTdType(sliceArr, arr)
  }

  renderRegular = arr => {
    if (!arr) return null
    return typeof arr === 'string' ? (
      <tr>
        <td colSpan="0" className="no-data-svg">
          <ReactSVG src={NoDataIcon} />
        </td>
      </tr>
    ) : (
      arr.map((e, index) => {
        return <tr key={index}>{this.renderRegularTd(e)}</tr>
      })
    )
  }

  AddConditionalForActionColumn = (salesValue, inventoryValue, data) => {
    const { overrideActionColumn } = this.props
    let result = ''
    if (
      Math.abs(data.sales_variance) > salesValue?.variance_value ||
      Math.abs(data.inventory_variance) > inventoryValue?.variance_value ||
      Math.abs(data.sales_variance_percentage) > salesValue?.variance_percentage
      //-71 > 1000  || 0 > 3000  || -25.36 > 30   
    ) {
      result = (
        <div className="cursor-pointer" onClick={() => overrideActionColumn(data)}>
          {data?.override_status === 'Override' ? (
            <ReactSVG className="d-inline-block mr-2" src={OverrideIcon} />
          ) : (
            <span className="accurate d-inline-block mr-2" />
          )}
          <span
            className={`d-inline-block override-text ${
              data?.override_status === 'Override' ? 'override-text-green' : ''
            }`}
          >
            Override
          </span>
        </div>
      )
    } else {
      result = (
        <>
        {data?.override_status === 'Override' ? (
            <ReactSVG className="d-inline-block mr-2" src={OverrideIcon} />
          ) : (
            <span className="accurate d-inline-block mr-2" />
          )}
          <span className={`${data?.override_status === 'Accurate' ? 'accurate-text' : 'override-text' }`}>{data?.override_status === 'Override' ? 'Accurate' : 'Override'}</span>
        </>
      )
    }
    return <div className="action-status">{result}</div>
  }

  validateCellValue = (cellValue, config) => {
    let value = ''
    if (isUndefined(cellValue) || isNull(cellValue)) {
      value = '-'
    } else if (config && config.type === 'date') {
      value = cellValue
    } else {
      value = removeKeywords(cellValue)
    }
    return value
  }

  getTdType = (sliceArr, arr, parentIndex = 0) => {
    const pathName = window.location.pathname
    const { config, modalPop, varianceControlData } = this.props
    return sliceArr.map((e, index) => {
      let value = this.validateCellValue(arr[e], config[e])
      switch (config[e] && config[e].type) {
        case 'badge':
          return (
            <td key={index}>
              <Badge className="font-weight-semibold" color={config[e].getBadgeColor(arr[e])} pill>
                {value}
              </Badge>
            </td>
          )
        case 'override_status':
        case 'color': {
          if (pathName === '/sales-inventory') {
            let threshold
            let expected_sales
            const salesValue = varianceControlData?.sales?.find(salesData => {
              return salesData.station_tank_status === arr.tank_status
            })
            const inventoryValue = varianceControlData?.inventory?.find(
              inventoryData => inventoryData.station_tank_status === arr.tank_status
            )
            switch (e) {
              case 'sales_variance': {
                threshold = salesValue?.variance_value
                break
              }
              case 'sales_variance_percentage': {
                threshold = salesValue?.variance_percentage
                expected_sales = arr['expected_sales']
                break
              }
              case 'inventory_variance': {
                threshold = inventoryValue?.variance_value
                break
              }
              case 'inventory_variance_percentage': {
                threshold = inventoryValue?.variance_percentage
                expected_sales = arr['calculated_inventory']
                break
              }
            }
            if (config[e].type == 'override_status') {
              return (
                <td key={index}>
                  {this.AddConditionalForActionColumn(salesValue, inventoryValue, arr, parentIndex)}
                </td>
              )
            }
            if (config[e].checker === true) {
              return (
                <td key={index}>
                  <div className={`${config[e].getColor(arr[e], threshold, expected_sales)}`}>
                    {expected_sales !== '-' && expected_sales !== 0 ? value : 'NA'}
                  </div>
                </td>
              )
            }
            return (
              <td key={index}>
                <div className={`${config[e].getColor(arr[e], threshold)}`}>{value}</div>
              </td>
            )
          } else {
            return (
              <td key={index}>
                <div className={`${config[e].getColor(arr[`${e}_color`])}`}>{value}</div>
              </td>
            )
          }
        }
        case 'link':
          return (
            <td key={index}>
              <Link
                to="#"
                data-index={parentIndex}
                onClick={modalPop}
                className={`${config[e].columnSize}`}
              >
                {value}
              </Link>
            </td>
          )
        case 'date':
          return (
            <td key={index}>
              <div>{value === '-' ? value : format(new Date(value), 'dd-MM-yyyy , HH:mm:ss')}</div>
            </td>
          )
        default:
          return (
            <td key={index} className={config[e]?.columnFixed && 'product_wid'}>
              <div className="table_text_ellipsis">{value}</div>
            </td>
          )
      }
    })
  }

  render() {
    const { fixedHeaders, regularHeaders, tableDatas } = this.state
    return (
      <div className="container" style={{ maxWidth: '100%' }}>
        <table className="fixed">
          <thead>
            <tr>{this.addTd(fixedHeaders)}</tr>
          </thead>
          <tbody>{this.renderFrozenTr(tableDatas)}</tbody>
        </table>
        <div className="scroll">
          <table className="scrollable">
            <thead>
              <tr>{this.addTd(regularHeaders)}</tr>
            </thead>
            <tbody>{this.renderRegular(tableDatas)}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

FixedCoulmnTable.propType = {
  tableData: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  headerSortHandler: PropTypes.func,
  filterApplyHandler: PropTypes.func,
  filterData: PropTypes.object.isRequired,
  modalPop: PropTypes.func.isRequired,
}

FixedCoulmnTable.defaultProps = {
  headerSortHandler: () => {},
  filterApplyHandler: () => {},
}

export default FixedCoulmnTable
