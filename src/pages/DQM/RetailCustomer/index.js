import React, { useEffect, Fragment, useState } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import { getRetailCustomer } from "store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import RetailCustomerModal from "./RetailCustomerModal"
import Loader from "components/Common/Loader"

const RetailTableName = "retail-table"

function RetailCustomer (props) {
  const {
    onGetRetailCustomer,
    retailCustomerIsLoading,
    retailCustomer,
    filter,
    tableError,
  } = props
const [searchFields, setSearchFields] = useState(getCookieByKey(RetailTableName)
? JSON.parse(getCookieByKey(RetailTableName))
: tableColumns);
const [subModule, setSubModule] = useState("retail-customer");
const [isApiCalled, setIsApiCalled] = useState(false);

useEffect(() => {
  // console.log('call::1', isApiCalled);
  // if(isApiCalled === false) {
    // await setIsApiCalled(true);
    return fetchData();
    
  // }
  

}, []);

const fetchData = async() => {
  const params = {
    limit: 10,
    page: 0,
    sort_dir: "asc",
    sort_field: "ship_to_party",
    search_fields: transformArrayToString(searchFields),
  }
  // console.log('call::', isApiCalled);
  await onGetRetailCustomer(params)
}

  return(
    <Fragment>
    {retailCustomerIsLoading ? <Loader /> : ""}
    {retailCustomer.list && (
      <Page
        tableName={RetailTableName}
        onGetMainTable={onGetRetailCustomer}
        tableColumns={searchFields}
        defaultColumns={tableColumns}
        tableMapping={tableMapping}
        tableData={retailCustomer}
        filter={filter}
        headerTitle="Retail Customer"
        cardTitle="Retail Customer List"
        modalComponent={RetailCustomerModal}
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

const mapStateToProps = ({ retailCustomer }) => ({
  retailCustomer: retailCustomer.retailCustomers,
  tableError: retailCustomer.tableError,
  retailCustomerIsLoading: retailCustomer.isLoading,
  filter: retailCustomer.filter,
})

const mapDispatchToProps = dispatch => ({
  onGetRetailCustomer: params => dispatch(getRetailCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RetailCustomer)
