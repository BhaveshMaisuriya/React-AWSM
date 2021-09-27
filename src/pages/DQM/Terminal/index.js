import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getTerminal,
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
      subModule: "terminal"
    }
  }

  componentDidMount() {
    const { onGetTerminal } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "code",
      search_fields: transformArrayToString(searchFields),
    }
    onGetTerminal(params)
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: null,
      page: currentPage,
      search_fields: "*",
    }
    const { onGetDownloadTerminal } = this.props
    await onGetDownloadTerminal(downloadParams)
  }

  render() {
    const {
      onGetTerminal,
      onGetTableInformation,
      onUpdateTableInformation,
      terminalTable,
      tableError,
      downloadTerminal,
      filterTerminal,
      terminalTableIsLoading,
      resetCurrentTerminalDetail,
    } = this.props
    const { searchFields, subModule } = this.state
    return (
      <Fragment>
        {terminalTableIsLoading ? <Loader /> : ""}
        {terminalTable.list && (
          <Page
            headerTitle="Terminal"
            cardTitle="Terminal List"
            tableName={TerminalTableName}
            onGetMainTable={onGetTerminal}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={terminalTable}
            downloadtableData={downloadTerminal}
            filter={filterTerminal}
            modalComponent={TerminalDetailModal}
            onGetDownloadCustomer={this.GetonDownload}
            resetCurrentTerminalDetail={resetCurrentTerminalDetail}
            subModule={subModule}
          />
        )}
        {tableError && (
          <div className="page-content">
            <div className="container-fluid">
              <p>
                There's some issue loading the data. Please refresh the page or
                try again later
              </p>
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ terminal }) => ({
  terminalTable: terminal.terminal,
  tableError: terminal.tableError,
  terminalTableIsLoading: terminal.isLoading,
  filterTerminal: terminal.filterTerminal,
  downloadTerminal: terminal.downloadTerminal,
})

const mapDispatchToProps = dispatch => ({
  onGetTerminal: params => dispatch(getTerminal(params)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadTerminal: params => dispatch(getDownloadTerminal(params)),
  resetCurrentTerminalDetail: () => dispatch(resetCurrentTerminalDetail()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Terminal)