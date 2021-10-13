import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getSaleAndInventory,
  getTableInformation,
  updateTableInformation,
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
import { format, subDays } from "date-fns"

const tableName = "salesinventory-table"

class SalesInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(tableName)
        ? JSON.parse(getCookieByKey(tableName))
        : tableColumns,
      salesDate: new Date(),
      subModule: "sales-and-inventory"
    }
  }

  formatDate = (date) => {
    var result = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return result.split('/')[2] + "-" + result.split('/')[1] + "-" + result.split('/')[0];
  }

  componentDidMount() {
    this.onGetMainTableAndAuditLog()
  }

  componentDidUpdate(prevProps, prevState) {
    const {salesDate} = this.state;
    const {salesDate: prevStateDate} = prevState;
    if (salesDate !== prevStateDate){
      this.onGetMainTableAndAuditLog()
    }
    if (this.props.isUpdateSuccess !== prevProps.isUpdateSuccess){
      this.onGetMainTableAndAuditLog()
    }
  }

  onGetMainTableAndAuditLog = () =>{
    const {
      onGetSaleAndInventory,
      getSalesAndInventoryVarianceControl,
    } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 1,
      sort_dir: "asc",
      sort_field: "ship_to_party",
      search_fields: transformArrayToString(searchFields),
      search_date: format(this.state.salesDate, "yyyy-MM-dd")
    }
    onGetSaleAndInventory(params)
    /*Call Variance Control only when the modal is opened, not on the page load*/
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

  onUpdateSalesDate = (newDate)=>{
    this.setState({
      salesDate: newDate
    })
  }

  render() {
    const {
      onGetSaleAndInventory,
      onGetTableInformation,
      onUpdateTableInformation,
      saleAndInventory,
      downloadtableData,
      filter,
      tableError,
      varianceControlData,
      saleAndInventoryIsLoading,
      overrideStatusInActionColumn,
    } = this.props
    const { searchFields, salesDate, subModule } = this.state
    return (
      <Fragment>
        {saleAndInventoryIsLoading ? <Loader /> : ""}
        {saleAndInventory.list && (
          <Page
            tableName={tableName}
            onGetMainTable={onGetSaleAndInventory}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={saleAndInventory}
            downloadtableData={downloadtableData}
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

const mapStateToProps = ({ saleAndInventory }) => ({
  saleAndInventory: saleAndInventory.mainTableData,
  tableError: saleAndInventory.tableError,
  saleAndInventoryIsLoading: saleAndInventory.isLoading,
  downloadtableData: saleAndInventory.downloadtableData,
  filter: saleAndInventory.filter,
  varianceControlData: saleAndInventory.varianceControlData,
  isUpdateSuccess: saleAndInventory.isUpdateSuccess
})

const mapDispatchToProps = dispatch => ({
  onGetSaleAndInventory: params => dispatch(getSaleAndInventory(params)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadSales: params => dispatch(getDownloadSales(params)),
  getSalesAndInventoryVarianceControl: () =>
    dispatch(getSalesAndInventoryVarianceControl()),
  overrideStatusInActionColumn: params =>
    dispatch(overrideStatusInActionColumn(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesInventory)