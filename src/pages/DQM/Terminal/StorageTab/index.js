import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import styles from "./storageTab.module.css"
import Product from "./Product"
import { isScheduler } from "../../../../helpers/auth_helper"

const initialValues = {
  loadingBay: "",
  maxThreshold: "",
  loadingTime: "",
  turnAroundTime: "",
}

const defaultProduct = {
  productName: "Lorem Ipsum",
  productCode: "Lorem Ipsum",
  statusInSap: "Active",
  flowRate: "",
  fromToDate1: "",
  volume1: "",
  remarks1: "",
  fromToDate2: "",
  volume2: "",
  remarks2: "",
}

const fakeProducts = [
  {
    productName: "Lorem Ipsum",
    productCode: "Lorem Ipsum",
    statusInSap: "Active",
    flowRate: "",
    fromToDate1: "",
    volume1: "",
    remarks1: "",
    fromToDate2: "",
    volume2: "",
    remarks2: "",
  },
]

const StorageTab = () => {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [listProducts, setListProducts] = useState(fakeProducts)
  const scheduler = isScheduler()
  const handleSubmit = values => {
    console.log(values)
  }
  const handleShowAddProduct = () => {
    setShowAddProduct(true)
  }
  const handleAddProduct = () => {
    console.log(listProducts)
    setListProducts([...listProducts, defaultProduct])
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {props => {
        return (
          <Form onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="loadingBay">NO OF LOADING BAY</label>
                <Field
                  className="form-control"
                  id="loadingBay"
                  type="number"
                  name="loadingBay"
                  value={props.values.loadingBay}
                  placeholder="Numeric only"
                  onChange={props.handleChange}
                  disabled={scheduler}
                />
                <ErrorMessage name="loadingBay" component="div" />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="maxThreshold">MAX VOL THRESHOLD</label>
                <Field
                  className="form-control"
                  id="maxThreshold"
                  type="number"
                  name="maxThreshold"
                  value={props.values.maxTheshold}
                  placeholder="Numeric only"
                  onChange={props.handleChange}
                  disabled={scheduler}
                />
                <ErrorMessage name="maxThreshold" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="loadingTime">LOADING TIME (MIN)</label>
                <Field
                  className="form-control"
                  id="loadingTime"
                  type="number"
                  name="loadingTime"
                  value={props.values.loadingTime}
                  placeholder="Numeric only"
                  onChange={props.handleChange}
                  disabled={scheduler}
                />
                <ErrorMessage name="loadingTime" component="div" />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="turnAroundTime">TURNAROUND TIME (MIN)</label>
                <Field
                  className="form-control"
                  id="turnAroundTime"
                  type="number"
                  name="turnAroundTime"
                  value={props.values.turnAroundTime}
                  placeholder="Numeric only"
                  onChange={props.handleChange}
                  disabled={scheduler}
                />
                <ErrorMessage name="turnAroundTime" component="div" />
              </div>
            </div>
            {!showAddProduct && (
              <div className="row m-0 mt-3">
                <div className={`col-12 form-group ${styles.addButton}`}>
                  <div
                    className="btn btn-outline"
                    onClick={handleShowAddProduct}
                    disabled={scheduler}
                  >
                    + ADD PRODUCT
                  </div>
                </div>
              </div>
            )}
            {showAddProduct &&
              listProducts.map((item, index) => {
                return (
                  <Product
                    key={item}
                    index={index}
                    values={props.values}
                    scheduler={scheduler}
                  />
                )
              })}
            {showAddProduct && (
              <div>
                <hr />
                <div
                  className="btn btn-outline"
                  onClick={handleAddProduct}
                  style={{ color: "#009e8e" }}
                >
                  + ADD PRODUCT
                </div>
              </div>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default StorageTab
