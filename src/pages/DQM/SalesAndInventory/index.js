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
import REGION_TERMINAL, {TERMINAL_CODE_MAPPING} from "../../../common/data/regionAndTerminal";

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

  onGetMainTableAndAuditLog = () =>
  {
    const defaultTerminal = REGION_TERMINAL.find((option)=> option.region === "Central")?.terminal?.find((term)=> term === "KVDT")
    const {
      onGetSaleAndInventory,
      getSalesAndInventoryVarianceControl,
    } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "",
      sort_field: "",
      search_term: "",
      search_fields: transformArrayToString(searchFields),
      search_date: format(this.state.salesDate, "yyyy-MM-dd"),
      terminal: TERMINAL_CODE_MAPPING[defaultTerminal]
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
      isUpdateSuccess,
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
            updateSalesDate={this.onUpdateSalesDate}
            subModule={subModule}
            salesDate={salesDate}
            isUpdateSuccess={isUpdateSuccess}
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
