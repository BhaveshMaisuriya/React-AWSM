import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import {
  getProducts,
  getProductAuditLog,
  // getProductFilter,
  getTableInformation,
  updateTableInformation,
  getDownloadProducts
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
    //onGetTableInformation()
  }

  GetonDownload = async(currentPage) => {
    const downloadParams = {
      limit: 10,
      page: currentPage,
      search_fields: '*',
    }
    const { onGetDownloadProducts } = this.props;
    await onGetDownloadProducts(downloadParams);
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
      downloadProduct,
    } = this.props
    const { searchFields } = this.state
    if (!products || products.length === 0) return (<Loader />)
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
          downloadtableData={downloadProduct}
          audits={audits}
          filter={filter}
          modalComponent={ProductDetailModal}
          onGetDownloadCustomer={this.GetonDownload}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ products }) => ({
  products: products.dataList,
  audits: products.productAuditLog,
  filter: products.productFilter,
  downloadProduct: products.downloadProducts,
})

const mapDispatchToProps = dispatch => ({
  onGetProducts: params => dispatch(getProducts(params)),
  onGetProductAuditLog: payload => dispatch(getProductAuditLog(payload)),
  // onGetProductFilter: payload => dispatch(getProductFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadProducts: params => dispatch(getDownloadProducts(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)