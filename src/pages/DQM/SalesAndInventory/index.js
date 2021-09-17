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
// import { format } from "date-fns"

const tableName = "salesinventory-table"

class SalesInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(tableName)
        ? JSON.parse(getCookieByKey(tableName))
        : tableColumns,
      salesDate: new Date()
    }
  }

  componentDidMount() {
    this.onGetMainTableAndAuditLog()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {salesDate} = this.state.salesDate;
    const {salesDate: prevStateDate} = prevState;
    if (salesDate !== prevStateDate){
      // this.onGetMainTableAndAuditLog()
      /*This will be called when sales date change. But now we only have data for date
       2021-04-08. So jut let it be commented*/
    }
  }

  onGetMainTableAndAuditLog = () =>{
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
      search_date:"2021-04-08"
      // search_date:format(new Date(), "yyyy-MM-dd")
      /* must be (format(sales_date,"YYYY-MM-DD")) // because data is only available
      for date 2021-04-08, not for today. so just a test */
    }
    const payload = {
      limit: 6,
      page: 1,
      module: "sales-and-inventory",
    }
    onGetSaleAndInventory(params)
    onGetSalesAuditLog(payload)
    /*Call Variance Control only when the modal is opened, not on the page load*/
    // getSalesAndInventoryVarianceControl()
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

  onUpdateSalesDate = (newDate)=>{
    this.setState({
      salesDate: newDate
    })
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
      tableError,
      varianceControlData,
      saleAndInventoryIsLoading,
      overrideStatusInActionColumn,
    } = this.props
    const { searchFields,salesDate } = this.state
    return (
      <Fragment>
        {saleAndInventoryIsLoading ? <Loader /> : ""}
        {saleAndInventory.list && (
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
            headerTitle="Sales & Inventory"
            cardTitle="Sales & Inventory List"
            modalComponent={SalesAndInventoryModal}
            onGetDownloadCustomer={this.GetonDownload}
            frozenColNum={2}
            varianceControlData={varianceControlData}
            overrideActionColumn={overrideStatusInActionColumn}
            salesDate={salesDate}
            updateSalesDate={this.onUpdateSalesDate}
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

const mapStateToProps = ({ saleAndInventory }) => ({
  saleAndInventory: saleAndInventory.mainTableData,
  tableError: saleAndInventory.tableError,
  saleAndInventoryIsLoading: saleAndInventory.isLoading,
  audits: saleAndInventory.auditsCom,
  downloadtableData: saleAndInventory.downloadtableData,
  filter: saleAndInventory.filter,
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