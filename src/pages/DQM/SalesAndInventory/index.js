import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getSaleAndInventory,
  getTableInformation,
  updateTableInformation,
  getSalesAuditLog,
  getDownloadSales,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import RetailCustomerModal from "../RetailCustomer/RetailCustomerModal"
import Loader from "../../../components/Common/Loader"

const tableName = "salesinventory-table"

class SalesInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(tableName)
        ? JSON.parse(getCookieByKey(tableName))
        : tableColumns,
    }
  }

  componentDidMount() {
    const { onGetSaleAndInventory, onGetSalesAuditLog } = this.props
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
    onGetSaleAndInventory(params)
    onGetSalesAuditLog(payload)
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: 10,
      page: currentPage,
      search_fields: "*",
    }
    const { onGetDownloadSales } = this.props
    await onGetDownloadSales(downloadParams)
  }

  render() {
    const {
      onGetSaleAndInventory,
      onGetSalesAuditLog,
      // onGetRetailFilter,
      onGetTableInformation,
      onUpdateTableInformation,
      saleAndInventory,
      downloadtableData,
      audits,
      filter,
      address,
    } = this.props
    const { searchFields } = this.state
    if (!saleAndInventory || saleAndInventory.length === 0) return (<Loader />)
    return (
      <Fragment>
        <Page
          tableName={tableName}
          onGetCustomer={onGetSaleAndInventory}
          onGetAuditLog={onGetSalesAuditLog}
          onGetTableInformation={onGetTableInformation}
          onUpdateTableInformation={onUpdateTableInformation}
          tableColumns={searchFields}
          tableMapping={tableMapping}
          tableData={saleAndInventory}
          downloadtableData={downloadtableData}
          audits={audits}
          filter={filter}
          address={address}
          headerTitle="Sales & Inventory"
          cardTitle="Sales & Inventory List"
          modalComponent={RetailCustomerModal}
          onGetDownloadCustomer={this.GetonDownload}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ retailCustomer, saleAndInventory }) => ({
  saleAndInventory: saleAndInventory.mainTableData,
  audits: saleAndInventory.auditsCom,
  downloadtableData: saleAndInventory.downloadtableData,
  filter: saleAndInventory.filter,
  address: retailCustomer.address,
})

const mapDispatchToProps = dispatch => ({
  onGetSaleAndInventory: params => dispatch(getSaleAndInventory(params)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetSalesAuditLog: payload => dispatch(getSalesAuditLog(payload)),
  onGetDownloadSales: params => dispatch(getDownloadSales(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesInventory)
