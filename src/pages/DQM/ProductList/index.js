import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getProducts,
  getProductAuditLog,
  // getProductFilter,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import ProductDetailModal from "./ProductDetailModal"
const ProductTableName = "product-table"

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(ProductTableName)
        ? JSON.parse(getCookieByKey(ProductTableName))
        : tableColumns,
    }
  }

  componentDidMount() {
    const {
      onGetProducts,
      onGetProductAuditLog,
      onGetTableInformation,
    } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "code",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "product",
    }
    onGetProducts(params)
    onGetProductAuditLog(payload)
    onGetTableInformation()
  }

  render() {
    const {
      onGetProducts,
      onGetProductAuditLog,
      // onGetProductFilter,
      onGetTableInformation,
      onUpdateTableInformation,
      products,
      audits,
      filter,
    } = this.props
    const { searchFields } = this.state
    if (!products || products.length === 0) return ""
    return (
      <Fragment>
        <Page
          headerTitle="Product"
          cardTitle="Product List"
          tableName={ProductTableName}
          onGetCustomer={onGetProducts}
          onGetAuditLog={onGetProductAuditLog}
          // onGetFilter={onGetProductFilter}
          onGetTableInformation={onGetTableInformation}
          onUpdateTableInformation={onUpdateTableInformation}
          tableColumns={searchFields}
          tableMapping={tableMapping}
          tableData={products}
          audits={audits}
          filter={filter}
          modalComponent={ProductDetailModal}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ products }) => ({
  products: products.dataList,
  audits: products.productAuditLog,
  filter: products.productFilter,
})

const mapDispatchToProps = dispatch => ({
  onGetProducts: params => dispatch(getProducts(params)),
  onGetProductAuditLog: payload => dispatch(getProductAuditLog(payload)),
  // onGetProductFilter: payload => dispatch(getProductFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
