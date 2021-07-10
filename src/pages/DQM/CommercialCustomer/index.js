import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "./../Common"
import {
  getCommercialCustomer,
  getDownloadCommercialCustomer,
  getCommercialAuditLog,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "./../Common/helper"
import CommercialCustomerModal from "./CommercialCustomerModal"
import Loader from "../../../components/Common/Loader"
const CommercialCustomerTableName = "commercial-table"

class CommercialCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(CommercialCustomerTableName)
        ? JSON.parse(getCookieByKey(CommercialCustomerTableName))
        : tableColumns,
    }
  }

  componentDidMount = async() => {
    const {
      onGetCommercialCustomer,
      onGetCommercialAuditLog,
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
      q: "commercial_customer",
    }
    await onGetCommercialCustomer(params)
    await onGetCommercialAuditLog(payload)
  }

  GetonDownload = async (currentPage) => {
    const downloadParams = {
      limit: 10,
      page: currentPage,
      search_fields: '*',
    }
    const { onGetDownloadCommercialCustomer } = this.props;
    await onGetDownloadCommercialCustomer(downloadParams);
  }

  render() {
    const {
      onGetCommercialCustomer,
      onGetCommercialAuditLog,
      onGetTableInformation,
      onUpdateTableInformation,
      commercialCustomer,
      downloadCommercialCustomer,
      auditsCom,
      filterCom,
      address,
    } = this.props
    const { searchFields } = this.state
    if (!commercialCustomer) return ""
    return (
      <Fragment>
        {(commercialCustomer && commercialCustomer.length === 0) && <Loader /> }
        {commercialCustomer &&  
          <Page
            onGetCustomer={onGetCommercialCustomer}
            onGetAuditLog={onGetCommercialAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            tableMapping={tableMapping}
            tableData={commercialCustomer}
            downloadtableData={downloadCommercialCustomer}
            audits={auditsCom}
            filter={filterCom}
            address={address}
            headerTitle="Commercial Customer"
            cardTitle="Commercial Customer List"
            tableName={CommercialCustomerTableName}
            modalComponent={CommercialCustomerModal}
            onGetDownloadCustomer={this.GetonDownload}
          />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ commercialCustomer, retailCustomer }) => ({
  commercialCustomer: commercialCustomer.commercialCustomers,
  auditsCom: commercialCustomer.auditsCom,
  filterCom: commercialCustomer.filterCom,
  address: retailCustomer.address,
  downloadCommercialCustomer: commercialCustomer.downloadCommercialCustomer,
})

const mapDispatchToProps = dispatch => ({
  onGetCommercialCustomer: params => dispatch(getCommercialCustomer(params)),
  onGetCommercialAuditLog: payload => dispatch(getCommercialAuditLog(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadCommercialCustomer: params => dispatch(getDownloadCommercialCustomer(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommercialCustomer)