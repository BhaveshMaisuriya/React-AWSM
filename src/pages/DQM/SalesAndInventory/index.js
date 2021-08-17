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
import SalesAndInventoryModal from "./SalesAndInventoryModal"
import Loader from "../../../components/Common/Loader"
import {
  getSalesAndInventoryVarianceControl,
  overrideStatusInActionColumn,
} from "../../../store/actions"

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
    const {
      onGetSaleAndInventory,
      onGetSalesAuditLog,
      getSalesAndInventoryVarianceControl,
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
    onGetSaleAndInventory(params)
    onGetSalesAuditLog(payload)
    getSalesAndInventoryVarianceControl()
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: null,
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
      varianceControlData,
      saleAndInventoryIsLoading,
      overrideStatusInActionColumn,
    } = this.props
    const { searchFields } = this.state
    return (
      <Fragment>
        {saleAndInventory && saleAndInventory.length === 0 && <Loader />}
        {saleAndInventoryIsLoading ? <Loader /> : ""}
        {saleAndInventory && saleAndInventory.list && (
          <Page
            tableName={tableName}
            onGetMainTable={onGetSaleAndInventory}
            onGetAuditLog={onGetSalesAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={saleAndInventory}
            downloadtableData={downloadtableData}
            audits={audits}
            filter={filter}
            address={address}
            headerTitle="Sales & Inventory"
            cardTitle="Sales & Inventory List"
            modalComponent={SalesAndInventoryModal}
            onGetDownloadCustomer={this.GetonDownload}
            frozenColNum={2}
            varianceControlData={varianceControlData}
            overrideActionColumn={overrideStatusInActionColumn}
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ retailCustomer, saleAndInventory }) => ({
  saleAndInventory: saleAndInventory.mainTableData,
  saleAndInventoryIsLoading: saleAndInventory.isLoading,
  audits: saleAndInventory.auditsCom,
  downloadtableData: saleAndInventory.downloadtableData,
  filter: saleAndInventory.filter,
  address: retailCustomer.address,
  varianceControlData: saleAndInventory.varianceControlData,
})

const mapDispatchToProps = dispatch => ({
  onGetSaleAndInventory: params => dispatch(getSaleAndInventory(params)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetSalesAuditLog: payload => dispatch(getSalesAuditLog(payload)),
  onGetDownloadSales: params => dispatch(getDownloadSales(params)),
  getSalesAndInventoryVarianceControl: () =>
    dispatch(getSalesAndInventoryVarianceControl()),
  overrideStatusInActionColumn: params =>
    dispatch(overrideStatusInActionColumn(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesInventory)
