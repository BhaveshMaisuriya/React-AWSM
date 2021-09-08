import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getProducts,
  getProductAuditLog,
  getTableInformation,
  updateTableInformation,
  getDownloadProducts,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import Loader from "../../../components/Common/Loader"
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
    const { onGetProducts, onGetProductAuditLog } = this.props
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
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: null,
      page: currentPage,
      search_fields: "*",
    }
    const { onGetDownloadProducts } = this.props
    await onGetDownloadProducts(downloadParams)
  }

  render() {
    const {
      onGetProducts,
      onGetProductAuditLog,
      onGetTableInformation,
      onUpdateTableInformation,
      products,
      audits,
      filter,
      tableError,
      downloadProduct,
      productsIsLoading,
    } = this.props
    const { searchFields } = this.state
    return (
      <Fragment>
        {productsIsLoading ? <Loader /> : ""}
        {products.list && (
          <Page
            headerTitle="Product"
            cardTitle="Product List"
            tableName={ProductTableName}
            onGetMainTable={onGetProducts}
            onGetAuditLog={onGetProductAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={products}
            downloadtableData={downloadProduct}
            audits={audits}
            filter={filter}
            modalComponent={ProductDetailModal}
            onGetDownloadCustomer={this.GetonDownload}
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

const mapStateToProps = ({ products }) => ({
  products: products.dataList,
  tableError: products.tableError,
  productsIsLoading: products.isLoading,
  audits: products.productAuditLog,
  filter: products.productFilter,
  downloadProduct: products.downloadProducts,
})

const mapDispatchToProps = dispatch => ({
  onGetProducts: params => dispatch(getProducts(params)),
  onGetProductAuditLog: payload => dispatch(getProductAuditLog(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadProducts: params => dispatch(getDownloadProducts(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
