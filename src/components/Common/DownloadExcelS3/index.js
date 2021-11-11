import React, { useEffect, useState } from 'react'
import { DownloadIcon } from "./icon"
import { getDQMExcelDownload, getDQMExcelDownloadClear } from "store/actions"
import { connect } from "react-redux"
import { format } from "date-fns"

const DownloadExcel = ({ excelDownload, onGetDQMExcelDownload, subModule, downloadFail, clearDQMExcelDownload, salesDate }) => {  
  const [loader, setLoader] = useState(false)
  
  const downloadParams = {
    limit: null,
    page: 0,
    search_fields: "*",
    subModule: subModule === "sales-and-inventory" ? "sales-inventory" : subModule,
  }

 

  useEffect(() => {
    if(excelDownload !== null && excelDownload) {
      const linkSource = excelDownload
      const downloadLink = document.createElement("a")
      downloadLink.href = linkSource
      downloadLink.download = downloadLink
      downloadLink.click()
      setLoader(false)
      clearDQMExcelDownload()
    }    
    if(downloadFail) {
      setLoader(false)
    }
  }, [excelDownload])

  const downloadExcel = async () => {
    if( subModule === "sales-and-inventory") {
      downloadParams.search_date= format(salesDate, "yyyy-MM-dd");
    }
      setLoader(true)
    if (onGetDQMExcelDownload) {
        await onGetDQMExcelDownload(downloadParams)
    } else {
      // this.setState({ alert: true })
      // this.setState({ error_message: "Something went wrong.." })
      setLoader(false)
    }
  }
  return (
    <button
      className="btn btn-outline-primary excel-btn-container"
      onClick={() => downloadExcel()}
    >
      <div className="excel-download-btn">
        <span className="download-icon">
          <DownloadIcon />
        </span>
        {loader === true ? (
          <span className="downloan-button-message">
            Downloading ...
          </span>
        ) : (
          <span className="download-button-message">
            Download Excel
          </span>
        )}
      </div>
    </button>
    )
}

const mapStateToProps = dqm => ({
  excelDownload: dqm.dqmCommon.excelDownload,
  downloadFail: dqm.dqmCommon.downloadFail,
})

const mapDispatchToProps = dispatch => ({
  onGetDQMExcelDownload: params => dispatch(getDQMExcelDownload(params)),
  clearDQMExcelDownload: () => dispatch(getDQMExcelDownloadClear()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadExcel)