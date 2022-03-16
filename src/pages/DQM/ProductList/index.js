import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Page from '../Common'
import { getProducts } from 'store/actions'
import { tableColumns, tableMapping } from './tableMapping'
import { transformArrayToString, getCookieByKey } from '../Common/helper'
import Loader from 'components/Common/Loader'
import ProductDetailModal from './ProductDetailModal'
const ProductTableName = 'product-table'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(ProductTableName)
        ? JSON.parse(getCookieByKey(ProductTableName))
        : tableColumns,
      subModule: 'product',
    }
  }

  componentDidMount() {
    const { onGetProducts } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: 'asc',
      sort_field: 'code',
      search_fields: transformArrayToString(searchFields),
    }
    onGetProducts(params)
  }

  render() {
    const { onGetProducts, products, filter, tableError, productsIsLoading } =
      this.props
    const { searchFields, subModule } = this.state
    return (
      <Fragment>
        {productsIsLoading ? <Loader /> : ''}
        {products.list && (
          <Page
            headerTitle="Product"
            cardTitle="Product List"
            tableName={ProductTableName}
            onGetMainTable={onGetProducts}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={products}
            filter={filter}
            modalComponent={ProductDetailModal}
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

const mapStateToProps = ({ products }) => ({
  products: products.dataList,
  tableError: products.tableError,
  productsIsLoading: products.isLoading,
  filter: products.productFilter,
})

const mapDispatchToProps = dispatch => ({
  onGetProducts: params => dispatch(getProducts(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
