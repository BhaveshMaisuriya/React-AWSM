import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import { getTerminal, resetCurrentTerminalDetail } from "store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import TerminalDetailModal from "./TerminalDetailModal"
import Loader from "components/Common/Loader"

const TerminalTableName = "terminal-table"

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(TerminalTableName)
        ? JSON.parse(getCookieByKey(TerminalTableName))
        : tableColumns,
      subModule: "terminal",
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

  render() {
    const {
      onGetTerminal,
      terminalTable,
      tableError,
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
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={terminalTable}
            filter={filterTerminal}
            modalComponent={TerminalDetailModal}
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
})

const mapDispatchToProps = dispatch => ({
  onGetTerminal: params => dispatch(getTerminal(params)),
  resetCurrentTerminalDetail: () => dispatch(resetCurrentTerminalDetail()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Terminal)
