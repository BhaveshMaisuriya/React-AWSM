import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getTerminal,
  getTerminalAuditLog,
  getProductFilter,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import TerminalDetailModal from "./TerminalDetailModal"
const ProductTableName = "product-table"

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(ProductTableName)
        ? JSON.parse(getCookieByKey(ProductTableName))
        : tableColumns,
    }
  }

  componentDidMount() {
    const {
      onGetTerminal,
      onGetTerminalAuditLog,
      onGetTableInformation,
    } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "site_to_party",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "product",
    }
    onGetTerminal(params), onGetTerminalAuditLog(payload)
    onGetTableInformation()
  }

  render() {
    const {
      onGetTerminal,
      onGetTerminalAuditLog,
      onGetProductFilter,
      onGetTableInformation,
      onUpdateTableInformation,
      terminalTable,
      auditsTerminal,
      filter,
    } = this.props
    const { searchFields } = this.state
    if (!terminalTable || terminalTable.length === 0) return ""
    return (
      <Fragment>
        <Page
          headerTitle="Terminal"
          cardTitle="Terminal List"
          tableName={ProductTableName}
          onGetCustomer={onGetTerminal}
          onGetAuditLog={onGetTerminalAuditLog}
          onGetFilter={onGetProductFilter}
          onGetTableInformation={onGetTableInformation}
          onUpdateTableInformation={onUpdateTableInformation}
          tableColumns={searchFields}
          tableMapping={tableMapping}
          tableData={terminalTable}
          audits={auditsTerminal}
          filter={filter}
          modalComponent={TerminalDetailModal}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ products, terminal }) => ({
  terminalTable: terminal.terminal,
  auditsTerminal: terminal.auditsTerminal,
  filter: products.productFilter,
})

const mapDispatchToProps = dispatch => ({
  onGetTerminal: params => dispatch(getTerminal(params)),
  onGetTerminalAuditLog: payload => dispatch(getTerminalAuditLog(payload)),
  onGetProductFilter: payload => dispatch(getProductFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Terminal)
