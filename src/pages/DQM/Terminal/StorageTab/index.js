import React, { useState, useMemo, useEffect } from "react"
import styles from "./storageTab.module.css"
import Product from "./Product"
import { isScheduler } from "../../../../helpers/auth_helper"
import AWSMInputNumber from "../../../../components/Common/InputNumber"
import { maxTime } from 'date-fns'
import { AvField, AvForm } from "availity-reactstrap-validation"

const newProductTemplate = {
  id: null,
  status_awsm: null,
  flow_rate: null,
  volume_capping_date_range: null,
  volume_capping_date_range_2: null,
  volume_capping_volume: null,
  volume_capping_remarks: null,
  volume_capping_volume_2: null,
  volume_capping_remarks_2: null,
  terminal: null,
  name: null,
  code: null,
}

const StorageTab = ({ data, onChange }) => {
  const [storageData, setStorageData] = useState(data)
  const scheduler = isScheduler()

  useEffect(() => {
    if (onChange) {
      onChange(storageData)
    }
  }, [storageData])

  useEffect(() => {
    setStorageData(data)
  }, [data])
  const onFieldChange = (key, value) => {
    const newStorageData = { ...storageData }
    newStorageData[key] = value
    setStorageData(newStorageData)
  }

  const onDeleteProduct = key => {
    const newStorageData = { ...storageData }
    delete newStorageData[key]
    setStorageData(newStorageData)
  }

  const onAddProduct = () => {
    if (productList.length >= 20){
      return;
    }
    let newProductKey = "product_1"
    if (productList.length > 0) {
      const lastProductKey = productList.sort((a,b)=> a - b).pop()
      newProductKey =
        "product_" + (Number(lastProductKey.substring(8)) + 1).toString()
    }
    const newStorageData = { ...storageData }
    newStorageData[newProductKey] = newProductTemplate
    setStorageData(newStorageData)
  }

  const productList = useMemo(
    () => Object.keys(storageData).filter(key => {
      if(key !== 'product_dropdown') return key.startsWith("product_")
    }),
    [storageData]
  )
  function renderExceedError(key, max) {
    if (storageData?.[key] > max) {
      return <p style={{ color: "#f46a6a" , fontSize: "80%", marginTop: "5px"  }}>Must not exceed {max}</p>
    }
    return null
  }
  return (
    <div>
      <div className="d-flex">
        <div className="w-50 mr-2">
          <label
            className={`${
              renderExceedError("loading_bay_no", 100)
            }`}
          >
            NO OF LOADING BAY
          </label>
          <AWSMInputNumber
            disabled={scheduler}
            defaultValue={storageData?.loading_bay_no}
            placeholder="Numeric only"
            onChange={value => onFieldChange("loading_bay_no", value)}
            // max={100}
            renderExceedError={renderExceedError("loading_bay_no", 100)}
          />
          {renderExceedError("loading_bay_no", 100)}
        </div>
        <div className="w-50 ml-2">
          <label>MAX VOL THRESHOLD</label>
          <AWSMInputNumber
            disabled={scheduler}
            defaultValue={storageData?.max_volume_threshold}
            onChange={value => onFieldChange("max_volume_threshold", value)}
            placeholder="Numeric only"
          />
        </div>
      </div>
      <div className="d-flex mt-3">
        <div className="w-50 mr-2">
          <label
            className={`${
              renderExceedError("loading_time", 1440)
            }`}
          >
            LOADING TIME (MIN)
          </label>
          <AWSMInputNumber
            disabled={scheduler}
            defaultValue={storageData?.loading_time}
            onChange={value => onFieldChange("loading_time", value)}
            placeholder="Numeric only"
            renderExceedError={renderExceedError("loading_time", 1440)}
            // max={1440}
          />
          {renderExceedError("loading_time", 1440)}
        </div>
        <div className="w-50 ml-2">
          <label
            className={`${
              renderExceedError("turnaround_time", 1440)
            }`}
          >
            TURNAROUND TIME (MIN)
          </label>
          <AWSMInputNumber
            disabled={scheduler}
            defaultValue={storageData?.turnaround_time}
            onChange={value => onFieldChange("turnaround_time", value)}
            placeholder="Numeric only"
            renderExceedError={renderExceedError("turnaround_time", 1440)}
            // max={1440}
          />
          {renderExceedError("turnaround_time", 1440)}
        </div>
      </div>
      {productList.length < 1 && !scheduler && (
        <div className="row m-0 mt-3">
          <div className={`col-12 form-group ${styles.addButton}`}>
            <btn
              className="btn text-success btn-outline"
              onClick={onAddProduct}
              disabled={scheduler}
            >
              + ADD PRODUCT
            </btn>
          </div>
        </div>
      )}
      {productList.map((key, index) => {
        return (
          <Product
            key={key}
            productKey={key}
            value={storageData[key]}
            scheduler={scheduler}
            onDelete={() => onDeleteProduct(key)}
            onChange={value => onFieldChange(key, value)}
            productsList = {data?.product_dropdown || []}
          />
        )
      })}
      {productList.length > 0 && !scheduler &&(
        <button
          disabled={scheduler}
          onClick={onAddProduct}
          className={`${styles.btnAddSmall} ${
            scheduler ? styles.btnAddSmallDisabled : ""
          }`}
        >
          + ADD PRODUCT
        </button>
      )}
    </div>
  )
}

export default StorageTab