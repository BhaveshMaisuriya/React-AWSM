import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getTerminal,
  getTerminalAuditLog,
  getTableInformation,
  getDownloadTerminal,
  updateTableInformation,
  resetCurrentTerminalDetail,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import TerminalDetailModal from "./TerminalDetailModal"
import Loader from "../../../components/Common/Loader"

const TerminalTableName = "terminal-table"

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(TerminalTableName)
        ? JSON.parse(getCookieByKey(TerminalTableName))
        : tableColumns,
    }
  }

  componentDidMount() {
    const { onGetTerminal, onGetTerminalAuditLog } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "code",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "product",
    }
    onGetTerminal(params)
    onGetTerminalAuditLog(payload)
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: 10,
      page: currentPage,
      search_fields: "*",
    }
    const { onGetDownloadTerminal } = this.props
    await onGetDownloadTerminal(downloadParams)
  }

  render() {
    const {
      onGetTerminal,
      onGetTerminalAuditLog,
      onGetTableInformation,
      onUpdateTableInformation,
      terminalTable,
      auditsTerminal,
      downloadTerminal,
      filterTerminal,
      terminalTableIsLoading,
      resetCurrentTerminalDetail,
    } = this.props
    const { searchFields } = this.state
    return (
      <Fragment>
        {terminalTable && terminalTable.length === 0 && <Loader />}
        {terminalTableIsLoading ? <Loader /> : ""}
        {terminalTable && (
          <Page
            headerTitle="Terminal"
            cardTitle="Terminal List"
            tableName={TerminalTableName}
            onGetMainTable={onGetTerminal}
            onGetAuditLog={onGetTerminalAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={terminalTable}
            audits={auditsTerminal}
            downloadtableData={downloadTerminal}
            filter={filterTerminal}
            modalComponent={TerminalDetailModal}
            onGetDownloadCustomer={this.GetonDownload}
            resetCurrentTerminalDetail={resetCurrentTerminalDetail}
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ terminal }) => ({
  terminalTable: terminal.terminal,
  terminalTableIsLoading: terminal.isLoading,
  auditsTerminal: terminal.auditsTerminal,
  filterTerminal: terminal.filterTerminal,
  downloadTerminal: terminal.downloadTerminal,
})

const mapDispatchToProps = dispatch => ({
  onGetTerminal: params => dispatch(getTerminal(params)),
  onGetTerminalAuditLog: payload => dispatch(getTerminalAuditLog(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadTerminal: params => dispatch(getDownloadTerminal(params)),
  resetCurrentTerminalDetail: () => dispatch(resetCurrentTerminalDetail()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Terminal)
