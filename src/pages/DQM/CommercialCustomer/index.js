import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import { getCommercialCustomer } from "store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import CommercialCustomerModal from "./CommercialCustomerModal"
import Loader from "components/Common/Loader"
const CommercialCustomerTableName = "commercial-table"

class CommercialCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(CommercialCustomerTableName)
        ? JSON.parse(getCookieByKey(CommercialCustomerTableName))
        : tableColumns,
      subModule: "commercial-customer",
    }
  }

  componentDidMount = async () => {
    const { onGetCommercialCustomer } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "ship_to_party",
      search_fields: transformArrayToString(searchFields),
    }
    await onGetCommercialCustomer(params)
  }

  render() {
    const {
      onGetCommercialCustomer,
      commercialCustomer,
      tableError,
      filterCom,
      commercialCustomerIsLoading,
    } = this.props
    const { searchFields, subModule } = this.state
    return (
      <Fragment>
        {commercialCustomerIsLoading ? <Loader /> : ""}
        {commercialCustomer.list && (
          <Page
            onGetMainTable={onGetCommercialCustomer}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={commercialCustomer}
            filter={filterCom}
            headerTitle="Commercial Customer"
            cardTitle="Commercial Customer List"
            tableName={CommercialCustomerTableName}
            modalComponent={CommercialCustomerModal}
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

const mapStateToProps = ({ commercialCustomer }) => ({
  commercialCustomer: commercialCustomer.commercialCustomers,
  tableError: commercialCustomer.tableError,
  commercialCustomerIsLoading: commercialCustomer.isLoading,
  filterCom: commercialCustomer.filterCom,
})

const mapDispatchToProps = dispatch => ({
  onGetCommercialCustomer: params => dispatch(getCommercialCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommercialCustomer)
