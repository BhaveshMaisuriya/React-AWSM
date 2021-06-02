import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getRetailCustomer,
  getRetailAuditLog,
  // getRetailFilter,
  getTableInformation,
  updateTableInformation,
  getDownloadRetailCustomer
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
// import TableInformationWrapper from "../../../components/Common/TableInformationWrapper"
import RetailCustomerModal from "./RetailCustomerModal"
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
    const {
      onGetRetailCustomer,
      onGetRetailAuditLog,
      onGetTableInformation,
    } = this.props
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
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "retail_customer",
    }
    onGetRetailCustomer(params)
    onGetRetailAuditLog(payload)
    onGetTableInformation()
  }

  GetonDownload = async(currentPage) => {
    const downloadParams = {
      limit: 10,
      page: currentPage,
      search_fields: '*',
    }
    const { onGetDownloadRetailCustomer } = this.props;
    await onGetDownloadRetailCustomer(downloadParams);
  }

  render() {
    const {
      onGetRetailCustomer,
      onGetRetailAuditLog,
      // onGetRetailFilter,
      onGetTableInformation,
      onUpdateTableInformation,
      retailCustomer,
      audits,
      filter,
      address,
      downloadretailCustomer,
    } = this.props
    const { searchFields } = this.state
    if (!retailCustomer || retailCustomer.length === 0) return ""
    return (
      <Fragment>
        <Page
          tableName={RetailTableName}
          onGetCustomer={onGetRetailCustomer}
          onGetAuditLog={onGetRetailAuditLog}
          // onGetFilter={onGetRetailFilter}
          onGetTableInformation={onGetTableInformation}
          onUpdateTableInformation={onUpdateTableInformation}
          tableColumns={searchFields}
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
      </Fragment>
    )
  }
}

const mapStateToProps = ({ retailCustomer }) => ({
  retailCustomer: retailCustomer.retailCustomers,
  audits: retailCustomer.audits,
  filter: retailCustomer.filter,
  address: retailCustomer.address,
  downloadretailCustomer: retailCustomer.downloadretailCustomers,
})

const mapDispatchToProps = dispatch => ({
  onGetRetailCustomer: params => dispatch(getRetailCustomer(params)),
  onGetRetailAuditLog: payload => dispatch(getRetailAuditLog(payload)),
  // onGetRetailFilter: payload => dispatch(getRetailFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadRetailCustomer: params => dispatch(getDownloadRetailCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RetailCustomer)