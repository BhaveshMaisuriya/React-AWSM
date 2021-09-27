import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getRetailCustomer,
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
      subModule: "retail-customer",
    }
  }

  componentDidMount() {
    const { onGetRetailCustomer } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "ship_to_party",
      search_fields: transformArrayToString(searchFields),
    }
    onGetRetailCustomer(params)
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
      retailCustomerIsLoading,
      onGetTableInformation,
      onUpdateTableInformation,
      retailCustomer,
      filter,
      tableError,
      downloadretailCustomer,
    } = this.props
    const { searchFields, subModule } = this.state
    return (
      <Fragment>
        {retailCustomerIsLoading ? <Loader /> : ""}
        {retailCustomer.list && (
          <Page
            tableName={RetailTableName}
            onGetMainTable={onGetRetailCustomer}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={retailCustomer}
            downloadtableData={downloadretailCustomer}
            filter={filter}
            headerTitle="Retail Customer"
            cardTitle="Retail Customer List"
            modalComponent={RetailCustomerModal}
            onGetDownloadCustomer={this.GetonDownload}
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

const mapStateToProps = ({ retailCustomer }) => ({
  retailCustomer: retailCustomer.retailCustomers,
  tableError: retailCustomer.tableError,
  retailCustomerIsLoading: retailCustomer.isLoading,
  filter: retailCustomer.filter,
  downloadretailCustomer: retailCustomer.downloadretailCustomers,
})

const mapDispatchToProps = dispatch => ({
  onGetRetailCustomer: params => dispatch(getRetailCustomer(params)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadRetailCustomer: params =>
    dispatch(getDownloadRetailCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RetailCustomer)