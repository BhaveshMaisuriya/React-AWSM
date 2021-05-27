import React, { Component } from "react"
import PropTypes from "prop-types"
import Filter from "../DataTable/filter"
import { Link } from "react-router-dom"
import "./style.scss"
import { isEqual } from "lodash"
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
      modal: false,
      //user and last time updated will be get from backend API
      user: "Nur Izzati",
      time: "3rd March 2021",
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
    const { config, filterApplyHandler } = this.props
    const tempObj = {}
    tempObj[config[dataKey].apiKey] = checkedFilter
    filterApplyHandler(tempObj, "insert")
  }

  handleClickReset = dataKey => {
    const { filterApplyHandler } = this.props
    filterApplyHandler(dataKey, "remove")
  }

  addTd = arr => {
    const { config, filterData, filterDropdownHandler } = this.props
    if (!arr) return null
    return arr.map((e, index) => (
      <td key={index}>
        <div
          className={"d-flex align-items-center table_header_fit_text"}
        >
          <span onClick={this.createSortHandler(config[e].apiKey)} className="header_text">
            {config[e].label}
          </span>
          <Filter
            dataFilter={filterData}
            dataKey={e}
            handleClickApply={this.handleClickApply}
            handleClickReset={this.handleClickReset}
            filterDropdownHandler={filterDropdownHandler}
          />
        </div>
      </td>
    ))
  }
  renderFrozenTd = (arr, parentIndex) => {
    const { headers, config, modalPop } = this.props
    const sliceArr = headers.slice(0, this.state.fixedHeaders.length)
    return sliceArr.map((e, index) => (
      <td key={index}>
        <Link
          to="#"
          data-index={parentIndex}
          onClick={modalPop}
          className={config[e].columnSize === 1 ? "cell-text" : "cell-text-big"}
        >
          {arr[e]}
        </Link>
      </td>
    ))
  }
  renderFrozenTr = arr => {
    if (!arr) return null
    return arr.map((e, index) => {
      return <tr key={index}>{this.renderFrozenTd(e, index)}</tr>
    })
  }
  renderRegularTd = arr => {
    const { headers, config } = this.props
    const sliceArr = headers.slice(this.state.fixedHeaders.length, arr.length)
    return sliceArr.map((e, index) => (
      <td key={index}>
        <div> {arr[e]} </div>
      </td>
    ))
  }
  renderRegular = arr => {
    if (!arr) return null
    return arr.map((e, index) => {
      return <tr key={index}>{this.renderRegularTd(e)}</tr>
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
  filterDropdownHandler: PropTypes.func,
  filterApplyHandler: PropTypes.func,
  filterData: PropTypes.object.isRequired,
  modalPop: PropTypes.func.isRequired,
}

FixedCoulmnTable.defaultProps = {
  headerSortHandler: () => {},
  filterDropdownHandler: () => {},
  filterApplyHandler: () => {},
}

export default FixedCoulmnTable
