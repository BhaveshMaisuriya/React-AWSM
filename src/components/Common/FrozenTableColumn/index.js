import React, { Component } from "react"
import PropTypes from "prop-types"
import Filter from "../DataTable/filter"
import { Link } from "react-router-dom"
import "./style.scss"
import { isEqual, isUndefined } from "lodash"
import { Badge } from "reactstrap"

class FixedCoulmnTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: "asc",
      orderBy: "ship_to_party",
      fixedHeaders: this.props.headers.slice(0, this.props.frozen),
      regularHeaders: this.props.headers.slice(
        this.props.frozen,
        this.props.headers.length
      ),
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.headers, prevProps.headers)) {
      const fixedHeaders = this.props.headers.slice(0, this.props.frozen)
      const regularHeaders = this.props.headers.slice(
        this.props.frozen,
        this.props.headers.length
      )
      this.setState({ fixedHeaders, regularHeaders })
    }
  }

  createSortHandler = property => event => {
    const { headerSortHandler } = this.props
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }
    this.setState({ order, orderBy })
    headerSortHandler(order, orderBy)
  }

  handleClickApply = (checkedFilter, dataKey) => {
    const { filterApplyHandler } = this.props
    const tempObj = {}
    tempObj[dataKey] = checkedFilter
    filterApplyHandler(tempObj, "insert")
  }

  handleClickReset = dataKey => {
    const { filterApplyHandler } = this.props
    filterApplyHandler(dataKey, "remove")
  }

  addTd = arr => {
    const { config, filterData } = this.props
    if (!arr) return null
    return arr.map((e, index) => (
      <td key={index}>
        <div className={"d-flex align-items-center table_header_fit_text"}>
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
    const { headers } = this.props
    const sliceArr = headers.slice(0, this.state.fixedHeaders.length)
    return this.getTdType(sliceArr, arr, parentIndex)
  }

  renderFrozenTr = arr => {
    if (!arr) return null
    return arr.length === 0 ? <tr><td></td></tr> : arr.map((e, index) => {
      return <tr key={index}>{this.renderFrozenTd(e, index)}</tr>
    })
  }

  renderRegularTd = arr => {
    const { headers } = this.props
    const sliceArr = headers.slice(this.state.fixedHeaders.length, arr.length)
    return this.getTdType(sliceArr, arr)
  }
  renderRegular = arr => {
    if (!arr) return null
    return arr.length === 0 ? <p>Data Not Found!.</p> : arr.map((e, index) => {
      return <tr key={index}>{this.renderRegularTd(e)}</tr>
    })
  }

  getTdType = (sliceArr, arr, parentIndex = 0) => {
    const { config, modalPop } = this.props
    return sliceArr.map((e, index) => {
      switch (config[e] && config[e].type) {
        case "badge":
          return (
            <td key={index}>
              <div className="text-center">
                <Badge
                  className="font-weight-semibold"
                  color={config[e].getBadgeColor(arr[e])}
                  pill
                >
                  {arr[e]}
                </Badge>
              </div>
            </td>
          )
        case "color":
          return (
            <td key={index}>
              <div className={`${config[e].getColor(arr[`${e}_color`])}`}>
                {isUndefined(arr[e]) ? "-" : arr[e]}
              </div>
            </td>
          )
        case "link":
          return (
            <td key={index}>
              <Link
                to="#"
                data-index={parentIndex}
                onClick={modalPop}
                className={`${config[e].columnSize}`}
              >
                {arr[e]}
              </Link>
            </td>
          )
        default:
          return (
            <td key={index}>
              <div
                className="table_text_ellipsis"
                title={isUndefined(arr[e]) ? "-" : arr[e]}
              >
                {isUndefined(arr[e]) ? "-" : arr[e]}
              </div>
            </td>
          )
      }
    })
  }

  render() {
    const { tableData } = this.props
    const { fixedHeaders, regularHeaders } = this.state
    return (
      <div className="container" style={{ maxWidth: "100%" }}>
        <table className="fixed">
          <thead>
            <tr>{this.addTd(fixedHeaders)}</tr>
          </thead>
          <tbody>{this.renderFrozenTr(tableData)}</tbody>
        </table>
          <div className="scroll">
            <table className="scrollable">
              <thead>
                <tr>{this.addTd(regularHeaders)}</tr>
              </thead>
              <tbody>{this.renderRegular(tableData)}</tbody>
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
