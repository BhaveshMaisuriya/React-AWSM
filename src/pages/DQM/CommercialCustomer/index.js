import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "./../Common"
import {
  getCommercialCustomer,
  getDownloadCommercialCustomer,
  getCommercialAuditLog,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "./../Common/helper"
import CommercialCustomerModal from "./CommercialCustomerModal"
import Loader from "../../../components/Common/Loader"
const CommercialCustomerTableName = "commercial-table"

class CommercialCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(CommercialCustomerTableName)
        ? JSON.parse(getCookieByKey(CommercialCustomerTableName))
        : tableColumns,
    }
  }

  componentDidMount = async () => {
    const { onGetCommercialCustomer, onGetCommercialAuditLog } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "ship_to_party",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 10,
      page: 1,
      module: "commercial-customer",
    }
    await onGetCommercialCustomer(params)
    await onGetCommercialAuditLog(payload)
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: null,
      page: currentPage,
      search_fields: "*",
    }
    const { onGetDownloadCommercialCustomer } = this.props
    await onGetDownloadCommercialCustomer(downloadParams)
  }

  render() {
    const {
      onGetCommercialCustomer,
      onGetCommercialAuditLog,
      onGetTableInformation,
      onUpdateTableInformation,
      commercialCustomer,
      downloadCommercialCustomer,
      auditsCom,
      tableError,
      filterCom,
      commercialCustomerIsLoading,
    } = this.props    
    const { searchFields } = this.state
    return (
      <Fragment>
        {commercialCustomerIsLoading ? <Loader /> : ""}
        {commercialCustomer.list && (
          <Page
            onGetMainTable={onGetCommercialCustomer}
            onGetAuditLog={onGetCommercialAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={commercialCustomer}
            downloadtableData={downloadCommercialCustomer}
            audits={auditsCom}
            filter={filterCom}
            headerTitle="Commercial Customer"
            cardTitle="Commercial Customer List"
            tableName={CommercialCustomerTableName}
            modalComponent={CommercialCustomerModal}
            onGetDownloadCustomer={this.GetonDownload}
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

const mapStateToProps = ({ commercialCustomer }) => ({
  commercialCustomer: commercialCustomer.commercialCustomers,
  tableError: commercialCustomer.tableError,
  commercialCustomerIsLoading: commercialCustomer.isLoading,
  auditsCom: commercialCustomer.auditsCom,
  filterCom: commercialCustomer.filterCom,
  downloadCommercialCustomer: commercialCustomer.downloadCommercialCustomer,
})

const mapDispatchToProps = dispatch => ({
  onGetCommercialCustomer: params => dispatch(getCommercialCustomer(params)),
  onGetCommercialAuditLog: payload => dispatch(getCommercialAuditLog(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadCommercialCustomer: params =>
    dispatch(getDownloadCommercialCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommercialCustomer)
