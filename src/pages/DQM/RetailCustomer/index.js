import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getRetailCustomer,
  getRetailAuditLog,
  getTableInformation,
  updateTableInformation,
  getDownloadRetailCustomer,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import RetailCustomerModal from "./RetailCustomerModal"
import Loader from "../../../components/Common/Loader"

const RetailTableName = "retail-table"

class RetailCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(RetailTableName)
        ? JSON.parse(getCookieByKey(RetailTableName))
        : tableColumns,
    }
  }

  componentDidMount() {
    const { onGetRetailCustomer, onGetRetailAuditLog } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "ship_to_party",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 6,
      page: 1,
      module: "retail-customer",
    }
    onGetRetailCustomer(params)
    onGetRetailAuditLog(payload)
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: null,
      page: currentPage,
      search_fields: "*",
    }
    const { onGetDownloadRetailCustomer } = this.props
    await onGetDownloadRetailCustomer(downloadParams)
  }

  render() {
    const {
      onGetRetailCustomer,
      onGetRetailAuditLog,
      retailCustomerIsLoading,
      onGetTableInformation,
      onUpdateTableInformation,
      retailCustomer,
      audits,
      filter,
      address,
      downloadretailCustomer,
    } = this.props
    const { searchFields } = this.state
    return (
      <Fragment>
        {retailCustomer && retailCustomer.length === 0 && <Loader />}
        {retailCustomerIsLoading ? <Loader /> : ""}
        {retailCustomer && (
          <Page
            tableName={RetailTableName}
            onGetMainTable={onGetRetailCustomer}
            onGetAuditLog={onGetRetailAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={retailCustomer}
            downloadtableData={downloadretailCustomer}
            audits={audits}
            filter={filter}
            address={address}
            headerTitle="Retail Customer"
            cardTitle="Retail Customer List"
            modalComponent={RetailCustomerModal}
            onGetDownloadCustomer={this.GetonDownload}
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ retailCustomer }) => ({
  retailCustomer: retailCustomer.retailCustomers,
  retailCustomerIsLoading: retailCustomer.isLoading,
  audits: retailCustomer.audits,
  filter: retailCustomer.filter,
  address: retailCustomer.address,
  downloadretailCustomer: retailCustomer.downloadretailCustomers,
})

const mapDispatchToProps = dispatch => ({
  onGetRetailCustomer: params => dispatch(getRetailCustomer(params)),
  onGetRetailAuditLog: payload => dispatch(getRetailAuditLog(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadRetailCustomer: params =>
    dispatch(getDownloadRetailCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RetailCustomer)
